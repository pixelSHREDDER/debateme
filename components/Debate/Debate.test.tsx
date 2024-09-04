import * as auth0Hooks from '@auth0/nextjs-auth0/client'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import { createDebates } from '@/mocks/debates'
import { getUsers } from '@/mocks/users'
import Debate from './Debate'

const debates = createDebates()
const users: auth0Hooks.UserProfile[] = getUsers()

describe('Debate component', () => {
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

  test('renders correctly', () => {
    render(
      <Debate debate={debates[0]} updateDebate={vi.fn()} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.getByTestId('debate-section')).toMatchSnapshot()
  })

  test('renders invite link screen correctly', () => {
    render(
      <Debate debate={debates[3]} updateDebate={vi.fn()} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.getByTestId('invite-section')).toMatchSnapshot()
  })

  test('hides New Turn and renders cooldown message correctly', () => {
    render(
      <Debate debate={debates[2]} updateDebate={vi.fn()} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.getByTestId('debate-section')).toMatchSnapshot()
  })

  test('does not render debate if user is loading', () => {
    useUserSpy.mockReturnValueOnce({
      checkSession: vi.fn(),
      isLoading: true,
      user: users[0],
    })
    render(
      <Debate debate={debates[0]} updateDebate={vi.fn()} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.queryByTestId).toBeNull
  })

  test('does not render debate if user has an error', () => {
    useUserSpy.mockReturnValueOnce({
      checkSession: vi.fn(),
      error: new Error(),
      isLoading: false,
      user: users[0],
    })
    render(
      <Debate debate={debates[0]} updateDebate={vi.fn()} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.queryByTestId).toBeNull
  })

  test('does not render debate if user is not defined', () => {
    useUserSpy.mockReturnValueOnce({
      checkSession: vi.fn(),
      isLoading: false,
    })
    render(
      <Debate debate={debates[0]} updateDebate={vi.fn()} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.queryByTestId).toBeNull
  })

  test('does not render debate if debate is not defined', () => {
    render(
      <Debate debate={undefined as any} updateDebate={vi.fn()} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.queryByTestId).toBeNull
  })
})
