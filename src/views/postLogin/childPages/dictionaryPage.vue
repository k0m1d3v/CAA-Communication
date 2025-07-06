<template>
  <div class="min-h-screen bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50">
    <BackHome />

    <!-- Header -->
    <div class="container mx-auto px-4 pt-16 pb-8">
      <div class="text-center mb-8">
        <div
          class="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-full flex items-center justify-center mx-auto mb-4"
        >
          <span class="text-2xl">📖</span>
        </div>
        <h1 class="text-3xl font-bold text-gray-800 mb-2">
          {{ t('dictionaryPage.title') }}
        </h1>
        <p class="text-lg text-gray-600">
          {{ t('dictionaryPage.subtitle') }}
        </p>
      </div>

      <!-- Search Section -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <!-- Language selector for search -->
          <div class="mb-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              {{ t('dictionaryPage.searchLanguage') }}
            </label>
            <div class="flex gap-3">
              <button
                @click="setSearchLanguage('it')"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  searchLanguage === 'it'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                🇮🇹 Italiano
              </button>
              <button
                @click="setSearchLanguage('en')"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  searchLanguage === 'en'
                    ? 'bg-blue-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                🇺🇸 English
              </button>
              <button
                @click="setSearchLanguage('both')"
                :class="[
                  'px-4 py-2 rounded-lg font-medium transition-colors',
                  searchLanguage === 'both'
                    ? 'bg-green-500 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
                ]"
              >
                🌍 {{ t('dictionaryPage.bothLanguages') }}
              </button>
            </div>
          </div>

          <SearchBar
            v-model="searchQuery"
            :placeholder="t('dictionaryPage.searchPlaceholder')"
            class="w-full"
          />

          <div v-if="searchQuery && pictograms.length === 0" class="text-center mt-4 text-gray-500">
            {{ t('dictionaryPage.noResults') }}
          </div>
        </div>
      </div>

      <!-- Results Grid -->
      <div v-if="pictograms.length > 0" class="mb-8">
        <div
          class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6 max-w-7xl mx-auto"
        >
          <NavigationCard
            v-for="pictogram in pictograms"
            :key="pictogram._id"
            :text="pictogram.keywords[0]?.keyword || t('dictionaryPage.noTitle')"
            :icon="computedIconUrl(pictogram)"
            class="h-48 transform hover:scale-105 transition-transform duration-200"
            :card-height="'192px'"
            :border-radius="'16px'"
            :show-divider="true"
            :addable="true"
            @add="pictogramStore.addPictogram(pictogram._id)"
          />
        </div>
      </div>

      <!-- Selected Pictograms Section -->
      <div v-if="pictogramStore.selectedPictograms.length > 0" class="max-w-6xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-6">
          <div class="flex items-center justify-between mb-6">
            <div class="flex items-center space-x-3">
              <div
                class="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full flex items-center justify-center"
              >
                <span class="text-lg">💬</span>
              </div>
              <h2 class="text-xl font-bold text-gray-800">
                {{ t('dictionaryPage.SelectedPictogram') }}
              </h2>
            </div>

            <div class="text-sm text-gray-500">
              {{ pictogramStore.selectedPictograms.length }}
              {{
                pictogramStore.selectedPictograms.length === 1
                  ? t('dictionaryPage.item')
                  : t('dictionaryPage.items')
              }}
            </div>
          </div>

          <!-- Selected Pictograms Grid -->
          <div
            class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4 mb-6"
          >
            <SelectedPictogram
              v-for="id in pictogramStore.selectedPictograms"
              :key="id"
              :id="id"
              :pictograms="pictograms"
              @remove="removePictogram(id)"
              class="transform hover:scale-105 transition-transform duration-200"
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button
              @click="savePhrase"
              class="flex items-center justify-center space-x-2 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>💾</span>
              <span>{{ t('dictionaryPage.saveButton') }}</span>
            </button>

            <button
              @click="clearSelectedPictograms"
              class="flex items-center justify-center space-x-2 bg-gradient-to-r from-red-500 to-pink-600 hover:from-red-600 hover:to-pink-700 text-white font-semibold py-3 px-6 rounded-xl transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
            >
              <span>🗑️</span>
              <span>{{ t('dictionaryPage.clearButton') }}</span>
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!searchQuery && pictograms.length === 0" class="text-center max-w-2xl mx-auto">
        <div class="bg-white rounded-2xl shadow-lg border border-gray-100 p-12">
          <div
            class="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6"
          >
            <span class="text-3xl">🔍</span>
          </div>
          <h3 class="text-xl font-semibold text-gray-800 mb-4">
            {{ t('dictionaryPage.emptyStateTitle') }}
          </h3>
          <p class="text-gray-600">
            {{ t('dictionaryPage.emptyStateDescription') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { useLanguageStore } from '@/stores/languageStore'
import { usePictogramStore } from '@/stores/pictogramStore'
import BackHome from '@/components/backHome.vue'

import SearchBar from '@/components/searchBar.vue'
import NavigationCard from '@/components/navigationCard.vue'
import SelectedPictogram from '@/components/selectedPictogram.vue'

interface Pictogram {
  _id: string
  keywords: { keyword: string }[]
}

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const pictogramStore = usePictogramStore()
const router = useRouter()
const { t } = useI18n()

const searchQuery = ref('')
const searchLanguage = ref<'it' | 'en' | 'both'>('both') // Default to both languages
const pictograms = ref<Pictogram[]>([])
const debounceTimeout = ref<number | null>(null)

// Set search language
const setSearchLanguage = (lang: 'it' | 'en' | 'both') => {
  searchLanguage.value = lang
  // Re-trigger search if there's a query
  if (searchQuery.value.trim()) {
    fetchPictograms(searchQuery.value)
  }
}

// Costruisce l’URL dell’icona
const computedIconUrl = (p: Pictogram) =>
  p._id
    ? `https://static.arasaac.org/pictograms/${p._id}/${p._id}_300.png`
    : 'https://via.placeholder.com/300'

// Fetch API with multi-language support
const fetchPictograms = async (query: string) => {
  try {
    let allResults: Pictogram[] = []

    if (searchLanguage.value === 'both') {
      // Search in both languages and combine results
      const [itResults, enResults] = await Promise.all([
        fetch(`https://api.arasaac.org/v1/pictograms/it/bestsearch/${query}`).then((res) =>
          res.json(),
        ),
        fetch(`https://api.arasaac.org/v1/pictograms/en/bestsearch/${query}`).then((res) =>
          res.json(),
        ),
      ])

      // Combine and deduplicate results by _id
      const combinedResults = [...itResults, ...enResults]
      const uniqueResults = combinedResults.filter(
        (item, index, arr) => arr.findIndex((t) => t._id === item._id) === index,
      )
      allResults = uniqueResults
    } else {
      // Search in specific language
      const res = await fetch(
        `https://api.arasaac.org/v1/pictograms/${searchLanguage.value}/bestsearch/${query}`,
      )
      if (!res.ok) throw new Error('Fetch error')
      allResults = await res.json()
    }

    pictograms.value = allResults as Pictogram[]
  } catch (e) {
    console.error('Error fetching pictograms:', e)
    pictograms.value = []
  }
}

// Debounce search
watch(searchQuery, (q) => {
  if (debounceTimeout.value) clearTimeout(debounceTimeout.value)
  if (q.trim()) {
    debounceTimeout.value = window.setTimeout(() => fetchPictograms(q), 300)
  } else {
    pictograms.value = []
  }
})

// Rimuovi singolo
const removePictogram = (id: string) => {
  pictogramStore.removePictogram(id)
}

// Clear all
const clearSelectedPictograms = () => {
  pictogramStore.clearPictograms()
}

// Salva con prompt per il nome
const savePhrase = () => {
  const name = window.prompt(t('dictionaryPage.enterPhraseNamePrompt'), '')
  if (name && name.trim()) {
    pictogramStore.saveCurrentPhrase(name.trim())
  }
}

// Auth redirect
onMounted(() => {
  authStore.initializeStore()
  watch(
    () => authStore.isLoading,
    (loading) => {
      if (!loading && !authStore.user) router.push('/login')
    },
    { immediate: true },
  )
})
</script>
