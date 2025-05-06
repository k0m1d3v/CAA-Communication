<script setup lang="ts">
import { useAuthStore } from '../../stores/authStore'
import { onMounted, watch, computed } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import PageTitle from '@/components/pageTitle.vue'
import NavigationCard from '@/components/navigationCard.vue'
import HelpNavigator from '@/components/helpNavigator.vue'

const { t } = useI18n()
const authStore = useAuthStore()
const router = useRouter()

onMounted(() => {
  authStore.initializeStore()

  // Wait for `isLoading` to become `false` before checking `user`
  watch(
    () => authStore.isLoading,
    (loading) => {
      if (!loading) {
        if (!authStore.user) {
          console.warn('No user found, redirecting to login...')
          router.push('/login')
        }
      }
    },
    { immediate: true },
  )
})

// Use a computed property for the cards array
const cards = computed(() => [
  { text: t('homePage.cards.speak'), icon: 'parliamoIcon.png', route: '/parliamo', color: '#7DA7D9' },
  { text: t('homePage.cards.dictionary'), icon: 'dizionarioIcon.png', route: '/dizionario', color: '#FF9AA2' },
  { text: t('homePage.cards.games'), icon: 'giochiIcon.png', route: '/giochi', color: '#77DD77' },
])
</script>

<template>
  <div class="w-full text-center mt-20">
    <PageTitle :title="t('homePage.title')" />
  </div>
  <div class="flex flex-wrap justify-center items-end gap-16 mt-25 mb-20">
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
