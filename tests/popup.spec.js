import { describe, expect, test } from '../utils/testUtils/testWithExtension.js'

describe('popup', () => {
  test('shows the rate link in browser that has rating page defined', async ({
    page,
    extensionId,
  }) => {
    // Act
    await page.goto(`chrome-extension://${extensionId}/popup.html`)

    // Assert
    const rate = page.locator('#rate')
    await expect(rate).toBeVisible()
    await expect(rate).toHaveAttribute('href', /chrome\.google\.com\/webstore/)
  })
})
