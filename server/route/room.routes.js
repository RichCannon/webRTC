import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'

import { Room } from './models/Room.js'

const router = Router()

router.post(`/create`, authMiddleware, async (req, res) => {
   try {
      const { user } = req
      const room = await Room.create(req.body)
      console.log(`Room created with: `, room._id.toString())

      user.connectedRoom = room._id
      await user.save()

      return res.json(room)

   } catch (e) {
      console.error(e)
      return res.status(500).json({ message: `Unable to create a room`, param: `alert` })
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
         throw { message: `Room doesn't exist`, param: `alert` }
      }

      if (room && room.password === roomPass) {
         user.connectedRoom = room._id
         await user.save()
         return res.json({
            connected: true
         })
      }

      throw { message: `Wrong password`, param: `alert` }

   } catch (e) {
      console.error(e)
      return res.status(500).json(e)
   }
})

export { router as roomRouter }