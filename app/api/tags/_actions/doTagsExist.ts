import { createServerClient } from '@/db'
import { cookies } from 'next/headers'

export const doTagsExist = async (tags: string[]) => {
  const supabase = createServerClient(cookies)

  const { data } = await supabase
    .from('tags')
    .select('id, name')
    .in('name', tags)

  return data
}
