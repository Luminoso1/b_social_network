import cors from 'cors'
import express from 'express'
import cookieParser from 'cookie-parser'
import connect from './db/connection.js'
import { PORT } from './config.js'
import userRoute from './routes/user.routes.js'

const app = express()

app.use(express.json())
app.use(cookieParser())

app.use(cors({
  origin: 'http://localhost:5173', // Replace with your React app's URL
  credentials: true
}))

connect()

app.listen(PORT, () => {
  console.log('App Up')
})

app.use('/', userRoute)
