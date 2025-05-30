<script setup lang="ts">
import { ref } from 'vue'
import { auth } from '../../firebaseConfig.ts'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const name = ref('')
const email = ref('')
const password = ref('')
const confirmPassword = ref('')
const errorMessage = ref('')

const register = async () => {
  if (password.value !== confirmPassword.value) {
    errorMessage.value = t('registrationPage.passwordMismatch')
    return
  }

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
  }
}
</script>

<template>
  <main
    class="flex items-center justify-center min-h-screen bg-gradient-to-br from-[#fcffa1] to-[#ffebcd]"
  >
    <div class="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8">
      <h1 class="text-4xl font-extrabold text-center mb-6 text-[#7da7d9]">
        {{ t('registrationPage.title') }}
      </h1>
      <form @submit.prevent="register" class="space-y-6">
        <!-- Name Input -->
        <div>
          <label for="name" class="block text-sm font-semibold text-[#7da7d9]">
            {{ t('registrationPage.nameLabel') }}
          </label>
          <input
            v-model="name"
            type="text"
            id="name"
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#77DD77] focus:border-transparent"
            :placeholder="t('registrationPage.namePlaceholder')"
          />
        </div>

        <!-- Email Input -->
        <div>
          <label for="email" class="block text-sm font-semibold text-[#7da7d9]">
            {{ t('registrationPage.emailLabel') }}
          </label>
          <input
            v-model="email"
            type="email"
            id="email"
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#77DD77] focus:border-transparent"
            :placeholder="t('registrationPage.emailPlaceholder')"
          />
        </div>

        <!-- Password Input -->
        <div>
          <label for="password" class="block text-sm font-semibold text-[#7da7d9]">
            {{ t('registrationPage.passwordLabel') }}
          </label>
          <input
            v-model="password"
            type="password"
            id="password"
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9AA2] focus:border-transparent"
            :placeholder="t('registrationPage.passwordPlaceholder')"
          />
        </div>

        <!-- Confirm Password Input -->
        <div>
          <label for="confirm-password" class="block text-sm font-semibold text-[#7da7d9]">
            {{ t('registrationPage.confirmPasswordLabel') }}
          </label>
          <input
            v-model="confirmPassword"
            type="password"
            id="confirm-password"
            class="w-full mt-2 px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-[#FF9AA2] focus:border-transparent"
            :placeholder="t('registrationPage.confirmPasswordPlaceholder')"
          />
        </div>

        <!-- Error Message -->
        <p v-if="errorMessage" class="text-red-500 text-sm">{{ errorMessage }}</p>

        <!-- Submit Button -->
        <div>
          <button
            type="submit"
            class="w-full py-3 px-4 bg-gradient-to-r from-[#7DA7D9] to-[#77DD77] text-white font-bold rounded-lg shadow-lg hover:opacity-90 transition duration-300"
          >
            {{ t('registrationPage.registerButton') }}
          </button>
        </div>
      </form>

      <!-- Additional Links -->
      <p class="text-center text-sm mt-6 text-[#7da7d9]">
        {{ t('registrationPage.alreadyHaveAccount') }}
        <a href="/login" class="font-bold text-[#ff9aa2] hover:underline">
          {{ t('registrationPage.loginLink') }}
        </a>
      </p>
    </div>
  </main>
</template>
