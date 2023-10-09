'use client'

import { ControlledSingleSelect } from '@/components/Form'
import { Modal, type ModalProps } from '@/components/Modal'
import { storiesUpdateSchema } from '@/db/dbTypes.schemas'
import type { RoleRow } from '@/db/types'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  ModalFooter,
  Textarea,
  VStack
} from '@chakra-ui/react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useRouter } from 'next/navigation'
import { FieldValues, useForm } from 'react-hook-form'
import { z } from 'zod'
import { IStory } from './StoryCard'

type StoryType = z.infer<typeof storiesUpdateSchema>

type EditStoryModalProps = {
  story: IStory
  roleOptions: RoleRow[]
} & Omit<ModalProps, 'children'>

export const EditStoryModal: React.FC<EditStoryModalProps> = ({
  story,
  roleOptions,
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
    resolver: zodResolver(storiesUpdateSchema),
    defaultValues: {
      role_id: story.role_id ?? null,
      text: story.text ?? ''
    }
  })

  const { refresh } = useRouter();

  const onSubmit = async (values: FieldValues) => {
    if (isValid) {
      const data = await fetch(`/api/stories/${story.id}`, {
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
      title="Edit Story"
      size={{ base: 'full', md: '2xl' }}
      footer={
        <ModalFooter justifyContent="flex-end" p={4}>
          <Button
            colorScheme="blue"
            size="md"
            type="submit"
            isLoading={isSubmitting}>
            Save Story
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
          defaultValue={story.role_id}
          getOptionValue={(opt: any) => opt.value}
          label="Role"
          placeholder="Select a role"
          options={roleOptions.map(({ id, company, title }) => ({ label: `${title} @ ${company}`, value: id}))}
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
