import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import connect from './src/db/connection.js'
import { PORT } from './src/config.js'
import userRoute from './src/routes/user.routes.js'
import followRoute from './src/routes/follow.routes.js'
import postRoute from './src/routes/post.routes.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(
  cors({
    origin: 'http://localhost:5173', // Replace with your client app's URL
    credentials: true
  })
)

connect()

app.listen(PORT, () => {
  console.log('App Up')
})

app.use('/', userRoute)
app.use('/', followRoute)
app.use('/', postRoute)
