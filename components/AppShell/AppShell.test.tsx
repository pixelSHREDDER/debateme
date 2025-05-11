import { describe, expect, test } from 'vitest'
import { render } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import React from 'react'
import AppShell from './AppShell'

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
