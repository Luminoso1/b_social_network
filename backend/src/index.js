import { PORT } from '../config.js'
import connect from './db/connection.js'
import express from 'express'
import cors from 'cors'

const app = express()

app.use(express.json())
app.use(cors())

connect()

app.listen(PORT, () => {
  console.log('App Up')
})
