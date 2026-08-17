import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { test, expect, describe } from '../utils/testUtils/testWithExtension.js'
import { loadFixture } from '../utils/testUtils/loadFixture.js'

const __dirname = dirname(fileURLToPath(import.meta.url))

const fixturesDir = join(__dirname, './fixtures')

describe('homepage', () => {
  test.use({ viewport: { width: 1800, height: 1200 } })
  test('only the masthead with the search bar is visible', async ({ page }) => {
    await loadFixture(page, join(fixturesDir, 'home', 'YouTube-home.html'))
    await expect(page.locator('body')).toHaveClass(/hideMode/) // main.js ran
    await expect(page).toHaveScreenshot('homepage-hidden.png', {
      // mask the logo so we don't violate the Terms of Service by including YT owned content
      mask: [page.locator('#logo')],
    })
  })
})
