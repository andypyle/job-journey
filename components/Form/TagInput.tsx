import { FormControl, FormErrorMessage, FormLabel } from '@chakra-ui/react'
import {
  CreatableSelect,
  GroupBase,
  Props as SelectProps,
} from 'chakra-react-select'
import { FieldValues, UseControllerProps, useController } from 'react-hook-form'

interface TagInputProps<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
> extends Omit<SelectProps<Option, IsMulti, Group>, 'name' | 'defaultValue'>,
    UseControllerProps<FormValues> {
  label?: string
  labelRight?: React.ReactNode
}

/**
 * An attempt to make a reusable chakra-react-select form component
 *
 * @param props - The combined props of the chakra-react-select component and the useController hook
 */
export function TagInput<
  FormValues extends FieldValues = FieldValues,
  Option = unknown,
  IsMulti extends boolean = boolean,
  Group extends GroupBase<Option> = GroupBase<Option>
>({
  name,
  label,
  labelRight,
  options,
  control,
  rules,
  shouldUnregister,
  ...selectProps
}: TagInputProps<FormValues, Option, IsMulti, Group>) {
  const {
    field,

    fieldState: { error },
  } = useController<FormValues>({
    name,
    control,
    rules,
    shouldUnregister,
  })

  return (
    <FormControl label={label} isInvalid={!!error} id={name}>
      {label && (
        <FormLabel display="flex" w="full" justifyContent="space-between">
          {label}
          {labelRight && labelRight}
        </FormLabel>
      )}
      <CreatableSelect<Option, IsMulti, Group>
        options={options}
        tagVariant="subtle"
        colorScheme="cyan"
        {...selectProps}
        {...field}
      />
      <FormErrorMessage>{error?.message}</FormErrorMessage>
    </FormControl>
  )
}
