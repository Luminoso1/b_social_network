/* eslint-disable camelcase */
import User from '../models/user.js'
import Follow from '../models/follow.js'
import { getFullPathImage } from '../utils/index.js'

export const follow = async (req, res) => {
  const { id } = req.body
  const userToFollow = id
  const { user } = req.session

  try {
    if (!userToFollow) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Error, not content found' })
    }

    if (user.id === userToFollow) {
      return res
        .status(400)
        .json({ status: 'error', message: 'Error, cannot follow yourself' })
    }

    const followedUser = await User.findById(userToFollow).select(
      'name last_name'
    )

    if (!followedUser) {
      return res.status(404).send({
        status: 'error',
        message: 'Error, User not found'
      })
    }

    const existingFollow = await Follow.findOne({
      following_user: user.id,
      followed_user: userToFollow
    })

    if (existingFollow) {
      return res.status(400).send({
        status: 'error',
        message: 'You are already following this user'
      })
    }

    const follow = new Follow({
      following_user: user.id,
      followed_user: userToFollow
    })

    await follow.save()

    return res.status(200).json({
      status: 'success',
      currentAcount: user,
      followedUser
    })
  } catch (error) {
    return res
      .status(500)
      .json({ status: 'error', message: 'Error, follow user endpoint ' })
  }
}

export const unfollow = async (req, res) => {
  const followUserId = req.params.user_id
  const { user } = req.session

  if (!followUserId || user.id === followUserId) {
    return res
      .status(400)
      .json({ status: 'error', message: 'no params provided' })
  }

  try {
    const deleteFollowed = await Follow.findOneAndDelete({
      following_user: user.id,
      followed_user: followUserId
    })

    if (!deleteFollowed) {
      return res.status(404).send({
        status: 'error',
        message: 'Follow not found, cannot delete'
      })
    }
    return res.status(200).send({
      status: 'success',
      message: 'you are not longer following this user'
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error unfollow'
    })
  }
}

export const following = async (req, res) => {
  try {
    /*
      TODO:
        - Implement pagination
    */

    // let { page, limit } = req.query
    // page = page <= 0 || !page ? 1 : parseInt(page)
    // limit = limit <= 0 || !limit ? 5 : parseInt(limit)

    const { id } = req.params

    const following = await Follow.find({ following_user: id }).populate({
      path: 'followed_user',
      select: '_id name last_name image'
    })
    const followingList = following.map((following) => {
      const followerImg = following.followed_user.image
      const pathImage = getFullPathImage(req, followerImg)
      following.followed_user.image = pathImage
      return following.followed_user
    })

    return res.status(200).json({
      state: 'succes',
      data: followingList
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error getting following'
    })
  }
}

export const followers = async (req, res) => {
  try {
    /*
      TODO:
        - Implement pagination
    */

    // let { page, limit } = req.query
    // page = page <= 0 || !page ? 1 : parseInt(page)
    // limit = limit <= 0 || !limit ? 5 : parseInt(limit)

    const { id } = req.params

    const followers = await Follow.find({ followed_user: id }).populate({
      path: 'following_user',
      select: '_id name last_name image'
    })
    const followerList = followers.map((follower) => {
      const followerImg = follower.following_user.image
      const pathImage = getFullPathImage(req, followerImg)
      follower.following_user.image = pathImage
      return follower.following_user
    })

    return res.status(200).json({
      state: 'succes',
      data: followerList
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error getting followers'
    })
  }
}

export const followingByNick = async (req, res) => {
  try {
    /*
      TODO:
        - Implement pagination
    */

    // let { page, limit } = req.query
    // page = page <= 0 || !page ? 1 : parseInt(page)
    // limit = limit <= 0 || !limit ? 5 : parseInt(limit)

    const { nick } = req.params

    const user = await User.findOne({ nick }).select('_id name')

    const following = await Follow.find({ following_user: user._id }).populate({
      path: 'followed_user',
      select: '_id name last_name image'
    })
    const followingList = following.map((following) => {
      const followerImg = following.followed_user.image
      const pathImage = getFullPathImage(req, followerImg)
      following.followed_user.image = pathImage
      return following.followed_user
    })

    return res.status(200).json({
      state: 'succes',
      data: followingList
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error getting following'
    })
  }
}

export const followersByNick = async (req, res) => {
  try {
    /*
      TODO:
        - Implement pagination
    */

    // let { page, limit } = req.query
    // page = page <= 0 || !page ? 1 : parseInt(page)
    // limit = limit <= 0 || !limit ? 5 : parseInt(limit)

    const { nick } = req.params

    const user = await User.findOne({ nick }).select('_id name')

    if (!user) {
      return res
        .status(400)
        .json({ status: 'error', message: 'User not found' })
    }

    const followers = await Follow.find({ followed_user: user._id }).populate({
      path: 'following_user',
      select: '_id name last_name image'
    })

    const followerList = followers.map((follower) => {
      const followerImg = follower.following_user.image
      const pathImage = getFullPathImage(req, followerImg)
      follower.following_user.image = pathImage
      return follower.following_user
    })

    return res.status(200).json({
      state: 'succes',
      data: followerList
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error getting followers'
    })
  }
}
