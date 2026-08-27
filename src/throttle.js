export function throttle(fn, ms) {
  let start = -Infinity
  let result = null
  return () => {
    const now = Date.now()
    if (now > start + ms) {
      result = fn()
      start = now
    }
    return result
  }
}
