/**
 * @module main
 * content script injected into web page which triggers hiding distractions
 *  when the page is loaded or when the user modifies the YouFocus settings
 */
import { hideDistractions } from './youFocus.js'
import { browser } from './browser.js'
import { throttle } from './throttle.js'

function initialize() {
  void hideDistractions()

  browser.storage.onChanged.addListener(hideDistractions)

  /** @type func - called when there is user interaction **/
  const onActivity = throttle(hideDistractions, 5000)

  document.body.addEventListener('mousemove', onActivity)
  document.body.addEventListener('click', onActivity)
}

// We want to hide distractions as soon as possible so we hide
//  after `DOMContentLoaded` event instead of waiting for all the images to
//  download via the `load` event. (Try switching to window.onload and then
//  load the homepage with the browser throttled to 3G, and you'll see video
//  thumbnails gradually appear before hiding)
// NOTE: we can count on this event firing because manifest.json sets run_at
//  to document_start, but if that value is changed then initialization might
//  get skipped
document.addEventListener('DOMContentLoaded', initialize)
