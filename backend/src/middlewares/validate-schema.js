import { ZodError } from 'zod'
import fs from 'fs'

export const validate = (schemas) => async (req, res, next) => {
  try {
    for (const [key, schema] of Object.entries(schemas)) {
      console.log(req[key])
      console.log(req.file)
      if (key === 'file' && req.file) {
        req.file = schema.parse(req.file)
      } else {
        req[key] = schema.parse(req[key])
      }
    }
    next()
  } catch (error) {
    if (error instanceof ZodError) {
      const errorMessages = error.issues.map((err) => err.message).join('\n')
      const details = error.issues.map((err) => ({
        label: err.path[0],
        message: err.message
      }))

      const isFileError = details.some(({ label }) =>
        ['size', 'mimetype'].includes(label)
      )

      if (isFileError) {
        const filePath = req.file.path
        fs.unlinkSync(filePath)
      }

      console.log(error.message)

      return res
        .status(400)
        .json({ error: 'Invalid data', details, message: errorMessages })
    }

    return res
      .status(400)
      .json({ error: 'Invalid data', details: error.message })
  }
}
