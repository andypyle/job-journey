import { createServerClient } from '@/db'
import { cookies } from 'next/headers'

export const attachTags = async (tagIds: number[], storyId: number) => {
  const supabase = createServerClient(cookies)

  const attachedTags = await supabase.from('stories_tags').insert(
    tagIds.map((tag_id) => ({
      tag_id,
      story_id: storyId,
    }))
  )

  return attachedTags
}
