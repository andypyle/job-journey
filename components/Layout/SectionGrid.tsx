import { Grid } from '@chakra-ui/react'

export const SectionGrid: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => (
  <Grid
    gridTemplateColumns={{
      base: '1fr',
      md: 'repeat(2, 1fr)',
      xl: 'repeat(3, 1fr)',
      '2xl': 'repeat(4, 1fr)',
    }}
    gap={4}
    w="full">
    {children}
  </Grid>
)
