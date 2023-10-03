import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs'
import { NextRequest, NextResponse } from 'next/server'
import { Database } from './types'

export const createMiddleClient = (req: NextRequest, res: NextResponse) =>
  createMiddlewareClient<Database>(
    { req, res },
    {
      supabaseKey: process.env.SUPABASE_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
    }
  )
