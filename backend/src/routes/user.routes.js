import { Router } from 'express'
<<<<<<< HEAD
import { profile, userListWithoutDep, updateUser, uploadImage, avatar, getUser } from '../controllers/user.js'
=======
import { register, login, profile, userListWithoutDep, updateUser, logout, uploadImage, avatar, getUser } from '../controllers/user.js'
>>>>>>> 3f18b8c4a8aec87d7c5017c39bcc9a96db323fc6
import { validate } from '../middlewares/validate-schema.js'
import { userUpdateSchema } from '../models/zod/user.js'
import { fileSchema } from '../models/zod/file.js'
import { validateAuthCookie } from '../middlewares/auth.js'
import { defineStorage } from '../utils/multer-upload.js'

const router = Router()

const upload = defineStorage('avatars')

<<<<<<< HEAD
router.get('/profile', validateAuthCookie, profile)
=======
router.post('/register', validate({ body: userSchema }), register)

router.post('/login', validate({ body: loginSchema }), login)

router.get('/logout', logout)

router.get('/profile', validateAuthCookie, profile)

router.get('/profile/:id', validateAuthCookie, getUser)
>>>>>>> 3f18b8c4a8aec87d7c5017c39bcc9a96db323fc6

router.get('/users', validateAuthCookie, userListWithoutDep)

router.get('/users/:id', validateAuthCookie, getUser)

router.put('/user/update', validateAuthCookie, validate({ body: userUpdateSchema }), updateUser)

router.post('/user/upload', validateAuthCookie, upload.single('file'), validate({ file: fileSchema }), uploadImage)

router.get('/user/:file', validateAuthCookie, avatar)

export default router
