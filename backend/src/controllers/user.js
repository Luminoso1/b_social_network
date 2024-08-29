import User from '../models/user.js'
import { comparePassword, encryptPassword, generateToken } from '../utils/index.js'

export const register = async (req, res) => {
  try {
    const { name, lastName, nick, email, password } = req.body
    // validate if user exists ?
    const user = await User.findOne({
      $or: [
        { email },
        { nick }
      ]
    })

    if (user) {
      return res.status(400).send({ message: 'user already exists' })
    }

    if (password.length === 0) {
      return res.status(400).send({
        status: 'error',
        message: 'password is required'
      })
    }
    // hash password with bcrypt
    const encryptedPassword = await encryptPassword(password)
    // response

    const userSave = new User({
      name,
      last_name: lastName,
      nick,
      email,
      password: encryptedPassword
    })

    await userSave.save()

    return res.status(200).json({
      status: 'success',
      message: 'Registro de usuario exitoso',
      userSave
    })
  } catch (error) {
    console.log('User Register Error: ', error)
    return res.status(500).send({
      status: 'Error',
      message: 'Error registro usuario'
    })
  }
}

export const login = async (req, res) => {
  try {
    const { username, password } = req.body

    // validate  if user exists
    const user = await User.findOne({
      $or: [{ email: username }, { nick: username }]
    })

    if (!user) {
      return res.status(400).send({ status: 'error', message: 'User not found' })
    }

    // validate if password is correct
    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return res.status(401).send({ status: 'error', message: 'password invalid' })
    }

    // generate token with jose

    const payload = {
      id: user._id,
      name: user.name,
      nick: user.nick,
      role: user.role
    }

    const token = await generateToken(payload)

    // set session cookie
    res.cookie('session', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict'
    })

    return res.status(200).json({
      status: 'succes',
      message: 'login succesfully',
      token,
      user: {
        id: user._id,
        name: user.name,
        last_name: user.last_name,
        email: user.email,
        nick: user.nick,
        image: user.image,
        created_at: user.created_at
      }
    })
  } catch (error) {
    console.log('User Login Error: ', error)
    return res.status(500).send({
      status: 'Error',
      message: 'Error login usuario'
    })
  }
}

export const logout = async (req, res) => {
  try {
    res.clearCookie('session').json({
      status: 'success',
      message: 'logout succesfull'
    })
  } catch (error) {
    console.log('Error cleaning session')
    res.status(500).json({ status: 'error', message: 'Error cleaning session' })
  }
}

export const profile = async (req, res) => {
  // get id parram
  console.log(req.session)
  const { id } = req.params
  try {
    // find the user
    const profile = await User.findById(id).select('-password -role -email -__v')

    if (!profile) {
      return res.status(404).send({
        status: 'error',
        message: 'user not found'
      })
    }

    return res.status(200).json({
      status: 'succes',
      profile
    })
  } catch (error) {
    console.log('Error getting profile:', error)
    return res.status(500).send({
      status: 'error',
      message: 'Error getting profile'
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
      return res.status(400).json({ status: 'error', message: 'No data provided for update' })
    }

    // get the user by the id in the session cookie
    const dbUser = await User.findById(user.id)

    if (!dbUser) {
      return res.status(404).json({ status: 'error', message: 'User not found' })
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
      return res.status(500).send({
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
    console.log('Error al subir archivos', error)
    return res.status(500).send({
      status: 'error',
      message: 'Error al subir archivos'
    })
  }
}
