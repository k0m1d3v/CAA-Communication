<template>
  <div class="min-h-screen bg-canvas">
    <BackHome />

    <!-- Header -->
    <div class="container mx-auto px-4 pt-16 pb-8">
      <div class="text-center mb-6">
        <h1 class="text-display font-bold text-ink">
          {{ t('dictionaryPage.title') }}
        </h1>
        <p class="text-body-lg text-ink-soft">
          {{ t('dictionaryPage.subtitle') }}
        </p>
      </div>

      <!-- Search Section -->
      <div class="max-w-2xl mx-auto mb-8">
        <div class="surface-card">
          <!-- Language selector for search -->
          <div class="mb-4">
            <span class="block font-bold mb-2 text-ink">
              {{ t('dictionaryPage.searchLanguage') }}
            </span>
            <div class="flex flex-wrap gap-2" role="group" :aria-label="t('dictionaryPage.searchLanguage')">
              <button
                type="button"
                @click="setSearchLanguage('it')"
                :class="searchLanguage === 'it' ? 'btn-primary' : 'btn-secondary'"
                :aria-pressed="searchLanguage === 'it'"
              >
                Italiano
              </button>
              <button
                type="button"
                @click="setSearchLanguage('en')"
                :class="searchLanguage === 'en' ? 'btn-primary' : 'btn-secondary'"
                :aria-pressed="searchLanguage === 'en'"
              >
                English
              </button>
              <button
                type="button"
                @click="setSearchLanguage('both')"
                :class="searchLanguage === 'both' ? 'btn-primary' : 'btn-secondary'"
                :aria-pressed="searchLanguage === 'both'"
              >
                {{ t('dictionaryPage.bothLanguages') }}
              </button>
            </div>
          </div>

          <SearchBar v-model="searchQuery" class="w-full" />

          <div v-if="searchQuery && pictograms.length === 0" class="text-center mt-4 text-ink-soft">
            {{ t('dictionaryPage.noResults') }}
          </div>
        </div>
      </div>

      <!-- Results Grid -->
      <div v-if="pictograms.length > 0" class="mb-8">
        <div class="pictogram-grid max-w-7xl mx-auto">
          <button
            v-for="pictogram in pictograms"
            :key="pictogram._id"
            type="button"
            class="pictogram-tile pictogram-grid-item"
            :aria-selected="pictogramStore.selectedPictograms.includes(String(pictogram._id))"
            @click="toggleSelected(pictogram._id)"
          >
            <img
              :src="computedIconUrl(pictogram)"
              alt=""
              class="pictogram-grid-img"
              @error="onImgError"
            />
            <span class="pictogram-grid-label">
              {{ pictogram.keywords[0]?.keyword || t('dictionaryPage.noTitle') }}
            </span>
          </button>
        </div>
      </div>

      <!-- Selected Pictograms Section -->
      <div v-if="pictogramStore.selectedPictograms.length > 0" class="max-w-6xl mx-auto">
        <div class="surface-card selected-panel">
          <div class="flex items-center justify-between mb-6 flex-wrap gap-2">
            <h2 class="text-h3 font-bold text-ink">
              {{ t('dictionaryPage.SelectedPictogram') }}
            </h2>

            <div class="text-ink-soft">
              {{ pictogramStore.selectedPictograms.length }}
              {{
                pictogramStore.selectedPictograms.length === 1
                  ? t('dictionaryPage.item')
                  : t('dictionaryPage.items')
              }}
            </div>
          </div>

          <!-- Selected Pictograms Grid -->
          <div class="pictogram-grid mb-6">
            <SelectedPictogram
              v-for="id in pictogramStore.selectedPictograms"
              :key="id"
              :id="id"
              :pictograms="pictograms"
              @remove="removePictogram(id)"
            />
          </div>

          <!-- Action Buttons -->
          <div class="flex flex-col sm:flex-row justify-center gap-4">
            <button type="button" class="btn-primary" @click="savePhrase">
              {{ t('dictionaryPage.saveButton') }}
            </button>

            <button type="button" class="btn-danger" @click="clearSelectedPictograms">
              {{ t('dictionaryPage.clearButton') }}
            </button>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="!searchQuery && pictograms.length === 0" class="text-center max-w-2xl mx-auto">
        <div class="surface-card empty-state">
          <h3 class="text-h3 font-bold mb-4 text-ink">
            {{ t('dictionaryPage.emptyStateTitle') }}
          </h3>
          <p class="text-ink-soft">
            {{ t('dictionaryPage.emptyStateDescription') }}
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { usePictogramStore } from '@/stores/pictogramStore'
import BackHome from '@/components/backHome.vue'

import SearchBar from '@/components/searchBar.vue'
import SelectedPictogram from '@/components/selectedPictogram.vue'
import fallbackIcon from '@/assets/icons/undefined.png'

interface Pictogram {
  _id: string
  keywords: { keyword: string }[]
}

const pictogramStore = usePictogramStore()
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
  p._id ? `https://static.arasaac.org/pictograms/${p._id}/${p._id}_300.png` : fallbackIcon

const onImgError = (event: Event) => {
  ;(event.target as HTMLImageElement).src = fallbackIcon
}

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

// Aggiungi/rimuovi dalla frase in costruzione
const toggleSelected = (id: string) => {
  const stringId = String(id)
  if (pictogramStore.selectedPictograms.includes(stringId)) {
    pictogramStore.removePictogram(stringId)
  } else {
    pictogramStore.addPictogram(stringId)
  }
}

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
</script>

<style scoped>
.selected-panel {
  background: var(--surface-sunken);
}

.empty-state {
  padding: var(--space-8);
}

.pictogram-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(var(--tile), 1fr));
  gap: var(--space-2);
}

.pictogram-grid-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding: var(--space-2);
}

.pictogram-grid-img {
  width: 100%;
  aspect-ratio: 1;
  object-fit: contain;
}

.pictogram-grid-label {
  font-size: var(--text-label);
  font-weight: 700;
  color: var(--ink);
  text-align: center;
}
</style>
