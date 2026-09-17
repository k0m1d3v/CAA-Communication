<template>
  <div class="accessibility-panel">
    <!-- Pulsante per aprire/chiudere il pannello -->
    <button
      type="button"
      class="accessibility-toggle"
      :aria-label="t('accessibility.togglePanel')"
      :aria-expanded="isOpen"
      @click="togglePanel"
    >
      <span class="icon" aria-hidden="true">♿</span>
    </button>

    <!-- Pannello impostazioni -->
    <div
      v-if="isOpen"
      class="accessibility-settings surface-card"
      role="dialog"
      aria-modal="true"
      aria-labelledby="accessibility-panel-title"
    >
      <div class="settings-header">
        <h3 id="accessibility-panel-title" class="text-h3 font-bold text-ink">
          {{ t('accessibility.panelTitle') }}
        </h3>
        <button type="button" class="btn-secondary close-btn" @click="togglePanel">
          {{ t('accessibility.close') }}
        </button>
      </div>

      <!-- Preset: le scelte grandi, in cima -->
      <div class="setting-group">
        <div class="preset-buttons">
          <button type="button" class="btn-primary preset-button" @click="applyPreset('visual-impairment')">
            {{ t('accessibility.presets.visualImpairment') }}
          </button>
          <button type="button" class="btn-primary preset-button" @click="applyPreset('motor-impairment')">
            {{ t('accessibility.presets.motorImpairment') }}
          </button>
          <button type="button" class="btn-primary preset-button" @click="applyPreset('cognitive-support')">
            {{ t('accessibility.presets.cognitiveSupport') }}
          </button>
          <button type="button" class="btn-secondary preset-button" @click="applyPreset('reset')">
            {{ t('accessibility.reset') }}
          </button>
        </div>
      </div>

      <h4 class="text-label font-bold text-ink-soft fine-adjustments-title">
        {{ t('accessibility.fineAdjustments') }}
      </h4>

      <!-- Dimensione testo -->
      <div class="setting-group">
        <span class="setting-label">{{ t('accessibility.fontSize') }}</span>
        <div class="button-group" role="group" :aria-label="t('accessibility.fontSize')">
          <button
            v-for="size in fontSizes"
            :key="size.value"
            type="button"
            class="btn-secondary size-button"
            :class="{ active: settings.fontSize === size.value }"
            :aria-pressed="settings.fontSize === size.value"
            :aria-label="size.ariaLabel"
            @click="setFontSize(size.value)"
          >
            {{ size.label }}
          </button>
        </div>
      </div>

      <!-- Toggle options -->
      <div class="setting-group toggle-group">
        <div class="toggle-option">
          <input
            id="a11y-high-contrast"
            type="checkbox"
            :checked="settings.highContrast"
            @change="toggleHighContrast"
          />
          <label for="a11y-high-contrast">{{ t('accessibility.highContrast') }}</label>
        </div>
        <div class="toggle-option">
          <input
            id="a11y-reduced-motion"
            type="checkbox"
            :checked="settings.reducedMotion"
            @change="toggleReducedMotion"
          />
          <label for="a11y-reduced-motion">{{ t('accessibility.reducedMotion') }}</label>
        </div>
        <div class="toggle-option">
          <input
            id="a11y-color-blind"
            type="checkbox"
            :checked="settings.colorBlindFriendly"
            @change="toggleColorBlindFriendly"
          />
          <label for="a11y-color-blind">{{ t('accessibility.colorBlindFriendly') }}</label>
        </div>
        <div class="toggle-option">
          <input
            id="a11y-simplified-ui"
            type="checkbox"
            :checked="settings.simplifiedUI"
            @change="toggleSimplifiedUI"
          />
          <label for="a11y-simplified-ui">{{ t('accessibility.simplifiedUI') }}</label>
        </div>
        <div class="toggle-option">
          <input
            id="a11y-gesture-nav"
            type="checkbox"
            :checked="settings.gestureNavigation"
            @change="toggleGestureNavigation"
          />
          <label for="a11y-gesture-nav">{{ t('accessibility.gestureNavigation') }}</label>
        </div>
        <div class="toggle-option">
          <input
            id="a11y-eye-tracking"
            type="checkbox"
            :checked="settings.eyeTrackingMode"
            @change="toggleEyeTrackingMode"
          />
          <label for="a11y-eye-tracking">{{ t('accessibility.eyeTrackingMode') }}</label>
        </div>
      </div>

      <!-- Velocità voce -->
      <div class="setting-group">
        <label class="setting-label" for="a11y-voice-speed">
          {{ t('accessibility.voiceSpeed') }} ({{ settings.voiceSpeed.toFixed(1) }}x)
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
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from 'pinia'
import { useI18n } from 'vue-i18n'
import { useAccessibilityStore } from '@/stores/accessibilityStore'
import type { AccessibilitySettings } from '@/stores/accessibilityStore'

const { t } = useI18n()
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

const fontSizes: { value: AccessibilitySettings['fontSize']; label: string; ariaLabel: string }[] = [
  { value: 'small', label: 'A', ariaLabel: t('accessibility.sizeSmall') },
  { value: 'medium', label: 'A', ariaLabel: t('accessibility.sizeMedium') },
  { value: 'large', label: 'A', ariaLabel: t('accessibility.sizeLarge') },
  { value: 'extra-large', label: 'A', ariaLabel: t('accessibility.sizeExtraLarge') },
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
  width: var(--target-lg);
  height: var(--target-lg);
  border-radius: 50%;
  background: var(--action);
  color: #FFFFFF;
  border: var(--border-w) solid var(--action);
  transition: background-color var(--motion-fast), border-color var(--motion-fast);
}

.accessibility-toggle:hover {
  background: var(--action-hover);
  border-color: var(--action-hover);
}

.accessibility-toggle .icon {
  font-size: 24px;
}

.accessibility-settings {
  position: absolute;
  right: calc(var(--target-lg) + var(--space-2));
  top: 0;
  width: 22rem;
  max-height: 80vh;
  overflow-y: auto;
}

.settings-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  margin-bottom: var(--space-4);
}

.close-btn {
  flex-shrink: 0;
}

.fine-adjustments-title {
  margin: var(--space-2) 0;
  text-transform: uppercase;
  letter-spacing: 0.04em;
}

.setting-group {
  margin-bottom: var(--space-4);
  padding-bottom: var(--space-4);
  border-bottom: var(--border-w) solid var(--border);
}

.setting-group:last-child {
  border-bottom: none;
}

.setting-label {
  display: block;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: var(--space-2);
}

.button-group {
  display: flex;
  gap: var(--space-2);
}

.size-button {
  flex: 1;
}

.size-button:nth-child(1) {
  font-size: 14px;
}
.size-button:nth-child(2) {
  font-size: 16px;
}
.size-button:nth-child(3) {
  font-size: 18px;
}
.size-button:nth-child(4) {
  font-size: 20px;
}

.size-button.active {
  background: var(--action);
  color: #FFFFFF;
  border-color: var(--action);
}

.toggle-group {
  display: grid;
  gap: var(--space-2);
}

.toggle-option {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  min-height: var(--target-min);
}

.toggle-option input[type='checkbox'] {
  width: 24px;
  height: 24px;
  accent-color: var(--action);
  flex-shrink: 0;
}

.toggle-option label {
  color: var(--ink);
  cursor: pointer;
}

.voice-speed-slider {
  width: 100%;
  height: 6px;
  border-radius: 3px;
  background: var(--surface-sunken);
  outline: none;
  cursor: pointer;
}

.voice-speed-slider::-webkit-slider-thumb {
  appearance: none;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--action);
  cursor: pointer;
}

.voice-speed-slider::-moz-range-thumb {
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background: var(--action);
  cursor: pointer;
  border: none;
}

.preset-buttons {
  display: grid;
  gap: var(--space-2);
}

.preset-button {
  width: 100%;
}

/* Responsive */
@media (max-width: 768px) {
  .accessibility-panel {
    right: 10px;
  }

  .accessibility-settings {
    width: 18rem;
  }
}

@media (max-width: 480px) {
  .accessibility-settings {
    width: 16rem;
    right: 10px;
    top: calc(var(--target-lg) + var(--space-2));
  }
}
</style>
