import * as auth0Hooks from '@auth0/nextjs-auth0/client'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import { getUsers } from '@/mocks/users'
import { createDebates } from '@/mocks/debates'
import * as reactDom from 'react-dom'
import NewTurn from './NewTurn'

const debates = createDebates()
const users: auth0Hooks.UserProfile[] = getUsers()

describe('New Turn component', () => {
  /*vi.mock('react-dom', () => ({
      ...vi.requireActual('react-dom'),
      useFormStatus: vi.fn(),
    }))*/

  const useFormStateSpy = vi.spyOn(reactDom, 'useFormState')
  const useUserSpy = vi.spyOn(auth0Hooks, 'useUser')

  beforeEach(() => {
    vi.useFakeTimers()
    useUserSpy.mockReturnValue({
      checkSession: vi.fn(),
      isLoading: false,
      user: users[0],
    })
    useFormStateSpy.mockImplementation(() => ([{}, vi.fn(), false]))
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
