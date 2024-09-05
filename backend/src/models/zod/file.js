import { z } from 'zod'
const MAX_FILE_SIZE = 100000
const ACCEPTED_IMAGE_TYPES = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp']

export const fileSchema = z.object({
  size: z.number().max(MAX_FILE_SIZE, 'Max file size is 1MB'),
  mimetype: z.string().refine((type) => ACCEPTED_IMAGE_TYPES.includes(type), {
    message: '.jpg, .jpeg, .png and .webp files are accepted.'
  })
}).passthrough()

// passthrough() to allow extra properties without validation

export const fileOptionalSchema = fileSchema.optional()
