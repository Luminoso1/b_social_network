import { jwtVerify } from 'jose'
import { SECRET_KEY } from '../config.js'

export const validateAuthCookie = async (req, res, next) => {
  // get token  👉 ensure you have cookie-parser
  const token = req.cookies.session

  console.log(token) // get undefined

  if (!token) {
    return res.status(403).send({ status: 'error', message: 'not authorized' })
  }

  req.session = { user: null }

  try {
    // ensure token is not expired !💀 only get payload
    const decodedToken = await jwtVerify(token, new TextEncoder().encode(SECRET_KEY))
    req.session.user = decodedToken.payload
  } catch (error) {
    console.log('ERROR: validate auth cookie ', error.message)
    return res.status(403).send({ status: 'error', message: 'not authorized' })
  }

  next()
}
