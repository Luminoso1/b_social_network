import { Router } from 'express'
import { profile, userListWithoutDep, updateUser, uploadImage, avatar, getUser, getUserByNick } from '../controllers/user.js'
import { validate } from '../middlewares/validate-schema.js'
import { userUpdateSchema } from '../models/zod/user.js'
import { fileSchema } from '../models/zod/file.js'
import { validateAuthCookie } from '../middlewares/auth.js'
import { defineStorage } from '../utils/multer-upload.js'

const router = Router()

const upload = defineStorage('avatars')

router.get('/profile', validateAuthCookie, profile)

router.get('/users/:id', validateAuthCookie, getUser)

router.get('/user/:nick', validateAuthCookie, getUserByNick)

router.get('/users', validateAuthCookie, userListWithoutDep)

router.get('/users/:id', validateAuthCookie, getUser)

router.put('/user/update', validateAuthCookie, validate({ body: userUpdateSchema }), updateUser)

router.post('/user/upload', validateAuthCookie, upload.single('file'), validate({ file: fileSchema }), uploadImage)

router.get('/user/:file', validateAuthCookie, avatar)

export default router
