import { MantineProvider, ColorSchemeScript } from '@mantine/core'
import type { Metadata } from 'next'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import '@mantine/core/styles.css'
import './globals.css'
import AppShell from '@/components/AppShell/AppShell'
import { theme } from '../theme'

export const metadata: Metadata = {
  title: 'Debate.me',
  description: 'The debate-focused cure for the common comment thread',
  manifest: '/site.webmanifest',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <ColorSchemeScript />
      </head>
      <UserProvider>
        <body>
          <MantineProvider theme={theme}>
            <AppShell>
              {children}
            </AppShell>
          </MantineProvider>
        </body>
      </UserProvider>
    </html>
  )
}
