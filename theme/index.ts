import { extendTheme } from '@chakra-ui/react'
import { lato } from './fonts'

const theme = extendTheme({
  fonts: {
    body: lato.style.fontFamily,
  },
})

export { theme }
