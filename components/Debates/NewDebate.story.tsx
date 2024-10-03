import type { Meta, StoryObj } from '@storybook/react'
import { getUsers } from '@/mocks/users'
import { UserProfile } from '@auth0/nextjs-auth0/client'
import { http, HttpResponse } from 'msw'
import NewDebate from './NewDebate'

const meta: Meta<typeof NewDebate> = {
  title: 'New Debate',
  component: NewDebate,
}

export default meta

type Story = StoryObj<typeof NewDebate>

const UserData: UserProfile = getUsers()[0]

const loginHandler = http.get('http://localhost:6006/api/auth/me', () => HttpResponse.json(UserData))

export const CreateNewDebate: Story = {
  parameters: {
    msw: {
      handlers: [
        loginHandler,
      ],
    },
  },
}
