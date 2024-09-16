import fs from 'fs'
import path from 'path'
import Post from '../models/post.js'
import User from '../models/user.js'
import { getFullPathImage } from '../utils/index.js'

export const save = async (req, res) => {
  try {
    const { user } = req.session
    const { file } = req
    const data = req.body

    const post = new Post(data)

    if (file) post.file = `uploads/posts/${file.filename}`
    post.user_id = user.id

    const postSaved = await post.save()

    if (!postSaved) {
      return res.status(500).json({
        status: 'error',
        message: 'Failed to create the post'
      })
    }

    const userPost = await User.findById(user.id).select(
      '_id name last_name image'
    )
    const { user_id, ...rest } = postSaved._doc
    const newPost = {
      ...rest,
      user: userPost
    }

    newPost.file = getFullPathImage(req, newPost.file)
    newPost.user.image = getFullPathImage(req, newPost.user.image)

    return res.status(201).json({
      status: 'succes',
      message: 'Publicacion successfully created',
      post: newPost
    })
  } catch (error) {
    return res.status(500).json({
      status: 'error',
      message: 'Error saving the post'
    })
  }
}

export const getAllPost = async (req, res) => {
  try {
    let { page, limit } = req.query
    page = page <= 0 || !page ? 1 : parseInt(page)
    limit = limit <= 0 || !limit ? 5 : parseInt(limit)

    const postsDb = await Post.find()
      .populate('user_id', '_id name last_name image nick')
      .sort({ created_at: -1 }) // sort by most recent
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Post.countDocuments()

    const docs = postsDb.length

    if (docs === 0) {
      return res.status(200).json({
        state: 'succes',
        message: 'No posts',
        totalPages: Math.ceil(count / limit),
        currentPage: page
      })
    }

    const posts = postsDb.map((post) => {
      const { user_id: userId, ...rest } = post._doc
      const newPost = {
        ...rest,
        user: userId
      }
      if (newPost.file) {
        newPost.file = getFullPathImage(req, newPost.file)
      }
      if (!newPost.user.image.startsWith('http')) {
        newPost.user.image = getFullPathImage(req, newPost.user.image)
      }

      return newPost
    })

    return res.status(200).json({
      status: 'success',
      posts,
      totalPages: Math.ceil(count / limit),
      totalDocs: count,
      docs,
      currentPage: page
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error getting the post'
    })
  }
}

export const getPost = async (req, res) => {
  try {
    const postId = req.params.id
    const post = await Post.findById(postId).populate(
      'user_id',
      'name last_name'
    )

    if (!post) {
      return res.status(500).json({
        status: 'error',
        message: 'post not found'
      })
    }
    return res.status(200).json({
      status: 'success',
      post
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error getting the post'
    })
  }
}

export const deletePost = async (req, res) => {
  try {
    const { user } = req.session
    const postId = req.params.id

    // users can only delete thirs posts
    const post = await Post.findOneAndDelete({
      user_id: user.id,
      _id: postId
    }).populate('user_id', 'name last_name')

    if (!post) {
      return res.status(500).json({
        status: 'error',
        message: 'post not found'
      })
    }

    return res.status(200).send({
      status: 'success',
      message: 'post successfully deleted',
      post
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error delete the post'
    })
  }
}

export const userPosts = async (req, res) => {
  try {
    /*
      TODO:
        - Implement pagination
    */

    const userId = req.params.id
    const posts = await Post.find({ user_id: userId })

    return res.status(200).send({
      status: 'success',
      posts
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error getting the post'
    })
  }
}

export const userPostsByNick = async (req, res) => {
  try {
    const { nick } = req.params
    let { page, limit } = req.query
    page = page <= 0 || !page ? 1 : parseInt(page)
    limit = limit <= 0 || !limit ? 5 : parseInt(limit)

    const user = await User.findOne({ nick }).select('_id name').exec()

    const postsDb = await Post.find({ user_id: user.id })
      .populate('user_id', '_id name last_name image nick')
      .sort({ created_at: -1 }) // sort by most recent
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    const count = await Post.countDocuments({ user_id: user.id })

    const docs = postsDb.length

    if (docs === 0) {
      return res.status(200).json({
        state: 'succes',
        message: 'No posts',
        totalPages: Math.ceil(count / limit),
        currentPage: page
      })
    }

    const posts = postsDb.map((post) => {
      const { user_id: userId, ...rest } = post._doc
      const newPost = {
        ...rest,
        user: userId
      }
      if (newPost.file) {
        newPost.file = getFullPathImage(req, newPost.file)
      }
      if (!newPost.user.image.startsWith('http')) {
        newPost.user.image = getFullPathImage(req, newPost.user.image)
      }

      return newPost
    })

    return res.status(200).json({
      status: 'success',
      posts,
      totalPages: Math.ceil(count / limit),
      totalDocs: count,
      docs,
      currentPage: page
    })
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: 'Error getting the post'
    })
  }
}

export const showMedia = async (req, res) => {
  try {
    const file = req.params.file

    const filePath = `./uploads/posts/${file}`

    fs.stat(filePath, (error, exists) => {
      if (error) {
        return res.status(404).send({
          status: 'error',
          message: 'Error finding the image '
        })
      }
      return res.sendFile(path.resolve(filePath))
    })
  } catch (error) {
    return res.status(500).send({
      status: 'error',
      message: 'Error, file publication'
    })
  }
}
