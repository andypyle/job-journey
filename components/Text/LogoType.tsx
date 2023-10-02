import { cabin } from '@/theme/fonts'
import type { HeadingProps } from '@chakra-ui/react'
import { Heading } from '@chakra-ui/react'
import { IconBat } from '@tabler/icons-react'

export const LogoType: React.FC<HeadingProps> = ({ ...props }) => (
  <Heading
    display="flex"
    alignItems="center"
    fontWeight={700}
    fontSize={{ base: '5xl', sm: '5xl' }}
    {...props}
    className={cabin.className}>
    JobJourney{' '}
    <IconBat
      color="var(--chakra-colors-orange-300)"
      size="3rem"
      style={{ transform: 'rotate(45deg)' }}
    />
  </Heading>
)
