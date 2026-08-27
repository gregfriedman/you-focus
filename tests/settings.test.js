import { describe, it, expect, beforeEach } from 'vitest'

import { syncClassesToSettings } from '../src/settings.js'

describe('syncClassesToSettings', () => {
  beforeEach(() => {
    document.body.className = ''
  })

  it('should update class list to match settings', () => {
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
    syncClassesToSettings(classMap, settings)

    // Assert
    expect([...document.body.classList]).toEqual([
      'test-enabled',
      'test-font-lg',
    ])
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
    syncClassesToSettings(classMap, settings)

    // Assert
    expect([...document.body.classList]).toEqual(['test-enabled'])
  })

  it('should alter only the specified settings', () => {
    const classMap = {
      enabled: 'test-enabled',
      useDarkMode: 'test-dark',
      bigFonts: 'test-font-lg',
    }
    syncClassesToSettings(classMap, {
      enabled: true,
      useDarkMode: true,
    })

    // Act
    syncClassesToSettings(classMap, {
      useDarkMode: false,
      bigFonts: true,
    })

    // Assert
    expect([...document.body.classList]).toEqual([
      'test-enabled',
      'test-font-lg',
    ])
  })

  it('should work with invalid values', () => {
    // Act
    syncClassesToSettings(null, null)
    syncClassesToSettings(null, { a: 'test-a' })
    syncClassesToSettings(undefined, undefined)

    // Assert
    expect(document.body.className).toEqual('')
  })
})
