import { defineConfig } from 'vitest/config'

export default defineConfig({
  test: {
    projects: [
      {
        test: {
          name: 'unit',
          environment: 'jsdom',
          include: ['**/*.test.js'],
        },
      },
      {
        test: {
          name: 'integration',
          include: ['**/*.itest.js'],
        },
      },
    ],
  },
})
