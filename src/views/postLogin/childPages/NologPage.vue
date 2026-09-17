<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/pageTitle.vue'
import NavigationCard from '@/components/navigationCard.vue'

import BackHome from '@/components/backHome.vue'

const { t } = useI18n()

const cards = [
  {
    text: 'Risposte rapide',
    icon: 'risposta.png',
    route: '/risposteRapide',
    color: 'social',
  },
  {
    text: 'Dizionario',
    icon: 'dizionario.png',
    route: '/dictionary',
    color: 'noun',
  },
]
</script>

<template>
  <div class="min-h-screen bg-canvas">
    <BackHome />

    <!-- Header -->
    <div class="container mx-auto px-4 pt-16 pb-8">
      <div class="text-center mb-12">
        <PageTitle title="Dizionario" />
        <p class="text-body-lg text-ink-soft mt-4">
          {{ t('nologPage.subtitle') }}
        </p>
      </div>

      <!-- Info Cards -->
      <div class="info-grid max-w-4xl mx-auto mb-12">
        <!-- Quick Responses Info -->
        <div class="surface-card">
          <h3 class="text-h3 font-bold text-ink mb-2">
            {{ t('nologPage.quickResponsesTitle') }}
          </h3>
          <p class="text-ink-soft">
            {{ t('nologPage.quickResponsesDescription') }}
          </p>
        </div>

        <!-- Dictionary Info -->
        <div class="surface-card">
          <h3 class="text-h3 font-bold text-ink mb-2">
            {{ t('nologPage.dictionaryTitle') }}
          </h3>
          <p class="text-ink-soft">
            {{ t('nologPage.dictionaryDescription') }}
          </p>
        </div>
      </div>

      <!-- Navigation Cards -->
      <div class="fork-grid max-w-4xl mx-auto">
        <NavigationCard
          v-for="(item, index) in cards"
          :key="index"
          :text="item.text"
          :icon="item.icon"
          :route="item.route"
          :color="item.color"
        />
      </div>

      <!-- Features List -->
      <div class="max-w-3xl mx-auto mt-12">
        <div class="surface-card">
          <h3 class="text-h3 font-bold text-ink mb-4 text-center">
            {{ t('nologPage.featuresTitle') }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="feature-item">
              <span class="text-ink">{{ t('nologPage.feature1') }}</span>
            </div>
            <div class="feature-item">
              <span class="text-ink">{{ t('nologPage.feature2') }}</span>
            </div>
            <div class="feature-item">
              <span class="text-ink">{{ t('nologPage.feature3') }}</span>
            </div>
            <div class="feature-item">
              <span class="text-ink">{{ t('nologPage.feature4') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.info-grid,
.fork-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 300px));
  justify-content: center;
  gap: var(--space-6);
}

.feature-item {
  display: flex;
  align-items: center;
  gap: var(--space-2);
  padding: var(--space-2);
}

.feature-item::before {
  content: '✓';
  color: var(--success);
  font-weight: 700;
}
</style>
