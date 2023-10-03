'use client'

import { LogoType } from '@/components/Text'
import { UserAvatar } from '@/components/User'
import type { GridProps } from '@chakra-ui/react'
import { Box, Flex, Grid } from '@chakra-ui/react'
import type { User } from '@supabase/supabase-js'

type MainLayoutProps = {
  user: User
} & GridProps

export const MainLayout: React.FC<MainLayoutProps> = ({
  user,
  children,
  ...props
}) => (
  <Grid
    height="full"
    gridTemplateColumns="1fr"
    gridTemplateRows="auto 1fr auto"
    gap={4}>
    <Box
      as="header"
      gridColumn="span 2"
      gridRow="1"
      p={4}
      display="flex"
      justifyContent="space-between">
      <LogoType />
      <UserAvatar user={user} />
    </Box>

    <Flex gridColumn="1" gridRow="2" gap={4} position="relative">
      <Box
        as="aside"
        p={4}
        bg="blue.100"
        w={{ base: '100%', md: '300px' }}
        position={{ base: 'absolute', md: 'unset' }}
        top={{ base: 0, md: 'unset' }}
        bottom={{ base: 0, md: 'unset' }}
        zIndex={{ base: 500, md: 'unset' }}
        transform={{ base: 'translateX(-100%)', md: 'unset' }}>
        Sidebar
      </Box>
      <Box as="main" p={4} flex={1}>
        {children}
      </Box>
    </Flex>

    <Box as="footer" gridColumn="span 2" gridRow="3" p={4}>
      Footer?
    </Box>
  </Grid>
)
