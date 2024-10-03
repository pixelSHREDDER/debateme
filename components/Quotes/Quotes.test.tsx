import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import Quotes from './Quotes'

describe('Quotes component', () => {
  test('renders correctly', () => {
    render(
      <Quotes />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.getByRole('alert')).toMatchSnapshot()
  })
})
