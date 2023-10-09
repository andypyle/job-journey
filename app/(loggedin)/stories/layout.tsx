import { getAllRoles } from '@/app/api/roles/_actions/getAllRoles'
import { StoriesLayout } from './_components/StoriesLayout'

export default async function StoriesPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const roles = await getAllRoles()
  return <StoriesLayout roles={roles!}>{children}</StoriesLayout>
}
