import { describe, it, expect } from 'vitest'

import { extensionTypeFromUrl } from '../src/extensionType.js'

describe('extensionTypeFromUrl', () => {
  // These are the ones we know about already
  it.each([
    ['chrome', 'chrome-extension://some-id/some-asset'],
    // Safari v26.5, getURL('/') returned "safari-web-extension://B8B622EF-F207-4C27-A0B3-052F2D3871DC/"
    ['safari', 'safari-web-extension://some-id/some-asset'],
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
