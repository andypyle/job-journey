import { Providers } from '@/components'
import { createServerClient } from '@/db'
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

  if (!session) return redirect('/login')
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
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
