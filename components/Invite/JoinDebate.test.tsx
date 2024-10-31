import * as auth0Hooks from '@auth0/nextjs-auth0/client'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import { getUsers } from '@/mocks/users'
import JoinDebate from './JoinDebate'

const users: auth0Hooks.UserProfile[] = getUsers()

describe('Join Debate component', () => {
  const useUserSpy = vi.spyOn(auth0Hooks, 'useUser')

  beforeEach(() => {
    vi.useFakeTimers()
    useUserSpy.mockReturnValue({
      checkSession: vi.fn(),
      isLoading: false,
      user: users[0],
    })
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Join Debate', () => {
    test('renders correctly', () => {
      render(
        <JoinDebate debateId={4} inviteId="" />,
        { wrapper: ProviderWrapper },
      )
      expect(screen.getByTestId('join-section')).toMatchSnapshot()
    })

    test('does not render if user is loading', () => {
      useUserSpy.mockReturnValueOnce({
        checkSession: vi.fn(),
        isLoading: true,
        user: users[0],
      })
      render(
        <JoinDebate debateId={4} inviteId="" />,
        { wrapper: ProviderWrapper },
      )
      expect(screen.queryByTestId('join-section')).toBeNull
    })

    test('does not render if user is not defined', () => {
      useUserSpy.mockReturnValueOnce({
        checkSession: vi.fn(),
        isLoading: false,
      })
      render(
        <JoinDebate debateId={4} inviteId="" />,
        { wrapper: ProviderWrapper },
      )
      expect(screen.queryByTestId('join-section')).toBeNull
    })
  })

  describe('Joining debate', () => {
    test('joins debate when button is clicked', async () => {
      render(
        <JoinDebate debateId={4} inviteId="" />,
        { wrapper: ProviderWrapper },
      )
      fireEvent.submit(screen.getByTestId('join-debate-form'))
    })
  })
})
