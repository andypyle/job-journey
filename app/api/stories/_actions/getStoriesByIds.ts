import { createServerClient } from '@/db'
import { cookies } from 'next/headers'

export const getStoriesByIds = async (ids: number[]) => {
  const supabase = createServerClient(cookies)

  const { data: stories } = await supabase
    .from('stories')
    .select(
      `id,
    text,
    created_at,
    roles (*),
    role_id,
    user_id,
    tags (*)`
    )
    .in('id', ids)

  return stories
}
