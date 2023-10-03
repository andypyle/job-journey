'use client'

import type { MenuProps } from '@chakra-ui/react'
import {
  Avatar,
  Icon,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
} from '@chakra-ui/react'
import type { User } from '@supabase/supabase-js'
import { IconLogout2 } from '@tabler/icons-react'
import { useMemo } from 'react'

type UserAvatarProps = {
  user: User
} & Omit<MenuProps, 'children'>

export const UserAvatar: React.FC<UserAvatarProps> = ({ user, ...props }) => {
  const name = useMemo(
    () => `${user.user_metadata.firstName} ${user.user_metadata.lastName}`,
    [user]
  )
  return (
    <Menu {...props}>
      <MenuButton
        name={name}
        transition="all 250ms"
        cursor="pointer"
        display="flex"
        alignItems="center"
        justifyContent="center">
        <Avatar name={name} />
      </MenuButton>
      <MenuList>
        <MenuGroup title={name}>
          <MenuItem icon={<Icon as={IconLogout2} />}>Logout</MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}
