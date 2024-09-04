import type { Meta, StoryObj } from '@storybook/react'
import { http, HttpResponse, delay } from 'msw'
import { UserProfile } from '@auth0/nextjs-auth0/client'
import { createDebates } from '@/mocks/debates'
import { getUsers } from '@/mocks/users'
import Debate from './Debate'

const meta: Meta<typeof Debate> = {
  title: 'Debate',
  component: Debate,
}

export default meta

type Story = StoryObj<typeof Debate>

const UserData: UserProfile = getUsers()[0]
const debates = createDebates()
const updateDebate = () => {}

const loginHandler = http.get('http://localhost:6006/api/auth/me', () => HttpResponse.json(UserData))

export const YourTurn: Story = {
  args: {
    debate: debates[0],
    updateDebate,
  },
  parameters: {
    msw: {
      handlers: [
        loginHandler,
      ],
    },
  },
}

export const OpponentsTurn: Story = {
  args: {
    debate: debates[1],
    updateDebate,
  },
  parameters: YourTurn.parameters,
}

export const WaitForCooldown: Story = {
  args: {
    debate: debates[2],
    updateDebate,
  },
  parameters: YourTurn.parameters,
}

export const NoOpponent: Story = {
  args: {
    debate: debates[3],
    updateDebate,
  },
  parameters: YourTurn.parameters,
}

export const InvitedToJoin: Story = {
  args: {
    debate: debates[4],
    updateDebate,
  },
  parameters: YourTurn.parameters,
}

export const Loading: Story = {
  args: YourTurn.args,
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
  args: YourTurn.args,
  parameters: {
    msw: {
      handlers: [
        http.get(
          'http://localhost:6006/api/auth/me',
          () => new HttpResponse(null, { status: 403 })
        ),
      ],
    },
  },
}

export const NotFound: Story = {
  args: {
    debate: null,
    updateDebate,
  },
  parameters: YourTurn.parameters,
}

export const LoggedOut: Story = {
  args: YourTurn.args,
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
