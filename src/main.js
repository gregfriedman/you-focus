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
const browser = globalThis.browser ?? chrome

const defaultSettings = {
  hideMode: true,
  hideHomepageVideos: true,
  hideHomepageSidebar: true,
  hidePlayerRelated: true,
  hidePlayerEndwall: true,
  hidePlayerComments: false,
  hideShorts: true,
  awake: true,
  enableSchedule: false,
  scheduleStart: '09:00',
  scheduleEnd: '17:00',
}

window.onload = async function () {
  localStorage.setItem('lastEvent', Date.now())
  await setAwake()
  await setVisibilities()
  document.body.addEventListener('mousemove', () => {
    activeEvent()
  })
  document.body.addEventListener('click', () => {
    activeEvent()
  })
}

browser.storage.onChanged.addListener(changes => {
  if (changes.enableSchedule || changes.scheduleStart || changes.scheduleEnd) {
    setAwake()
  } else {
    setVisibilities()
  }
})

function activeEvent() {
  if (Date.now() - localStorage.getItem('lastEvent') > 5000) {
    console.log('active event')
    localStorage.setItem('lastEvent', Date.now())
    setAwake()
  }
}

function inRange(start, end) {
  const startHour = Number(start.split(':')[0])
  const startMin = Number(start.split(':')[1])
  const endHour = Number(end.split(':')[0])
  const endMin = Number(end.split(':')[1])
  const startDate = new Date()
  const endDate = new Date()
  startDate.setHours(startHour, startMin, 0)
  endDate.setHours(endHour, endMin, 59)
  return startDate <= Date.now() && endDate >= Date.now()
}

function isAwake(scheduleStart, scheduleEnd, enableSchedule) {
  return (
    (enableSchedule && inRange(scheduleStart, scheduleEnd)) || !enableSchedule
  )
}

async function setAwake() {
  const result = await browser.storage.sync.get(defaultSettings)
  const awake = isAwake(
    result.scheduleStart,
    result.scheduleEnd,
    result.enableSchedule
  )
  if (result.awake !== awake) {
    await browser.storage.sync.set({ awake })
  }
}

async function setVisibilities() {
  // TODO: move this up to onLoad and change this function to
  //  render(settings) and then wrap in tests
  const result = await browser.storage.sync.get(defaultSettings)

  const hideOptions = [
    'hideMode',
    'hideHomepageVideos',
    'hideHomepageSidebar',
    'hidePlayerRelated',
    'hidePlayerEndwall',
    'hidePlayerComments',
    'hideShorts',
    'awake',
  ]

  hideOptions.forEach(key => {
    result[key]
      ? document.body.classList.add(key)
      : document.body.classList.remove(key)
  })

  // Special case because hidden content was flashing on refresh (hide.css is hiding these initially)
  document.querySelector('body').style.visibility = 'visible'
  document.querySelector('#guide-content').style.visibility = 'visible'
}
