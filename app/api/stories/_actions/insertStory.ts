import { createServerClient } from '@/db'
import { StoryInsert } from '@/db/types'
import { cookies } from 'next/headers'

export const insertStory = async (story: StoryInsert) => {
  const supabase = createServerClient(cookies)

  const insertedStory = await supabase
    .from('stories')
    .insert(story)
    .select('id')

  return insertedStory
}
