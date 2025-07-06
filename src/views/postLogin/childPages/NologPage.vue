<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import PageTitle from '@/components/pageTitle.vue'
import NavigationCard from '@/components/navigationCard.vue'

import BackHome from '@/components/backHome.vue'

const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()

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
  {
    text: 'Risposte rapide',
    icon: 'risposta.png',
    route: '/quick-answers',
    color: '#F4C2C2',
    cardHeight: '12rem',
    cardWidth: '20.5rem',
    borderRadius: '5rem',
    additionalIcons: ['rapido.png'],
    showDivider: false,
  },
  {
    text: 'Dizionario',
    icon: 'dizionario.png',
    route: '/dictionary',
    color: '#FF9AA2',
    cardHeight: '12rem',
    cardWidth: '20.5rem',
    borderRadius: '5rem',
    additionalIcons: ['e.png', 'parola.png'],
    showDivider: false,
  },
]
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50">
    <BackHome />

    <!-- Header -->
    <div class="container mx-auto px-4 pt-16 pb-8">
      <div class="text-center mb-12">
        <div
          class="w-16 h-16 bg-gradient-to-br from-orange-500 to-amber-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <span class="text-2xl">📚</span>
        </div>
        <PageTitle title="Dizionario" />
        <p class="text-lg text-gray-600 mt-4">
          {{ t('nologPage.subtitle') }}
        </p>
      </div>

      <!-- Info Cards -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto mb-12">
        <!-- Quick Responses Info -->
        <div
          class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-center space-x-4 mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-pink-500 to-red-500 rounded-xl flex items-center justify-center"
            >
              <span class="text-xl">⚡</span>
            </div>
            <h3 class="text-xl font-bold text-gray-800">
              {{ t('nologPage.quickResponsesTitle') }}
            </h3>
          </div>
          <p class="text-gray-600 leading-relaxed">
            {{ t('nologPage.quickResponsesDescription') }}
          </p>
        </div>

        <!-- Dictionary Info -->
        <div
          class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 hover:shadow-xl transition-shadow duration-300"
        >
          <div class="flex items-center space-x-4 mb-4">
            <div
              class="w-12 h-12 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center"
            >
              <span class="text-xl">📖</span>
            </div>
            <h3 class="text-xl font-bold text-gray-800">
              {{ t('nologPage.dictionaryTitle') }}
            </h3>
          </div>
          <p class="text-gray-600 leading-relaxed">
            {{ t('nologPage.dictionaryDescription') }}
          </p>
        </div>
      </div>

      <!-- Navigation Cards -->
      <div class="grid grid-cols-1 sm:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <NavigationCard
          v-for="(item, index) in cards"
          :key="index"
          :text="item.text"
          :icon="item.icon"
          :route="item.route"
          :color="item.color"
          :card-height="item.cardHeight"
          :card-width="item.cardWidth"
          :border-radius="item.borderRadius"
          :additional-icons="item.additionalIcons"
          :show-divider="item.showDivider"
          class="transform hover:scale-105 transition-all duration-300"
        />
      </div>

      <!-- Features List -->
      <div class="max-w-3xl mx-auto mt-12">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <h3 class="text-xl font-bold text-gray-800 mb-6 text-center">
            {{ t('nologPage.featuresTitle') }}
          </h3>

          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div class="flex items-center space-x-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-gray-700">{{ t('nologPage.feature1') }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-gray-700">{{ t('nologPage.feature2') }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-gray-700">{{ t('nologPage.feature3') }}</span>
            </div>
            <div class="flex items-center space-x-3">
              <span class="text-green-500 text-xl">✓</span>
              <span class="text-gray-700">{{ t('nologPage.feature4') }}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
