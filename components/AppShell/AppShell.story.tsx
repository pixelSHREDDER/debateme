import type { Meta } from '@storybook/react'
import AppShell from './AppShell'
import React from 'react'

const meta: Meta<typeof AppShell> = {
  title: 'App Shell',
}

export default meta

export const Usage = () => <AppShell><p>App Shell main content</p></AppShell>
