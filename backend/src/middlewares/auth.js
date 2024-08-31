import { validateToken } from '../utils/index.js'

export const validateAuthCookie = async (req, res, next) => {
  // get token  👉 ensure you have cookie-parser
  const token = req.cookies.session

  // console.log(req.cookies)

  if (!token) {
    return res.status(401).send({ status: 'error', message: 'not authorized' })
  }

  req.session = { user: null }

  try {
    // ensure token is not expired !💀 only get payload
    const decodedToken = await validateToken(token)
    req.session.user = decodedToken.payload
  } catch (error) {
    console.log('ERROR: validate auth cookie ', error.message)
    return res.status(403).send({ status: 'error', message: 'not authorized' })
  }

  next()
}
