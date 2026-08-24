import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { test, expect, describe } from '../utils/testUtils/testWithExtension.js'
import { gotoFixture } from '../utils/testUtils/gotoFixture.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fixturesDir = join(__dirname, './fixtures')

describe('homepage', () => {
  test.use({ viewport: { width: 1600, height: 1200 } })
  test('only the masthead with the search bar is visible', async ({ page }) => {
    // Arrange
    const fixture = join(fixturesDir, 'home/YouTube-home.html')

    // Act
    await gotoFixture(page, fixture)

    // Assert
    await expect(page.locator('body')).toHaveClass(/hideMode/) // main.js ran
    await expect(page).toHaveScreenshot('homepage-hidden.png', {
      // mask the logo so we don't violate the Terms of Service by including YT owned content
      mask: [page.locator('#logo')],
    })
  })
})

describe('watch', () => {
  test.use({ viewport: { width: 1600, height: 1200 } })
  test('only the video player is visible', async ({ page }) => {
    // Arrange
    const fixture = join(fixturesDir, 'watch/index.html')

    // Act
    await gotoFixture(page, fixture)

    // Assert
    await expect(page.locator('body')).toHaveClass(/hideMode/) // main.js ran
    await expect(page).toHaveScreenshot('watch-hidden.png', {
      // mask the logo so we don't violate the Terms of Service by including YT owned content
      mask: [
        page.locator('#logo'),
        page.locator('#description-inline-expander'),
        page.locator('#avatar'),
        page.locator('#channel-name'),
        page.locator('#title'),
      ],
    })
  })
})

describe('shorts', () => {
  test.use({ viewport: { width: 1600, height: 1200 } })
  test('only the video player is visible', async ({ page }) => {
    // Arrange
    const fixture = join(fixturesDir, 'shorts/index.html')

    // Act
    await gotoFixture(page, fixture)

    // Assert
    await expect(page.locator('body')).toHaveClass(/hideMode/) // main.js ran
    await expect(page).toHaveScreenshot('shorts-hidden.png', {
      // mask the logo so we don't violate the Terms of Service by including YT owned content
      mask: [page.locator('#logo')],
    })
  })
})
