import { createHandlerClient } from '@/db'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export const POST = async (req: NextRequest) => {
  const supabase = createHandlerClient(cookies)

  await supabase.auth.signOut()

  return NextResponse.json({ ok: true })
}
