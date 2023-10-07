import type { BoxProps } from '@chakra-ui/react'
import { HStack, Heading } from '@chakra-ui/react'

type SectionHeaderProps = {
  title: string | React.ReactNode
  navSection?: React.ReactNode
} & BoxProps

export const SectionHeader: React.FC<SectionHeaderProps> = ({
  title,
  navSection,
  ...props
}) => (
  <HStack
    as="header"
    justifyContent="space-between"
    w="100%"
    p={2}
    borderBottomColor="gray.200"
    borderBottomWidth={1}>
    <Heading size="md">{title}</Heading>
    {navSection ? (
      <HStack as="nav" gap={4}>
        {navSection}
      </HStack>
    ) : null}
  </HStack>
)
