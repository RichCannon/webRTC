import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'

import { Room } from './models/Room.js'
import { User } from './models/User.js'

const router = Router()

router.post(`/create`, authMiddleware, async (req, res) => {
   try {
      const { user } = req
      const room = await Room.create(req.body)

      user.connectedRoom = room._id
      await user.save()

      return res.json(room)

   } catch (e) {
      console.error(e)
      return res.status(500)
   }
})

router.get(`/check-access/:id`, authMiddleware, async (req, res) => {
   try {
      const roomId = req.params.id
      const { user } = req

      if (!roomId) {
         res.status(400).json({ message: `Empty room id` })
      }

      if (!user.connectedRoom) {
         return res.json({
            connected: false,
         })
      }

      return res.json({
         connected: user.connectedRoom.toString() === roomId,
      })

   } catch (e) {
      console.error(e)
      return res.status(500)
   }
})

router.post(`/connect/:id`, authMiddleware, async (req, res) => {
   try {
      const roomId = req.params.id
      const { user } = req
      const roomPass = req.body.password

      if (!roomId) {
         return res.status(400).json({ message: `Empty room id` })
      }

      const room = await Room.findById(roomId, { "password": 1 })

      if (!room) {
         throw {
            connected: false,
            reason: `Room doesn't exist`
         }
      }

      if (room && room.password === roomPass) {
         user.connectedRoom = room._id
         await user.save()
         return res.json({
            connected: true
         })
      }

      throw {
         connected: false,
         reason: `Wrong password`
      }

   } catch (e) {
      console.error(e)
      return res.status(500).json(e)
   }
})

export { router as roomRouter }