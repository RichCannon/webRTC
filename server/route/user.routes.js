import { Router } from 'express'
import jwt from 'jsonwebtoken'

import { authMiddleware } from '../middlewares/auth.middleware.js'
import { User } from './models/User.js'

const router = Router()

router.post(`/login`, async (req, res) => {
   try {
      const { login = null, password = null } = req.body
      const user = await User.findOne({ userName: login })

      if (password !== user?.password) {
         return res.status(400).json({ message: `Password isn't correct`, param: `password` })
      }

      if (!user) {
         return res.status(400).json({ message: `User not found`, param: `alert` })
      }

      if (!process.env.JWT_SECRET_KEY) {
         throw { message: `Jwt secret key not found` }
      }

      const token = jwt.sign(
         { userId: user.id },
         process.env.JWT_SECRET_KEY,
      )

      return res.json({ token, userData: user })
   } catch (e) {
      console.error(e)
      return res.status(500)
   }
})

router.post(`/register`, async (req, res) => {
   try {
      const data = req.body
      const user = await User.create(data)
      return res.json(user)

   } catch (e) {
      console.error(e)
      return res.status(500)
   }
})
router.get(`/`, authMiddleware, async (req, res) => {
   try {
      return res.json({ userName: req.user.userName })

   } catch (e) {
      console.error(e)
      return res.status(500)
   }
})

export { router as userRouter }