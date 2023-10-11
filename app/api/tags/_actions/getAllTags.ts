import { createServerClient } from '@/db'
import { cookies } from 'next/headers'

export const getAllTags = async () => {
  const supabase = createServerClient(cookies)

  const { data } = await supabase
    .from('tags')
    .select('*')
    .order('name', { ascending: true })

  return data
}
