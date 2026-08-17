import { dirname, join } from 'node:path'
import { existsSync } from 'node:fs'

export const loadFixture = async (page, fixturePath) => {
  page.on('pageerror', e => console.log('[pageerror]', e.message))

  await page.route('**/*', route => {
    const url = new URL(route.request().url())
    console.log(`[route] request ${url.pathname}`)

    // skip serving local files for `chrome-extensions://` etc
    if (!url.protocol.startsWith('http')) return route.continue()

    if (url.hostname !== 'www.youtube.com') return route.abort()

    const file =
      url.pathname === '/'
        ? fixturePath
        : join(dirname(fixturePath), decodeURIComponent(url.pathname))

    console.log(`[route] -> fulfill from ${file}`)
    return existsSync(file) ? route.fulfill({ path: file }) : route.abort()
  })

  await page.goto('https://www.youtube.com')

  // Uncomment the pause and set headless: false in the extensionTest to have the browser
  //  open and available for dev tools debugging
  // await page.pause()
}
