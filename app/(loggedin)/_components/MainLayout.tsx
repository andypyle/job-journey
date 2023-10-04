'use client'

import { LogoType } from '@/components/Text'
import { UserAvatar } from '@/components/User'
import type { GridProps } from '@chakra-ui/react'
import {
  Box,
  Flex,
  Grid,
  HStack,
  Hide,
  Icon,
  Show,
  useDisclosure,
} from '@chakra-ui/react'
import type { User } from '@supabase/supabase-js'
import { IconMenu2 } from '@tabler/icons-react'
import { createContext } from 'react'
import { SidebarNav } from './SidebarNav'

type MainLayoutProps = {
  user: User
} & GridProps

export const UserContext = createContext<User | null>(null)

export const MainLayout: React.FC<MainLayoutProps> = ({
  user,
  children,
  ...props
}) => {
  const { isOpen, onOpen, onClose, onToggle } = useDisclosure()
  return (
    <UserContext.Provider value={user}>
      <Grid
        height="full"
        gridTemplateColumns="1fr"
        gridTemplateRows="auto 1fr auto"
        rowGap={4}
        columnGap={{ base: 0, md: 4 }}>
        <Box
          as="header"
          gridColumn="span 2"
          gridRow="1"
          p={4}
          display="flex"
          justifyContent="space-between">
          <LogoType />
          <HStack gap={4}>
            <Show above="md">
              <UserAvatar user={user} />
            </Show>
            <Hide above="md">
              <Icon
                as={IconMenu2}
                boxSize={8}
                onClick={onToggle}
                cursor="pointer"
              />
            </Hide>
          </HStack>
        </Box>

        <Flex gridColumn="1" gridRow="2" gap={4} position="relative">
          <Box
            as="aside"
            p={4}
            bg="gray.50"
            w={{ base: '100%', md: '300px' }}
            position={{ base: 'absolute', md: 'unset' }}
            top={{ base: 0, md: 'unset' }}
            bottom={{ base: 0, md: 'unset' }}
            zIndex={{ base: 500, md: 'unset' }}
            transform={{
              base: isOpen ? 'translateX(0)' : 'translateX(-100%)',
              md: 'translateX(0)',
            }}
            transition="transform ease-in 200ms">
            <SidebarNav />
          </Box>
          <Box as="main" p={4} flex={1}>
            {children}
          </Box>
        </Flex>

        <Box as="footer" gridColumn="span 2" gridRow="3" p={4}>
          Footer?
        </Box>
      </Grid>
    </UserContext.Provider>
  )
}
