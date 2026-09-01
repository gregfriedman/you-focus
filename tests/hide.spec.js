import { fileURLToPath } from 'node:url'
import { dirname, join } from 'node:path'

import { describe, expect, test } from '../utils/testUtils/testWithExtension.js'
import { gotoFixture } from '../utils/testUtils/gotoFixture.js'

const __dirname = dirname(fileURLToPath(import.meta.url))
const fixturesDir = join(__dirname, './fixtures')

// mask elements so we don't violate the Terms of Service by including YT owned content
//  in the screenshots
const complianceMasks = page => [
  page.locator('#logo'),
  page.locator('#description-inline-expander'),
  page.locator('#avatar'),
  page.locator('#channel-name'),
  page.locator('#title'),
  page.locator('svg'),
  page.locator('img'),
  page.locator('yt-lockup-metadata-view-model'),
  page.getByText(/youtube/i),
  page.getByText(/google/i),
]

describe('homepage', () => {
  test.use({ viewport: { width: 1600, height: 1200 } })
  const fixture = join(fixturesDir, 'home/index.html')
  test('only the masthead with the search bar is visible', async ({ page }) => {
    // Act
    await gotoFixture(page, fixture)

    // Assert
    await expect(page.locator('body')).toHaveClass(/hideMode/) // main.js ran
    await expect(page).toHaveScreenshot('homepage-hidden.png', {
      mask: complianceMasks(page),
    })
  })

  test('turning off YouFocus in popup shows complete homepage', async ({
    page,
    extensionId,
  }) => {
    // Arrange
    await page.goto(`chrome-extension://${extensionId}/popup.html`)

    // Act
    const youFocusToggle = page.locator('header button')
    await youFocusToggle.click()
    // make sure the toggle is now disabled
    // this also ensures the updated value has been written asynchronously to
    //  chrome storage before switching to the fixture page
    await expect(youFocusToggle).toHaveClass(/toggle-off/)

    await gotoFixture(page, fixture)

    // Assert
    await expect(page.locator('body')).not.toHaveClass(/hideMode/) // main.js ran
    await expect(page).toHaveScreenshot('homepage-shown.png', {
      mask: complianceMasks(page),
    })
  })

  test.only('change schedule to overlap with current time hides homepage distractions', async ({
    page,
    extensionId,
  }) => {
    // enable hiding on schedule
    await page.goto(`chrome-extension://${extensionId}/popup.html`)
    // enable schedule if it isn't already
    await page.locator('#enableSchedule.toggle-off').click()
    await expect(await page.locator('#enableSchedule')).toHaveClass(/toggle-on/)

    // If current time is 13:20, hoursFromNow(1) => '14:20'
    const hoursFromNow = numHours =>
      new Date(Date.now() + numHours * 3_600_000).toTimeString().slice(0, 5)

    // set the schedule to a time after the current time
    await page.locator('#scheduleStart').fill(hoursFromNow(1))
    await page.locator('#scheduleEnd').fill(hoursFromNow(2))
    await page.locator('#setSchedule').click()

    // Now go to the homepage
    await gotoFixture(page, fixture)
    // it should not be awake, and therefore it should be showing distractions
    await expect(page.locator('body')).not.toHaveClass(/awake/)

    // Now make the schedule start earlier than now
    // TODO: refactor to shared
    await page.goto(`chrome-extension://${extensionId}/popup.html`)
    await page.locator('#scheduleStart').fill(hoursFromNow(-1))
    await page.locator('#setSchedule').click()

    // showing the home page should now be awake and distractions hidden
    await gotoFixture(page, fixture)
    await expect(page.locator('body')).toHaveClass(/awake/)

    // expecting same screenshot as previous test since they should always look the same
    await expect(page).toHaveScreenshot('homepage-hidden.png', {
      mask: complianceMasks(page),
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
      mask: complianceMasks(page),
    })
  })
  test('turning off YouFocus in popup shows complete watch page', async ({
    page,
    extensionId,
  }) => {
    // Arrange
    const fixture = join(fixturesDir, 'watch/index.html')
    await page.goto(`chrome-extension://${extensionId}/popup.html`)

    // Act
    await page.locator('header button').click()
    await gotoFixture(page, fixture)
    // await page.pause()
    // Assert
    await expect(page.locator('body')).not.toHaveClass(/hideMode/) // main.js ran
    await expect(page).toHaveScreenshot('watch-shown.png', {
      mask: complianceMasks(page),
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
      mask: complianceMasks(page),
    })
  })
})
