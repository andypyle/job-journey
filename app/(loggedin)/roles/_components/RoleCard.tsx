'use client'

import { Confirm } from '@/components/Confirm'
import { RoleRow } from '@/db/types'
import type { CardProps } from '@chakra-ui/react'
import {
  ButtonGroup,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Icon,
  IconButton,
  Text,
  useDisclosure,
} from '@chakra-ui/react'
import {
  IconAlertTriangle,
  IconArrowBigRight,
  IconPencil,
  IconTrash,
} from '@tabler/icons-react'
import { format } from 'date-fns'
import { useRouter } from 'next/navigation'
import { useCallback, useState } from 'react'
import { EditRoleModal } from './EditRoleModal'

type RoleCardProps = {
  roleRow: RoleRow
} & CardProps

export const RoleCard: React.FC<RoleCardProps> = ({ roleRow, ...props }) => {
  const { id, company, title, startMonth, endMonth, current } = roleRow
  const [loading, setLoading] = useState<boolean>(false)

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

  const onDeleteRole = useCallback(async () => {
    setLoading(true)
    const deleted = await fetch(`/api/roles/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })

    const { status } = await deleted.json()

    if (status === 204) {
      setLoading(false)
      onDeleteClose()
      refresh()
    }
  }, [id, refresh, onDeleteClose])

  return (
    <Card {...props} shadow="none" gap={0}>
      <CardHeader p={4}>
        <Heading size="sm">{company}</Heading>
        <Text size="xs" color="gray.600">
          {title}
        </Text>
      </CardHeader>
      <CardBody p={4}>
        <Text size="xs" color="gray.500" display="flex" gap={2}>
          {format(new Date(startMonth), 'MMM, yyyy')}
          <IconArrowBigRight />
          {current ? 'Present' : format(new Date(endMonth!), 'MMM, yyyy')}
        </Text>
      </CardBody>
      <CardFooter justifyContent="flex-end" p={4}>
        <ButtonGroup spacing={2} size="xs">
          <IconButton
            aria-label={`Remove role: ${company}`}
            variant="ghost"
            colorScheme="red"
            onClick={onDeleteOpen}
            icon={<IconTrash />}
          />
          <IconButton
            aria-label={`Edit role: ${company}`}
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
              Delete Role
            </>
          }
          body={
            <>
              <Text fontSize="md">
                Deleting <strong>{title}</strong> role at{' '}
                <strong>{company}</strong>
              </Text>
              <Text fontSize="md" color="red.600" mt={4}>
                Are you sure? This <i>cannot</i> be undone.
              </Text>
            </>
          }
          onClose={onDeleteClose}
          isOpen={isDeleteOpen}
          onConfirm={onDeleteRole}
          onConfirmButtonProps={{
            isLoading: loading,
          }}
          onConfirmText="Delete Role"
        />
      ) : null}
      {isEditOpen ? (
        <EditRoleModal
          isOpen={isEditOpen}
          onClose={onEditClose}
          role={roleRow}
        />
      ) : null}
    </Card>
  )
}
