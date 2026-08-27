import { describe, it, expect, beforeEach } from 'vitest'

import { classChanges, syncClassChanges } from '../src/settings.js'

describe('classChanges', () => {
  it('should return class list based on truthy settings', () => {
    // Arrange
    const classMap = {
      enabled: 'test-enabled',
      useDarkMode: 'test-dark',
      bigFonts: 'test-font-lg',
    }

    const settings = {
      enabled: true,
      useDarkMode: false,
      bigFonts: true,
    }

    // Act
    const changes = classChanges(classMap, settings)

    // Assert
    expect(changes).toEqual({
      include: ['test-enabled', 'test-font-lg'],
      exclude: ['test-dark'],
    })
  })

  it('should ignore settings that are not in the map', () => {
    // Arrange
    const classMap = {
      enabled: 'test-enabled',
    }

    const settings = {
      enabled: true,
      minutesSinceLastLogin: 300,
    }

    // Act
    const changes = classChanges(classMap, settings)

    // Assert
    expect(changes).toEqual({ include: ['test-enabled'], exclude: [] })
  })

  it('should return only the specified settings', () => {
    const classMap = {
      enabled: 'test-enabled',
      useDarkMode: 'test-dark',
      bigFonts: 'test-font-lg',
    }

    const changes = classChanges(classMap, {
      enabled: true,
      useDarkMode: true,
    })

    // Assert
    expect(changes).toEqual({
      include: ['test-enabled', 'test-dark'],
      exclude: [],
    })
  })

  it('should work with invalid values', () => {
    // Arrange
    const noChanges = {
      include: [],
      exclude: [],
    }

    // Act
    // Assert
    expect(classChanges(null, null)).toEqual(noChanges)
    expect(classChanges(null, { a: 'test-a' })).toEqual(noChanges)
    expect(classChanges(undefined, undefined)).toEqual(noChanges)
  })
})

describe('syncClassChanges', () => {
  beforeEach(() => {
    document.body.className = ''
  })
  it('should add classes for include and remove classes for exclude', () => {
    // Arrange
    document.body.className = 'test-c'

    syncClassChanges({ include: ['test-a', 'test-b'], exclude: ['test-c'] })

    expect(document.body.className).toEqual('test-a test-b')
  })

  it('should work with invalid values', () => {
    // Act
    syncClassChanges(null)
    expect(document.body.className).toEqual('')

    syncClassChanges({ include: null, exclude: null })
    expect(document.body.className).toEqual('')
  })
})
