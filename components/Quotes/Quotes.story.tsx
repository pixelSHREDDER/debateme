import type { Meta, StoryObj } from '@storybook/react'
import Quotes from './Quotes'

const meta: Meta<typeof Quotes> = {
  title: 'Quotes',
  component: Quotes,
}

export default meta

type Story = StoryObj<typeof Quotes>

export const Quote: Story = {}
