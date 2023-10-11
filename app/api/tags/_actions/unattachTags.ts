import { createServerClient } from '@/db'
import { cookies } from 'next/headers'

export const unattachTags = async (tagIds: number[], storyId: number) => {
  const supabase = createServerClient(cookies)

  const unattachedTags = await supabase
    .from('stories_tags')
    .delete()
    .eq('story_id', storyId)
    .in('tag_id', tagIds)

  return unattachedTags
}
