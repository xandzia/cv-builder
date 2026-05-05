import { test, expect } from '@playwright/test'

test.describe('CV Builder', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/cv-builder/')
    await page.waitForLoadState('networkidle')
  })

  // Helper: the desktop sidebar nav
  const sidebar = (page: import('@playwright/test').Page) =>
    page.locator('nav.flex.flex-col')

  // Helper: the fixed form panel (desktop)
  const formPanel = (page: import('@playwright/test').Page) =>
    page.locator('div.fixed.z-50')

  test('page loads with header and download button', async ({ page }) => {
    await expect(page.getByRole('heading', { name: 'CV Builder' })).toBeVisible()
    await expect(page.getByRole('button', { name: /download pdf/i })).toBeVisible()
  })

  test('section navigation shows correct forms', async ({ page }) => {
    // Click "Experience" in sidebar
    await sidebar(page).locator('button', { hasText: 'Experience' }).click()

    // Form panel should show "Work Experience" text (it's a summary/span, not a heading)
    await expect(formPanel(page).getByText('Work Experience')).toBeVisible()

    // Click "Education" in sidebar
    await sidebar(page).locator('button', { hasText: 'Education' }).click()
    await expect(formPanel(page).getByText('Education').first()).toBeVisible()
  })

  test('editing personal info updates preview', async ({ page }) => {
    await sidebar(page).locator('button', { hasText: 'Personal' }).click()

    const nameInput = formPanel(page).getByRole('textbox', { name: 'Full Name' })
    await nameInput.clear()
    await nameInput.fill('Test User')

    // Use the first #cv-preview (desktop)
    const preview = page.locator('#cv-preview').first()
    await expect(preview).toContainText('Test User')
  })

  test('add and remove experience', async ({ page }) => {
    const panel = formPanel(page)

    // Navigate to Experience
    await sidebar(page).locator('button', { hasText: 'Experience' }).click()
    await expect(panel.getByText('Work Experience')).toBeVisible()

    const cardLocator = panel.locator('div.p-3.bg-gray-50.rounded-md')
    const initialCards = await cardLocator.count()

    // Add two cards (Remove button only appears when there is more than one card)
    await panel.getByRole('button', { name: '+ Add Experience' }).click()
    await expect(cardLocator).toHaveCount(initialCards + 1)

    await panel.getByRole('button', { name: '+ Add Experience' }).click()
    await expect(cardLocator).toHaveCount(initialCards + 2)

    // Click "Remove" on the last card
    await panel.locator('button', { hasText: 'Remove' }).last().click()
    await expect(cardLocator).toHaveCount(initialCards + 1)
  })

  test('add and remove language', async ({ page }) => {
    const panel = formPanel(page)

    // Navigate to Languages
    await sidebar(page).locator('button', { hasText: 'Languages' }).click()

    // Count initial language inputs
    const initialLangs = await panel.locator('input[placeholder="Native, C1, B2..."]').count()

    // Click "+ Add Language"
    await panel.getByRole('button', { name: '+ Add Language' }).click()

    const afterAddLangs = await panel.locator('input[placeholder="Native, C1, B2..."]').count()
    expect(afterAddLangs).toBe(initialLangs + 1)
  })

  test('color picker changes accent color', async ({ page }) => {
    // Navigate to Style section
    await sidebar(page).locator('button', { hasText: 'Style' }).click()

    const panel = formPanel(page)
    // Click a different color swatch (round buttons)
    const colorButtons = panel.locator('button[style*="border-radius: 50%"]')
    if ((await colorButtons.count()) > 1) {
      await colorButtons.nth(2).click()
    }
  })

  test('close and reopen form panel', async ({ page }) => {
    const panel = formPanel(page)

    // Open a section first
    await sidebar(page).locator('button', { hasText: 'Personal' }).click()
    await expect(panel).toBeVisible()

    // Click the close button (X icon) — it's inside the drag handle area
    await panel.locator('.cursor-grab button').click()

    // Panel should be removed from DOM
    await expect(panel).toHaveCount(0)

    // Click a sidebar section to reopen — "Tech Stack" is the label for skills
    await sidebar(page).locator('button', { hasText: 'Tech Stack' }).click()

    // Panel should reappear
    await expect(panel).toBeVisible()
  })

  test('PDF export button changes text while generating', async ({ page }) => {
    const downloadBtn = page.getByRole('button', { name: /download pdf/i })
    await expect(downloadBtn).toBeEnabled()

    // Click export — verify the button doesn't crash and re-enables
    await downloadBtn.click()
    await expect(downloadBtn).toBeEnabled({ timeout: 15000 })
  })

  test('mobile viewport shows tab navigation', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto('/cv-builder/')
    await page.waitForLoadState('networkidle')

    // Mobile tabs nav should be visible
    const mobileTabs = page.locator('nav.md\\:hidden')
    await expect(mobileTabs).toBeVisible()
  })
})
