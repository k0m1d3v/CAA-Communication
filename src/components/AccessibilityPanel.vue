<template>
  <div class="accessibility-panel" :class="{ open: isOpen }">
    <!-- Pulsante per aprire/chiudere il pannello -->
    <button
      @click="togglePanel"
      class="accessibility-toggle"
      :aria-label="isOpen ? 'Chiudi impostazioni accessibilità' : 'Apri impostazioni accessibilità'"
    >
      <span class="icon">♿</span>
    </button>

    <!-- Pannello impostazioni (versione semplificata) -->
    <div v-if="isOpen" class="accessibility-settings">
      <h3 class="settings-title">Impostazioni Accessibilità</h3>

      <div class="setting-group">
        <p class="text-gray-600 text-center">🚧 Pannello in sviluppo 🚧</p>
        <p class="text-sm text-gray-500 text-center mt-2">
          Le funzionalità di accessibilità saranno disponibili presto!
        </p>
      </div>

      <div class="setting-group">
        <button @click="applyBasicSettings" class="preset-button w-full">
          🎯 Applica Impostazioni Base
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const isOpen = ref(false)

const togglePanel = () => {
  isOpen.value = !isOpen.value
}

const applyBasicSettings = () => {
  // Applica alcune impostazioni di base per l'accessibilità
  document.documentElement.style.fontSize = '18px'
  console.log('Impostazioni di accessibilità base applicate')
  isOpen.value = false
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
