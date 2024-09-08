import { defineConfig } from 'vitest/config'
import path from 'path'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '.'),
    },
  },
  test: {
    coverage: {
      include: [
        '**/*.ts',
        '**/*.tsx',
        '!tests',
        '!**/*.story.ts',
        '!**/*.story.tsx'
      ],
      reporter: ['text', 'json', 'html'],
    },
    environment: 'jsdom',
    globals: true,
    include: [
      '**/*.test.ts',
      '**/*.test.tsx'
    ],
    setupFiles: ['tests/helpers/setup-unit.ts']
  },
})