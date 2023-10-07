import { RolesLayout } from './_components/RolesLayout'

export default async function RolesPageLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <RolesLayout>{children}</RolesLayout>
}
