'use client'

import { Confirm } from '@/components/Confirm'
import { RoleRow, StoryRow, TagRow } from '@/db/types'
import type { CardProps } from '@chakra-ui/react'
import {
  Badge,
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  HStack,
  Heading,
  Icon,
  IconButton,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverTrigger,
  Tag,
  Text,
  Wrap,
  useDisclosure,
  useToast,
} from '@chakra-ui/react'
import {
  IconAlertTriangle,
  IconEye,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { EditStoryModal } from './EditStoryModal'

export interface IStory extends StoryRow {
  roles: RoleRow
  tags: TagRow[]
}

type StoryCardProps = {
  storyRow: IStory
  allRoles: RoleRow[]
  allTags: TagRow[]
} & CardProps

export const StoryCard: React.FC<Omit<StoryCardProps, 'user_id'>> = ({
  storyRow,
  allRoles,
  allTags,
  ...props
}) => {
  const { id, text, roles, tags, similarity } = storyRow
  const [loading, setLoading] = useState<boolean>(false)
  const toast = useToast()

  const { refresh } = useRouter()

  const {
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
    isOpen: isDeleteOpen,
  } = useDisclosure()

  const {
    onOpen: onEditOpen,
    onClose: onEditClose,
    isOpen: isEditOpen,
  } = useDisclosure()

  const onDeleteStory = useCallback(async () => {
    setLoading(true)
    const deleted = await fetch(`/api/stories/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { status } = await deleted.json()

    if (status === 204) {
      toast({
        title: 'Story deleted',
        description: 'Successfully removed story',
        status: 'success',
        duration: 6000,
        isClosable: true,
      })
      setLoading(false)
      onDeleteClose()
      refresh()
    }
  }, [id, refresh, onDeleteClose, toast])

  return (
    <Card {...props} shadow="none" gap={0}>
      <CardHeader p={4}>
        <Heading size="sm" mb={2} display="flex" justifyContent="space-between">
          {roles.company}
        </Heading>
        <Badge size="xs" colorScheme="orange" borderRadius="xl" px={4} py={1}>
          {roles.title}
        </Badge>
      </CardHeader>
      <CardBody p={4}>
        <Text noOfLines={4} size="xs" color="gray.500" gap={2}>
          {text}
        </Text>
        <HStack justifyContent="flex-end">
          <Popover>
            <PopoverTrigger>
              <Icon
                as={IconEye}
                boxSize={6}
                color="teal.200"
                cursor="pointer"
                _hover={{ color: 'teal.400' }}
              />
            </PopoverTrigger>
            <PopoverContent p={2}>
              <PopoverArrow />
              <PopoverCloseButton />
              <PopoverBody>
                <Text size="lg" color="gray.800" gap={2}>
                  {text}
                </Text>
              </PopoverBody>
            </PopoverContent>
          </Popover>
        </HStack>
      </CardBody>
      <CardFooter justifyContent="space-between" alignItems="flex-end" p={4}>
        <Wrap>
          {storyRow.tags.map((t) => (
            <Tag
              colorScheme="cyan"
              variant="subtle"
              key={`story-${id}-tag-${t.id}`}
            >
              {t.name}
            </Tag>
          ))}
        </Wrap>
        <ButtonGroup spacing={2} size="xs">
          <IconButton
            aria-label={`Remove story: ${roles.company}`}
            variant="ghost"
            colorScheme="red"
            onClick={onDeleteOpen}
            icon={<IconTrash />}
          />
          <IconButton
            aria-label={`Edit story: ${roles.company}`}
            variant="ghost"
            colorScheme="blue"
            onClick={onEditOpen}
            icon={<IconPencil />}
          />
        </ButtonGroup>
      </CardFooter>
      {isDeleteOpen ? (
        <Confirm
          title={
            <>
              <Icon as={IconAlertTriangle} color="red" boxSize={7} />
              Delete Story
            </>
          }
          body={
            <>
              <Text fontSize="md">
                Deleting <strong>{roles.title}</strong> story at{' '}
                <strong>{roles.company}</strong>
              </Text>
              <Text fontSize="md" color="red.600" mt={4}>
                Are you sure? This <i>cannot</i> be undone.
              </Text>
            </>
          }
          onClose={onDeleteClose}
          isOpen={isDeleteOpen}
          onConfirm={onDeleteStory}
          onConfirmButtonProps={{
            isLoading: loading,
          }}
          onConfirmText="Delete Story"
        />
      ) : null}
      {isEditOpen ? (
        <EditStoryModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          story={storyRow}
          allRoles={allRoles}
          tagOptions={allTags}
        />
      ) : null}
    </Card>
  )
}
