<script setup lang="ts">
import NavigationCard from '../../../components/navigationCard.vue'

import BackHome from '../../../components/backHome.vue'

const cards = [
  { text: 'Impara', icon: 'parliamoIcon.png', route: '/impara', color: 'quest' },
  { text: 'Ascolta e Trova', icon: 'parlareIcon.png', route: '/ascolta-trova', color: 'descr' },
  { text: 'Memory', icon: 'dizionarioIcon.png', route: '/memory', color: 'verb' },
]
</script>

<template>
  <div class="min-h-screen bg-canvas">
    <BackHome />

    <!-- Main content container -->
    <div class="container mx-auto px-6 pt-24 pb-16">
      <!-- Header section -->
      <div class="text-center mb-12">
        <h1 class="text-display font-bold text-ink mb-4">Giochi Educativi</h1>
        <p class="text-body-lg text-ink-soft max-w-2xl mx-auto">
          Impara divertendoti! Giochi educativi progettati per migliorare le competenze comunicative
          attraverso il gioco e l'esplorazione.
        </p>
      </div>

      <!-- Navigation cards -->
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
    </div>
  </div>
</template>

<style scoped>
.fork-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(260px, 300px));
  justify-content: center;
  gap: var(--space-6);
}
</style>
