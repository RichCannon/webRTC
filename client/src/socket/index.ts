import { io } from 'socket.io-client'

const socket = io('http://localhost:3001', {
   forceNew: true,
   timeout: 10000,
   transports: ["websocket"],
   auth: { token: `userToken` }
})

export default socket