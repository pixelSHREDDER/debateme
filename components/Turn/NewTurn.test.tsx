import * as auth0Hooks from '@auth0/nextjs-auth0/client'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import { getUsers } from '@/mocks/users'
import { createDebates } from '@/mocks/debates'
import NewTurn from './NewTurn'

const debates = createDebates()
const users: auth0Hooks.UserProfile[] = getUsers()

describe('New Turn component', () => {
  const useFormStateSpy = vi.spyOn(auth0Hooks, 'useUser')
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

  describe('New Turn', () => {
    test('renders correctly', () => {
      render(
        <NewTurn debate={debates[0]} onSubmit={vi.fn()} />,
        { wrapper: ProviderWrapper },
      )
      expect(screen).toMatchSnapshot()
    })
  })
})
