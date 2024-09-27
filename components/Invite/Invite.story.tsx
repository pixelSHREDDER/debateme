import type { Meta, StoryObj } from '@storybook/react'
import { http, HttpResponse, delay } from 'msw'
import { UserProfile } from '@auth0/nextjs-auth0/client'
import { createDebates } from '@/mocks/debates'
import { getUsers } from '@/mocks/users'
import Invite from './Invite'

const meta: Meta<typeof Invite> = {
  title: 'Invite',
  component: Invite,
}

export default meta

type Story = StoryObj<typeof Invite>

const UserData: UserProfile = getUsers()[0]
const debates = createDebates()

const loginHandler = http.get('http://localhost:6006/api/auth/me', () => HttpResponse.json(UserData))

export const InviteYourOpponent: Story = {
  args: {
    debateId: debates[0].id,
  },
  parameters: {
    msw: {
      handlers: [
        loginHandler,
      ],
    },
  },
}

export const Loading: Story = {
  args: InviteYourOpponent.args,
  parameters: {
    msw: {
      handlers: [
        http.get(
          'http://localhost:6006/api/auth/me',
          async () => { await delay('infinite') }),
      ],
    },
  },
}

export const Error: Story = {
  args: InviteYourOpponent.args,
  parameters: {
    msw: {
      handlers: [
        http.get(
          'http://localhost:6006/api/auth/me',
          () => new HttpResponse('An error has occurred.', { status: 403 })
        ),
      ],
    },
  },
}

export const NotFound: Story = {
  args: {
    debateId: -1,
  },
  parameters: InviteYourOpponent.parameters,
}

export const LoggedOut: Story = {
  args: InviteYourOpponent.args,
  parameters: {
    msw: {
      handlers: [
        http.get('http://localhost:6006/api/auth/me', async () => {
          await delay(800)
          return new HttpResponse(null, {
            status: 403,
          })
        }),
      ],
    },
  },
}
