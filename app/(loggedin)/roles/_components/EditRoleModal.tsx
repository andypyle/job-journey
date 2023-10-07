'use client'

import { DatePicker } from '@/components/Form'
import { Modal, type ModalProps } from '@/components/Modal'
import { rolesUpdateSchema } from '@/db/dbTypes.schemas'
import type { RoleRow } from '@/db/types'
import { createRoleSchema } from '@/util/schemas'
import {
  Button,
  Checkbox,
  FormControl,
  FormErrorMessage,
  FormLabel,
  HStack,
  Input,
  ModalFooter,
  VStack
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'
import { Control, FieldValues, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

type RoleType = z.infer<typeof createRoleSchema>

type EditRoleModalProps = {
  role: RoleRow
} & Omit<ModalProps, 'children'>

export const EditRoleModal: React.FC<EditRoleModalProps> = ({
  role,
  onClose,
  ...props
}) => {
  const {
    handleSubmit,
    register,
    reset,
    setValue,
    getValues,
    resetField,
    watch,
    formState: { errors, isSubmitting, isValid, defaultValues },
    control,
  } = useForm({
    resolver: zodResolver(rolesUpdateSchema),
    defaultValues: {
      company: role.company,
      title: role.title,
      startMonth: role.startMonth,
      endMonth: role.endMonth,
      current: role.current
    }
  })

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
      const data = await fetch(`/api/roles/${role.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (data.status === 200) {
        reset();
        onClose();
        refresh();
      }
    }
  }

  return (
    <Modal
      title={`Edit Role: ${role.title} @ ${role.company}`}
      size={{ base: 'full', md: '2xl' }}
      footer={
        <ModalFooter justifyContent="flex-end" p={4}>
          <Button colorScheme="blue" size="md" type="submit" disabled={!isValid} isLoading={isSubmitting}>
            Save Role
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
          <FormControl isInvalid={Boolean(errors.company)} aria-invalid={Boolean(errors.company)} p={4} borderRadius="md" _invalid={{
            bg: 'red.50'
          }}>
            <FormLabel>Company</FormLabel>
            <Input type="text" {...register('company')} />
            {errors.company ? <FormErrorMessage>
              { errors.company.message }
            </FormErrorMessage> : null}
          </FormControl>
          <FormControl isInvalid={Boolean(errors.title)} aria-invalid={Boolean(errors.title)} p={4} borderRadius="md" _invalid={{
            bg: 'red.50'
          }}>
            <FormLabel>Job Title</FormLabel>
            <Input type="text" {...register('title')} />
            {errors.title ? <FormErrorMessage>
              { errors.title.message }
            </FormErrorMessage> : null}
          </FormControl>
        </HStack>

        <HStack gap={4} w="100%" flexDir={{base: 'column', md: 'row'}}>
          <FormControl isInvalid={Boolean(errors.startMonth)} aria-invalid={Boolean(errors.startMonth)} p={4} borderRadius="md" _invalid={{
            bg: 'red.50'
          }}>
            <FormLabel>Start Month</FormLabel>
            <DatePicker control={control as Control<any>} setValue={setValue} {...register('startMonth')} />
            {errors.startMonth ? <FormErrorMessage>
              { errors.startMonth.message }
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
              control={control as Control<any>}
              setValue={setValue}
              minDate={new Date(startMonth!)}
              disabled={!!current}
              {...register('endMonth')}
            />
            {errors.endMonth ? <FormErrorMessage>
              { errors.endMonth.message }
            </FormErrorMessage> : null}
          </FormControl>
        </HStack>
      </VStack>
    </Modal>
  )
}
