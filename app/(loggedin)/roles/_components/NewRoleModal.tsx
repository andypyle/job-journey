'use client'

import { DatePicker } from '@/components/Form'
import { Modal, type ModalProps } from '@/components/Modal'
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
import { FieldValues, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'

type RoleType = z.infer<typeof createRoleSchema>

export const NewRoleModal: React.FC<Omit<ModalProps, 'children'>> = ({
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
    if (isValid) {
      const { status } = await fetch('/api/roles', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      });

      if (status === 200) {
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
            <DatePicker control={control} {...register('startMonth')} />
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
              control={control}
              minDate={new Date(startMonth)}
              defaultValue={startMonth ? new Date(startMonth) : null}
              disabled={current}
              {...register('endMonth')}
            />
          </FormControl>
        </HStack>
      </VStack>
    </Modal>
  )
}
