import { test as base, chromium } from '@playwright/test'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

// @see https://playwright.dev/docs/chrome-extensions#testing
export const test = base.extend({
  context: async ({ viewport }, use) => {
    const pathToExtension = join(__dirname, '../../dist')
    const context = await chromium.launchPersistentContext('', {
      channel: 'chromium',
      // NOTE: as of right now, it appears that the manifest.content_scripts.css injection
      //  doesn't seem to work in headless mode even though manifest.content_scripts.js does
      //  get injected. Maybe this is just a temporary bug that will get resolved later.
      //  Ideally we can run this headless eventually so we can do it in CI easily.
      headless: false,
      viewport,
      args: [
        `--disable-extensions-except=${pathToExtension}`,
        `--load-extension=${pathToExtension}`,
      ],
    })
    await use(context)
    await context.close()
  },
  // We don't have a service worker so we can't use Playwright's proposed extensionId
  //  fixture code. So instead, we open the extensions-internals page which lists every
  //  extension and extract the YouFocus id and then make that available to the tests
  //  e.g. `test('do something', { page, extensionId } => {...})`
  extensionId: async ({ context }, use) => {
    const page = await context.newPage()
    await page.goto(`chrome://extensions-internals`)
    const internals = JSON.parse(await page.locator('body').innerText())
    const extensionId = internals.find(e => e.name === 'YouFocus')?.id
    await page.close()
    await use(extensionId)
  },
})

export const expect = test.expect
export const describe = test.describe
