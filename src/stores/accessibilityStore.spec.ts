import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAccessibilityStore } from './accessibilityStore'

describe('accessibilityStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.style.removeProperty('--ui-scale')
  })

  afterEach(() => {
    document.documentElement.className = ''
    document.documentElement.style.removeProperty('--ui-scale')
  })

  it('toggles the high-contrast class on the document root', () => {
    const store = useAccessibilityStore()

    store.toggleHighContrast()
    expect(document.documentElement.classList.contains('high-contrast')).toBe(true)

    store.toggleHighContrast()
    expect(document.documentElement.classList.contains('high-contrast')).toBe(false)
  })

  it('toggles the reduced-motion class on the document root', () => {
    const store = useAccessibilityStore()

    store.toggleReducedMotion()
    expect(document.documentElement.classList.contains('reduced-motion')).toBe(true)
  })

  it('sets the --ui-scale CSS variable per size', () => {
    const store = useAccessibilityStore()

    store.setFontSize('extra-large')
    expect(document.documentElement.style.getPropertyValue('--ui-scale')).toBe('1.375')

    store.setFontSize('small')
    expect(document.documentElement.style.getPropertyValue('--ui-scale')).toBe('0.875')
  })

  it('resets all settings via the "reset" preset', () => {
    const store = useAccessibilityStore()

    store.toggleHighContrast()
    store.setFontSize('large')
    store.applyPreset('reset')

    expect(store.settings.highContrast).toBe(false)
    expect(store.settings.fontSize).toBe('medium')
  })

  it('persists settings to localStorage on change', () => {
    const store = useAccessibilityStore()
    store.toggleSimplifiedUI()

    const saved = JSON.parse(localStorage.getItem('accessibility-settings') || '{}')
    expect(saved.simplifiedUI).toBe(true)
  })
})
