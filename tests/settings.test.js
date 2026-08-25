import { describe, it, expect, beforeEach } from 'vitest'

import { applySettings } from '../src/settings.js'

describe('applySettings', () => {
  beforeEach(() => {
    document.body.className = ''
  })

  it('should update class list to match settings', () => {
    // Arrange
    const settings = {
      hideMode: true,
      hideHomepageVideos: true,
      hideHomepageSidebar: true,
      hidePlayerRelated: true,
      hidePlayerEndwall: true,
      hidePlayerComments: false,
      hideShorts: true,
      awake: true,
    }

    // Act
    applySettings(settings)

    // Assert
    expect([...document.body.classList]).toEqual(
      expect.arrayContaining([
        'hideMode',
        'hideHomepageVideos',
        'hideHomepageSidebar',
        'hidePlayerRelated',
        'hidePlayerEndwall',
        'hideShorts',
        'awake',
      ])
    )
  })

  it('should alter only the specified settings', () => {
    applySettings({
      hideMode: true,
      hideHomepageVideos: true,
    })

    // Act
    applySettings({
      hideHomepageVideos: false,
      hideHomepageSidebar: true,
    })

    // Assert
    expect(document.body.classList.values().toArray()).toEqual([
      'hideMode',
      'hideHomepageSidebar',
    ])
  })
})
