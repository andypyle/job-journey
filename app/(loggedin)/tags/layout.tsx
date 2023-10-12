import { Heading, VStack } from '@chakra-ui/react'

export default function TagsLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <VStack gap={4}>
      <Heading>Tags Section</Heading>
      {children}
    </VStack>
  )
}
