import { createServerClient } from '@/db'
import { TagInsert } from '@/db/types'
import { pipeline } from '@xenova/transformers'
import { cookies } from 'next/headers'

export const insertTags = async (tags: TagInsert[]) => {
  const generateEmbedding = await pipeline(
    'feature-extraction',
    'Supabase/gte-small'
  )

  const supabase = createServerClient(cookies)

  const tagsEmbeddings = await Promise.all(
    tags.map(async (t) => {
      const tagEmbedding = await generateEmbedding(t.name, {
        pooling: 'mean',
        normalize: true,
      })

      const embedding: any = Array.from(tagEmbedding.data)

      return {
        ...t,
        embedding,
      }
    })
  )

  const insertedTags = await supabase
    .from('tags')
    .insert(tagsEmbeddings)
    .select('id')

  return insertedTags
}
