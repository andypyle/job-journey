import { createServerClient } from '@/db'
import { cookies } from 'next/headers'

export const getAllStories = async () => {
  const supabase = createServerClient(cookies)

  const { data } = await supabase
    .from('stories')
    .select(
      `
    id,
  text,
  created_at,
  roles (*),
  role_id,
  user_id,
  tags (*)`
    )
    .order('roles(startMonth)', { ascending: false })

  return data
}
