import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useAccessibilityStore } from './accessibilityStore'

describe('accessibilityStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
    localStorage.clear()
    document.documentElement.className = ''
    document.documentElement.style.removeProperty('--base-font-size')
  })

  afterEach(() => {
    document.documentElement.className = ''
    document.documentElement.style.removeProperty('--base-font-size')
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

  it('sets the --base-font-size CSS variable per size', () => {
    const store = useAccessibilityStore()

    store.setFontSize('extra-large')
    expect(document.documentElement.style.getPropertyValue('--base-font-size')).toBe('22px')

    store.setFontSize('small')
    expect(document.documentElement.style.getPropertyValue('--base-font-size')).toBe('14px')
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
