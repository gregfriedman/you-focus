export function inRange(start, end) {
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

export function isAwake(scheduleStart, scheduleEnd, enableSchedule) {
  return (
    (enableSchedule && inRange(scheduleStart, scheduleEnd)) || !enableSchedule
  )
}
