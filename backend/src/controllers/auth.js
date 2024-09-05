import User from '../models/user.js'
import { comparePassword, encryptPassword, generateToken } from '../utils/index.js'

export const register = async (req, res) => {
  try {
    const { name, lastName, nick, email, password } = req.body
    // validate if user exists ?
    const user = await User.findOne({
      $or: [{ email }, { nick }]
    })

    if (user) {
      return res
        .status(400)
        .json({ status: 'error', message: 'user already exists' })
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
    return res.status(500).json({
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
      return res
        .status(400)
        .json({ status: 'error', message: 'User not found' })
    }

    // validate if password is correct
    const isValidPassword = await comparePassword(password, user.password)

    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: 'error', message: 'password invalid' })
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
    return res.status(500).json({
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
