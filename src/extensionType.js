import { browser } from './browser.js'

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
