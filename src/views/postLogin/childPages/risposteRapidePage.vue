<template>
  <div class="min-h-screen bg-canvas">
    <BackHome />

    <!-- Main content container -->
    <div class="container mx-auto px-6 pt-24 pb-16">
      <!-- Header section -->
      <div class="text-center mb-12">
        <h1 class="text-display font-bold text-ink mb-4">{{ t('quickResponsesPage.title') }}</h1>
        <p class="text-body-lg text-ink-soft max-w-2xl mx-auto">
          {{ t('quickResponsesPage.subtitle') }}
        </p>
      </div>

      <!-- Saved phrases content -->
      <div class="max-w-4xl mx-auto">
        <!-- Frasi salvate -->
        <div v-if="savedPhrases.length > 0" class="phrase-list">
          <div v-for="phrase in savedPhrases" :key="phrase.name" class="surface-card">
            <!-- Phrase title + primary actions -->
            <div class="phrase-header">
              <h3 class="text-h3 font-bold text-ink">{{ phrase.name }}</h3>

              <div class="phrase-actions">
                <button type="button" class="btn-primary" @click="speakPhrase(phrase)">
                  {{ t('quickResponsesPage.speak') }}
                </button>
                <button type="button" class="btn-secondary" @click="usePhrase(phrase)">
                  {{ t('quickResponsesPage.usePhrase') }}
                </button>
                <details class="phrase-more">
                  <summary class="btn-secondary">{{ t('quickResponsesPage.more') }}</summary>
                  <div class="phrase-more-menu">
                    <button type="button" class="btn-secondary" @click="promptRename(phrase.name)">
                      {{ t('quickResponsesPage.edit') }}
                    </button>
                    <button type="button" class="btn-danger" @click="removePhrase(phrase.name)">
                      {{ t('quickResponsesPage.delete') }}
                    </button>
                  </div>
                </details>
              </div>
            </div>

            <!-- Pictograms display -->
            <div class="phrase-pictograms">
              <div v-for="id in phrase.pictogramIds" :key="id" class="pictogram-tile phrase-pictogram">
                <img
                  :src="`https://static.arasaac.org/pictograms/${id}/${id}_300.png`"
                  :alt="`Pittogramma ${id}`"
                  class="phrase-pictogram-img"
                  loading="lazy"
                />
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="surface-card text-center empty-state">
          <h3 class="text-h3 font-bold text-ink mb-2">
            {{ t('quickResponsesPage.noSavedPhrasesTitle') }}
          </h3>
          <p class="text-ink-soft mb-8">{{ t('quickResponsesPage.noSavedPhrases') }}</p>

          <!-- CTA to create phrases -->
          <router-link to="/dictionary" class="btn-primary">
            {{ t('quickResponsesPage.createFirstPhrase') }}
          </router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePictogramStore } from '../../../stores/pictogramStore'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import BackHome from '../../../components/backHome.vue'

const pictogramStore = usePictogramStore()
const { t } = useI18n()
const router = useRouter()

const savedPhrases = computed(() => pictogramStore.savedPhrases)

// Use phrase - load it back into the dictionary for editing/use
interface SavedPhrase {
  name: string;
  pictogramIds: string[];
}

const usePhrase = (phrase: SavedPhrase) => {
  // Clear current selection and load this phrase
  pictogramStore.clearPictograms()

  // Load pictograms from the phrase
  phrase.pictogramIds.forEach((id: string) => {
    pictogramStore.addPictogram(id)
  })

  // Navigate to dictionary to show the loaded phrase
  router.push('/dictionary')
}

// Speak phrase using Web Speech API
const speakPhrase = (phrase: SavedPhrase) => {
  if ('speechSynthesis' in window) {
    // Get keywords for each pictogram in sequence
    fetch(`https://api.arasaac.org/api/pictograms/it/${phrase.pictogramIds.join(',')}`)
      .then(response => response.json())
      .then(pictograms => {
        // Create text representation of the phrase
        const text = Array.isArray(pictograms)
          ? pictograms.map(p => p.keywords[0]).join(' ')
          : pictograms.keywords[0]

        window.speechSynthesis.cancel()
        const utterance = new SpeechSynthesisUtterance(text)
        utterance.rate = 0.8
        utterance.pitch = 1
        utterance.volume = 0.8
        utterance.lang = 'it-IT'

        window.speechSynthesis.speak(utterance)
      })
      .catch(error => {
        console.error('Error fetching pictogram keywords:', error)
        // Fallback to phrase name if API call fails
        const utterance = new SpeechSynthesisUtterance(phrase.name)
        utterance.rate = 0.8
        utterance.pitch = 1
        utterance.volume = 0.8
        utterance.lang = 'it-IT'
        window.speechSynthesis.speak(utterance)
      })
  } else {
    alert(t('quickResponsesPage.speechNotSupported'))
  }
}

// Remove phrase
const removePhrase = (name: string) => {
  if (confirm(t('quickResponsesPage.confirmDelete', { name }))) {
    pictogramStore.removePhrase(name)
  }
}

// Rename phrase
const promptRename = (oldName: string) => {
  const newName = window.prompt(t('quickResponsesPage.enterNewName'), oldName)
  if (newName && newName.trim() && newName.trim() !== oldName) {
    pictogramStore.renamePhrase(oldName, newName.trim())
  }
}
</script>

<style scoped>
.phrase-list {
  display: grid;
  gap: var(--space-6);
}

.phrase-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
  gap: var(--space-4);
  margin-bottom: var(--space-4);
}

.phrase-actions {
  display: flex;
  align-items: flex-start;
  gap: var(--space-2);
  flex-wrap: wrap;
  position: relative;
}

.phrase-more {
  position: relative;
}

.phrase-more summary {
  list-style: none;
  cursor: pointer;
}

.phrase-more summary::-webkit-details-marker {
  display: none;
}

.phrase-more-menu {
  position: absolute;
  right: 0;
  top: calc(100% + var(--space-2));
  display: grid;
  gap: var(--space-2);
  background: var(--surface);
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius-md);
  padding: var(--space-2);
  z-index: 10;
  min-width: 10rem;
}

.phrase-pictograms {
  display: flex;
  flex-wrap: wrap;
  gap: var(--space-2);
  background: var(--surface-sunken);
  border-radius: var(--radius-md);
  padding: var(--space-4);
}

.phrase-pictogram {
  width: 84px;
  height: 84px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.phrase-pictogram-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.empty-state {
  padding: var(--space-12) var(--space-6);
}
</style>
