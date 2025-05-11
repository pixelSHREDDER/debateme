import type { Meta } from '@storybook/react'
import React from 'react'
import AppShell from './AppShell'

const meta: Meta<typeof AppShell> = {
  title: 'App Shell',
}

export default meta

export const Usage = () => <AppShell><p>App Shell main content</p></AppShell>
