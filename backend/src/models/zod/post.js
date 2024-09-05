import { z } from 'zod'

export const postSchema = z.object({
  text: z.string().min(6, { message: 'min 6 characters' }).max(250, { message: 'max 250 characters' }),
  file: z.string().optional()
})
