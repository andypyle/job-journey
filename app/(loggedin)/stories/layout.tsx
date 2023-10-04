'use client'

import { Button, HStack, Heading, Icon, VStack } from '@chakra-ui/react'
import { IconPlus } from '@tabler/icons-react'

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <VStack as="section" gap={4} alignItems="flex-start">
      <HStack as="header" justifyContent="space-between" w="100%">
        <Heading size="lg">Stories</Heading>
        <HStack as="nav" gap={4}>
          <Button
            size="sm"
            minW="120px"
            leftIcon={<Icon as={IconPlus} boxSize={4} />}
            colorScheme="green">
            New Story
          </Button>
        </HStack>
      </HStack>
      {children}
    </VStack>
  )
}
