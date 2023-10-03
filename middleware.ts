import { NextResponse } from 'next/server'
import { createMiddleClient } from './db'

import type { NextRequest } from 'next/server'

export async function middleware(req: NextRequest) {
  const res = NextResponse.next()
  const supabase = createMiddleClient(req, res)

  await supabase.auth.getSession()

  return res
}

export const config = {
  matcher: ['/((?!login|register|_next/static|_next/image|favicon.ico).*)'],
}
