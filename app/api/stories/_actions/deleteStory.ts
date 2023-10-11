import { createServerClient } from '@/db'
import { cookies } from 'next/headers'

export const deleteStory = async (id: number) => {
  const supabase = createServerClient(cookies)

  const deletedStory = await supabase.from('stories').delete().eq('id', id)

  return deletedStory
}
