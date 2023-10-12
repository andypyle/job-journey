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
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import type { User } from '@supabase/supabase-js'
import { IconMenu2 } from '@tabler/icons-react'
import Link from 'next/link'
import { createContext } from 'react'
import { SidebarNav } from './SidebarNav'

type MainLayoutProps = {
  user: User
} & GridProps

export const UserContext = createContext<User | null>(null)
export const NavToggleContext = createContext<null | (() => void)>(null)

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
        gridTemplateRows="auto 1fr 200px"
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

        <NavToggleContext.Provider value={onToggle}>
          <Flex gridColumn="1" gridRow="2" gap={4} position="relative">
            <Box
              as="aside"
              p={4}
              bg="gray.100"
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
        </NavToggleContext.Provider>

        <Box
          as="footer"
          display="flex"
          alignItems="center"
          justifyContent="center"
          gridColumn="span 2"
          gridRow="3"
          p={8}
          bg="gray.800"
          color="gray.50">
          <Text
            size={{ base: 'lg', md: 'xl' }}
            fontWeight={700}
            textAlign="center">
            Built on the Central Coast of Calfornia by{' '}
            <Link
              href="http://github.com/andypyle"
              target="_blank"
              style={{ color: 'var(--chakra-colors-cyan-400)' }}>
              Andy Pyle
            </Link>{' '}
            &copy;2023
          </Text>
        </Box>
      </Grid>
    </UserContext.Provider>
  )
}
