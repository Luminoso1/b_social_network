import mongoose from 'mongoose'
import { MONGO_URL } from '../config.js'

async function connect () {
  try {
    await mongoose.connect(MONGO_URL)
    console.log('Connectado a la bd')
  } catch (error) {
    console.log('error: --- ', error)
    throw new Error('No se pudo conectar')
  }
}

export default connect
