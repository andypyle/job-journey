import { IStory } from '@/app/(loggedin)/stories/_components/StoryCard'
import { createHandlerClient } from '@/db'
import { cookies } from 'next/headers'
import { NextResponse } from 'next/server'
import { getTags } from './_actions/getTags'

export async function POST(req: Request) {
  const supabase = createHandlerClient(cookies)
  const session = await supabase.auth.getSession()

  if (session.data.session?.access_token) {
    const {
      data: { user },
    } = await supabase.auth.getUser()

    const data = await req.json()

    const gpt = await getTags(data as IStory, user!.id)
    return NextResponse.json(gpt)
  } else {
    return NextResponse.error()
  }
}
