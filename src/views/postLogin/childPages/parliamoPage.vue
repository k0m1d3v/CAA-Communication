<script setup lang="ts">
import { useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import PageTitle from '@/components/pageTitle.vue'
import NavigationCard from '@/components/navigationCard.vue'
import HelpNavigator from '@/components/helpNavigator.vue'
import BackHome from '@/components/backHome.vue'

const isLoggedIn = ref(true)
const router = useRouter()

onMounted(() => {
  if (!isLoggedIn.value) {
    router.push('/login')
  }
})

const cards = [
  { text: 'Ascolta', icon: 'parliamoIcon.png', route: '/parliamo', color: '#ffdd57' },
  { text: 'Racconta', icon: 'dizionarioIcon.png', route: '/parliamo', color: '#57ddff' },
]
</script>

<template>
  <BackHome />
  <div class="w-full text-center mt-20">
    <PageTitle title="Parliamo" />
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
