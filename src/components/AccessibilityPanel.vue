<template>
  <div class="accessibility-panel" :class="{ open: isOpen }">
    <!-- Pulsante per aprire/chiudere il pannello -->
    <button
      @click="togglePanel"
      class="accessibility-toggle"
      :aria-label="isOpen ? 'Chiudi impostazioni accessibilità' : 'Apri impostazioni accessibilità'"
      :aria-expanded="isOpen"
    >
      <span class="icon" aria-hidden="true">♿</span>
    </button>

    <!-- Pannello impostazioni -->
    <div
      v-if="isOpen"
      class="accessibility-settings"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-panel-title"
    >
      <h3 id="accessibility-panel-title" class="settings-title">Impostazioni Accessibilità</h3>

      <!-- Dimensione testo -->
      <div class="setting-group">
        <span class="setting-label">Dimensione testo</span>
        <div class="button-group">
          <button
            v-for="size in fontSizes"
            :key="size.value"
            type="button"
            class="size-button"
            :class="{ active: settings.fontSize === size.value }"
            :aria-pressed="settings.fontSize === size.value"
            @click="setFontSize(size.value)"
          >
            {{ size.label }}
          </button>
        </div>
      </div>

      <!-- Toggle options -->
      <div class="setting-group">
        <div class="toggle-option">
          <input
            id="a11y-high-contrast"
            type="checkbox"
            :checked="settings.highContrast"
            @change="toggleHighContrast"
          />
          <label for="a11y-high-contrast">Alto contrasto</label>
        </div>
        <div class="toggle-option">
          <input
            id="a11y-reduced-motion"
            type="checkbox"
            :checked="settings.reducedMotion"
            @change="toggleReducedMotion"
          />
          <label for="a11y-reduced-motion">Riduci animazioni</label>
        </div>
        <div class="toggle-option">
          <input
            id="a11y-color-blind"
            type="checkbox"
            :checked="settings.colorBlindFriendly"
            @change="toggleColorBlindFriendly"
          />
          <label for="a11y-color-blind">Palette daltonici</label>
        </div>
        <div class="toggle-option">
          <input
            id="a11y-simplified-ui"
            type="checkbox"
            :checked="settings.simplifiedUI"
            @change="toggleSimplifiedUI"
          />
          <label for="a11y-simplified-ui">Interfaccia semplificata</label>
        </div>
        <div class="toggle-option">
          <input
            id="a11y-gesture-nav"
            type="checkbox"
            :checked="settings.gestureNavigation"
            @change="toggleGestureNavigation"
          />
          <label for="a11y-gesture-nav">Navigazione gestuale</label>
        </div>
        <div class="toggle-option">
          <input
            id="a11y-eye-tracking"
            type="checkbox"
            :checked="settings.eyeTrackingMode"
            @change="toggleEyeTrackingMode"
          />
          <label for="a11y-eye-tracking">Modalità eye tracking</label>
        </div>
      </div>

      <!-- Velocità voce -->
      <div class="setting-group">
        <label class="setting-label" for="a11y-voice-speed">
          Velocità voce ({{ settings.voiceSpeed.toFixed(1) }}x)
        </label>
        <input
          id="a11y-voice-speed"
          class="voice-speed-slider"
          type="range"
          min="0.1"
          max="3"
          step="0.1"
          :value="settings.voiceSpeed"
          @input="onVoiceSpeedInput"
        />
      </div>

      <!-- Preset -->
      <div class="setting-group">
        <span class="setting-label">Preset rapidi</span>
        <div class="preset-buttons">
          <button type="button" class="preset-button" @click="applyPreset('visual-impairment')">
            👁️ Ipovisione
          </button>
          <button type="button" class="preset-button" @click="applyPreset('motor-impairment')">
            🖐️ Motorio
          </button>
          <button type="button" class="preset-button" @click="applyPreset('cognitive-support')">
            🧠 Cognitivo
          </button>
          <button type="button" class="preset-button reset" @click="applyPreset('reset')">
            ↺ Ripristina
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useAccessibilityStore } from '@/stores/accessibilityStore'
import type { AccessibilitySettings } from '@/stores/accessibilityStore'

const isOpen = ref(false)

const accessibilityStore = useAccessibilityStore()
const { settings } = storeToRefs(accessibilityStore)
const {
  setFontSize,
  toggleHighContrast,
  toggleReducedMotion,
  toggleColorBlindFriendly,
  toggleSimplifiedUI,
  toggleGestureNavigation,
  toggleEyeTrackingMode,
  setVoiceSpeed,
  applyPreset,
} = accessibilityStore

const fontSizes: { value: AccessibilitySettings['fontSize']; label: string }[] = [
  { value: 'small', label: 'A' },
  { value: 'medium', label: 'A' },
  { value: 'large', label: 'A' },
  { value: 'extra-large', label: 'A' },
]

const togglePanel = () => {
  isOpen.value = !isOpen.value
}

const onVoiceSpeedInput = (event: Event) => {
  const target = event.target as HTMLInputElement
  setVoiceSpeed(Number(target.value))
}
</script>

<style scoped>
.accessibility-panel {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  z-index: 9999;
}

.accessibility-toggle {
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
  border: none;
  box-shadow: 0 4px 12px rgba(59, 130, 246, 0.3);
  cursor: pointer;
  transition: all 0.3s ease;
  display: flex;
  align-items: center;
  justify-content: center;
}

.accessibility-toggle:hover {
  transform: scale(1.1);
  box-shadow: 0 6px 16px rgba(59, 130, 246, 0.4);
}

.accessibility-toggle .icon {
  font-size: 24px;
}

.accessibility-settings {
  position: absolute;
  right: 70px;
  top: 0;
  width: 350px;
  background: white;
  border-radius: 12px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 20px;
  max-height: 80vh;
  overflow-y: auto;
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.settings-title {
  font-size: 18px;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 20px;
  text-align: center;
}

.setting-group {
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid #e5e7eb;
}

.setting-group:last-child {
  border-bottom: none;
}

.setting-label {
  display: block;
  font-weight: 600;
  color: #374151;
  margin-bottom: 10px;
  font-size: 14px;
}

.button-group {
  display: flex;
  gap: 8px;
}

.size-button {
  flex: 1;
  padding: 8px 12px;
  border: 2px solid #e5e7eb;
  border-radius: 6px;
  background: white;
  color: #6b7280;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.size-button:nth-child(1) {
  font-size: 12px;
}
.size-button:nth-child(2) {
  font-size: 14px;
}
.size-button:nth-child(3) {
  font-size: 16px;
}
.size-button:nth-child(4) {
  font-size: 18px;
}

.size-button:hover {
  border-color: #3b82f6;
  color: #3b82f6;
}

.size-button.active {
  border-color: #3b82f6;
  background: #3b82f6;
  color: white;
}

.toggle-option {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 12px;
}

.toggle-option input[type='checkbox'] {
  width: 18px;
  height: 18px;
  accent-color: #3b82f6;
  flex-shrink: 0;
}

.toggle-option label {
  color: #374151;
  font-size: 14px;
  cursor: pointer;
}

.voice-speed-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: #e5e7eb;
  outline: none;
  cursor: pointer;
}

.voice-speed-slider::-webkit-slider-thumb {
  appearance: none;
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
}

.voice-speed-slider::-moz-range-thumb {
  width: 20px;
  height: 20px;
  border-radius: 50%;
  background: #3b82f6;
  cursor: pointer;
  border: none;
}

.preset-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 10px;
}

.preset-button {
  padding: 10px 15px;
  border: 2px solid #e5e7eb;
  border-radius: 8px;
  background: white;
  color: #374151;
  font-size: 12px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.preset-button:hover {
  border-color: #3b82f6;
  background: #f8fafc;
}

.preset-button.reset {
  border-color: #ef4444;
  color: #ef4444;
}

.preset-button.reset:hover {
  background: #fef2f2;
}

/* Responsive */
@media (max-width: 768px) {
  .accessibility-panel {
    right: 10px;
  }

  .accessibility-settings {
    width: 300px;
    right: 70px;
  }
}

@media (max-width: 480px) {
  .accessibility-settings {
    width: 280px;
    right: 10px;
    top: 70px;
  }
}
</style>
