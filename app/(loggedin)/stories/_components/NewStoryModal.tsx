'use client'

import { ControlledSingleSelect, TagInput } from '@/components/Form'
import type { ModalProps } from '@/components/Modal'
import { Modal } from '@/components/Modal'
import { RoleRow, TagRow } from '@/db/types'
import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Icon,
  IconButton,
  ModalFooter,
  Textarea,
  VStack,
  useToast,
} from '@chakra-ui/react'
import { IconBrandOpenai } from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useCallback, useMemo, useState } from 'react'
import type { FieldValues } from 'react-hook-form'
import { useForm } from 'react-hook-form'

type NewStoryModalProps = {
  allRoles: RoleRow[]
  allTags: TagRow[]
} & Omit<ModalProps, 'children'>

export const NewStoryModal: React.FC<NewStoryModalProps> = ({
  allRoles,
  allTags,
  onClose,
  ...props
}) => {
  const [loadingGpt, setLoadingGpt] = useState<boolean>(false)
  const toast = useToast()
  const roleOptions = useMemo(
    () =>
      allRoles.map((r) => ({
        label: `${r.title} @ ${r.company}`,
        value: r.id,
      })),
    [allRoles]
  )

  const tagOptions = useMemo(
    () =>
      allTags.map((t) => ({
        label: t.name,
        value: t.id,
      })),
    [allTags]
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

  const onClickGpt = useCallback(async () => {
    setLoadingGpt(true)
    const currentFormData = getValues()

    const data = await fetch('/api/gpt', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        roles: allRoles.find(({ id }) => id === currentFormData.role_id),
        ...currentFormData,
      }),
    }).then((d) => d.json())
    setLoadingGpt(false)

    setValue('tags', data)
  }, [])

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
        <TagInput
          name="tags"
          control={control}
          label="Tags"
          labelRight={
            <IconButton
              icon={<Icon as={IconBrandOpenai} boxSize={6} />}
              isLoading={loadingGpt}
              onClick={onClickGpt}
              size="sm"
              colorScheme="purple"
              aria-label="Use OpenAI"
            />
          }
          isDisabled={loadingGpt}
          isLoading={loadingGpt}
          placeholder="Add tags"
          isMulti
          options={tagOptions}
        />
      </VStack>
    </Modal>
  )
}
