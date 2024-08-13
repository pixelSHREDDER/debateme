import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import TopBar from './TopBar'

describe('Top Bar component', () => {
  test('renders correctly', () => {
    const { container } = render(<TopBar />, { wrapper: ProviderWrapper })
    expect(container).toMatchSnapshot()
  })
})
