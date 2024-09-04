import '@mantine/core/styles.css'
import React, { useEffect } from 'react'
import { addons } from '@storybook/preview-api'
import { initialize, mswLoader } from 'msw-storybook-addon'
import { DARK_MODE_EVENT_NAME } from 'storybook-dark-mode'
import { MantineProvider, useMantineColorScheme } from '@mantine/core'
import { theme } from '../theme'
import { UserProvider } from '@auth0/nextjs-auth0/client'

const channel = addons.getChannel()

initialize()

function ColorSchemeWrapper({ children }: { children: React.ReactNode }) {
  const { setColorScheme } = useMantineColorScheme()
  const handleColorScheme = (value: boolean) => setColorScheme(value ? 'dark' : 'light')

  useEffect(() => {
    channel.on(DARK_MODE_EVENT_NAME, handleColorScheme)
    return () => channel.off(DARK_MODE_EVENT_NAME, handleColorScheme)
  }, [channel])

  return <>{children}</>
}

export const decorators = [
  (renderStory: any) => <ColorSchemeWrapper>{renderStory()}</ColorSchemeWrapper>,
  (renderStory: any) => <MantineProvider theme={theme}>{renderStory()}</MantineProvider>,
  (renderStory: any) => <UserProvider>{renderStory()}</UserProvider>,
]

export const loaders = [mswLoader]
