import {
  Collapse,
  Flex,
  HStack,
  Icon,
  Text,
  VStack,
  useDisclosure,
} from '@chakra-ui/react'
import {
  IconAddressBook,
  IconBat,
  type Icon as IconType,
} from '@tabler/icons-react'
import Link from 'next/link'

type SidebarNavLinkProps = {
  icon?: IconType
  href?: string
  label: string
  description?: string
  children?: React.ReactNode
}
const SidebarNavLink: React.FC<SidebarNavLinkProps> = ({
  icon,
  label,
  description,
  href,
  children,
}) => {
  const { isOpen, onToggle } = useDisclosure()
  return (
    <>
      <HStack
        gap={4}
        p={4}
        w="100%"
        _hover={{ bg: 'green.100' }}
        cursor="pointer"
        as={children ? HStack : Link}
        onClick={children ? onToggle : () => null}
        {...(children ? {} : { href })}>
        {icon ? (
          <Flex w="40px" alignItems="center" justifyContent="center">
            <Icon as={icon} boxSize={10} color="gray.600" />
          </Flex>
        ) : null}
        <Flex
          flex={1}
          alignItems={description ? 'flex-start' : 'center'}
          flexDir={description ? 'column' : 'row'}>
          <Text color="gray.600" fontSize="xl">
            {label}
          </Text>
          {description ? (
            <Text color="gray.600" fontSize="sm">
              {description}
            </Text>
          ) : null}
        </Flex>
      </HStack>
      {children ? (
        <VStack gap={4} w="100%">
          <Collapse in={isOpen}>{children}</Collapse>
        </VStack>
      ) : null}
    </>
  )
}

export const SidebarNav: React.FC = () => {
  return (
    <VStack gap={4}>
      <SidebarNavLink
        icon={IconBat}
        label="Bat!"
        description="A link for bats.">
        <SidebarNavLink icon={IconAddressBook} label="Stuff" href="#" />
      </SidebarNavLink>
    </VStack>
  )
}
