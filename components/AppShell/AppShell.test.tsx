import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import AppShell from './AppShell'
import React from 'react'

describe('App Shell component', () => {
  test('renders correctly', () => {
    const { container } = render(
      <AppShell>
        <p>test main content</p>
      </AppShell>,
      { wrapper: ProviderWrapper })
    expect(container).toMatchSnapshot()
  })
})
