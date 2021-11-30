import { Router } from 'express'
import { authMiddleware } from '../middlewares/auth.middleware.js'

import { Room } from './models/Room.js'
import { User } from './models/User.js'

const router = Router()

router.post(`/create`, authMiddleware, async (req, res) => {
   try {
      const myId = req.myId
      const room = await Room.create(req.body)
      const user = await User.findById(myId)

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
      const myId = req.myId

      if (!roomId) {
         res.status(400).json({ message: `Empty room id` })
      }

      const user = await User.findById(myId, { "connectedRoom": 1 })

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
      const myId = req.myId
      const roomPass = req.body.password



      if (!roomId) {
         res.status(400).json({ message: `Empty room id` })
      }

      const room = await Room.findById(roomId, { "password": 1 })
      const user = await User.findById(myId)

      if (room.password === roomPass) {
         user.connectedRoom = room._id
         await user.save()
         return res.json({
            connected: true
         })
      }

      return res.json({
         connected: false,
         reason: `Wrong password`
      })

   } catch (e) {
      console.error(e)
      return res.status(500)
   }
})

export { router as roomRouter }