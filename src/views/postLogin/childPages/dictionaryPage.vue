<script setup lang="ts">
import { useRouter } from 'vue-router'
import { onMounted, watch, ref } from 'vue'
import { useAuthStore } from '@/stores/authStore'
import { useLanguageStore } from '@/stores/languageStore'
import HelpNavigator from '@/components/helpNavigator.vue'
import BackHome from '@/components/backHome.vue'
import SearchBar from '@/components/searchBar.vue'
import navigationCard from '@/components/navigationCard.vue'
import axios from 'axios'
import { debounce } from 'lodash'

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const router = useRouter()

const searchQuery = ref('')
const searchResults = ref<string[]>([])
const pictogramResults = ref([])

const fetchPictograms = async (searchText: string) => {
  console.log('fetchPictograms chiamato con query:', searchText)
  const language = languageStore.language

  try {
    const response = await axios.get(`https://api.arasaac.org/v1/pictograms/${language}/bestsearch/${searchText}`)
    console.log('Risultati API Pictograms:', response.data)

    pictogramResults.value = response.data
  } catch (error) {
    console.error('Errore durante la chiamata API Pictograms:', error)
  }
}

const fetchKeywords = debounce(async () => {
  console.log('fetchKeywords chiamato con query:', searchQuery.value)
  const language = languageStore.language

  try {
    const response = await axios.get(`https://api.arasaac.org/v1/keywords/${language}`)
    console.log('Risposta API:', response.data)

    const allKeywords = response.data.words || []

    if (!Array.isArray(allKeywords)) {
      throw new Error('La risposta API non è un array')
    }

    searchResults.value = allKeywords.filter((keyword: string) =>
      keyword.toLowerCase().includes(searchQuery.value.trim().toLowerCase())
    )

    console.log('searchResults filtrati:', searchResults.value)
  } catch (error) {
    console.error('Errore durante la chiamata API:', error)
  }
}, 300)

watch(searchQuery, (newValue) => {
  console.log('searchQuery aggiornato:', newValue)
})

function selectSuggestion(suggestion: string) {
  searchQuery.value = suggestion
  console.log('Suggerimento selezionato:', suggestion)

  // Chiamata API per ottenere i pictogrammi
  fetchPictograms(suggestion)
}

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
</script>

<template>
  <BackHome />

  <SearchBar class="mt-10" v-model="searchQuery" @input="fetchKeywords" />

  <!-- Elenco dei suggerimenti -->
  <ul
    v-if="searchResults.length"
    class="mt-2 bg-white border border-gray-300 rounded-lg shadow-md max-h-60 overflow-y-auto"
  >
    <li
      v-for="(result, index) in searchResults"
      :key="index"
      class="px-4 py-2 hover:bg-gray-100 cursor-pointer"
      @click="selectSuggestion(result)"
    >
      {{ result }}
    </li>
  </ul>

  <!-- Risultati dei pictogrammi -->
  <div v-if="pictogramResults.length" class="grid grid-cols-2 gap-4 mt-6">
    <navigationCard
      v-for="(pictogram, index) in pictogramResults"
      :key="index"
      :icon="pictogram.image"
      :text="pictogram.keywords[0]?.keyword || ''"
    />
  </div>

  <HelpNavigator />
</template>
