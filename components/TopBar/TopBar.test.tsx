import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import TopBar from './TopBar'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'

describe('Top Bar component', () => {
  test('renders correctly', () => {
    const element = render(<TopBar />, { wrapper: ProviderWrapper })
    expect(element.container).toMatchSnapshot()
  });
})
