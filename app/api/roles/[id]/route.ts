import { createServerClient } from '@/db'
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
  const { body } = req

  console.log({ body })
  return NextResponse.json({ ok: true })
}
