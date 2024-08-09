import { theme } from '@/theme'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { MantineProvider } from '@mantine/core'

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <UserProvider>
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  </UserProvider>
)

export default ProviderWrapper
