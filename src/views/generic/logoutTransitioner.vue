<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

onMounted(async () => {
  try {
    await authStore.logout() // Call the logout method from the authStore
    router.push('/login') // Redirect to the login page after logout
  } catch (error) {
    console.error('Error during logout:', error)
  }
})
</script>

<template>
  <div class="flex items-center justify-center min-h-screen">
    <p>{{t('loggingOut')}}</p>
  </div>
</template>
