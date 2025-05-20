import type { Meta, StoryObj } from '@storybook/react'
import { createTurns } from '@/mocks/turns'
import Turn from './Turn'

const meta: Meta<typeof Turn> = {
  title: 'Turn',
  component: Turn,
}

const turns = createTurns()

export default meta

type Story = StoryObj<typeof Turn>

export const YourTurn: Story = {
  args: {
    body: turns[0].body || '',
    createdAt: turns[0].createdAt,
    isOpponent: false,
  },
}

export const OpponentsTurn: Story = {
  args: {
    body: turns[1].body || '',
    createdAt: turns[1].createdAt,
    isOpponent: true,
  },
}
