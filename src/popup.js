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

function setPopupState(hideMode) {
  document.querySelector('main').style.opacity = hideMode ? '1.0' : '0.4'
  document.querySelector('main').style.pointerEvents = hideMode
    ? 'auto'
    : 'none'
}

async function handleClick() {
  const id = this.id
  let button = this
  const result = await browser.storage.sync.get(defaultSettings)
  const newValue = !result[id]
  // TODO: what's the right thing to do here? We want the toggle to respond immediately for
  //  best UX but it's possible the storage set could fail.
  browser.storage.sync.set({ [id]: newValue })
  button.className = newValue ? 'toggle toggle-on' : 'toggle toggle-off'
  if (id === 'hideMode') setPopupState(newValue)
  if (id === 'enableSchedule') {
    document.getElementById('scheduleInputs').style.display = newValue
      ? 'block'
      : 'none'
  }
}

function handleInputChange(input) {
  startInput = document.getElementById('scheduleStart')
  endInput = document.getElementById('scheduleEnd')
  if (input.target.id === 'scheduleStart') {
    endInput.value =
      input.target.value >= endInput.value ? input.target.value : endInput.value
  }
  if (input.target.id === 'scheduleEnd') {
    startInput.value =
      startInput.value >= input.target.value
        ? input.target.value
        : startInput.value
  }
  document.getElementById('setSchedule').style.display = 'block'
}

window.onload = async function () {
  const result = await browser.storage.sync.get(defaultSettings)
  document.getElementById('scheduleInputs').style.display =
    result.enableSchedule ? 'block' : 'none'
  document.querySelectorAll('.toggle').forEach(function (element) {
    if (element.id === 'hideShorts') {
      console.log(result[element.id])
    }
    element.className = result[element.id]
      ? 'toggle toggle-on'
      : 'toggle toggle-off'
    element.onclick = handleClick
  })
  document.querySelectorAll('.schedule-input').forEach(function (input) {
    input.value = result[input.id]
    input.addEventListener('change', handleInputChange)
  })
  document.getElementById('setSchedule').onclick = saveScheduleInputs

  setPopupState(result.hideMode)
}

function saveScheduleInputs() {
  startInput = document.getElementById('scheduleStart')
  endInput = document.getElementById('scheduleEnd')
  chrome.storage.sync.set({
    scheduleStart: startInput.value,
    scheduleEnd: endInput.value,
  })
  this.style.display = 'none'
}
