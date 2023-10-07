'use client'

import { DatePicker } from '@/components/Form'
import { Modal, type ModalProps } from '@/components/Modal'
import type { RoleRow } from '@/db/types'
import { getDiff } from '@/util'
import { createRoleSchema } from '@/util/schemas'
import {
  Button,
  Checkbox,
  FormControl,
  FormLabel,
  HStack,
  Input,
  ModalFooter,
  VStack,
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
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
    formState: { errors, isSubmitting, isValid, defaultValues },
    control,
  } = useForm({
    resolver: zodResolver(createRoleSchema),
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

  const onSubmit = async (values: FieldValues) => {
    const changed = getDiff(getValues(), role)
    if (isValid) {
      const { status } = await fetch(`/api/roles/${role.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(changed),
      });

      console.log({status})

      if (status === 200) {
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
          <Button colorScheme="blue" size="md" type="submit" isLoading={isSubmitting}>
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
          <FormControl isInvalid={Boolean(errors.company)}>
            <FormLabel>Company</FormLabel>
            <Input type="text" {...register('company')} />
          </FormControl>
          <FormControl isInvalid={Boolean(errors.title)}>
            <FormLabel>Job Title</FormLabel>
            <Input type="text" {...register('title')} />
          </FormControl>
        </HStack>

        <HStack gap={4} w="100%" flexDir={{base: 'column', md: 'row'}}>
          <FormControl isInvalid={Boolean(errors.startMonth)}>
            <FormLabel>Start Month</FormLabel>
            <DatePicker control={control as Control<any>} {...register('startMonth')} />
          </FormControl>
          <FormControl isInvalid={Boolean(errors.endMonth)}>
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
              minDate={new Date(startMonth!)}
              disabled={!!current}
              {...register('endMonth')}
            />
          </FormControl>
        </HStack>
      </VStack>
    </Modal>
  )
}
