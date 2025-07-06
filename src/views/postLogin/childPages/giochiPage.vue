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

const cards = [{ text: 'Impara', icon: 'parliamoIcon.png', route: '/impara', color: '#ffdd57' }]
</script>

<template>
  <!-- Background with modern gradient -->
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-amber-50 to-orange-50">
    <BackHome />

    <!-- Main content container -->
    <div class="container mx-auto px-6 pt-24 pb-16">
      <!-- Header section -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-amber-500 to-orange-600 rounded-3xl mb-6 shadow-lg"
        >
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-slate-800 mb-4">Giochi Educativi</h1>
        <p class="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          Impara divertendoti! Giochi educativi progettati per migliorare le competenze comunicative
          attraverso il gioco e l'esplorazione.
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

      <!-- Game features info -->
      <div class="mt-16 max-w-4xl mx-auto">
        <div class="grid md:grid-cols-3 gap-6">
          <div
            class="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 text-center shadow-lg"
          >
            <div
              class="w-12 h-12 bg-gradient-to-r from-green-400 to-blue-500 rounded-xl mx-auto mb-4 flex items-center justify-center"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-800 mb-2">Apprendimento Ludico</h3>
            <p class="text-slate-600 text-sm">
              Giochi progettati per rendere l'apprendimento divertente e coinvolgente
            </p>
          </div>

          <div
            class="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 text-center shadow-lg"
          >
            <div
              class="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl mx-auto mb-4 flex items-center justify-center"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-800 mb-2">Progressi Rapidi</h3>
            <p class="text-slate-600 text-sm">
              Metodologie che accelerano l'apprendimento della comunicazione CAA
            </p>
          </div>

          <div
            class="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 text-center shadow-lg"
          >
            <div
              class="w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl mx-auto mb-4 flex items-center justify-center"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-lg font-semibold text-slate-800 mb-2">Sempre Gratuito</h3>
            <p class="text-slate-600 text-sm">
              Tutti i giochi sono disponibili gratuitamente per supportare l'educazione
            </p>
          </div>
        </div>
      </div>

      <!-- Educational note -->
      <div class="mt-16 max-w-2xl mx-auto">
        <div
          class="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 text-center shadow-lg"
        >
          <div
            class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-indigo-400 to-purple-500 rounded-xl mb-4"
          >
            <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253z"
              ></path>
            </svg>
          </div>
          <p class="text-slate-700 font-medium">
            🎮 I giochi educativi rendono l'apprendimento della CAA divertente e accessibile a tutti
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
