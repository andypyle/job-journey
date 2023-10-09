import { getAllRoles } from '@/app/api/roles/_actions/getAllRoles'
import { getAllStories } from '@/app/api/stories/_actions/getAllStories'
import { SectionGrid } from '@/components/Layout'
import type { IStory } from './_components/StoryCard'
import { StoryCard } from './_components/StoryCard'

export default async function StoriesPage() {
  const allStories = await getAllStories()
  const roles = await getAllRoles()
  return (
    <SectionGrid>
      {allStories?.map((s) => (
        <StoryCard
          key={`all-stories-card-${s.id}`}
          storyRow={s as IStory}
          allRoles={roles!}
        />
      ))}
    </SectionGrid>
  )
}
