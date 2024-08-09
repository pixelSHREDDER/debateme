import { defineConfig } from 'vitest/config'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.')
    }
  },
  test: {
    coverage: {
      include: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '!tests'
      ],
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    include: [
      '**/*.test.ts',
      '**/*.test.tsx'
    ],
    setupFiles: ['tests/helpers/setup-unit.ts']
  },
})