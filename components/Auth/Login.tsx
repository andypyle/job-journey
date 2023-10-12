'use client'

import { loginSchema } from '@/util/schemas'
import { Button, Card, FormControl, Input } from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { LogoType } from '../Text'

export const Login = () => {
  const [serverError, setServerError] = useState<string>('')
  const { refresh } = useRouter()
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting, isValid },
  } = useForm({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (values: any) => {
    if (isValid) {
      const data = await fetch('/api/auth/login', {
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
        <FormControl isInvalid={Boolean(errors.email)}>
          <Input
            placeholder="Email"
            aria-label="Email"
            type="email"
            size="lg"
            {...register('email')}
          />
        </FormControl>
        <FormControl isInvalid={Boolean(errors.password)}>
          <Input
            placeholder="Password"
            aria-label="Password"
            type="password"
            size="lg"
            {...register('password')}
          />
        </FormControl>
        <Button
          size="lg"
          colorScheme="blue"
          w="full"
          type="submit"
          isLoading={isSubmitting}>
          Login
        </Button>
        {/* <Box position="relative" py={4} w="full">
          <Divider color="gray.600" />
          <AbsoluteCenter bg="white" px="4" color="gray.600">
            Don't have an account?
          </AbsoluteCenter>
        </Box>
        <Button
          as={Link}
          disabled
          isDisabled
          href="/register"
          size="lg"
          colorScheme="teal"
          w="full">
          Register
        </Button> */}
      </Card>
    </form>
  )
}
