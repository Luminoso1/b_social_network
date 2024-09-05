import { Router } from 'express'
import { register, login, logout } from '../controllers/auth.js'
import { validate } from '../middlewares/validate-schema.js'
import { loginSchema, userSchema } from '../models/zod/user.js'

const router = Router()

router.post('/register', validate({ body: userSchema }), register)

router.post('/login', validate({ body: loginSchema }), login)

router.get('/logout', logout)

export default router
