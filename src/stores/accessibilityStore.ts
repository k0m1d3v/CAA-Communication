import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export interface AccessibilitySettings {
  fontSize: 'small' | 'medium' | 'large' | 'extra-large'
  highContrast: boolean
  reducedMotion: boolean
  screenReader: boolean
  voiceSpeed: number
  colorBlindFriendly: boolean
  simplifiedUI: boolean
  gestureNavigation: boolean
  eyeTrackingMode: boolean
}

export const useAccessibilityStore = defineStore('accessibility', () => {
  // Impostazioni di accessibilità
  const settings = ref<AccessibilitySettings>({
    fontSize: 'medium',
    highContrast: false,
    reducedMotion: false,
    screenReader: false,
    voiceSpeed: 1,
    colorBlindFriendly: false,
    simplifiedUI: false,
    gestureNavigation: false,
    eyeTrackingMode: false,
  })

  // Carica impostazioni dal localStorage
  const loadSettings = () => {
    const saved = localStorage.getItem('accessibility-settings')
    if (saved) {
      try {
        const parsedSettings = JSON.parse(saved)
        settings.value = { ...settings.value, ...parsedSettings }
      } catch (error) {
        console.error('Errore nel caricamento impostazioni accessibilità:', error)
      }
    }

    // Applica le impostazioni
    applySettings()
  }

  // Salva impostazioni nel localStorage
  const saveSettings = () => {
    localStorage.setItem('accessibility-settings', JSON.stringify(settings.value))
  }

  // Applica le impostazioni CSS/DOM
  const applySettings = () => {
    const root = document.documentElement

    // Font size
    const fontSizeMap = {
      small: '14px',
      medium: '16px',
      large: '18px',
      'extra-large': '22px',
    }
    root.style.setProperty('--base-font-size', fontSizeMap[settings.value.fontSize])

    // High contrast
    if (settings.value.highContrast) {
      root.classList.add('high-contrast')
    } else {
      root.classList.remove('high-contrast')
    }

    // Reduced motion
    if (settings.value.reducedMotion) {
      root.classList.add('reduced-motion')
    } else {
      root.classList.remove('reduced-motion')
    }

    // Color blind friendly
    if (settings.value.colorBlindFriendly) {
      root.classList.add('color-blind-friendly')
    } else {
      root.classList.remove('color-blind-friendly')
    }

    // Simplified UI
    if (settings.value.simplifiedUI) {
      root.classList.add('simplified-ui')
    } else {
      root.classList.remove('simplified-ui')
    }

    // Eye tracking mode
    if (settings.value.eyeTrackingMode) {
      enableEyeTrackingMode()
    } else {
      disableEyeTrackingMode()
    }
  }

  // Modalità eye tracking

  const enableEyeTrackingMode = () => {
    // Evidenzia elementi al passaggio del mouse (simula eye tracking)
    document.body.classList.add('eye-tracking-mode')

    // Aggiungi indicatori visivi per gli elementi interattivi
    const interactiveElements = document.querySelectorAll('button, a, input, [role="button"]')
    interactiveElements.forEach((el) => {
      el.classList.add('eye-tracking-target')
    })

    // Simula dwell click (click automatico dopo 2 secondi)
    let hoveredElement: Element | null = null
    let dwellTimer: number | null = null

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.classList.contains('eye-tracking-target')) {
        hoveredElement = target
        target.classList.add('eye-tracking-focus')

        dwellTimer = window.setTimeout(() => {
          if (hoveredElement === target) {
            ;(target as HTMLElement).click()
          }
        }, 2000)
      }
    }

    const handleMouseLeave = (e: MouseEvent) => {
      const target = e.target as Element
      if (target.classList.contains('eye-tracking-target')) {
        target.classList.remove('eye-tracking-focus')
        if (dwellTimer) {
          clearTimeout(dwellTimer)
          dwellTimer = null
        }
        hoveredElement = null
      }
    }

    document.addEventListener('mouseenter', handleMouseEnter, true)
    document.addEventListener('mouseleave', handleMouseLeave, true)
  }

  const disableEyeTrackingMode = () => {
    document.body.classList.remove('eye-tracking-mode')
    document.querySelectorAll('.eye-tracking-target').forEach((el) => {
      el.classList.remove('eye-tracking-target', 'eye-tracking-focus')
    })
  }

  // Gesture navigation
  const enableGestureNavigation = () => {
    let startX = 0
    let startY = 0

    const handleTouchStart = (e: TouchEvent) => {
      startX = e.touches[0].clientX
      startY = e.touches[0].clientY
    }

    const handleTouchEnd = (e: TouchEvent) => {
      const endX = e.changedTouches[0].clientX
      const endY = e.changedTouches[0].clientY
      const diffX = endX - startX
      const diffY = endY - startY

      const minSwipeDistance = 100

      // Swipe right - go back
      if (diffX > minSwipeDistance && Math.abs(diffY) < minSwipeDistance) {
        window.history.back()
      }
      // Swipe left - go forward
      else if (diffX < -minSwipeDistance && Math.abs(diffY) < minSwipeDistance) {
        window.history.forward()
      }
      // Swipe up - scroll to top
      else if (diffY > minSwipeDistance && Math.abs(diffX) < minSwipeDistance) {
        window.scrollTo({ top: 0, behavior: 'smooth' })
      }
      // Swipe down - scroll to bottom
      else if (diffY < -minSwipeDistance && Math.abs(diffX) < minSwipeDistance) {
        window.scrollTo({ top: document.body.scrollHeight, behavior: 'smooth' })
      }
    }

    if (settings.value.gestureNavigation) {
      document.addEventListener('touchstart', handleTouchStart)
      document.addEventListener('touchend', handleTouchEnd)
    }
  }

  // Funzioni per modificare singole impostazioni
  const setFontSize = (size: AccessibilitySettings['fontSize']) => {
    settings.value.fontSize = size
    applySettings()
    saveSettings()
  }

  const toggleHighContrast = () => {
    settings.value.highContrast = !settings.value.highContrast
    applySettings()
    saveSettings()
  }

  const toggleReducedMotion = () => {
    settings.value.reducedMotion = !settings.value.reducedMotion
    applySettings()
    saveSettings()
  }

  const toggleScreenReader = () => {
    settings.value.screenReader = !settings.value.screenReader
    applySettings()
    saveSettings()
  }

  const setVoiceSpeed = (speed: number) => {
    settings.value.voiceSpeed = Math.max(0.1, Math.min(3, speed))
    saveSettings()
  }

  const toggleColorBlindFriendly = () => {
    settings.value.colorBlindFriendly = !settings.value.colorBlindFriendly
    applySettings()
    saveSettings()
  }

  const toggleSimplifiedUI = () => {
    settings.value.simplifiedUI = !settings.value.simplifiedUI
    applySettings()
    saveSettings()
  }

  const toggleGestureNavigation = () => {
    settings.value.gestureNavigation = !settings.value.gestureNavigation
    if (settings.value.gestureNavigation) {
      enableGestureNavigation()
    }
    saveSettings()
  }

  const toggleEyeTrackingMode = () => {
    settings.value.eyeTrackingMode = !settings.value.eyeTrackingMode
    applySettings()
    saveSettings()
  }

  // Presets di accessibilità
  const applyPreset = (presetName: string) => {
    switch (presetName) {
      case 'visual-impairment':
        settings.value = {
          ...settings.value,
          fontSize: 'extra-large',
          highContrast: true,
          screenReader: true,
          voiceSpeed: 0.8,
          simplifiedUI: true,
        }
        break

      case 'motor-impairment':
        settings.value = {
          ...settings.value,
          gestureNavigation: true,
          eyeTrackingMode: true,
          simplifiedUI: true,
          fontSize: 'large',
        }
        break

      case 'cognitive-support':
        settings.value = {
          ...settings.value,
          simplifiedUI: true,
          reducedMotion: true,
          fontSize: 'large',
          voiceSpeed: 0.7,
        }
        break

      case 'reset':
        settings.value = {
          fontSize: 'medium',
          highContrast: false,
          reducedMotion: false,
          screenReader: false,
          voiceSpeed: 1,
          colorBlindFriendly: false,
          simplifiedUI: false,
          gestureNavigation: false,
          eyeTrackingMode: false,
        }
        break
    }

    applySettings()
    saveSettings()
  }

  // Watcher per salvare automaticamente le modifiche
  watch(settings, saveSettings, { deep: true })

  return {
    settings,
    loadSettings,
    saveSettings,
    applySettings,
    setFontSize,
    toggleHighContrast,
    toggleReducedMotion,
    toggleScreenReader,
    setVoiceSpeed,
    toggleColorBlindFriendly,
    toggleSimplifiedUI,
    toggleGestureNavigation,
    toggleEyeTrackingMode,
    applyPreset,
  }
})
