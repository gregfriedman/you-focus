import { describe, it, expect, beforeEach } from 'vitest'

import { syncClassesToSettings } from '../src/settings.js'

describe('syncClassesToSettings', () => {
  beforeEach(() => {
    document.body.className = ''
  })

  it('should update class list to match settings', () => {
    // Arrange
    const map = {
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
    syncClassesToSettings(map, settings)

    // Assert
    expect([...document.body.classList]).toEqual([
      'test-enabled',
      'test-font-lg',
    ])
  })

  it('should ignore settings that are not in the map', () => {
    // Arrange
    const map = {
      enabled: 'test-enabled',
    }

    const settings = {
      enabled: true,
      minutesSinceLastLogin: 300,
    }

    // Act
    syncClassesToSettings(map, settings)

    // Assert
    expect([...document.body.classList]).toEqual(['test-enabled'])
  })

  it('should alter only the specified settings', () => {
    const map = {
      enabled: 'test-enabled',
      useDarkMode: 'test-dark',
      bigFonts: 'test-font-lg',
    }
    syncClassesToSettings(map, {
      enabled: true,
      useDarkMode: true,
    })

    // Act
    syncClassesToSettings(map, {
      useDarkMode: false,
      bigFonts: true,
    })

    // Assert
    expect([...document.body.classList]).toEqual([
      'test-enabled',
      'test-font-lg',
    ])
  })
})
