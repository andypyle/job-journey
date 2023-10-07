import { createServerClient } from '@/db'
import { cookies } from 'next/headers'

export const getAllRoles = async () => {
  const supabase = createServerClient(cookies)

  const { data } = await supabase
    .from('roles')
    .select('*')
    .order('startMonth', { ascending: false })
    .order('current', { ascending: true })

  return data
}
