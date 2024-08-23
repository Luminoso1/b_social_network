import { z } from 'zod'

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

export const loginSchema = z.object({
  username: z
    .string(),
  password: z
    .string()
    // .min(3, { message: 'min 3 characters' })
    // .max(16, { message: 'max 16 characters' })
})
