<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const goHome = () => {
  router.push('/')
}
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center"
  >
    <div class="text-center px-4 max-w-2xl mx-auto">
      <!-- 404 Animation -->
      <div class="mb-8">
        <div class="relative inline-block">
          <div
            class="text-8xl font-bold text-transparent bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text animate-pulse"
          >
            404
          </div>
          <div
            class="absolute -top-4 -right-4 w-16 h-16 bg-yellow-400 rounded-full flex items-center justify-center animate-bounce"
          >
            <span class="text-2xl">😕</span>
          </div>
        </div>
      </div>

      <!-- Main Content -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-4">
          {{ t('notFoundPage.title') }}
        </h1>

        <p class="text-lg text-gray-600 mb-8 leading-relaxed">
          {{ t('notFoundPage.subtitle') }}
        </p>

        <!-- Action Buttons -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            @click="goHome"
            class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span class="mr-2">🏠</span>
            {{ t('notFoundPage.backToHome') }}
          </button>

          <button
            @click="router.go(-1)"
            class="bg-gray-500 hover:bg-gray-600 text-white font-semibold py-3 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span class="mr-2">⬅️</span>
            {{ t('notFoundPage.goBack') }}
          </button>
        </div>
      </div>

      <!-- Helpful Links -->
      <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">
          {{ t('notFoundPage.helpfulLinksTitle') }}
        </h3>

        <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <router-link
            to="/login"
            class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <span class="text-xl">🔐</span>
            <span class="text-gray-700">{{ t('notFoundPage.loginLink') }}</span>
          </router-link>

          <router-link
            to="/credits"
            class="flex items-center space-x-3 p-3 rounded-lg hover:bg-gray-50 transition-colors duration-200"
          >
            <span class="text-xl">ℹ️</span>
            <span class="text-gray-700">{{ t('notFoundPage.creditsLink') }}</span>
          </router-link>
        </div>
      </div>

      <!-- Footer Message -->
      <p class="text-sm text-gray-500 mt-8">
        {{ t('notFoundPage.footerMessage') }}
      </p>
    </div>
  </div>
</template>
