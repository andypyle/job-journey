'use client'

import {
  Button,
  Modal as ChakraModal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalContentProps,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  type ModalProps as ChakraModalProps,
} from '@chakra-ui/react'

export type ModalProps = {
  title?: string
  footer?: React.ReactNode
  isLoading?: boolean
  onAction?: () => void
  buttonText?: string
  asForm?: ModalContentProps
} & ChakraModalProps

export const Modal: React.FC<ModalProps> = ({
  title,
  footer,
  isLoading,
  onAction,
  buttonText,
  children,
  asForm,
  ...props
}) => {
  return (
    <ChakraModal {...props}>
      <ModalOverlay />
      <ModalContent {...asForm}>
        {title ? <ModalHeader>{title}</ModalHeader> : null}
        <ModalCloseButton />
        <ModalBody>{children}</ModalBody>

        {footer ? (
          footer
        ) : (
          <ModalFooter>
            <Button colorScheme="blue" size="md" onClick={onAction}>
              {buttonText ?? 'Save'}
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </ChakraModal>
  )
}
