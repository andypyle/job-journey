import { Icon } from '@chakra-ui/icon'
import { Heading } from '@chakra-ui/layout'
import { forwardRef } from '@chakra-ui/system'
import {
  IconChevronLeft,
  IconChevronRight,
  IconChevronsLeft,
  IconChevronsRight,
} from '@tabler/icons-react'
import { format } from 'date-fns'
import 'react-calendar/dist/Calendar.css'
import ReactDatepicker from 'react-date-picker'
import 'react-date-picker/dist/DatePicker.css'
import type { ControllerProps } from 'react-hook-form'
import { Controller } from 'react-hook-form'
import './DatePicker.css'

type DatePickerProps = {
  minDate?: Date
} & Omit<ControllerProps, 'render'>

export const DatePicker: React.FC<Omit<DatePickerProps, 'render'>> = forwardRef(
  ({ control, name, minDate, defaultValue = '', disabled = false }, ref) => {
    return (
      <Controller
        render={({ field: { ref, ...fieldProps } }) => {
          return (
            <ReactDatepicker
              {...fieldProps}
              inputRef={ref}
              nextLabel={<Icon as={IconChevronRight} boxSize={4} />}
              next2Label={<Icon as={IconChevronsRight} boxSize={4} />}
              prevLabel={<Icon as={IconChevronLeft} boxSize={4} />}
              prev2Label={<Icon as={IconChevronsLeft} boxSize={4} />}
              navigationLabel={({ label, view }) => (
                <Heading size="sm">{label}</Heading>
              )}
              formatMonth={(locale, date) => format(date, 'MMM')}
              minDetail="month"
              maxDetail="year"
              minDate={minDate}
              defaultValue={defaultValue}
              disabled={disabled}
            />
          )
        }}
        name={name}
        control={control}
        defaultValue={defaultValue}
      />
    )
  }
)
