import { useUser } from '@/components/hooks/useUser'
import {
  Avatar,
  Collapse,
  Divider,
  Flex,
  HStack,
  Hide,
  Icon,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import { User } from '@supabase/supabase-js'
import {
  IconBooks,
  IconChevronRight,
  IconLogout2,
  IconUserHexagon,
  type Icon as IconType,
} from '@tabler/icons-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useContext, useMemo } from 'react'
import { UserContext } from './MainLayout'

type SidebarNavLinkProps = {
  icon?: IconType
  href?: string
  label: string
  left?: React.ReactNode
  description?: string
  onClick?: () => void
  children?: React.ReactNode
}
const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({
  icon,
  label,
  left,
  description,
  onClick,
  href,
  children,
}) => {
  const { isOpen, onToggle } = useDisclosure()
  const pathname = usePathname()
  const isActive = href ? href === pathname : false
  return (
    <>
      <HStack
        p={4}
        w="100%"
        _hover={{ bg: 'green.100' }}
        cursor="pointer"
        as={!children ? Link : HStack}
        onClick={children ? onToggle : onClick ? onClick : () => null}
        color={isActive ? 'blue.400' : 'gray.600'}
        {...(children ? {} : { href })}>
        {left || icon ? (
          <Flex w="40px" alignItems="center" justifyContent="center">
            {left && !icon ? left : null}
            {icon ? (
              <Icon as={icon} boxSize={onClick ? 6 : 10} color="inherit" />
            ) : null}
          </Flex>
        ) : null}
        <Flex
          flex={1}
          alignItems={description ? 'flex-start' : 'center'}
          flexDir={description ? 'column' : 'row'}>
          <Text color="inherit" fontSize="xl">
            {label}
          </Text>
          {description ? (
            <Text color="inherit" fontSize="sm">
              {description}
            </Text>
          ) : null}
        </Flex>
        {children ? (
          <Flex alignItems="center" justifyContent="center" w="40px">
            <Icon
              as={IconChevronRight}
              boxSize={6}
              color="gray.600"
              transform={isOpen ? 'rotate(90deg)' : 'rotate(0deg)'}
              transition="transform ease-in 150ms"
            />
          </Flex>
        ) : null}
      </HStack>
      {children ? (
        <VStack gap={4} w="100%">
          <Collapse
            in={isOpen}
            style={{ width: '100%', paddingLeft: 'var(--chakra-space-4)' }}>
            {children}
          </Collapse>
        </VStack>
      ) : null}
    </>
  )
}

export const SidebarNav: React.FC = () => {
  const user = useContext(UserContext) as User
  const {
    user_metadata: { firstName, lastName },
  } = user
  const { loading, logout } = useUser(user)

  const name = useMemo(() => `${firstName} ${lastName}`, [firstName, lastName])

  const onClickLogout = () => logout()
  return (
    <VStack>
      <Hide above="md">
        <SidebarNavLink left={<Avatar name={name} size="sm" />} label={name}>
          <SidebarNavLink
            icon={IconLogout2}
            label="Log Out"
            href="#"
            onClick={onClickLogout}
          />
        </SidebarNavLink>

        <Divider borderColor="gray.400" w="100%" />
      </Hide>
      <SidebarNavLink label="Roles" icon={IconUserHexagon} href="/roles" />
      <SidebarNavLink label="Stories" icon={IconBooks} href="/stories" />
    </VStack>
  )
}
