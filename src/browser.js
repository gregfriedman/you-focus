// We want to have a single extension that can work in Chrome, Safari, and Firefox so
//  we aim to leverage the standard WebExtensions API through a single `browser` object.
//
// From Chrome 148, all Chrome Extension APIs are available under the `browser` namespace
//  in addition to the existing `chrome` namespace. But just in case there are existing
//  users on earlier versions, we always alias browser to chrome if the global browser is not defined
//  @see https://developer.chrome.com/docs/extensions/develop/concepts/browser-namespace
//
// Since Chrome 95+ supports returning Promises from `storage.get` and `storage.set`, we
//  can set that as the minimum_chrome_version in the manifest and then use async/await
//  which will work in all the supported browser.
//  @see https://developer.chrome.com/docs/extensions/reference/api/storage/StorageArea#method-StorageArea-get
//
export const browser = globalThis.browser ?? globalThis.chrome
