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
import { NewRoleModal } from './_components'

export default function RolesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const {
    isOpen: isNewRoleOpen,
    onOpen: onNewRoleOpen,
    onClose: onNewRoleClose,
  } = useDisclosure()
  return (
    <VStack as="section" gap={4} alignItems="flex-start">
      <HStack as="header" justifyContent="space-between" w="100%">
        <Heading size="lg">Roles</Heading>
        <HStack as="nav" gap={4}>
          <Button
            size="sm"
            minW="120px"
            leftIcon={<Icon as={IconPlus} boxSize={4} />}
            colorScheme="green"
            onClick={onNewRoleOpen}>
            New Role
          </Button>
        </HStack>
      </HStack>
      <NewRoleModal isOpen={isNewRoleOpen} onClose={onNewRoleClose} />
      {children}
    </VStack>
  )
}
