import { classChanges, syncClassChanges } from './classChanges.js'
import { isAwake } from './schedule.js'
import { browser } from './browser.js'

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

// map setting name to CSS class that should be added to body
//  when that setting is enabled
const classMap = {
  hideMode: 'hideMode',
  hideHomepageVideos: 'hideHomepageVideos',
  hideHomepageSidebar: 'hideHomepageSidebar',
  hidePlayerRelated: 'hidePlayerRelated',
  hidePlayerEndwall: 'hidePlayerEndwall',
  hidePlayerComments: 'hidePlayerComments',
  hideShorts: 'hideShorts',
  awake: 'awake',
}

export async function hideDistractions() {
  try {
    const settings = await browser.storage.sync.get(defaultSettings)
    const awake = isAwake(
      settings.scheduleStart,
      settings.scheduleEnd,
      settings.enableSchedule
    )
    const changes = classChanges(classMap, { ...settings, awake })
    syncClassChanges(changes)
  } catch (e) {
    console.error(e)
  }
}
