import { z } from 'zod'

export const registerSchema = z.object({
  firstName: z
    .string()
    .min(1, { message: 'First name needs to be at least one character.' }),
  lastName: z
    .string()
    .min(1, { message: 'Last name needs to be at least one character.' }),
  email: z.string().email({ message: 'Invalid email.' }),
  password: z
    .string()
    .min(5, { message: 'Password must be at least 5 characters.' }),
})
