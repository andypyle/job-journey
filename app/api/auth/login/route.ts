import { createHandlerClient } from '@/db'
import { loginSchema } from '@/util/schemas'
import { SignInWithPasswordCredentials } from '@supabase/supabase-js'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  const supabase = createHandlerClient(cookies)

  const body = loginSchema.parse(await req.json())

  if (body) {
    const { data, error } = await supabase.auth.signInWithPassword(
      body as SignInWithPasswordCredentials
    )
    if (error) {
      return NextResponse.json(error)
    }
    return NextResponse.json(data)
  }
  return NextResponse.json(body)
}
