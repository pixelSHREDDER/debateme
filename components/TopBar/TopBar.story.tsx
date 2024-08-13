import type { Meta } from '@storybook/react'
import TopBar from './TopBar'

const meta: Meta<typeof TopBar> = {
  title: 'Top Bar',
}

export default meta

export const Usage = () => <TopBar />
