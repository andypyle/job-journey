import { createHandlerClient } from '@/db'
import { rolesInsertSchema } from '@/db/dbTypes.schemas'
import { RoleInsert } from '@/db/types'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function POST(req: NextRequest) {
  const supabase = createHandlerClient(cookies)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const user_id = user?.id
  const data = rolesInsertSchema.parse({
    user_id,
    ...(await req.json()),
  })

  console.log({ data })

  if (data) {
    try {
      const inserted = await supabase.from('roles').insert(data as RoleInsert)

      return NextResponse.json(inserted)
    } catch (e) {
      console.warn({ e })
      return NextResponse.json(e)
    }
  }
  return NextResponse.json(data)
}

export async function GET() {
  // GET request
}
