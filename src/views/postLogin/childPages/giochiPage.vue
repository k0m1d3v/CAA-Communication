<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, watch } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import PageTitle from '@/components/pageTitle.vue'
import NavigationCard from '@/components/navigationCard.vue'
import HelpNavigator from '@/components/helpNavigator.vue'
import BackHome from '@/components/backHome.vue'

const authStore = useAuthStore()
const router = useRouter()

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

const cards = [{ text: 'Impara', icon: 'parliamoIcon.png', route: '/impara', color: '#ffdd57' }]
</script>

<template>
  <BackHome />
  <div class="w-full text-center mt-20">
    <PageTitle title="Giochi" />
  </div>
  <div class="flex flex-wrap justify-center items-end gap-6 mt-25 mb-20">
    <NavigationCard
      v-for="(item, index) in cards"
      :key="index"
      :text="item.text"
      :icon="item.icon"
      :route="item.route"
      :color="item.color"
    />
  </div>
  <HelpNavigator />
</template>
