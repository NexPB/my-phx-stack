import { defineConfig, devices } from '@playwright/test'

const port = 4002

export default defineConfig({
  testDir: './e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 0,
  workers: process.env.CI ? 1 : undefined,
  reporter: 'html',
  use: {
    baseURL: `http://localhost:${port}`,
    trace: 'on-first-retry',
  },
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
  webServer: {
    command: [
      'mix do',
      'ecto.create --quiet +',
      'ecto.migrate --quiet +',
      'phx.server',
    ].join(' '),
    cwd: '..',
    port,
    env: { MIX_ENV: 'test', PHX_SERVER: 'true', PORT: String(port) },
    reuseExistingServer: !process.env.CI,
    stdout: 'pipe',
    stderr: 'pipe',
  },
})
