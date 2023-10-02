import { createHandlerClient } from '@/db'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const GET = async (req: NextRequest) => {
  const supabase = createHandlerClient(cookies)

  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()

  if (error) return NextResponse.json(error)

  return NextResponse.json(user)
}
