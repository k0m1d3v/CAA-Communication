<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { useLanguageStore } from '@/stores/languageStore'
import BackHome from '@/components/backHome.vue'

import PageTitle from '@/components/pageTitle.vue'

interface Pictogram {
  _id: string
  keywords: { keyword: string }[]
}

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const router = useRouter()
const { t } = useI18n()

const isGameActive = ref(false)
const currentPictogram = ref<Pictogram | null>(null)
const userGuess = ref('')
const feedback = ref('')
const feedbackType = ref<'success' | 'error' | 'info'>('info')
const isLoading = ref(false)
const score = ref(0)

const resetGame = () => {
  isGameActive.value = false
  currentPictogram.value = null
  userGuess.value = ''
  feedback.value = ''
  feedbackType.value = 'info'
  isLoading.value = false
}

const fetchRandomPictogram = async () => {
  isLoading.value = true
  feedback.value = ''

  try {
    const language = languageStore.language === 'it' ? 'it' : 'en'
    const response = await fetch(`https://api.arasaac.org/v1/pictograms/all/${language}`)

    if (!response.ok) throw new Error('API error')

    const data: Pictogram[] = await response.json()

    if (data.length > 0) {
      const randomIndex = Math.floor(Math.random() * data.length)
      currentPictogram.value = data[randomIndex]
    } else {
      feedback.value = t('imparaPage.noDataFound')
      feedbackType.value = 'error'
    }
  } catch (error) {
    console.error('Error fetching pictogram:', error)
    feedback.value = t('imparaPage.loadError')
    feedbackType.value = 'error'
  } finally {
    isLoading.value = false
  }
}

const startGame = async () => {
  isGameActive.value = true
  score.value = 0
  await fetchRandomPictogram()
}

const submitGuess = () => {
  if (!currentPictogram.value || !userGuess.value.trim()) return

  const correctAnswer = currentPictogram.value.keywords[0]?.keyword?.toLowerCase() || ''
  const guess = userGuess.value.trim().toLowerCase()

  if (guess === correctAnswer) {
    feedback.value = t('imparaPage.correct')
    feedbackType.value = 'success'
    score.value++

    // Nuova parola dopo un breve delay
    setTimeout(() => {
      userGuess.value = ''
      fetchRandomPictogram()
    }, 1500)
  } else {
    feedback.value = t('imparaPage.incorrect')
    feedbackType.value = 'error'
  }
}

const handleKeyPress = (event: KeyboardEvent) => {
  if (event.key === 'Enter') {
    submitGuess()
  }
}

// Auth check
onMounted(() => {
  authStore.initializeStore()
  watch(
    () => authStore.isLoading,
    (loading) => {
      if (!loading && !authStore.user) {
        router.push('/login')
      }
    },
    { immediate: true },
  )
})
</script>

<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50">
    <BackHome @before-home="resetGame" />

    <!-- Header -->
    <div class="container mx-auto px-4 pt-16 pb-8">
      <div class="text-center mb-8">
        <PageTitle title="Impara" />
        <p class="text-xl text-gray-600 mt-4">
          {{ t('imparaPage.subtitle') }}
        </p>
      </div>

      <!-- Game Interface -->
      <div v-if="!isGameActive" class="max-w-2xl mx-auto">
        <!-- Welcome Card -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
          <div
            class="w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-3xl">🎓</span>
          </div>

          <h2 class="text-2xl font-bold text-gray-800 mb-4">
            {{ t('imparaPage.welcomeTitle') }}
          </h2>

          <p class="text-gray-600 mb-8 leading-relaxed">
            {{ t('imparaPage.welcomeDescription') }}
          </p>

          <button
            @click="startGame"
            class="bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white font-semibold py-4 px-8 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
          >
            <span class="mr-2">🚀</span>
            {{ t('imparaPage.startButton') }}
          </button>
        </div>
      </div>

      <!-- Active Game -->
      <div v-else class="max-w-2xl mx-auto">
        <!-- Score Display -->
        <div class="bg-white rounded-xl shadow-lg border border-gray-100 p-4 mb-6 text-center">
          <div class="flex items-center justify-center space-x-4">
            <span class="text-2xl">🏆</span>
            <span class="text-lg font-semibold text-gray-700">
              {{ t('imparaPage.score') }}: {{ score }}
            </span>
          </div>
        </div>

        <!-- Game Card -->
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
          <!-- Loading State -->
          <div v-if="isLoading" class="text-center py-12">
            <div
              class="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mb-4"
            ></div>
            <p class="text-gray-600">{{ t('imparaPage.loading') }}</p>
          </div>

          <!-- Game Content -->
          <div v-else-if="currentPictogram" class="text-center">
            <!-- Pictogram Image -->
            <div class="mb-8">
              <img
                :src="`https://static.arasaac.org/pictograms/${currentPictogram._id}/${currentPictogram._id}_500.png`"
                :alt="t('imparaPage.pictogramAlt')"
                class="max-w-full h-64 object-contain mx-auto rounded-xl shadow-md border-2 border-blue-200"
                @error="fetchRandomPictogram"
              />
            </div>

            <!-- Input Section -->
            <div class="max-w-md mx-auto space-y-4">
              <div>
                <label for="guess-input" class="block text-sm font-medium text-gray-700 mb-2">
                  {{ t('imparaPage.guessPrompt') }}
                </label>
                <input
                  id="guess-input"
                  v-model="userGuess"
                  type="text"
                  :placeholder="t('imparaPage.inputPlaceholder')"
                  @keypress="handleKeyPress"
                  class="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200"
                  :disabled="isLoading"
                />
              </div>

              <button
                @click="submitGuess"
                :disabled="!userGuess.trim() || isLoading"
                class="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 disabled:from-gray-300 disabled:to-gray-400 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 disabled:cursor-not-allowed"
              >
                {{ t('imparaPage.submitButton') }}
              </button>
            </div>

            <!-- Feedback -->
            <div v-if="feedback" class="mt-6">
              <div
                :class="[
                  'inline-flex items-center px-4 py-2 rounded-lg font-medium',
                  feedbackType === 'success'
                    ? 'bg-green-100 text-green-800'
                    : feedbackType === 'error'
                      ? 'bg-red-100 text-red-800'
                      : 'bg-blue-100 text-blue-800',
                ]"
              >
                <span class="mr-2">
                  {{ feedbackType === 'success' ? '✅' : feedbackType === 'error' ? '❌' : 'ℹ️' }}
                </span>
                {{ feedback }}
              </div>
            </div>

            <!-- Game Controls -->
            <div class="mt-8 flex justify-center space-x-4">
              <button
                @click="fetchRandomPictogram"
                class="bg-gray-500 hover:bg-gray-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                {{ t('imparaPage.skipButton') }}
              </button>

              <button
                @click="resetGame"
                class="bg-red-500 hover:bg-red-600 text-white font-medium py-2 px-4 rounded-lg transition-colors duration-200"
              >
                {{ t('imparaPage.quitButton') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
