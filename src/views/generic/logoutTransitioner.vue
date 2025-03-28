<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const authStore = useAuthStore()
const router = useRouter()

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
    <p>Logging out...</p>
  </div>
</template>
