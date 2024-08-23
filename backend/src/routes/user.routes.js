import { Router } from 'express'
import { register, login, profile } from '../controllers/user.js'
import { validate } from '../middlewares/validate-schema.js'
import { userSchema, loginSchema } from '../models/zod/user.js'
import { validateAuthCookie } from '../middlewares/auth.js'

const router = Router()

router.post('/register', validate({ body: userSchema }), register)
router.post('/login', validate({ body: loginSchema }), login)
router.get('/profile', validateAuthCookie, profile)

export default router
