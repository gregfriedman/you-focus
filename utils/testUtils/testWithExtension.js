import { test as base, chromium } from '@playwright/test'
import { dirname, join } from 'node:path'
import { fileURLToPath } from 'node:url'

const __dirname = dirname(fileURLToPath(import.meta.url))

export const test = base.extend({
  context: async ({ viewport }, use) => {
    const pathToExtension = join(__dirname, '../../src')
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
})

export const expect = test.expect
export const describe = test.describe
