import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  AlertDialogProps,
  Button,
  ButtonProps,
} from '@chakra-ui/react'
import { useRef } from 'react'

type ConfirmProps = {
  title: string | React.ReactNode
  body: string | React.ReactNode
  footer?: React.ReactNode
  onConfirm: () => void
  onConfirmText: string
  onConfirmButtonProps?: ButtonProps
} & Omit<AlertDialogProps, 'leastDestructiveRef' | 'children'>

export const Confirm: React.FC<ConfirmProps> = ({
  title,
  body,
  footer,
  onClose,
  onConfirm,
  onConfirmText,
  onConfirmButtonProps,
  ...props
}) => {
  const cancelRef = useRef(null)

  return (
    <AlertDialog {...props} onClose={onClose} leastDestructiveRef={cancelRef}>
      <AlertDialogOverlay>
        <AlertDialogContent>
          <AlertDialogHeader
            display="flex"
            fontSize="lg"
            fontWeight="bold"
            p={4}
            alignItems="center"
            gap={2}>
            {title}
          </AlertDialogHeader>

          <AlertDialogBody
            p={4}
            alignItems="center"
            justifyContent="center"
            textAlign="center">
            {body}
          </AlertDialogBody>

          <AlertDialogFooter gap={4} p={4}>
            <Button ref={cancelRef} onClick={onClose} minW="130px">
              Cancel
            </Button>
            <Button
              colorScheme="red"
              onClick={onConfirm}
              minW="130px"
              {...onConfirmButtonProps}>
              {onConfirmText}
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialogOverlay>
    </AlertDialog>
  )
}
