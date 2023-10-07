'use client'

import { Modal, type ModalProps } from '@/components/Modal'

export const NewStoryModal: React.FC<Omit<ModalProps, 'children'>> = ({
  ...props
}) => {
  return (
    <Modal title="New Story" size={{ base: 'full', md: '2xl' }} {...props}>
      New story modal
    </Modal>
  )
}
