'use client'

import { SectionHeader } from '@/components/Layout'
import { Button, Icon, VStack, useDisclosure } from '@chakra-ui/react'
import { IconPlus } from '@tabler/icons-react'
import { NewRoleModal } from './'

export const RolesLayout = ({ children }: { children: React.ReactNode }) => {
  const {
    isOpen: isNewRoleOpen,
    onOpen: onNewRoleOpen,
    onClose: onNewRoleClose,
  } = useDisclosure()
  return (
    <VStack as="section" gap={4} alignItems="flex-start">
      <SectionHeader
        title="Roles"
        navSection={
          <Button
            size="sm"
            minW="120px"
            leftIcon={<Icon as={IconPlus} boxSize={4} />}
            colorScheme="green"
            onClick={onNewRoleOpen}>
            New Role
          </Button>
        }
      />
      <NewRoleModal isOpen={isNewRoleOpen} onClose={onNewRoleClose} />
      {children}
    </VStack>
  )
}
