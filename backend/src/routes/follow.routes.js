import { Router } from 'express'
import { validateAuthCookie } from '../middlewares/auth.js'
import {
  follow,
  followers,
  followersByNick,
  following,
  followingByNick,
  unfollow
} from '../controllers/follow.js'

const router = Router()

router.post('/follow', validateAuthCookie, follow)

router.delete('/unfollow/:user_id', validateAuthCookie, unfollow)

router.get('/users/:id/following', validateAuthCookie, following)

router.get('/users/:id/followers', validateAuthCookie, followers)

router.get('/user/:nick/followers', validateAuthCookie, followersByNick)

router.get('/user/:nick/following', validateAuthCookie, followingByNick)

export default router

// 66cfd4c9d5a6a95d6cdbe0f3
