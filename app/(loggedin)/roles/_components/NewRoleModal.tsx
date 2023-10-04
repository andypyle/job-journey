'use client'

import { Modal, type ModalProps } from '@/components/Modal'

export const NewRoleModal: React.FC<Omit<ModalProps, 'children'>> = ({
  ...props
}) => {
  return (
    <Modal title="New Role" size="2xl" {...props}>
      New Role!
    </Modal>
  )
}
