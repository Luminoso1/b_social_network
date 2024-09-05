import { jwtVerify, SignJWT } from 'jose'
import bcrypt from 'bcrypt'
import { SECRET_KEY } from '../config.js'

export const generateToken = async (payload) => {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: 'HS256', typ: 'JWT' })
    .setIssuedAt()
    .setExpirationTime('1h')
    .sign(new TextEncoder().encode(SECRET_KEY))

  return token
}

export const validateToken = async (token) => {
  return await jwtVerify(token, new TextEncoder().encode(SECRET_KEY))
}

export const encryptPassword = async (password) => {
  const salt = await bcrypt.genSaltSync(10)
  const encryptedPassword = await bcrypt.hashSync(password, salt)
  return encryptedPassword
}

export const comparePassword = async (password, userPassword) => {
  return await bcrypt.compareSync(password, userPassword)
}

export const getFullPathImage = (req, relative) => {
  const path = `${req.protocol}://${req.get('host')}/${relative}`
  return path
}
