import { Button, Card, HStack, Input, Link } from '@chakra-ui/react'
import { LogoType } from '../Text'

export const Login = () => (
  <Card
    flexDir="column"
    w={{
      base: '100%',
      sm: '450px',
    }}
    alignItems="center"
    gap={4}
    p={4}
    shadow="none"
    border="1px solid var(--chakra-colors-gray-200)">
    <LogoType />
    <Input placeholder="Email" type="email" size="lg" />
    <Input placeholder="Password" type="password" size="lg" />
    <HStack
      gap={4}
      w="full"
      flexDirection={{
        base: 'column',
        sm: 'row',
      }}>
      <Button
        as={Link}
        href="/register"
        size="lg"
        colorScheme="teal"
        w="full"
        order={{ base: 1, sm: -1 }}>
        Register
      </Button>
      <Button size="lg" colorScheme="blue" w="full">
        Log In
      </Button>
    </HStack>
  </Card>
)
