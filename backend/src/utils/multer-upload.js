import multer from 'multer'
import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const PATH = '../../uploads'

export const defineStorage = (entity) => {
  const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      const dir = path.join(__dirname, PATH, entity)

      if (!fs.existsSync(dir)) {
        fs.mkdirSync(dir, { recursive: true })
      }

      cb(null, dir)
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  return multer({ storage })
}
