import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  return NextResponse.json({ message: 'Registration disabled.' })
  // const supabase = createHandlerClient(cookies)
  // const body = registerSchema.parse(await req.json())

  // if (body) {
  //   const signupData = {
  //     email: body.email,
  //     password: body.password,
  //     options: {
  //       data: {
  //         firstName: body.firstName,
  //         lastName: body.lastName,
  //       },
  //     },
  //   }

  //   const { data, error } = await supabase.auth.signUp(signupData)

  //   if (error) {
  //     return Response.json(error)
  //   }

  //   return Response.json(data)
  // }
}
