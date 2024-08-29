import { z } from 'zod'

export const loginSchema = z.object({
  username: z
    .string(),
  password: z
    .string()
})

export const userSchema = z.object({
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
  email: z
    .string()
    .email(),
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
  email: z
    .string()
    .email()
    .optional(),
  password: z
    .string()
    .min(3, { message: 'min 3 characters' })
    .max(16, { message: 'max 16 characters' })
    .optional(),
  bio: z
    .string()
    .max(255, { message: 'max 255 characters' })
    .optional()
})

// .refine((data) => Object.keys(data).length === 0, { message: 'no data provided' })
