import { applySettings } from './settings.js'
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

export async function hideDistractions() {
  const settings = await browser.storage.sync.get(defaultSettings)
  applySettings({
    ...settings,
    awake: isAwake(
      settings.scheduleStart,
      settings.scheduleEnd,
      settings.enableSchedule
    ),
  })
}
