import { getAllTags } from '@/app/api/tags/_actions/getAllTags'
import { Badge, Wrap } from '@chakra-ui/react'
import Link from 'next/link'

export default async function TagsPage() {
  const allTags = await getAllTags()
  return (
    <Wrap gap={4}>
      {allTags?.map((t) => (
        <Badge
          size="lg"
          colorScheme="blue"
          p={4}
          borderRadius="lg"
          fontSize="md"
          key={t.id}
          as={Link}
          href={`tags/${t.id}`}
        >
          {t.name}
        </Badge>
      ))}
    </Wrap>
  )
}
