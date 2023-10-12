import { createServerClient } from '@/db'
import { rolesUpdateSchema } from '@/db/dbTypes.schemas'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient(cookies)
  const { id } = params

  const data = await supabase.from('roles').delete().eq('id', id)

  return NextResponse.json(data)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient(cookies)
  const { id } = params

  const data = rolesUpdateSchema.safeParse(await req.json())

  if (data?.success) {
    const updated = await supabase.from('roles').update(data?.data).eq('id', id)

    return NextResponse.json(updated)
  }

  return NextResponse.json(data)
}
