import * as auth0Hooks from '@auth0/nextjs-auth0/client'
import { afterAll, beforeAll, beforeEach, describe, expect, test, vi } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProviderWrapper, { InviteIdProviderWrapper } from '@/tests/helpers/ProviderWrapper'
import { createDebates } from '@/mocks/debates'
import { getUsers } from '@/mocks/users'
import Debate from './Debate'

const debates = createDebates()
const users: auth0Hooks.UserProfile[] = getUsers()

describe('Debate component', () => {
  const useUserSpy = vi.spyOn(auth0Hooks, 'useUser')

  beforeAll(() => {
    const date = new Date('2024-04-13T12:25:02Z')
    vi.setSystemTime(date)
  })

  beforeEach(() => {
    useUserSpy.mockReturnValue({
      checkSession: vi.fn(),
      isLoading: false,
      user: users[0],
    })
  })

  afterAll(() => {
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

  test('shows alert when user attempts to join debate without using invite link', () => {
    render(
      <Debate debate={debates[4]} updateDebate={vi.fn()} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.getByTestId('debate-no-invite-link-alert')).not.toBeNull()
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

  test('does not render debate if invite id is not in the URL', () => {
    render(
      <Debate debate={debates[0]} updateDebate={vi.fn()} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.queryByTestId).toBeNull
  })
})
