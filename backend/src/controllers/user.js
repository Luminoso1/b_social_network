import User from '../models/user.js'
import bcrypt from 'bcrypt'
import { SignJWT } from 'jose'
import { SECRET_KEY } from '../config.js'

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
    const salt = await bcrypt.genSaltSync(10)
    const hash = await bcrypt.hashSync(password, salt)
    // response

    const userSave = new User({
      name,
      last_name: lastName,
      nick,
      email,
      password: hash
    })

    console.log(userSave)

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
    const isValidPassword = await bcrypt.compareSync(password, user.password)

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

    const token = await new SignJWT(payload)
      .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
      .setIssuedAt()
      .setExpirationTime('1h')
      .sign(new TextEncoder().encode(SECRET_KEY))

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
  // remove session cookie
  // res.cookies.set('session', '', {
  //   httpOnly: true,
  //   secure: process.env.NODE_ENV === 'production',
  //   sameSite: 'strict'
  // })

  res.clearCookie('session').json({
    status: 'success',
    message: 'logout succesfull'
  })
}

export const profile = async (req, res) => {
  const { user } = req.session

  if (!user) {
    return res.status(403).send({ status: 'error', message: 'Access not authorized' })
  }

  console.log(user)

  return res.status(200).json({ status: 'sucess', message: 'authorized', user })
}
