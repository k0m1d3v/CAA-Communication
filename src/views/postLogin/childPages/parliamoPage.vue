<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useAuthStore } from '../../../stores/authStore'
import NavigationCard from '../../../components/navigationCard.vue'

import BackHome from '../../../components/backHome.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  authStore.initializeStore()

  watch(
    () => authStore.isLoading,
    (loading) => {
      if (!loading) {
        if (!authStore.user) {
          console.warn('Nessun utente trovato, reindirizzamento al login...')
          router.push('/login')
        }
      }
    },
    { immediate: true },
  )
})

const cards = [
  { text: 'Ascolta', icon: 'parliamoIcon.png', route: '/storyteller', color: '#A2C2E5' },
  { text: 'Racconta', icon: 'dizionarioIcon.png', route: '/parliamo', color: '#7A9EC2' },
]
</script>

<template>
  <!-- Background with modern gradient -->
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <BackHome />

    <!-- Main content container -->
    <div class="container mx-auto px-6 pt-24 pb-16">
      <!-- Header section -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-3xl mb-6 shadow-lg"
        >
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z"
            ></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-slate-800 mb-4">Parliamo</h1>
        <p class="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Scegli come comunicare: ascolta storie create da altri o racconta le tue usando
          pittogrammi e simboli.
        </p>
      </div>

      <!-- Navigation cards -->
      <div class="flex flex-wrap justify-center items-stretch gap-8 max-w-4xl mx-auto">
        <NavigationCard
          v-for="(item, index) in cards"
          :key="index"
          :text="item.text"
          :icon="item.icon"
          :route="item.route"
          :color="item.color"
          class="transform hover:scale-105 transition-all duration-300"
        />
      </div>

      <!-- Educational note -->
      <div class="mt-16 max-w-2xl mx-auto">
        <div
          class="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 text-center shadow-lg"
        >
          <div
            class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl mb-4"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
          </div>
          <p class="text-slate-700 font-medium">
            💬 La comunicazione è un diritto universale. Questi strumenti sono gratuiti per
            supportare l'apprendimento
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
