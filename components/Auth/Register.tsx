import {
  Button,
  Card,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react'
import Link from 'next/link'
import { LogoType } from '../Text'

export const Register = () => (
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
    <HStack gap={4} flexDir={{ base: 'column', sm: 'row' }} w="full">
      <FormControl isRequired>
        <FormLabel>First Name</FormLabel>
        <Input type="text" name="firstName" />
      </FormControl>
      <FormControl isRequired>
        <FormLabel>Last Name</FormLabel>
        <Input type="text" name="lastName" />
      </FormControl>
    </HStack>
    <FormControl isRequired>
      <FormLabel>Email</FormLabel>
      <Input type="email" size="lg" name="email" />
    </FormControl>
    <FormControl isRequired>
      <FormLabel>Password</FormLabel>
      <Input type="password" size="lg" name="password" />
    </FormControl>
    <FormControl isRequired>
      <FormLabel>Confirm Password</FormLabel>
      <Input type="password" size="lg" name="confirmPassword" />
    </FormControl>
    <Button size="lg" colorScheme="teal" w="full">
      Register
    </Button>
    <Text size="xs">Have an account?</Text>{' '}
    <Link href="/login" style={{ display: 'inline-block' }}>
      Log In!
    </Link>
  </Card>
)
