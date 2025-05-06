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

import { useI18n } from 'vue-i18n'
const { t } = useI18n()

const cards = [
  { text: t('dictionaryPrePage.card1'), icon: 'risposta.png', route: '/quick-answers', color: '#F4C2C2', cardHeight:'12rem', cardWidth:'20.5rem', borderRadius:'5rem', additionalIcons: ['rapido.png'], showDivider:false },
  { text: t('dictionaryPrePage.card2'), icon: 'dizionario.png', route: '/dictionary', color: '#FF9AA2', cardHeight:'12rem', cardWidth:'20.5rem', borderRadius:'5rem', additionalIcons: ['e.png', 'parola.png'], showDivider:false },
  ]
</script>

<template>
  <BackHome />
  <div class="w-full text-center mt-20">
    <PageTitle :title="t('dictionaryPrePage.title')" />
  </div>
  <div class="flex flex-wrap justify-center items-end gap-15 mt-25 mb-20">
    <NavigationCard
      v-for="(item, index) in cards"
      :key="index"
      :text="item.text"
      :icon="item.icon"
      :route="item.route"
      :color="item.color"
      :cardHeight="item.cardHeight"
      :cardWidth="item.cardWidth"
      :borderRadius="item.borderRadius"
      :additionalIcons="item.additionalIcons"
      :showDivider="item.showDivider"
    />
  </div>
  <HelpNavigator />
</template>
