<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore'
import { onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import NavigationCard from '../../components/navigationCard.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  authStore.initializeStore()

  // Wait for `isLoading` to become `false` before checking `user`
  watch(
    () => authStore.isLoading,
    (loading) => {
      if (!loading) {
        if (!authStore.user) {
          console.warn('No user found, redirecting to login...')
          router.push('/login')
        }
      }
    },
    { immediate: true },
  )
})

// Navigation cards SEMPLIFICATA - solo 4 opzioni principali
const cards = computed(() => [
  {
    text: t('homePage.cards.speak'),
    icon: 'parliamoIcon.png',
    route: '/parliamo',
    color: '#7DA7D9',
  },
  {
    text: t('homePage.cards.dictionary'),
    icon: 'dizionarioIcon.png',
    route: '/dizionario',
    color: '#FF9AA2',
  },
  {
    text: t('homePage.cards.games'),
    icon: 'giochiIcon.png',
    route: '/giochi',
    color: '#77DD77',
  },
  {
    text: 'I miei progressi',
    icon: 'helpIcon.png',
    route: '/analytics',
    color: '#9B59B6',
  },
])
</script>

<template>
  <!-- Layout semplice e accessibile per utenti CAA -->
  <div class="caa-homepage">
    <!-- Intestazione semplice e chiara -->
    <header class="page-header">
      <h1 class="main-title">
        {{ t('homePage.title') }}
      </h1>
      <p class="welcome-message" v-if="authStore.user">
        Ciao {{ authStore.user.displayName || 'Utente' }}! 👋
      </p>
    </header>

    <!-- Navigazione principale - FOCUS UNICO -->
    <main class="main-content">
      <h2 class="section-title">Scegli cosa fare:</h2>

      <!-- Cards grandi e semplici -->
      <div class="simple-navigation">
        <NavigationCard
          v-for="(item, index) in cards"
          :key="index"
          :text="item.text"
          :icon="item.icon"
          :route="item.route"
          :color="item.color"
          class="simple-card"
        />
      </div>
    </main>

    <!-- Help sempre accessibile -->
  </div>
</template>

<style scoped>
/* Design elegante e raffinato per CAA */
.caa-homepage {
  min-height: 100vh;
  background: linear-gradient(165deg, #667eea 0%, #764ba2 100%);
  position: relative;
  font-family:
    -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
}

/* Overlay pattern sottile */
.caa-homepage::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-image: radial-gradient(
    circle at 1px 1px,
    rgba(255, 255, 255, 0.15) 1px,
    transparent 0
  );
  background-size: 20px 20px;
  opacity: 0.5;
}

.page-header {
  text-align: center;
  padding: 4rem 2rem 2rem;
  position: relative;
  z-index: 1;
}

.main-title {
  font-size: 3.5rem;
  font-weight: 700;
  color: #ffffff;
  margin-bottom: 1.5rem;
  text-shadow: 0 2px 20px rgba(0, 0, 0, 0.3);
  letter-spacing: -0.01em;
}

.welcome-message {
  font-size: 1.4rem;
  color: rgba(255, 255, 255, 0.95);
  font-weight: 500;
  background: rgba(255, 255, 255, 0.15);
  backdrop-filter: blur(20px);
  border-radius: 30px;
  padding: 1rem 2rem;
  display: inline-block;
  border: 1px solid rgba(255, 255, 255, 0.2);
  box-shadow:
    0 8px 32px rgba(0, 0, 0, 0.1),
    inset 0 1px 0 rgba(255, 255, 255, 0.3);
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 2rem 4rem;
  position: relative;
  z-index: 1;
}

.section-title {
  font-size: 2.2rem;
  font-weight: 600;
  text-align: center;
  color: #ffffff;
  margin-bottom: 3rem;
  text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
}

.simple-navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: 2rem;
  justify-items: center;
  padding: 1rem;
}

/* Card eleganti e moderne */
:deep(.simple-card) {
  background: rgba(255, 255, 255, 0.95);
  border-radius: 20px;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.08);
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  border: none !important;
  overflow: hidden;
  position: relative;
}

:deep(.simple-card:hover) {
  transform: translateY(-4px);
  box-shadow: 0 8px 30px rgba(0, 0, 0, 0.12);
}

:deep(.simple-card:active) {
  transform: translateY(-2px);
  transition: all 0.1s ease;
}

/* Responsive design pulito */
@media (max-width: 768px) {
  .page-header {
    padding: 3rem 1.5rem 1.5rem;
  }

  .main-title {
    font-size: 2.8rem;
  }

  .section-title {
    font-size: 1.8rem;
  }

  .simple-navigation {
    grid-template-columns: 1fr;
    gap: 1.5rem;
    padding: 0.5rem;
  }

  .welcome-message {
    font-size: 1.2rem;
    padding: 0.8rem 1.5rem;
  }

  .main-content {
    padding: 0 1rem 3rem;
  }
}

/* Accessibilità migliorata */
:deep(.simple-card:focus) {
  outline: 3px solid #ffd700;
  outline-offset: 3px;
}

/* Supporto per modalità scura */
@media (prefers-color-scheme: dark) {
  :deep(.simple-card) {
    background: rgba(30, 41, 59, 0.9);
    border-color: rgba(255, 255, 255, 0.1);
  }

  :deep(.simple-card .card-text) {
    color: #f1f5f9;
  }
}

/* Contrasto alto */
@media (prefers-contrast: high) {
  .main-title,
  .section-title {
    text-shadow: 2px 2px 4px #000000;
  }

  :deep(.simple-card) {
    border: 2px solid #000000;
  }
}

/* Riduzione animazioni */
@media (prefers-reduced-motion: reduce) {
  :deep(.simple-card) {
    transition: none;
  }

  :deep(.simple-card:hover) {
    transform: none;
  }
}

:deep(.help-navigator) {
  position: fixed;
  bottom: 2rem;
  right: 2rem;
  z-index: 1000;
}

/* Miglioramenti per tablet */
@media (min-width: 769px) and (max-width: 1024px) {
  .simple-navigation {
    grid-template-columns: repeat(2, 1fr);
    max-width: 800px;
    margin: 0 auto;
  }
}

/* Layout extra large */
@media (min-width: 1400px) {
  .main-content {
    max-width: 1400px;
  }

  .simple-navigation {
    grid-template-columns: repeat(4, 1fr);
  }
}
</style>
