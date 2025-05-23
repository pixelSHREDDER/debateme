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
    environment: 'jsdom',
    include: ['src/tests/**/*.test.ts'],
    setupFiles: ['tests/helpers/setup-int.ts'],
    threads: false
  },
})