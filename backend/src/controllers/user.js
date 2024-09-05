import fs from 'fs'
import path from 'path'
import User from '../models/user.js'
import { encryptPassword } from '../utils/index.js'
import { followThisUser, getFollowCount } from '../services/follow.js'

export const profile = async (req, res) => {
  // get id parram
  const { user } = req.session
  console.log(user)
  try {
    // find the user
    const profile = await User.findById(user.id).select('-password  -__v')

    if (!profile) {
      return res.status(404).json({
        status: 'error',
        message: 'user not found'
      })
    }
    const count = await getFollowCount(user.id)

    return res.status(200).json({
      status: 'succes',
      profile,
      count
    })
  } catch (error) {
    console.log('Error getting profile:', error)

    return res.status(500).json({
      status: 'error',
      message: 'Error getting profile'
    })
  }
}

export const getUser = async (req, res) => {
  try {
    const { id } = req.params
    const { user } = req.session

    const userDb = await User.findById(id).select(
      'name last_name nick image bio'
    )

    if (!userDb) {
      return res.status(400).json({ message: 'User not found' })
    }

    if (user.id !== id) {
      const followInfo = await followThisUser(id, user.id)
      const count = await getFollowCount(id)

      return res.status(200).json({
        status: 'succes',
        profile: userDb,
        followInfo,
        count
      })
    }

    return res.status(200).json({ status: 'succes', user: userDb })
  } catch (error) {
    console.log(error)
    return res.status(500).json({
      status: 'error',
      message: 'Error getting user'
    })
  }
}

export const userListWithoutDep = async (req, res) => {
  try {
    // get and validate queries
    let { page, limit } = req.query
    page = page <= 0 || !page ? 1 : parseInt(page)
    limit = limit <= 0 || !limit ? 5 : parseInt(limit)

    // find users with limit and skip
    const users = await User.find()
      .select('-password -role -email -__v')
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec()

    // get total documents in user collection
    const count = await User.countDocuments()

    const docs = users.length

    if (docs === 0) {
      return res.status(200).json({
        state: 'succes',
        message: 'No users',
        totalPages: Math.ceil(count / limit),
        currentPage: page
      })
    }

    return res.status(200).json({
      state: 'succes',
      users,
      totalPages: Math.ceil(count / limit),
      totalDocs: count,
      docs,
      currentPage: page
    })
  } catch (error) {
    console.error('Error fetching user list:', error)
    return res.status(500).json({
      state: 'error',
      message: 'An error occurred while fetching the user list'
    })
  }
}

/*
   TODO:
      - Implement user list endpoint with mongoose-paginate-v2
*/

export const updateUser = async (req, res) => {
  try {
    const { user } = req.session
    const data = req.body

    // make sure data is not emptyx
    if (Object.keys(data).length === 0) {
      return res
        .status(400)
        .json({ status: 'error', message: 'No data provided for update' })
    }

    // get the user by the id in the session cookie
    const dbUser = await User.findById(user.id)

    if (!dbUser) {
      return res
        .status(404)
        .json({ status: 'error', message: 'User not found' })
    }

    if (data.password) {
      const encryptedPassword = await encryptPassword(data.password)
      data.password = encryptedPassword
    }

    console.log('data to update', data)

    // update the data

    Object.keys(data).forEach((key) => {
      dbUser[key] = data[key]
    })

    // TODO: improve the update method, valdiate data and user has change data?

    await dbUser.save()

    return res.status(200).json({
      status: 'succes',
      message: 'Successful update',
      data
    })
  } catch (error) {
    console.error('Error updating user:', error)
    return res.status(500).json({
      state: 'error',
      message: 'An error occurred while updating user'
    })
  }
}

/*
  TODO:
    - remove file if it does not met the validations
*/

export const uploadImage = async (req, res) => {
  try {
    // get file and user
    const { file } = req
    const { user } = req.session

    // get user and update image
    const userImageUpdate = await User.findOneAndUpdate(
      { _id: user.id },
      { image: req.file.filename },
      { new: true }
    ).select('-password -role -created_at -__v')

    if (!userImageUpdate) {
      return res.status(500).json({
        status: 'error',
        message: 'Eror updating image'
      })
    }

    return res.status(200).json({
      status: 'success',
      user: userImageUpdate,
      file
    })
  } catch (error) {
    console.log('Error file uploading', error.message)
    return res.status(500).json({
      status: 'error',
      message: 'Error file uploading',
      error: error.message
    })
  }
}

export const avatar = (req, res) => {
  try {
    const file = req.params.file
    const filePath = './uploads/avatars/' + file

    fs.stat(filePath, (error, exists) => {
      if (error) {
        return res.status(404).json({
          status: 'error',
          message: 'Error avatar',
          error
        })
      }
    })

    return res.sendFile(path.resolve(filePath))
  } catch (error) {
    console.log('Error: ', error)
    res.status(500).json({ status: 'error', message: 'Error avatar' })
  }
}
