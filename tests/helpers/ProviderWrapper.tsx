import { theme } from '@/theme'
import { MemoryRouter } from 'react-router-dom'
import { UserProvider } from '@auth0/nextjs-auth0/client'
import { MantineProvider } from '@mantine/core'

const ProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <UserProvider>
    <MantineProvider theme={theme}>
      {children}
    </MantineProvider>
  </UserProvider>
)

const InviteIdProviderWrapper = ({ children }: { children: React.ReactNode }) => (
  <MemoryRouter initialEntries={['?id=1']}>
    <UserProvider>
      <MantineProvider theme={theme}>
        {children}
      </MantineProvider>
    </UserProvider>
  </MemoryRouter>
)

export { InviteIdProviderWrapper }
export default ProviderWrapper
