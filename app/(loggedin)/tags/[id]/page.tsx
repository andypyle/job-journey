import { getAllRoles } from '@/app/api/roles/_actions/getAllRoles'
import { getTagById } from '@/app/api/tags/_actions'
import { getAllTags } from '@/app/api/tags/_actions/getAllTags'
import { SectionGrid } from '@/components'
import { Heading, VStack } from '@chakra-ui/react'
import { IStory, StoryCard } from '../../stories/_components/StoryCard'

export default async function TagPage({ params }: { params: { id: string } }) {
  const { tag, stories } = await getTagById(Number(params.id))
  const allTags = await getAllTags()
  const roles = await getAllRoles()

  return (
    <VStack gap={8} w="full" alignItems="flex-start">
      {tag && <Heading size="lg">{tag.name}</Heading>}

      {stories && (
        <SectionGrid>
          {stories.map((s) => (
            <StoryCard
              key={`all-stories-card-${s.id}`}
              storyRow={s as IStory}
              allRoles={roles!}
              allTags={allTags!}
            />
          ))}
        </SectionGrid>
      )}
    </VStack>
  )
}
