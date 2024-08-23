import { ZodError } from 'zod'

export const validate = (schemas) => async (req, res, next) => {
  for (const [key, schema] of Object.entries(schemas)) {
    try {
      const result = schema.parse(req[key])
      req[key] = result
      next()
    } catch (error) {
      if (error instanceof ZodError) {
        const details = error.issues.map((err) => {
          return { label: err.path[0], message: err.message }
        })

        return res.status(400).json({ error: 'Invalid data', details })
      }
      return res.status(400).json({ error: 'Invalid data', details: error })
    }
  }
}
