'use client'

import { DatePicker } from '@/components/Form'
import { Modal, type ModalProps } from '@/components/Modal'
import { rolesInsertSchema } from '@/db/dbTypes.schemas'
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  ModalFooter,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { FieldValues, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

type RoleType = z.infer<typeof rolesInsertSchema>

export const NewRoleModal: React.FC<Omit<ModalProps, 'children'>> = ({
  onClose,
  ...props
}) => {
  const {
    handleSubmit,
    register,
    reset,
    watch,
    resetField,
    setValue,
    getValues,
    formState: { errors, isSubmitting, isValid, defaultValues },
    control,
  } = useForm({
    resolver: zodResolver(rolesInsertSchema),
  })

  console.log({ errors })

  const { refresh } = useRouter();

  const startMonth = useWatch({
    control,
    name: 'startMonth',
  })

  const current = useWatch({
    control,
    name: 'current',
  })

  useEffect(() => {
    const sub = watch((value, { name, type }) => {
      if(name === 'current' && value.current === true) {
        resetField('endMonth', { defaultValue: null })
      }
    });
    return () => sub.unsubscribe();
  }, [watch, resetField])

  const onSubmit = async (values: FieldValues) => {
    if (isValid) {
      const data = await fetch('/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });
      console.log({data:await data.json()})

      if (data?.status === 200) {
        reset();
        onClose();
        refresh();
      }
    }
  }

  return (
    <Modal
      title="New Role"
      size={{ base: 'full', md: '2xl' }}
      footer={
        <ModalFooter justifyContent="flex-end" p={4}>
          <Button colorScheme="blue" size="md" type="submit" isLoading={isSubmitting}>
            Create Role
          </Button>
        </ModalFooter>
      }
      asForm={{
        as: 'form',
        onSubmit: handleSubmit(onSubmit),
      }}
      onClose={onClose}
      {...props}>
      <VStack gap={4}>
        <HStack gap={4} w="100%" flexDir={{base: 'column', md: 'row'}}>
          <FormControl isInvalid={Boolean(errors.company)}aria-invalid={Boolean(errors.company)} p={4} borderRadius="md" _invalid={{
            bg: 'red.50'
          }}>
            <FormLabel>Company</FormLabel>
            <Input type="text" {...register('company')} />
            {errors.company ? <FormErrorMessage>
              { errors.company.message as string}
            </FormErrorMessage> : null}
          </FormControl>
          <FormControl isInvalid={Boolean(errors.title)} aria-invalid={Boolean(errors.title)} p={4} borderRadius="md" _invalid={{
            bg: 'red.50'
          }}>
            <FormLabel>Job Title</FormLabel>
            <Input type="text" {...register('title')} />
            {errors.title ? <FormErrorMessage>
              { errors.title.message as string}
            </FormErrorMessage> : null}
          </FormControl>
        </HStack>

        <HStack gap={4} w="100%" flexDir={{base: 'column', md: 'row'}}>
          <FormControl isInvalid={Boolean(errors.startMonth)} aria-invalid={Boolean(errors.startMonth)} p={4} borderRadius="md" _invalid={{
            bg: 'red.50'
          }}>
            <FormLabel>Start Month</FormLabel>
            <DatePicker control={control} {...register('startMonth')} setValue={setValue} />
            {errors.startMonth ? <FormErrorMessage>
              { errors.startMonth.message as string}
            </FormErrorMessage> : null}
          </FormControl>
          <FormControl isInvalid={Boolean(errors.endMonth)} aria-invalid={Boolean(errors.endMonth)} p={4} borderRadius="md" _invalid={{
            bg: 'red.50'
          }}>
            <FormLabel
              display="flex"
              alignItems="center"
              justifyContent="space-between">
              End Month
              <Checkbox
                {...register('current')}
                size="sm"
                flexDir="row-reverse"
                alignItems="center"
                color="gray.500"
                gap={2}>
                I currently work here
              </Checkbox>
            </FormLabel>
            <DatePicker
              control={control}
              setValue={setValue} 
              minDate={new Date(startMonth)}
              defaultValue={startMonth ? new Date(startMonth) : null}
              disabled={current}
              {...register('endMonth')}
            />
            {errors.endMonth ? <FormErrorMessage>
              { errors.endMonth.message as string }
            </FormErrorMessage> : null}
          </FormControl>
        </HStack>
      </VStack>
    </Modal>
  )
}
