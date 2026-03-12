import { expect, test } from '@playwright/test'

const RE_DEMO_A_TITLE = /Demo A/
const RE_GO_TO_B = /Go to Demo Page B/i
const RE_BACK_TO_A = /Back to Demo Page A/i

test.describe('Demo page navigation', () => {
  test('loads Demo A page', async ({ page }) => {
    await page.goto('/demo/a')

    await expect(page).toHaveTitle(RE_DEMO_A_TITLE)
    await expect(
      page.getByRole('heading', { name: 'Demo Page A' }),
    ).toBeVisible()
    await expect(page.getByText('Vite + Inertia + shadcn/ui')).toBeVisible()
  })

  test('navigates from Demo A to Demo B via button', async ({ page }) => {
    await page.goto('/demo/a')

    await expect(
      page.getByRole('heading', { name: 'Demo Page A' }),
    ).toBeVisible()

    await page.getByRole('button', { name: RE_GO_TO_B }).click()

    await expect(page).toHaveURL('/demo/b')
    await expect(
      page.getByRole('heading', { name: 'Demo Page B' }),
    ).toBeVisible()
    await expect(page.getByText('Navigation successful')).toBeVisible()
  })

  test('shows server-provided props on Demo B', async ({ page }) => {
    await page.goto('/demo/b')

    await expect(page.getByText('Hello from Phoenix!')).toBeVisible()
    await expect(page.getByText('Server-Provided Props')).toBeVisible()
  })

  test('navigates back from Demo B to Demo A', async ({ page }) => {
    await page.goto('/demo/b')

    await expect(
      page.getByRole('heading', { name: 'Demo Page B' }),
    ).toBeVisible()

    await page.getByRole('button', { name: RE_BACK_TO_A }).click()

    await expect(page).toHaveURL('/demo/a')
    await expect(
      page.getByRole('heading', { name: 'Demo Page A' }),
    ).toBeVisible()
  })

  test('Inertia navigation does not trigger full page reload', async ({
    page,
  }) => {
    await page.goto('/demo/a')

    // Track navigation requests — Inertia uses XHR not full page load
    const requests: string[] = []
    page.on('request', (req) => {
      if (req.resourceType() === 'document') {
        requests.push(req.url())
      }
    })

    await page.getByRole('button', { name: RE_GO_TO_B }).click()
    await expect(page).toHaveURL('/demo/b')

    // Only the initial page load should be a document request
    // Inertia subsequent navigations are XHR (fetch), not document requests
    expect(requests.length).toBe(0)
  })
})
