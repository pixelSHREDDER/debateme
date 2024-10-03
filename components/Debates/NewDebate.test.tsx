import * as auth0Hooks from '@auth0/nextjs-auth0/client'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import { getUsers } from '@/mocks/users'
import NewDebate from './NewDebate'

const users: auth0Hooks.UserProfile[] = getUsers()

describe('New Debate component', () => {
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

  describe('New Debate', () => {
    test('renders correctly', () => {
      render(
        <NewDebate />,
        { wrapper: ProviderWrapper },
      )
      expect(screen.getByTestId('new-debate-form')).toMatchSnapshot()
    })

    test('does not render if user is loading', () => {
      useUserSpy.mockReturnValueOnce({
        checkSession: vi.fn(),
        isLoading: true,
        user: users[0],
      })
      render(
        <NewDebate />,
        { wrapper: ProviderWrapper },
      )
      expect(screen.queryByTestId('new-debate-form')).toBeNull
    })

    test('does not render if user is not defined', () => {
      useUserSpy.mockReturnValueOnce({
        checkSession: vi.fn(),
        isLoading: false,
      })
      render(
        <NewDebate />,
        { wrapper: ProviderWrapper },
      )
      expect(screen.queryByTestId('new-debate-form')).toBeNull
    })
  })

  describe('Submitting new debate', () => {
    test('submits new debate when button is clicked', async () => {
      render(
        <NewDebate />,
        { wrapper: ProviderWrapper },
      )
      fireEvent.submit(screen.getByTestId('new-debate-form'))
    })
  })
})
