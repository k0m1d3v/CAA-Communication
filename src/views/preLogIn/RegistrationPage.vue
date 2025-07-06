<script setup lang="ts">
import { ref } from 'vue'
import { auth } from '../../firebaseConfig'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '../../stores/languageStore'

const { t } = useI18n()
const languageStore = useLanguageStore()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = t('registrationPage.passwordMismatch')
    return
  }

  isLoading.value = true
  errorMessage.value = ''

  try {
    await createUserWithEmailAndPassword(auth, email.value, password.value)
    console.log('User registered successfully')
    // Redirect to login or dashboard after registration
    window.location.href = '/home'
  } catch (error: unknown) {
    if (error instanceof Error) {
      errorMessage.value = error.message
      console.error('Registration error:', error)
    } else {
      console.error('Unexpected error:', error)
    }
  } finally {
    isLoading.value = false
  }
}

const toggleLanguage = () => {
  const newLang = languageStore.language === 'it' ? 'en' : 'it'
  languageStore.setLanguage(newLang)
}
</script>

<template>
  <!-- Top navbar with language switcher -->
  <nav class="absolute top-0 left-0 right-0 z-10 p-6 flex justify-between items-center">
    <router-link
      to="/"
      class="text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm font-medium flex items-center gap-2"
    >
      <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          d="M15 19l-7-7 7-7"
        ></path>
      </svg>
      {{ t('common.backToHome') }}
    </router-link>

    <!-- Language Switcher -->
    <button
      @click="toggleLanguage"
      class="relative group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:border-slate-300 transition-all duration-200 shadow-sm"
      :aria-label="t('common.switchLanguage')"
    >
      <div class="flex items-center gap-2">
        <span
          class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
        >
          {{ languageStore.language.toUpperCase() }}
        </span>
        <span class="hidden sm:inline">
          {{ languageStore.language === 'it' ? 'Italiano' : 'English' }}
        </span>
      </div>
    </button>
  </nav>

  <!-- Main content -->
  <main
    class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 flex items-center justify-center p-6"
  >
    <div class="w-full max-w-md">
      <!-- Registration Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="w-16 h-16 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"
              ></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-slate-800 mb-2">
            {{ t('registrationPage.title') }}
          </h1>
          <p class="text-slate-600 text-sm">
            {{ t('registrationPage.subtitle') }}
          </p>
        </div>

        <!-- Registration Form -->
        <form @submit.prevent="register" class="space-y-5">
          <!-- Name Input -->
          <div>
            <label for="name" class="block text-sm font-medium text-slate-700 mb-2">
              {{ t('registrationPage.nameLabel') }}
            </label>
            <input
              v-model="name"
              type="text"
              id="name"
              required
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-slate-400"
              :placeholder="t('registrationPage.namePlaceholder')"
            />
          </div>

          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 mb-2">
              {{ t('registrationPage.emailLabel') }}
            </label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-slate-400"
              :placeholder="t('registrationPage.emailPlaceholder')"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 mb-2">
              {{ t('registrationPage.passwordLabel') }}
            </label>
            <input
              v-model="password"
              type="password"
              id="password"
              required
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-slate-400"
              :placeholder="t('registrationPage.passwordPlaceholder')"
            />
          </div>

          <!-- Confirm Password Input -->
          <div>
            <label for="confirm-password" class="block text-sm font-medium text-slate-700 mb-2">
              {{ t('registrationPage.confirmPasswordLabel') }}
            </label>
            <input
              v-model="confirmPassword"
              type="password"
              id="confirm-password"
              required
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-slate-400"
              :placeholder="t('registrationPage.confirmPasswordPlaceholder')"
            />
          </div>

          <!-- Error Message -->
          <div v-if="errorMessage" class="bg-red-50 border border-red-200 rounded-xl p-4">
            <div class="flex items-center">
              <svg class="w-5 h-5 text-red-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fill-rule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clip-rule="evenodd"
                />
              </svg>
              <p class="text-red-800 text-sm">{{ errorMessage }}</p>
            </div>
          </div>

          <!-- Submit Button -->
          <button
            type="submit"
            :disabled="isLoading || !name || !email || !password || !confirmPassword"
            class="w-full py-3 px-4 bg-gradient-to-r from-emerald-500 to-blue-600 text-white font-semibold rounded-xl hover:from-emerald-600 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-emerald-500 disabled:hover:to-blue-600"
          >
            <span v-if="isLoading" class="flex items-center justify-center">
              <svg
                class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  class="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  class="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
              {{ t('registrationPage.registering') }}
            </span>
            <span v-else>{{ t('registrationPage.registerButton') }}</span>
          </button>
        </form>

        <!-- Footer Links -->
        <div class="mt-8 pt-6 border-t border-slate-100">
          <p class="text-center text-sm text-slate-600">
            {{ t('registrationPage.alreadyHaveAccount') }}
            <router-link
              to="/login"
              class="font-semibold text-emerald-600 hover:text-emerald-700 transition-colors duration-200 ml-1"
            >
              {{ t('registrationPage.loginLink') }}
            </router-link>
          </p>

          <!-- Educational Note -->
          <div class="mt-4 p-3 bg-emerald-50 rounded-xl border border-emerald-100">
            <p class="text-xs text-emerald-700 text-center font-medium">
              🎓 {{ t('common.educationalProject') }} • {{ t('common.freeToUse') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
