import { ref, watch } from 'vue'

export interface AccessibilitySettings {
  fontSize: number
  highContrast: boolean
  reducedMotion: boolean
  textToSpeech: boolean
  screenReader: boolean
}

const STORAGE_KEY = 'caa-accessibility-settings'

const defaultSettings: AccessibilitySettings = {
  fontSize: 16,
  highContrast: false,
  reducedMotion: false,
  textToSpeech: true,
  screenReader: false,
}

// Reactive settings
const settings = ref<AccessibilitySettings>({ ...defaultSettings })

// Load settings from localStorage
const loadSettings = () => {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    if (stored) {
      const parsed = JSON.parse(stored)
      settings.value = { ...defaultSettings, ...parsed }
    }
  } catch (error) {
    console.warn('Failed to load accessibility settings:', error)
  }
}

// Save settings to localStorage
const saveSettings = () => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(settings.value))
  } catch (error) {
    console.warn('Failed to save accessibility settings:', error)
  }
}

// Apply settings to DOM
const applySettings = () => {
  const root = document.documentElement

  // Font size
  root.style.fontSize = `${settings.value.fontSize}px`

  // High contrast
  if (settings.value.highContrast) {
    root.classList.add('accessibility-high-contrast')
  } else {
    root.classList.remove('accessibility-high-contrast')
  }

  // Reduced motion
  if (settings.value.reducedMotion) {
    root.classList.add('accessibility-reduced-motion')
  } else {
    root.classList.remove('accessibility-reduced-motion')
  }

  // Screen reader support
  if (settings.value.screenReader) {
    root.classList.add('accessibility-screen-reader')
  } else {
    root.classList.remove('accessibility-screen-reader')
  }
}

// Text to speech functionality
const speak = (text: string, options?: SpeechSynthesisUtterance) => {
  if (!settings.value.textToSpeech || !('speechSynthesis' in window)) {
    return
  }

  // Cancel any ongoing speech
  speechSynthesis.cancel()

  const utterance = new SpeechSynthesisUtterance(text)

  // Apply options if provided
  if (options) {
    Object.assign(utterance, options)
  }

  // Default settings
  utterance.rate = 0.8
  utterance.pitch = 1
  utterance.volume = 0.8

  speechSynthesis.speak(utterance)
}

// Stop speech
const stopSpeech = () => {
  if ('speechSynthesis' in window) {
    speechSynthesis.cancel()
  }
}

// Announce to screen readers
const announce = (message: string, priority: 'polite' | 'assertive' = 'polite') => {
  const announcement = document.createElement('div')
  announcement.setAttribute('aria-live', priority)
  announcement.setAttribute('aria-atomic', 'true')
  announcement.style.position = 'absolute'
  announcement.style.left = '-10000px'
  announcement.style.width = '1px'
  announcement.style.height = '1px'
  announcement.style.overflow = 'hidden'

  document.body.appendChild(announcement)
  announcement.textContent = message

  // Remove after announcement
  setTimeout(() => {
    document.body.removeChild(announcement)
  }, 1000)
}

// Keyboard navigation helpers
const trapFocus = (element: HTMLElement) => {
  const focusableElements = element.querySelectorAll(
    'a[href], button, textarea, input[type="text"], input[type="radio"], input[type="checkbox"], select',
  )

  const firstFocusable = focusableElements[0] as HTMLElement
  const lastFocusable = focusableElements[focusableElements.length - 1] as HTMLElement

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === 'Tab') {
      if (e.shiftKey) {
        if (document.activeElement === firstFocusable) {
          e.preventDefault()
          lastFocusable.focus()
        }
      } else {
        if (document.activeElement === lastFocusable) {
          e.preventDefault()
          firstFocusable.focus()
        }
      }
    }

    if (e.key === 'Escape') {
      e.preventDefault()
      element.blur()
    }
  }

  element.addEventListener('keydown', handleKeyDown)

  // Return cleanup function
  return () => {
    element.removeEventListener('keydown', handleKeyDown)
  }
}

// Color contrast helpers
const getContrastRatio = (color1: string, color2: string): number => {
  // Simplified contrast ratio calculation
  // In a real implementation, you'd want a more robust calculation
  const getLuminance = (color: string) => {
    // Basic luminance calculation
    return 0.5 // Placeholder
  }

  const l1 = getLuminance(color1)
  const l2 = getLuminance(color2)

  return (Math.max(l1, l2) + 0.05) / (Math.min(l1, l2) + 0.05)
}

const isAccessible = (foreground: string, background: string): boolean => {
  return getContrastRatio(foreground, background) >= 4.5
}

// Initialize
let initialized = false

export const useAccessibility = () => {
  if (!initialized) {
    // Load settings on first use
    loadSettings()
    applySettings()

    // Watch for changes and apply them
    watch(
      settings,
      () => {
        applySettings()
        saveSettings()
      },
      { deep: true },
    )

    initialized = true
  }

  return {
    // Settings
    settings,

    // Actions
    loadSettings,
    saveSettings,
    applySettings,

    // Text to speech
    speak,
    stopSpeech,

    // Screen reader
    announce,

    // Focus management
    trapFocus,

    // Color contrast
    getContrastRatio,
    isAccessible,

    // Shortcuts
    increaseFontSize: () => {
      settings.value.fontSize = Math.min(settings.value.fontSize + 2, 24)
    },
    decreaseFontSize: () => {
      settings.value.fontSize = Math.max(settings.value.fontSize - 2, 12)
    },
    toggleHighContrast: () => {
      settings.value.highContrast = !settings.value.highContrast
    },
    toggleReducedMotion: () => {
      settings.value.reducedMotion = !settings.value.reducedMotion
    },
    toggleTextToSpeech: () => {
      settings.value.textToSpeech = !settings.value.textToSpeech
    },
    resetSettings: () => {
      settings.value = { ...defaultSettings }
    },
  }
}

// Global keyboard shortcuts
if (typeof window !== 'undefined') {
  document.addEventListener('keydown', (e) => {
    // Ctrl/Cmd + Plus: Increase font size
    if ((e.ctrlKey || e.metaKey) && e.key === '+') {
      e.preventDefault()
      const { increaseFontSize } = useAccessibility()
      increaseFontSize()
    }

    // Ctrl/Cmd + Minus: Decrease font size
    if ((e.ctrlKey || e.metaKey) && e.key === '-') {
      e.preventDefault()
      const { decreaseFontSize } = useAccessibility()
      decreaseFontSize()
    }

    // Ctrl/Cmd + 0: Reset font size
    if ((e.ctrlKey || e.metaKey) && e.key === '0') {
      e.preventDefault()
      const { resetSettings } = useAccessibility()
      resetSettings()
    }
  })
}
