import type { Meta, StoryObj } from '@storybook/react'
import FormAlert from './FormAlert'

const meta: Meta<typeof FormAlert> = {
  title: 'Form Alert',
  component: FormAlert,
}

export default meta

type Story = StoryObj<typeof FormAlert>

export const Success: Story = {
  args: {
    message: 'Your action was completed successfully.',
    title: 'Success!',
    type: 0,
  },
}

export const Warning: Story = {
  args: {
    message: 'Are you sure you want to perform this action?',
    title: 'Warning',
    type: 1,
  },
}

export const Error: Story = {
  args: {
    message: 'Sorry, we couldn\'t perform this action.',
    title: 'Error',
    type: 2,
  },
}
