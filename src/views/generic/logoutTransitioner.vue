<script setup lang="ts">
import { useAuthStore } from '@/stores/authStore'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const authStore = useAuthStore()
const router = useRouter()
const { t } = useI18n()

const isLoggingOut = ref(true)
const progress = ref(0)
const statusMessage = ref('')

const updateProgress = () => {
  const interval = setInterval(() => {
    progress.value += 10

    if (progress.value <= 30) {
      statusMessage.value = t('logoutTransitioner.clearing')
    } else if (progress.value <= 60) {
      statusMessage.value = t('logoutTransitioner.saving')
    } else if (progress.value <= 90) {
      statusMessage.value = t('logoutTransitioner.finalizing')
    } else {
      statusMessage.value = t('logoutTransitioner.redirecting')
    }

    if (progress.value >= 100) {
      clearInterval(interval)
    }
  }, 100)
}

onMounted(async () => {
  try {
    updateProgress()
    statusMessage.value = t('logoutTransitioner.starting')

    // Simulate logout process
    await new Promise((resolve) => setTimeout(resolve, 1000))

    await authStore.logout()

    // Wait for progress to complete
    await new Promise((resolve) => setTimeout(resolve, 200))

    isLoggingOut.value = false
    router.push('/login')
  } catch (error) {
    console.error('Error during logout:', error)
    statusMessage.value = t('logoutTransitioner.error')

    // Still redirect after error
    setTimeout(() => {
      router.push('/login')
    }, 2000)
  }
})
</script>

<template>
  <div
    class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 flex items-center justify-center"
  >
    <div class="text-center px-4 max-w-md mx-auto">
      <!-- Logout Animation -->
      <div class="bg-white rounded-2xl shadow-xl border border-gray-100 p-8">
        <!-- Icon -->
        <div
          class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6"
        >
          <div v-if="isLoggingOut" class="animate-spin">
            <span class="text-2xl">🔄</span>
          </div>
          <div v-else>
            <span class="text-2xl">✅</span>
          </div>
        </div>

        <!-- Title -->
        <h1 class="text-2xl font-bold text-gray-800 mb-4">
          {{ isLoggingOut ? t('logoutTransitioner.title') : t('logoutTransitioner.complete') }}
        </h1>

        <!-- Status Message -->
        <p class="text-gray-600 mb-6">
          {{ statusMessage }}
        </p>

        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 mb-4">
          <div
            class="bg-gradient-to-r from-blue-500 to-indigo-600 h-2 rounded-full transition-all duration-200"
            :style="{ width: `${progress}%` }"
          ></div>
        </div>

        <!-- Progress Percentage -->
        <p class="text-sm text-gray-500">{{ progress }}%</p>

        <!-- Loading Dots Animation -->
        <div v-if="isLoggingOut" class="flex justify-center space-x-1 mt-6">
          <div
            class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style="animation-delay: 0ms"
          ></div>
          <div
            class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style="animation-delay: 150ms"
          ></div>
          <div
            class="w-2 h-2 bg-blue-500 rounded-full animate-bounce"
            style="animation-delay: 300ms"
          ></div>
        </div>

        <!-- Success Message -->
        <div v-else class="mt-6">
          <div class="text-green-600 font-medium">
            {{ t('logoutTransitioner.success') }}
          </div>
        </div>
      </div>

      <!-- Footer -->
      <p class="text-sm text-gray-500 mt-6">
        {{ t('logoutTransitioner.footer') }}
      </p>
    </div>
  </div>
</template>
