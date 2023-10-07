'use client'

import { Modal, type ModalProps } from '@/components/Modal'
import { Select } from 'chakra-react-select'

export const NewStoryModal: React.FC<Omit<ModalProps, 'children'>> = ({
  ...props
}) => {
  return (
    <Modal title="New Story" size={{ base: 'full', md: '2xl' }} {...props}>
      <Select options={['one', 'two', 'three']} />
    </Modal>
  )
}
