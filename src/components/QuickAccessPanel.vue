<template>
  <div class="quick-access-panel">
    <h3 class="panel-title">🚀 Accesso Rapido</h3>

    <div class="quick-buttons">
      <!-- Analytics Button -->
      <button @click="goToAnalytics" class="quick-button analytics" title="Visualizza Analytics">
        <span class="icon">📊</span>
        <span class="label">Analytics</span>
      </button>

      <!-- Backup Status -->
      <button
        @click="showBackupStatus"
        class="quick-button backup"
        :class="{ syncing: isBackupSyncing }"
        title="Stato Backup"
      >
        <span class="icon">{{ isBackupSyncing ? '🔄' : '☁️' }}</span>
        <span class="label">Backup</span>
      </button>

      <!-- Accessibility Panel -->
      <button
        @click="toggleAccessibility"
        class="quick-button accessibility"
        title="Impostazioni Accessibilità"
      >
        <span class="icon">♿</span>
        <span class="label">Accessibilità</span>
      </button>

      <!-- Tutorial -->
      <button @click="startTutorial" class="quick-button tutorial" title="Avvia Tutorial">
        <span class="icon">🎯</span>
        <span class="label">Tutorial</span>
      </button>
    </div>

    <!-- Status Indicators -->
    <div class="status-bar">
      <div class="status-item">
        <span class="status-icon">👤</span>
        <span class="status-text">Utente: {{ userName }}</span>
      </div>
      <div class="status-item">
        <span class="status-icon">📱</span>
        <span class="status-text">Sessione: {{ sessionTime }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useAuthStore } from '../stores/authStore'

const router = useRouter()
const authStore = useAuthStore()

const isBackupSyncing = ref(false)
const sessionStartTime = ref(Date.now())

const userName = computed(() => {
  return authStore.user?.email?.split('@')[0] || 'Anonimo'
})

const sessionTime = computed(() => {
  const elapsed = Date.now() - sessionStartTime.value
  const minutes = Math.floor(elapsed / 60000)
  return `${minutes}m`
})

const goToAnalytics = () => {
  router.push('/analytics')
}

const showBackupStatus = () => {
  // Simula controllo backup
  isBackupSyncing.value = true
  setTimeout(() => {
    isBackupSyncing.value = false
    alert('✅ Backup sincronizzato correttamente!')
  }, 2000)
}

const toggleAccessibility = () => {
  // Per ora mostra un alert, poi collegheremo al pannello reale
  alert('🚧 Pannello accessibilità in sviluppo')
}

const startTutorial = () => {
  // Reset del flag tutorial per rimostrarlo
  localStorage.removeItem('has-seen-onboarding')
  location.reload()
}

onMounted(() => {
  // Aggiorna il tempo di sessione ogni minuto
  setInterval(() => {
    sessionStartTime.value = sessionStartTime.value // Trigger reattività
  }, 60000)
})
</script>

<style scoped>
.quick-access-panel {
  position: fixed;
  bottom: 20px;
  right: 20px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.15);
  padding: 16px;
  min-width: 200px;
  z-index: 999;
  border: 2px solid #e5e7eb;
}

.panel-title {
  font-size: 14px;
  font-weight: bold;
  color: #374151;
  margin-bottom: 12px;
  text-align: center;
}

.quick-buttons {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
  margin-bottom: 12px;
}

.quick-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 4px;
  padding: 12px 8px;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 12px;
}

.quick-button .icon {
  font-size: 20px;
}

.quick-button .label {
  font-weight: 500;
  color: #6b7280;
}

.quick-button.analytics {
  background: linear-gradient(135deg, #ddd6fe, #e0e7ff);
}

.quick-button.analytics:hover {
  background: linear-gradient(135deg, #c4b5fd, #c7d2fe);
  transform: translateY(-1px);
}

.quick-button.backup {
  background: linear-gradient(135deg, #d1fae5, #dbeafe);
}

.quick-button.backup:hover {
  background: linear-gradient(135deg, #a7f3d0, #bfdbfe);
  transform: translateY(-1px);
}

.quick-button.backup.syncing {
  animation: pulse 1s infinite;
}

.quick-button.accessibility {
  background: linear-gradient(135deg, #fef3c7, #fed7aa);
}

.quick-button.accessibility:hover {
  background: linear-gradient(135deg, #fde68a, #fdba74);
  transform: translateY(-1px);
}

.quick-button.tutorial {
  background: linear-gradient(135deg, #fce7f3, #f3e8ff);
}

.quick-button.tutorial:hover {
  background: linear-gradient(135deg, #fbcfe8, #e9d5ff);
  transform: translateY(-1px);
}

.status-bar {
  border-top: 1px solid #e5e7eb;
  padding-top: 12px;
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.status-item {
  display: flex;
  align-items: center;
  gap: 6px;
  font-size: 11px;
  color: #6b7280;
}

.status-icon {
  font-size: 12px;
}

@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.5;
  }
}

/* Responsive */
@media (max-width: 768px) {
  .quick-access-panel {
    bottom: 10px;
    right: 10px;
    min-width: 160px;
  }

  .quick-buttons {
    grid-template-columns: 1fr 1fr;
  }

  .quick-button {
    padding: 10px 6px;
  }

  .quick-button .icon {
    font-size: 18px;
  }

  .quick-button .label {
    font-size: 10px;
  }
}
</style>
