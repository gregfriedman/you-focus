import { browser } from './browser.js'

/**
 * Extract the extension type from the provided url presuming that
 *  it is following the standard browser extension scheme like 'chrome-extension://'
 * @param {string} url - url from browser.runtime.getURL
 * @return {string}
 */
export function extensionTypeFromUrl(url) {
  const [, extensionType] = /^(.*?)-.*extension:\/\//.exec(url) || []
  return extensionType
}

/**
 * Return the browser specific type of extension
 * @return {string} - chrome, safari, moz, etc
 */
export function extensionType() {
  return extensionTypeFromUrl(browser.runtime.getURL(''))
}
