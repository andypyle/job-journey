'use client'

import { registerSchema } from '@/util/schemas'
import {
  Button,
  Card,
  FormControl,
  FormLabel,
  HStack,
  Input,
  Text,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LogoType } from '../Text'

export const Register = () => {
  const [serverError, setServerError] = useState<string>('')
  const { refresh } = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(registerSchema),
  })

  const onSubmit = async (values: any) => {
    if (isValid) {
      const data = await fetch('/api/auth/register', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      const loggedInData = await data.json()

      if (loggedInData.status === 400 && loggedInData.name === 'AuthApiError') {
        setServerError(loggedInData.message)
      }

      if (loggedInData.session && loggedInData.user) {
        return refresh()
      }
    }
  }
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
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
          <FormControl isInvalid={Boolean(errors.firstName)}>
            <FormLabel>First Name</FormLabel>
            <Input type="text" {...register('firstName')} />
          </FormControl>
          <FormControl isInvalid={Boolean(errors.lastName)}>
            <FormLabel>Last Name</FormLabel>
            <Input type="text" {...register('lastName')} />
          </FormControl>
        </HStack>
        <FormControl isInvalid={Boolean(errors.email)}>
          <FormLabel>Email</FormLabel>
          <Input type="email" size="lg" {...register('email')} />
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)}>
          <FormLabel>Password</FormLabel>
          <Input type="password" size="lg" {...register('password')} />
        </FormControl>
        <FormControl isInvalid={Boolean(errors.confirmPassword)}>
          <FormLabel>Confirm Password</FormLabel>
          <Input type="password" size="lg" {...register('confirmPassword')} />
        </FormControl>
        <Button
          size="lg"
          colorScheme="teal"
          w="full"
          type="submit"
          isLoading={isSubmitting}>
          Register
        </Button>
        <Text size="xs">Have an account?</Text>{' '}
        <Link href="/login" style={{ display: 'inline-block' }}>
          Log In!
        </Link>
      </Card>
    </form>
  )
}
