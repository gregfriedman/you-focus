import { JSDOM } from 'jsdom'

/** Return true if the href does not end with .css */
const isMissingExtension = href => !href?.endsWith('.css')

/**
 * Return the list of stylesheets in the html that do not have the .css
 *  extension.
 * @param {string} html
 * @return {string[]} list of hrefs without .css extension
 */
export const extensionlessStylesheets = html => {
  const dom = new JSDOM(html)
  const links = dom.window.document.querySelectorAll('link[rel="stylesheet"]')
  return [...links].map(l => l.href).filter(isMissingExtension)
}
