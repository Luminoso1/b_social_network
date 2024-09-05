import { Router } from 'express'
import { validateAuthCookie } from '../middlewares/auth.js'
import { validate } from '../middlewares/validate-schema.js'
import { postSchema } from '../models/zod/post.js'
import { fileOptionalSchema } from '../models/zod/file.js'
import {
  deletePost,
  getPost,
  save,
  showMedia,
  userPosts
} from '../controllers/post.js'
import { defineStorage } from '../utils/multer-upload.js'

const router = Router()

const upload = defineStorage('posts')

router.post(
  '/post',
  validateAuthCookie,
  upload.single('file'),
  validate({ body: postSchema, file: fileOptionalSchema }),
  save
)

router.get('/post/:id', validateAuthCookie, getPost)

router.delete('/post/:id', validateAuthCookie, deletePost)

router.get('/user/:id/posts', validateAuthCookie, userPosts)

router.get('/post/media/:file', validateAuthCookie, showMedia)

export default router
