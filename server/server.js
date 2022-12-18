import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import http from 'http'
import { Server } from 'socket.io'
import dotenv from 'dotenv'
import { instrument } from '@socket.io/admin-ui'
//import { version, validate } from 'uuid'

// Routes
import { roomRouter } from './route/room.routes.js'
import { userRouter } from './route/user.routes.js'

// Models
import { Room } from './route/models/Room.js'

import ACTIONS from '../client/src/common/socket/actions.js'
import { authSocketMiddleware } from './middlewares/auth.middleware.js'
import { User } from './route/models/User.js'

dotenv.config()
const app = express()
const server = http.createServer(app)

const io = new Server(server, {
   cors: {
      origin: [`http://localhost:3000`, "https://admin.socket.io"],
      credentials: true
   }
})

const PORT = process.env.PORT || 3001

// Socket middlewares
io.use(authSocketMiddleware)
// Express middlewares
app.use(express.json())
app.use(cors())

// Routers
app.use('/api/room', roomRouter)
app.use('/api/user', userRouter)


const {
   MONGO_PORT,
   DB_NAME,
   DB_PASS,
   DB_USERNAME,
   DB_HOST } = process.env


const connectionAuth = DB_USERNAME && DB_PASS ? `${DB_USERNAME}@${DB_PASS}` : '';
const mongoURL = `mongodb://${connectionAuth}${DB_HOST}:${MONGO_PORT}/${DB_NAME}`;

const getClientRooms = async () => {
   return await Room.find()
}

// Share all availbale rooms with clients
const shareRoomsInfo = async () => {
   const rooms = await getClientRooms()

   const roomWithNumOfJoined = []

   for (let i = 0; i < rooms.length; i++) {
      const r = rooms[i]
      const numOfJoined = Array.from(io.sockets.adapter.rooms.get(r._id.toString()) || []).length
      if (!numOfJoined) { // Remove room if nobody in here
         return r.remove()
         
      }
      roomWithNumOfJoined.push({ name: r.name, id: r._id.toString(), numOfJoined })
   }

   io.emit(ACTIONS.SHARE_ROOMS, {
      rooms: roomWithNumOfJoined
   })
}





io.on('connection', async (socket) => {
   await shareRoomsInfo()
   // Join to room handler
   socket.on(ACTIONS.JOIN, async (config) => {
      const { room: roomID } = config // Get roomID
      const { rooms: joinedRooms } = socket // This is a reference to the rooms the Socket is currently in.
      const userId = socket.userId

      const room = await Room.findById(roomID)
      const user = await User.findById(userId)

      console.log(`Joined: ${user.userName} | ${socket.id} to room ${roomID}`)

      if (user.connectedRoom.toString() !== roomID) {
         return console.error(`Doesn't have acces to this room`)
      }

      if (!room) {
         return console.error(`No room found!`)
      }

      // Prevent connecting to the same room
      if (Array.from(joinedRooms).includes(roomID)) {
         return console.warn(`${socket.userName}: Already joined to ${roomID}`)
      }


      // Get all clients that already connected to this room
      const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])

      clients.forEach(clientID => {
         // To all clients (clientID - id of another socket) we are adding peer

         io.to(clientID).emit(ACTIONS.ADD_PEER, {
            peerID: socket.id,
            createOffer: false,
         })

         // To the current socket we are adding peer
         socket.emit(ACTIONS.ADD_PEER, {
            peerID: clientID,
            createOffer: true,

         })
      })

      socket.join(roomID)
      await shareRoomsInfo()

   })

   const leaveRoom = async () => {
      const { rooms } = socket
      console.log(`${socket.userName} : ${socket.id} leave from room!`)
      const roomsId = (await Room.find({}, { "id": 1 })).map(r => r._id.toString())

      const mapRooms = Array.from(rooms).filter(r => roomsId.includes(r))

      for (const roomID of mapRooms) {
         const clients = Array.from(io.sockets.adapter.rooms.get(roomID) || [])

         clients.forEach(clientID => {
            io.to(clientID).emit(ACTIONS.REMOVE_PEER, {
               peerID: socket.id
            })

            socket.emit(ACTIONS.REMOVE_PEER, {
               peerID: clientID
            })
         })

         // If only one person left and he leave, then delete room
         if (clients[0] === socket.id && clients.length === 1) {
            console.log(`Room deleted:`, roomID)
            await Room.findOneAndDelete({ "_id": roomID })
         }

         socket.leave(roomID)
      }

      await shareRoomsInfo()
   }

   socket.on(ACTIONS.LEAVE, async () => await leaveRoom())
   socket.on('disconnecting', async () => await leaveRoom())

   socket.on(ACTIONS.RELAY_SDP, ({ peerID, sessionDescription }) => {
      io.to(peerID).emit(ACTIONS.SESSION_DESCRIPTION, {
         peerID: socket.id,
         sessionDescription,
         userData: { userName: socket.userName, tracksControl: socket.tracksControl }
      })
   })

   socket.on(ACTIONS.RELAY_ICE, ({ peerID, iceCandidate }) => {
      io.to(peerID).emit(ACTIONS.ICE_CANDIDATE, {
         peerID: socket.id,
         iceCandidate,
      })
   })

   // Mute implementation
   socket.on(ACTIONS.MUTE_TRACK, ({ tracksControl, usersInRoom }) => {
      socket.tracksControl = tracksControl // Adding for user socket instance mute control object
      usersInRoom.forEach(clientID => {
         io.to(clientID).emit(ACTIONS.MUTE_TRACK, {
            id: socket.id,
            tracksControl,
         })

      })
   })
})


// Debug tools
instrument(io, { auth: false })

const main = async () => {

   await mongoose.connect(mongoURL)
   console.log(`DB working!`)

   server.listen(PORT, () => {
      console.log(`Server started on port: `, PORT)
   })
}

main().catch(e => console.error(`SERVER ERROR: `, e))


