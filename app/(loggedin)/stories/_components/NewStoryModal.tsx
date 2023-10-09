'use client'

import { ControlledSingleSelect } from '@/components/Form'
import type { ModalProps } from '@/components/Modal'
import { Modal } from '@/components/Modal'
import { RoleRow } from '@/db/types'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  ModalFooter,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { useRouter } from 'next/navigation'
import { useMemo } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

type NewStoryModalProps = {
  roles: RoleRow[]
} & Omit<ModalProps, 'children'>

export const NewStoryModal: React.FC<NewStoryModalProps> = ({
  roles,
  onClose,
  ...props
}) => {
  const toast = useToast()
  const roleOptions = useMemo(
    () =>
      roles.map((r) => ({
        label: `${r.title} @ ${r.company}`,
        value: r.id,
      })),
    [roles]
  )

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
  } = useForm()

  const { refresh } = useRouter()

  const onSubmit = async (values: FieldValues) => {
    if (isValid) {
      const data = await fetch('/api/stories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(values),
      })

      if (data?.status === 200) {
        toast({
          title: 'Story created',
          description: 'Great success!',
          status: 'success',
          duration: 6000,
          isClosable: true,
        })
        reset()
        onClose()
        refresh()
      }
    }
  }

  return (
    <Modal
      title="New Story"
      size={{ base: 'full', md: '2xl' }}
      footer={
        <ModalFooter justifyContent="flex-end" p={4}>
          <Button
            colorScheme="blue"
            size="md"
            type="submit"
            isLoading={isSubmitting}>
            Create Story
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
        <ControlledSingleSelect
          name="role_id"
          control={control}
          label="Role"
          placeholder="Select a role"
          options={roleOptions}
        />
        <FormControl
          isInvalid={Boolean(errors.text)}
          aria-invalid={Boolean(errors.text)}
          w="full"
          borderRadius="md"
          _invalid={{
            bg: 'red.50',
          }}>
          <FormLabel>Story</FormLabel>
          <Textarea {...register('text')} minH="200px" />
          {errors.text ? (
            <FormErrorMessage>{errors.text.message as string}</FormErrorMessage>
          ) : null}
        </FormControl>
      </VStack>
    </Modal>
  )
}
