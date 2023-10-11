import { getAllRoles } from '@/app/api/roles/_actions/getAllRoles'
import { getAllTags } from '@/app/api/tags/_actions/getAllTags'
import { StoriesLayout } from './_components/StoriesLayout'

export default async function StoriesPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const roles = await getAllRoles()
  const allTags = await getAllTags()
  return (
    <StoriesLayout roles={roles!} tags={allTags!}>
      {children}
    </StoriesLayout>
  )
}
