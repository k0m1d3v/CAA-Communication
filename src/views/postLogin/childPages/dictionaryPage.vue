<template>
  <BackHome />

  <!-- Scaled container -->
  <div
    class="transform scale-90 md:scale-100 flex flex-col items-center mt-10 space-y-6 sm:space-y-8"
  >
    <!-- SearchBar -->
    <SearchBar
      class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
      v-model="searchQuery"
      :placeholder="t('dictionaryPage.searchPlaceholder')"
    />

    <!-- Grid container -->
    <div
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 px-4 w-full max-w-screen-lg mx-auto justify-center"
    >
      <!-- Responsive grid -->
      <NavigationCard
        v-for="pictogram in pictograms"
        :key="pictogram._id"
        :text="pictogram.keywords[0]?.keyword || t('dictionaryPage.noTitle')"
        :icon="computedIconUrl(pictogram)"
        class="h-52"
        :card-height="'200px'"
        :border-radius="'30px'"
        :show-divider="true"
        :addable="true"
        @add="pictogramStore.addPictogram(pictogram._id)"
      />
    </div>
  </div>

  <HelpNavigator />

  <!-- Display selected pictograms -->
  <div class="mt-6 bg-white rounded-xl shadow-md p-4 max-w-screen-lg mx-auto">
    <h2 class="text-lg font-bold mb-4 text-center">
      {{ t('dictionaryPage.SelectedPictogram') }}
    </h2>
    <div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
      <SelectedPictogram
        v-for="id in pictogramStore.selectedPictograms"
        :key="id"
        :id="String(id)"
        :pictograms="pictograms"
        @remove="removePictogram"
      />
    </div>
    <!-- Clear button -->
    <div class="flex justify-center mt-4">
      <button
        class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        @click="clearSelectedPictograms"
      >
        {{ t('dictionaryPage.clearButton') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, watch, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useLanguageStore } from '@/stores/languageStore'
import { usePictogramStore } from '@/stores/pictogramStore'
import HelpNavigator from '@/components/helpNavigator.vue'
import BackHome from '@/components/backHome.vue'
import SearchBar from '@/components/searchBar.vue'
import NavigationCard from '@/components/navigationCard.vue'
import SelectedPictogram from '@/components/selectedPictogram.vue'
import { useI18n } from 'vue-i18n'

// Define the type for a pictogram
interface Pictogram {
  _id: string
  keywords: { keyword: string }[]
}

// Stores
const authStore = useAuthStore()
const languageStore = useLanguageStore()
const pictogramStore = usePictogramStore()
const router = useRouter()
const { t } = useI18n()

// Reactive variables
const searchQuery = ref('')
const pictograms = ref<Pictogram[]>([])
const debounceTimeout = ref<number | null>(null)

// Function to construct the image URL
const computedIconUrl = (pictogram: Pictogram) => {
  if (!pictogram._id) return 'https://via.placeholder.com/300'
  const url = `https://static.arasaac.org/pictograms/${pictogram._id}/${pictogram._id}_300.png`
  return url
}

// Function to fetch pictograms from API
const fetchPictograms = async (query: string) => {
  try {
    const language = languageStore.language
    const response = await fetch(
      `https://api.arasaac.org/v1/pictograms/${language}/bestsearch/${query}`,
    )
    if (!response.ok) throw new Error('Failed to fetch pictograms')

    const data = await response.json()
    pictograms.value = data as Pictogram[]
  } catch (error) {
    console.error('Error fetching pictograms:', error)
  }
}

// Watch for search input and debounce API calls
watch(searchQuery, (newQuery) => {
  if (debounceTimeout.value) clearTimeout(debounceTimeout.value)

  if (newQuery.trim()) {
    debounceTimeout.value = window.setTimeout(() => {
      fetchPictograms(newQuery)
    }, 300)
  } else {
    pictograms.value = []
  }
})

// Method to handle removing a pictogram
const removePictogram = (id: string) => {
  console.log('Removing pictogram with id:', id)
  pictogramStore.removePictogram(id)
}

// Method to clear all selected pictograms
const clearSelectedPictograms = () => {
  console.log('Clearing all selected pictograms') // Debug log
  pictogramStore.clearPictograms()
}

// Run on component mount
onMounted(() => {
  authStore.initializeStore()

  watch(
    () => authStore.isLoading,
    (loading) => {
      if (!loading && !authStore.user) {
        router.push('/login')
      }
    },
    { immediate: true },
  )
})
</script>
