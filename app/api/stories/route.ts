import { createHandlerClient } from '@/db'
import { storiesInsertSchema, tagsInsertSchema } from '@/db/dbTypes.schemas'
import type { StoryInsert } from '@/db/types'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { attachTags, insertTags } from '../tags/_actions'
import { insertStory } from './_actions'
import { getAllStories } from './_actions/getAllStories'

export async function POST(req: NextRequest) {
  const supabase = createHandlerClient(cookies)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const user_id = user?.id
  const body = await req.json()
  const role_id = body?.role_id
  const tags = body?.tags

  const existingTags = tags
    .filter((t: any) => !t.__isNew__)
    .map((t: any) => t.value)

  const newTags = tagsInsertSchema.parse(
    tags
      .filter((t: any) => t.__isNew__)
      .map((tag: any) => ({
        name: tag.label,
        user_id,
      }))
  )

  const data = storiesInsertSchema.parse({
    user_id,
    role_id,
    ...body,
  })

  if (data) {
    try {
      const inserted = await insertStory(data as StoryInsert)

      if (inserted.status === 201 && newTags) {
        const insertedTags = await insertTags(newTags)

        if (insertedTags.status === 201) {
          const newAndExistingTagIds = [
            ...existingTags,
            ...insertedTags.data!.map((t: any) => t.id),
          ]

          const attachTagsToStories = await attachTags(
            newAndExistingTagIds,
            inserted!.data![0].id
          )

          if (attachTagsToStories.status === 201) {
            return NextResponse.json(inserted)
          }
        }
      }
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
