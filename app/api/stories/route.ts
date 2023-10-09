import { createHandlerClient } from '@/db'
import { storiesInsertSchema } from '@/db/dbTypes.schemas'
import { StoryInsert } from '@/db/types'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { getAllStories } from './_actions/getAllStories'

export async function POST(req: NextRequest) {
  const supabase = createHandlerClient(cookies)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const user_id = user?.id
  const body = await req.json()
  const role_id = body?.role_id.value

  const data = storiesInsertSchema.parse({
    user_id,
    role_id,
    ...body,
  })

  if (data) {
    try {
      const inserted = await supabase
        .from('stories')
        .insert(data as StoryInsert)

      return NextResponse.json(inserted)
    } catch (e) {
      console.warn({ e })
      return NextResponse.json(e)
    }
  }
  return NextResponse.json(data)
}

export async function GET(req: NextRequest) {
  const stories = await getAllStories()

  return NextResponse.json(stories)
}
