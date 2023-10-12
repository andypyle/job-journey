import { Providers } from '@/components'
import { createServerClient } from '@/db'
import { Container } from '@chakra-ui/react'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import '../globals.css'

export default async function RootLoggedInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient(cookies)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (session) return redirect('/')
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, maximum-scale=1, initial-scale=1, width=device-width, user-scalable=0"
        />
        <title>JobJourney | Login</title>
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
