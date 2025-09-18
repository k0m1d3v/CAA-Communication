<script setup lang="ts">
import { ref } from 'vue'
import { auth } from '../../firebaseConfig'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthStore } from '../../stores/authStore'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '../../stores/languageStore'

const { t } = useI18n()
const languageStore = useLanguageStore()

const email = ref('')
const password = ref('')
const showPassword = ref(false)
const errorMessage = ref('')
const isLoading = ref(false)

const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
  isLoading.value = true
  errorMessage.value = ''

  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('User logged in successfully:', userCredential.user)

    // Firebase gestisce lo stato, quindi aspettiamo che `initializeStore` lo aggiorni
    authStore.initializeStore()

    router.push('/home')
  } catch (error) {
    if (error instanceof Error) {
      // Map Firebase error codes to our translation keys
      const errorCode = error instanceof Error && 'code' in error ? error.code : 'unknown'
      switch(errorCode) {
        case 'auth/invalid-email':
          errorMessage.value = t('loginPage.error.invalidEmail')
          break
        case 'auth/user-not-found':
          errorMessage.value = t('loginPage.error.userNotFound')
          break
        case 'auth/wrong-password':
          errorMessage.value = t('loginPage.error.wrongPassword')
          break
        case 'auth/too-many-requests':
          errorMessage.value = t('loginPage.error.tooManyAttempts')
          break
        default:
          errorMessage.value = t('loginPage.error.default')
      }
      console.error('Login error:', error)
    } else {
      console.error('Unexpected error:', error)
      errorMessage.value = t('loginPage.error.default')
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
      <!-- Login Card -->
      <div class="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/50 p-8">
        <!-- Header -->
        <div class="text-center mb-8">
          <div
            class="w-16 h-16 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl flex items-center justify-center mx-auto mb-4"
          >
            <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
              ></path>
            </svg>
          </div>
          <h1 class="text-2xl font-bold text-slate-800 mb-2">
            {{ t('loginPage.title') }}
          </h1>
          <p class="text-slate-600 text-sm">
            {{ t('loginPage.subtitle') }}
          </p>
        </div>

        <!-- Login Form -->
        <form @submit.prevent="login" class="space-y-6">
          <!-- Email Input -->
          <div>
            <label for="email" class="block text-sm font-medium text-slate-700 mb-2">
              {{ t('loginPage.emailLabel') }}
            </label>
            <input
              v-model="email"
              type="email"
              id="email"
              required
              class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-slate-400"
              :placeholder="t('loginPage.emailPlaceholder')"
            />
          </div>

          <!-- Password Input -->
          <div>
            <label for="password" class="block text-sm font-medium text-slate-700 mb-2">
              {{ t('loginPage.passwordLabel') }}
            </label>
            <div class="relative">
              <input
                v-model="password"
                :type="showPassword ? 'text' : 'password'"
                id="password"
                required
                class="w-full px-4 py-3 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm placeholder-slate-400"
                :placeholder="t('loginPage.passwordPlaceholder')"
              />
              <button
                type="button"
                @click="showPassword = !showPassword"
                class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                :aria-label="showPassword ? t('common.hidePassword') : t('common.showPassword')"
              >
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  v-if="showPassword"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                  />
                </svg>
                <svg
                  class="w-5 h-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  v-else
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                  />
                </svg>
              </button>
            </div>
            <!-- Forgot Password Link -->
            <div class="flex justify-end mt-2">
              <a href="#" class="text-sm text-blue-600 hover:text-blue-700 transition-colors duration-200">
                {{ t('loginPage.forgotPassword') }}
              </a>
            </div>
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
            :disabled="isLoading || !email || !password"
            class="w-full py-3 px-4 bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-semibold rounded-xl hover:from-blue-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:from-blue-500 disabled:hover:to-indigo-600"
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
              {{ t('loginPage.loggingIn') }}
            </span>
            <span v-else>{{ t('loginPage.loginButton') }}</span>
          </button>
        </form>

        <!-- Footer Links -->
        <div class="mt-8 pt-6 border-t border-slate-100">
          <p class="text-center text-sm text-slate-600">
            {{ t('loginPage.noAccount') }}
            <router-link
              to="/register"
              class="font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-200 ml-1"
            >
              {{ t('loginPage.signUpLink') }}
            </router-link>
          </p>

          <!-- Educational Note -->
          <div class="mt-4 p-3 bg-blue-50 rounded-xl border border-blue-100">
            <p class="text-xs text-blue-700 text-center font-medium">
              🎓 {{ t('common.educationalProject') }}
            </p>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>
