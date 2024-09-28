import { z } from 'zod'

export const postSchema = z.object({
  file: z
    .any()
    .optional()
    .refine((files) => files?.length > 0 && files[0] instanceof File, {
      message: 'Please upload a valid file.'
    }),
  text: z.string().min(6, 'min 6 characters').max(255, 'max 255 character')
})

export const registerSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'min 3 characters' })
    .max(16, { message: 'max 16 characters' }),
  lastName: z
    .string()
    .min(3, { message: 'min 3 characters' })
    .max(16, { message: 'max 16 characters' }),
  nick: z
    .string()
    .min(3, { message: 'min 3 characters' })
    .max(12, { message: 'max 12 characters' }),
  email: z.string().email(),
  password: z
    .string()
    .min(3, { message: 'min 3 characters' })
    .max(16, { message: 'max 16 characters' })
})

export const userUpdateSchema = z.object({
  name: z
    .string()
    .min(3, { message: 'min 3 characters' })
    .max(16, { message: 'max 16 characters' })
    .optional(),
  lastName: z
    .string()
    .min(3, { message: 'min 3 characters' })
    .max(16, { message: 'max 16 characters' })
    .optional(),
  nick: z
    .string()
    .min(3, { message: 'min 3 characters' })
    .max(12, { message: 'max 12 characters' })
    .optional(),
  email: z.string().email().optional(),
  password: z
    .string()
    .min(3, { message: 'min 3 characters' })
    .max(16, { message: 'max 16 characters' })
    .optional(),
  bio: z.string().max(255, { message: 'max 255 characters' }).optional()
})
