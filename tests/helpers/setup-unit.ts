import { beforeAll, vi } from 'vitest'

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(), // deprecated
    removeListener: vi.fn(), // deprecated
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
})

beforeAll(() => {
  vi.mock('next/font/google', () => ({
    Alegreya: () => ({
      style: {
        fontFamily: 'mocked',
      },
    }),
  }))

  vi.mock('react-dom', () => ({
    ...vi.importActual('react-dom'),
    useFormState: () => [{ message: '' }, vi.fn()],
    useFormStatus: () => [false],
  }))

  vi.mock('@/components/Quotes/QuotesText.ts')
})
