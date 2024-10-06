import { expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import Home from './page'

test('Home', () => {
  render(<Home />, { wrapper: ProviderWrapper })
  expect(screen.getByRole('main')).toBeDefined()
})
