import { Providers } from '@/components'
import { createServerClient } from '@/db'
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import '../globals.css'
import { MainLayout } from './_components'

export const dynamic = 'force-dynamic'

export default async function RootLoggedInLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = createServerClient(cookies)
  const {
    data: { session },
  } = await supabase.auth.getSession()

  if (!session) return redirect('/login')

  const {
    data: { user },
  } = await supabase.auth.getUser()
  return (
    <html lang="en">
      <head>
        <link rel="shortcut icon" href="/favicon.svg" />
        <meta
          name="viewport"
          content="minimum-scale=1, maximum-scale=1, initial-scale=1, width=device-width, user-scalable=0"
        />
        <title>JobJourney</title>
      </head>
      <body>
        <Providers>
          <MainLayout user={user!}>{children}</MainLayout>
        </Providers>
      </body>
    </html>
  )
}
