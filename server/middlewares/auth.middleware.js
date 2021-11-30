import jwt from 'jsonwebtoken'

import { User } from '../route/models/User.js'


const getUserDataFromToken = (token) => {
   const { userId } = jwt.verify(token, process.env.JWT_SECRET_KEY)
   return userId
}


const authMiddleware = async (req, res, next) => {

   if (req.method === `OPTIONS`) {
      return next()
   }

   try {
      const token = req.headers && req.headers.authorization ? req.headers.authorization.split(` `)[1] : ``

      if (!token) {
         throw Error(`You need to log in`)
      }

      const userId = getUserDataFromToken(token)
      const user = await User.findOne({ _id: userId }, { "_id": 1 })

      if (!user) {
         return res.status(400).json({ message: `User doesn't exist` })
      }
      req.myId = userId
      next()

   } catch (e) {
      res.status(401).json({ message: e.message || `You need to log in` })
   }
}

const authSocketMiddleware = async (socket, next) => {
   const token = socket.handshake.auth.token
   if (!token) {
      next(new Error({ message: `Plese provide token!` }))
   }
   socket.userId = getUserDataFromToken(token)
   const user = await User.findById(socket.userId, { "userName": 1, "_id": 1 })
   if (!user) {
      next(new Error({ message: `Such user doesn't exist!` }))
   }
   socket.userName = user.userName
   socket.userId = user._id.toString()
   next()
}

export { authMiddleware, authSocketMiddleware }