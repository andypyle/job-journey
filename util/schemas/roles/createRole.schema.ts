import { z } from 'zod'

export const createRoleSchema = z
  .object({
    user_id: z
      .string()
      .uuid({ message: 'Invalid UUID for user_id.' })
      .optional(),
    company: z.string().min(1, {
      message: 'You need at least one character for the company name.',
    }),
    title: z.string().min(1, {
      message: 'You need at least one character in your job title.',
    }),
    startMonth: z.coerce.date(),
    endMonth: z.coerce.date().optional(),
    current: z.boolean().nullable(),
  })
  .required({
    company: true,
    title: true,
    startMonth: true,
  })
  .refine(
    ({ startMonth, endMonth, current }) =>
      (current && startMonth) || (startMonth && endMonth),
    {
      message:
        'You need to either check the current checkbox or set an end month, but not both.',
      path: ['endMonth'],
    }
  )
  .refine(
    ({ startMonth, endMonth }) =>
      startMonth && endMonth ? endMonth > startMonth : false,
    {
      message: 'End month must be after start month.',
      path: ['endMonth'],
    }
  )
