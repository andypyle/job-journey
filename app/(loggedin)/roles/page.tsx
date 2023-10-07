import { getAllRoles } from '@/app/api/roles/_actions/getAllRoles'
import { SectionGrid } from '@/components/Layout'
import { cache } from 'react'
import { RoleCard } from './_components/RoleCard'

export default cache(async function RolesPage() {
  const roles = await getAllRoles()
  return (
    <SectionGrid>
      {roles?.map((r) => (
        <RoleCard key={`all-roles-${r.id}}`} roleRow={r} />
      ))}
    </SectionGrid>
  )
})
