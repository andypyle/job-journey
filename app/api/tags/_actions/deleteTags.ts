import { createServerClient } from '@/db'
import { cookies } from 'next/headers'

export const deleteTags = async (tagIds: number[]) => {
  const supabase = createServerClient(cookies)

  const deletedTags = await supabase.from('tags').delete().in('id', tagIds)

  return deletedTags
}
