import * as auth0Hooks from '@auth0/nextjs-auth0/client'
import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { fireEvent, render, screen } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import { getUsers } from '@/mocks/users'
//import {userEvent} from '@testing-library/user-event'
import { createDebates } from '@/mocks/debates'
import NewTurn from './NewTurn'

const debates = createDebates()
const users: auth0Hooks.UserProfile[] = getUsers()

// TODO: Circle back on mocking Editor
/*vi.mock('@/components/Editor/Editor', () => ({
  default: vi.fn((onUpdate: ChangeEventHandler<HTMLInputElement>) => <input type="text" data-testid="editor-input" onChange={onUpdate} />),
}))*/

describe('New Turn component', () => {
  //const useFormStateSpy = vi.spyOn(reactDom, 'useFormState')
  const useUserSpy = vi.spyOn(auth0Hooks, 'useUser')

  beforeEach(() => {
    vi.useFakeTimers()
    useUserSpy.mockReturnValue({
      checkSession: vi.fn(),
      isLoading: false,
      user: users[0],
    })
    //useFormStateSpy.mockImplementation(() => ([{}, vi.fn(), false]))
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
      expect(screen.getByTestId('new-turn-form')).toMatchSnapshot()
    })

    test('does not render if user is loading', () => {
      useUserSpy.mockReturnValueOnce({
        checkSession: vi.fn(),
        isLoading: true,
        user: users[0],
      })
      render(
        <NewTurn debate={debates[0]} onSubmit={vi.fn()} />,
        { wrapper: ProviderWrapper },
      )
      expect(screen.queryByTestId('new-turn-form')).toBeNull
    })

    test('does not render if user is not defined', () => {
      useUserSpy.mockReturnValueOnce({
        checkSession: vi.fn(),
        isLoading: false,
      })
      render(
        <NewTurn debate={debates[0]} onSubmit={vi.fn()} />,
        { wrapper: ProviderWrapper },
      )
      expect(screen.queryByTestId('new-turn-form')).toBeNull
    })
  })

  describe('Submitting new turn', () => {
    test('submits new turn when button is clicked', async () => {
      //const user = userEvent.setup()
      const onSubmit = vi.fn()
      render(
        <NewTurn debate={debates[0]} onSubmit={onSubmit} />,
        { wrapper: ProviderWrapper },
      )
      //const submit = screen.getByTestId('derp')
      //fireEvent.click(submit)
      //await user.click(submit)
      fireEvent.submit(screen.getByTestId('new-turn-form'))
      //act(() => vi.advanceTimersByTime(1000))
      //await user.click(screen.getByTestId('derp'))

      //expect(onSubmit).toHaveBeenCalled()
    })
  })

  /*describe('Editor updates', () => {
    test('updates body ref when Editor contents are changed', async () => {
      render(
        <NewTurn debate={debates[0]} onSubmit={vi.fn()} />,
        { wrapper: ProviderWrapper },
      )
      const user = userEvent.setup()
      const editor = await screen.findByTestId('editor-input')

      expect(editor).not.toBeNull

      await user.type(editor, 'New content')
      // eslint-disable-next-line testing-library/no-node-access
      *//*fireEvent.change(editor.getElementsByTagName('p')[0], {
        target: { textContent: 'New content' },
      })*//*

      expect(editor).toMatchInlineSnapshot(`
          <p>
            New content
          </p>
      `)

        //expect(mockOnChange).toHaveBeenCalledTimes(11)
        //expect(mockOnChange).toHaveBeenCalledWith('<p>New content</p>')
    })
  })*/
})
