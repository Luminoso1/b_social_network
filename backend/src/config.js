import dotenv from 'dotenv'
dotenv.config()

export const PORT = process.env.API_PORT ?? 3000
export const MONGO_URL = process.env.MONGODB_URL
export const SECRET_KEY = process.env.SECRET_KEY
