<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore'
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import NavigationCard from '../../components/navigationCard.vue'

const { t } = useI18n()
const authStore = useAuthStore()

// Navigation cards SEMPLIFICATA - solo 4 opzioni principali
const cards = computed(() => [
  {
    text: t('homePage.cards.speak'),
    icon: 'parliamoIcon.png',
    route: '/parliamo',
    color: 'verb',
  },
  {
    text: t('homePage.cards.dictionary'),
    icon: 'dizionarioIcon.png',
    route: '/dizionario',
    color: 'noun',
  },
  {
    text: t('homePage.cards.games'),
    icon: 'giochiIcon.png',
    route: '/giochi',
    color: 'quest',
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
        {{ t('homePage.welcome', { name: authStore.user.displayName || 'Utente' }) }}
      </p>
    </header>

    <!-- Navigazione principale - FOCUS UNICO -->
    <main class="main-content">
      <h2 class="section-title">{{ t('homePage.sectionTitle') }}</h2>

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
.caa-homepage {
  min-height: 100vh;
  background: var(--canvas);
}

.page-header {
  text-align: center;
  padding: var(--space-12) var(--space-8) var(--space-6);
}

.main-title {
  font-family: var(--font-display);
  font-size: var(--text-display);
  font-weight: 800;
  color: var(--ink);
  margin-bottom: var(--space-4);
  letter-spacing: -0.01em;
}

.welcome-message {
  font-size: var(--text-body-lg);
  color: var(--ink-soft);
  font-weight: 500;
}

.main-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 0 var(--space-8) var(--space-12);
}

.section-title {
  font-size: var(--text-h2);
  font-weight: 700;
  text-align: center;
  color: var(--ink);
  margin-bottom: var(--space-8);
}

.simple-navigation {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 300px));
  justify-content: center;
  gap: var(--space-6);
  padding: var(--space-1);
}

/* Responsive design */
@media (max-width: 768px) {
  .page-header {
    padding: var(--space-8) var(--space-4) var(--space-4);
  }

  .simple-navigation {
    grid-template-columns: 1fr;
  }

  .main-content {
    padding: 0 var(--space-4) var(--space-8);
  }
}

@media (min-width: 1400px) {
  .main-content {
    max-width: 1400px;
  }
}
</style>
