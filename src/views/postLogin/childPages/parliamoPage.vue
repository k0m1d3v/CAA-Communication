<script setup lang="ts">
import NavigationCard from '../../../components/navigationCard.vue'

import BackHome from '../../../components/backHome.vue'

const cards = [
  { text: 'Ascolta', icon: 'parliamoIcon.png', route: '/storyteller', color: 'descr' },
  { text: 'Racconta', icon: 'dizionarioIcon.png', route: '/parliamo', color: 'verb' },
]
</script>

<template>
  <div class="min-h-screen bg-canvas">
    <BackHome />

    <!-- Main content container -->
    <div class="container mx-auto px-6 pt-24 pb-16">
      <!-- Header section -->
      <div class="text-center mb-12">
        <h1 class="text-display font-bold text-ink mb-4">Parliamo</h1>
        <p class="text-body-lg text-ink-soft max-w-2xl mx-auto">
          Scegli come comunicare: ascolta storie create da altri o racconta le tue usando
          pittogrammi e simboli.
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
