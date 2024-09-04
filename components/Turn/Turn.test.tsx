import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest'
import { render } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import { createTurns } from '@/mocks/turns'
import Turn from './Turn'

const turns = createTurns()

describe('Turn component', () => {
  beforeEach(() => {
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  describe('Your turn', () => {
    test('renders correctly', () => {
      const { container } = render(
        <Turn createdAt={turns[0].createdAt} isOpponent={false}>
          <div dangerouslySetInnerHTML={{ __html: turns[0].body }} />
        </Turn>,
        { wrapper: ProviderWrapper },
      )
      expect(container).toMatchSnapshot()
    })
  })

  describe('Opponent\'s turn', () => {
    test('renders correctly', () => {
      const { container } = render(
        <Turn createdAt={turns[0].createdAt} isOpponent={true}>
          <div dangerouslySetInnerHTML={{ __html: turns[0].body }} />
        </Turn>,
        { wrapper: ProviderWrapper },
    )
      expect(container).toMatchSnapshot()
    })
  })
})
