import { getAllRoles } from '@/app/api/roles/_actions/getAllRoles'
import { getAllStories } from '@/app/api/stories/_actions/getAllStories'
import { getAllTags } from '@/app/api/tags/_actions/getAllTags'
import { SectionGrid } from '@/components/Layout'
import type { IStory } from './_components/StoryCard'
import { StoryCard } from './_components/StoryCard'

export default async function StoriesPage() {
  const allStories = await getAllStories()
  const allTags = await getAllTags()
  const roles = await getAllRoles()
  return (
    <SectionGrid>
      {allStories?.map((s) => (
        <StoryCard
          key={`all-stories-card-${s.id}`}
          storyRow={s as IStory}
          allRoles={roles!}
          allTags={allTags!}
        />
      ))}
    </SectionGrid>
  )
}
