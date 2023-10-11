import { createServerClient } from '@/db'
import { TagInsert } from '@/db/types'
import { cookies } from 'next/headers'

export const insertTags = async (tags: TagInsert[]) => {
  const supabase = createServerClient(cookies)

  const insertedTags = await supabase.from('tags').insert(tags).select('id')

  return insertedTags
}
