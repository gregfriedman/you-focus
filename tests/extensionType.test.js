import { describe, it, expect } from 'vitest'

import { extensionTypeFromUrl } from '../src/extensionType.js'

describe('extensionTypeFromUrl', () => {
  // These are the ones we know about already
  it.each([
    ['chrome', 'chrome-extension://some-id/some-asset'],
    ['safari', 'safari-extension://some-id/some-asset'],
    ['moz', 'moz-extension://some-id/some-asset'],
  ])('should parse %s url', (browser, url) => {
    expect(extensionTypeFromUrl(url)).toBe(browser)
  })

  it('should handle invalid url', () => {
    expect(extensionTypeFromUrl('')).toBe(undefined)
    expect(extensionTypeFromUrl(undefined)).toBe(undefined)
    expect(extensionTypeFromUrl(null)).toBe(undefined)
    expect(extensionTypeFromUrl(17)).toBe(undefined)
    expect(extensionTypeFromUrl({})).toBe(undefined)
  })
})
