import { describe, expect, test } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProviderWrapper from '@/tests/helpers/ProviderWrapper'
import FormAlert from './FormAlert'

describe('Form alert component', () => {
  test('renders success alert correctly', () => {
    render(
      <FormAlert message="test success message" title="test success title" type={0} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.getByRole('alert')).toMatchSnapshot()
  })

  test('renders warning alert correctly', () => {
    render(
      <FormAlert message="test warning message" title="test warning title" type={1} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.getByRole('alert')).toMatchSnapshot()
  })

  test('renders error alert correctly', () => {
    render(
      <FormAlert message="test error message" title="test error title" type={2} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.getByRole('alert')).toMatchSnapshot()
  })

  test('Displays correct message for specific errors', () => {
    render(
      <FormAlert message="Please fix the following errors: String must contain at least 1 character(s)" title="" type={2} />,
      { wrapper: ProviderWrapper },
    )
    expect(screen.getByRole('alert')).toMatchSnapshot()
  })
})
