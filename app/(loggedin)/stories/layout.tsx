'use client'

import {
  Button,
  HStack,
  Heading,
  Icon,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { IconPlus } from '@tabler/icons-react'
import { NewStoryModal } from './_components'

export default function StoriesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    isOpen: isNewStoryOpen,
    onOpen: onNewStoryOpen,
    onClose: onNewStoryClose,
  } = useDisclosure()
  return (
    <VStack as="section" gap={4} alignItems="flex-start">
      <HStack as="header" justifyContent="space-between" w="100%">
        <Heading size="lg">Stories</Heading>
        <HStack as="nav" gap={4}>
          <Button
            size="sm"
            minW="120px"
            leftIcon={<Icon as={IconPlus} boxSize={4} />}
            colorScheme="green"
            onClick={onNewStoryOpen}>
            New Story
          </Button>
        </HStack>
      </HStack>
      <NewStoryModal isOpen={isNewStoryOpen} onClose={onNewStoryClose} />
      {children}
    </VStack>
  )
}
