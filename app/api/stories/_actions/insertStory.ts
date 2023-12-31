import { createServerClient } from '@/db'
import { StoryInsert } from '@/db/types'
import { pipeline } from '@xenova/transformers'
import { cookies } from 'next/headers'

export const insertStory = async (story: StoryInsert) => {
  const generateEmbedding = await pipeline(
    'feature-extraction',
    'Supabase/gte-small'
  )
  const supabase = createServerClient(cookies)

  const storyEmbedding = await generateEmbedding(story.text, {
    pooling: 'mean',
    normalize: true,
  })

  // Casting this as any for now. Supabase generates vectors as string | null | undefined for some reason.
  const embedding = Array.from(storyEmbedding.data) as any

  const insertedStory = await supabase
    .from('stories')
    .insert({ ...story, embedding })
    .select('id')

  console.log({ insertedStory })

  return insertedStory
}
