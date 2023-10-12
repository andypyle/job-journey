import { IStory } from '@/app/(loggedin)/stories/_components/StoryCard'
import { createServerClient } from '@/db'
import { OpenAI, functions } from '@/gpt'
import { groupBy } from '@/util'
import { createHash } from 'crypto'
import { cookies } from 'next/headers'
import { doTagsExist } from '../../tags/_actions'
export async function getTags(story: IStory, userId: string) {
  const supabase = createServerClient(cookies)
  const {
    data: { user },
  } = await supabase.auth.getUser()

  const chatCompletion = await OpenAI.chat.completions.create({
    messages: [
      // {
      //   role: 'system',
      //   content:
      //     'You are an excellent assistant. You help extract categories and tags from a block of text, and you do it every time with exactly 5 keywords.',
      // },
      {
        role: 'user',
        content: `I am a ${story.roles.title}, interviewing for new roles. I will provide a story from when I worked at ${story.roles.company}.
         Using the provided story text, please generate 5 potential categories for this story, so we can sort by it later. You MUST generate exactly 5 keywords, and they
         HAVE to be relevant to the text of the story. Do not include the name of the company or the job title in the results. Story: ${story.text}`,
      },
    ],
    functions,
    function_call: { name: 'extract_keywords' },
    model: 'gpt-4',
    user: `jj-${createHash('sha1').update(user!.email!).digest('hex')}`,
  })

  const { function_call } = chatCompletion.choices[0].message

  if (function_call) {
    const { tags } = JSON.parse(function_call?.arguments)

    if (tags.length) {
      const data = await doTagsExist(tags)
      const dataGrouped = groupBy(data!, 'name', 'id')

      return tags.map((t: string) => ({
        label: t,
        value: dataGrouped[t] ?? t,
        __isNew__: !!!dataGrouped[t],
      }))
    }
    return function_call?.arguments
  }
}
