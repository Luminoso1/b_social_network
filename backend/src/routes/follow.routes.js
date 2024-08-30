import { Router } from 'express'
import { validateAuthCookie } from '../middlewares/auth.js'
import { follow, followers, following, unfollow } from '../controllers/follow.js'

const router = Router()

router.post('/follow', validateAuthCookie, follow)

router.delete('/unfollow/:user_id', validateAuthCookie, unfollow)

router.get('/following', validateAuthCookie, following)

router.get('/followers', validateAuthCookie, followers)

export default router

// 66cfd4c9d5a6a95d6cdbe0f3
