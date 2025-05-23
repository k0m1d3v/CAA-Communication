<script setup lang="ts">
import { ref } from 'vue'
import { auth } from '../../firebaseConfig.ts'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { useAuthStore } from '../../stores/authStore'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const email = ref('')
const password = ref('')
const errorMessage = ref('')
const isLoading = ref(false)

const authStore = useAuthStore()
const router = useRouter()

const login = async () => {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email.value, password.value)
    console.log('User logged in successfully:', userCredential.user)

    // Firebase gestisce lo stato, quindi aspettiamo che `initializeStore` lo aggiorni
    authStore.initializeStore()

    router.push('/home')
  } catch (error) {
    if (error instanceof Error) {
      errorMessage.value = error.message
      console.error('Login error:', error)
    } else {
      console.error('Unexpected error:', error)
    }
  }
}
</script>

<template>
  <main class="flex items-center justify-center min-h-screen" style="background-color: #fcffa1">
    <div class="w-full max-w-md bg-white rounded-lg shadow-lg p-8">
      <h1 class="text-3xl font-bold text-center mb-6" style="color: #7da7d9">
        {{ t('loginPage.title') }}
      </h1>
      <form @submit.prevent="login" class="space-y-6">
        <div>
          <label for="email" class="block text-sm font-medium" style="color: #7da7d9">
            {{ t('loginPage.emailLabel') }}
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#77DD77]"
            :placeholder="t('loginPage.emailPlaceholder')"
          />
        </div>

        <div>
          <label for="password" class="block text-sm font-medium" style="color: #7da7d9">
            {{ t('loginPage.passwordLabel') }}
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#FF9AA2]"
            :placeholder="t('loginPage.passwordPlaceholder')"
          />
        </div>

        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

        <div>
          <button
            type="submit"
            class="w-full py-2 px-4 bg-[#7DA7D9] text-white font-bold rounded-lg hover:bg-[#77DD77] transition duration-300"
            :disabled="isLoading"
          >
            {{ isLoading ? t('loginPage.loggingIn') : t('loginPage.loginButton') }}
          </button>
        </div>
      </form>

      <p class="text-center text-sm mt-4" style="color: #7da7d9">
        {{ t('loginPage.noAccount') }}
        <a href="/register" class="font-bold" style="color: #ff9aa2">{{ t('loginPage.signUpLink') }}</a>
      </p>
    </div>
  </main>
</template>
