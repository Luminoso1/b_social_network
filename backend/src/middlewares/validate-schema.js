import { ZodError } from 'zod'
import fs from 'fs'

export const validate = (schemas) => async (req, res, next) => {
  try {
    for (const [key, schema] of Object.entries(schemas)) {
      req[key] = schema.parse(req[key])
      console.log(req[key])
    }
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      const details = error.issues.map((err) => ({
        label: err.path[0],
        message: err.message
      }))
      const isFileError = details.some(({ label }) => ['size', 'mimetype'].includes(label))
      if (isFileError) {
        const filePath = req.file.path
        fs.unlinkSync(filePath)
      }

      return res.status(400).json({ error: 'Invalid data', details })
    }

    return res.status(400).json({ error: 'Invalid data', details: error.message })
  }
}
