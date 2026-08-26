import { hideDistractions } from './youFocus.js'
import { browser } from './browser.js'
import { throttle } from './throttle.js'

const onActivity = throttle(hideDistractions, 5000)

window.onload = async function () {
  await hideDistractions()
  // Special case because hidden content was flashing on refresh (hide.css is hiding this initially)
  document.querySelector('body').style.visibility = 'visible'

  browser.storage.onChanged.addListener(hideDistractions)

  document.body.addEventListener('mousemove', onActivity)
  document.body.addEventListener('click', onActivity)
}
