import { Router } from 'express'
import { register, login, profile, userListWithoutDep, updateUser, logout, uploadImage } from '../controllers/user.js'
import { validate } from '../middlewares/validate-schema.js'
import { userSchema, loginSchema, userUpdateSchema } from '../models/zod/user.js'
import { fileSchema } from '../models/zod/file.js'
import { validateAuthCookie } from '../middlewares/auth.js'
import { upload } from '../utils/multer-upload.js'

const router = Router()

router.post('/register', validate({ body: userSchema }), register)

router.post('/login', validate({ body: loginSchema }), login)

router.get('/logout', logout)

router.get('/profile/:id', validateAuthCookie, profile)

router.get('/users', validateAuthCookie, userListWithoutDep)

router.put('/user/update', validateAuthCookie, validate({ body: userUpdateSchema }), updateUser)

router.post('/user/upload', validateAuthCookie, upload.single('file'), validate({ file: fileSchema }), uploadImage)

export default router
