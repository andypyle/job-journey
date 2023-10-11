import { createServerClient } from '@/db'
import { storiesUpdateSchema } from '@/db/dbTypes.schemas'
import { TagRow } from '@/db/types'
import { cookies } from 'next/headers'
import { NextRequest, NextResponse } from 'next/server'
import { attachTags, insertTags, unattachTags } from '../../tags/_actions'
import { deleteStory } from '../_actions'

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const { id } = params

  const deletedStory = await deleteStory(Number(id))

  return NextResponse.json(deletedStory)
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
  const supabase = createServerClient(cookies)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const user_id = user?.id
  const { id } = params
  const body = await req.json()

  const story_id = Number(id)

  const newData = storiesUpdateSchema.safeParse(body.new)

  // These don't exist in DB yet. We will need to insert them then attach them.
  const freshTags = (newData as any).data.tags
    ?.filter((t: any) => t.__isNew__)
    .map((t: any) => ({ name: t.label, user_id }))

  // These are the tags that were on the story before updating. We need this so we can determine which ones have been deleted.
  const oldTags = body.old.tags.map((t: TagRow) => t.id)

  // Updated tags that already have IDs.
  const newTags = (newData as any).data.tags
    ?.filter((t: any) => !t.__isNew__)
    .map((t: any) => t.value)

  const deletedTags = oldTags.filter((t: number) => !newTags.includes(t))

  const existingTagsToAttach = newTags
    .filter((t: any) => !oldTags.includes(t))
    .map((nt: any) => nt)

  const tagIdsToAttach = []

  if (newData?.success) {
    const updated = await supabase
      .from('stories')
      .update({
        text: newData.data.text,
        role_id: newData.data.role_id,
      })
      .eq('id', story_id)

    if (updated.status === 204) {
      if (deletedTags.length) {
        await unattachTags(deletedTags, story_id)
      }

      if (freshTags.length) {
        const insertedFreshTags = await insertTags(freshTags)

        if (insertedFreshTags.status === 201) {
          tagIdsToAttach.push(
            ...(insertedFreshTags.data?.map((tag) => tag.id) ?? [])
          )
        }
      }

      if (existingTagsToAttach.length) {
        tagIdsToAttach.push(...existingTagsToAttach)
      }

      if (tagIdsToAttach.length) {
        await attachTags(tagIdsToAttach, story_id)
      }
    }

    return NextResponse.json(updated)
  }

  return NextResponse.json(body)
}
