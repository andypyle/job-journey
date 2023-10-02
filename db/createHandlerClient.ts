import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { ReadonlyRequestCookies } from 'next/dist/server/web/spec-extension/adapters/request-cookies'

export const createHandlerClient = (cookies: () => ReadonlyRequestCookies) =>
  createRouteHandlerClient(
    { cookies },
    {
      supabaseKey: process.env.SUPABASE_KEY,
      supabaseUrl: process.env.SUPABASE_URL,
    }
  )
