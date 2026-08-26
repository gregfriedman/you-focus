import { describe, it, expect, vi } from 'vitest'
import { throttle } from '../src/throttle.js'

const makeCounter = () => {
  let count = 0
  return () => {
    return ++count
  }
}

describe('throttle', function () {
  it('should only be called once in the throttle time', () => {
    vi.useFakeTimers()

    const count = makeCounter()
    const throttledCount = throttle(count, 1000)

    throttledCount()
    throttledCount()
    const result = throttledCount()

    expect(result).toEqual(1)
  })

  it('should only be called again if exceeds the throttle time', () => {
    vi.useFakeTimers()

    const count = makeCounter()
    const throttledCount = throttle(count, 1000)

    throttledCount()
    vi.advanceTimersByTime(1100)
    const result = throttledCount()

    expect(result).toEqual(2)
  })

  it('should only be called once after the throttle time but before the next throttle time', () => {
    vi.useFakeTimers()

    const count = makeCounter()
    const throttledCount = throttle(count, 1000)

    throttledCount()
    vi.advanceTimersByTime(1100)
    throttledCount()
    const result = throttledCount()

    expect(result).toEqual(2)
  })
})
