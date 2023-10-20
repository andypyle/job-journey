import { createServerClient } from '@/db'
import { cookies } from 'next/headers'

export const getTagById = async (tagId: number) => {
  const supabase = createServerClient(cookies)

  const { data: tag } = await supabase
    .from('tags')
    .select('*')
    .eq('id', tagId)
    .maybeSingle()
  const { data: stories } = await supabase.rpc('match_tags_to_stories', {
    tag_embedding: tag?.embedding!, // Pass the embedding you want to compare
    match_threshold: 0.7, // Choose an appropriate threshold for your data
    match_count: 4, // Choose the number of matches
  }).select(`id,
    text,
    created_at,
    roles (*),
    role_id,
    user_id,
    tags (*)`)

  return { tag, stories }
}
