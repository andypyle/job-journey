import { Providers } from '@/components'
import { Container } from '@chakra-ui/react'
import '../globals.css'

export default function RootLoggedInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, maximum-scale=1, initial-scale=1, width=device-width, user-scalable=0"
        />
      </head>
      <body>
        <Providers>
          <Container
            maxW="full"
            height="full"
            justifyContent="center"
            alignItems="center"
            centerContent>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  )
}
