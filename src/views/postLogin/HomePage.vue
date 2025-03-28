<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore'
import { onMounted, watch } from 'vue'
import { useRouter } from 'vue-router'
import PageTitle from '@/components/pageTitle.vue'
import NavigationCard from '@/components/navigationCard.vue'
import HelpNavigator from '@/components/helpNavigator.vue'

const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  authStore.initializeStore()

  // Aspettiamo che `isLoading` diventi `false` prima di controllare `user`
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

const cards = [
  { text: 'Parliamo', icon: 'parliamoIcon.png', route: '/parliamo', color: '#ffdd57' },
  { text: 'Dizionario', icon: 'dizionarioIcon.png', route: '/dizionario', color: '#57ddff' },
  { text: 'Giochi', icon: 'giochiIcon.png', route: '/giochi', color: '#ff5757' },
]
</script>

<template>
  <div class="w-full text-center mt-20">
    <PageTitle title="Io Dico" />
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
  <div>
    <HelpNavigator />
  </div>
</template>
