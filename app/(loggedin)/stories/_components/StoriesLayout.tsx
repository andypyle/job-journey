'use client'

import { SectionHeader } from '@/components/Layout'
import { RoleRow } from '@/db/types'
import { Button, Icon, VStack, useDisclosure } from '@chakra-ui/react'
import { IconPlus } from '@tabler/icons-react'
import { NewStoryModal } from './NewStoryModal'

export const StoriesLayout = ({
  children,
  roles,
}: {
  children: React.ReactNode
  roles: RoleRow[]
}) => {
  const {
    isOpen: isNewStoryOpen,
    onOpen: onNewStoryOpen,
    onClose: onNewStoryClose,
  } = useDisclosure()
  return (
    <VStack as="section" gap={4} alignItems="flex-start">
      <SectionHeader
        title="Stories"
        navSection={
          <Button
            size="sm"
            minW="120px"
            leftIcon={<Icon as={IconPlus} boxSize={4} />}
            colorScheme="green"
            onClick={onNewStoryOpen}>
            New Story
          </Button>
        }
      />
      <NewStoryModal
        isOpen={isNewStoryOpen}
        onClose={onNewStoryClose}
        roles={roles}
      />
      {children}
    </VStack>
  )
}
