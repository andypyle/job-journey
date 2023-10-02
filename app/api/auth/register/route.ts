import { createHandlerClient } from '@/db'
import { registerSchema } from '@/util/schemas'
import { cookies } from 'next/headers'

export async function POST(req: Request) {
  const supabase = createHandlerClient(cookies)
  const body = registerSchema.parse(await req.json())

  if (body) {
    const signupData = {
      email: body.email,
      password: body.password,
      options: {
        data: {
          firstName: body.firstName,
          lastName: body.lastName,
        },
      },
    }

    const { data, error } = await supabase.auth.signUp(signupData)

    if (error) {
      return Response.json(error)
    }

    return Response.json(data)
  }
}
