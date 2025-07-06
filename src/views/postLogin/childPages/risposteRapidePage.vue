<template>
  <!-- Background with modern gradient -->
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <BackHome />

    <!-- Main content container -->
    <div class="container mx-auto px-6 pt-24 pb-16">
      <!-- Header section -->
      <div class="text-center mb-12">
        <div
          class="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-emerald-500 to-blue-600 rounded-3xl mb-6 shadow-lg"
        >
          <svg class="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
            ></path>
          </svg>
        </div>
        <h1 class="text-4xl font-bold text-slate-800 mb-4">{{ t('quickResponsesPage.title') }}</h1>
        <p class="text-slate-600 text-lg max-w-2xl mx-auto leading-relaxed">
          {{ t('quickResponsesPage.subtitle') }}
        </p>
      </div>

      <!-- Saved phrases content -->
      <div class="max-w-4xl mx-auto">
        <!-- Frasi salvate -->
        <div v-if="savedPhrases.length > 0" class="space-y-6">
          <div
            v-for="phrase in savedPhrases"
            :key="phrase.name"
            class="bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 shadow-lg hover:shadow-xl transition-all duration-300 p-6"
          >
            <!-- Phrase title -->
            <div class="flex items-center justify-between mb-6">
              <h3 class="text-xl font-semibold text-slate-800 flex items-center gap-3">
                <div
                  class="w-8 h-8 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-lg flex items-center justify-center"
                >
                  <svg
                    class="w-4 h-4 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
                    ></path>
                  </svg>
                </div>
                {{ phrase.name }}
              </h3>

              <!-- Action buttons -->
              <div class="flex items-center gap-3">
                <button
                  @click="usePhrase(phrase)"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-green-100 hover:bg-green-200 text-green-700 rounded-xl font-medium transition-colors duration-200 border border-green-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M14.828 14.828a4 4 0 01-5.656 0M9 10h1m4 0h1m-6 4h.01M15 14h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                  {{ t('quickResponsesPage.usePhrase') }}
                </button>
                <button
                  @click="speakPhrase(phrase)"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-xl font-medium transition-colors duration-200 border border-blue-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 14.142M8.586 7.757A3 3 0 106.636 10.1L3 21l4.475-1.635a3 3 0 002.475-.818L20.537 8.283a3 3 0 00.002-4.244 3.001 3.001 0 00-4.244.002l-8.757 8.757z"
                    ></path>
                  </svg>
                  {{ t('quickResponsesPage.speak') }}
                </button>
                <button
                  @click="promptRename(phrase.name)"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-amber-100 hover:bg-amber-200 text-amber-700 rounded-xl font-medium transition-colors duration-200 border border-amber-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z"
                    ></path>
                  </svg>
                  {{ t('quickResponsesPage.edit') }}
                </button>
                <button
                  @click="removePhrase(phrase.name)"
                  class="inline-flex items-center gap-2 px-4 py-2 bg-red-100 hover:bg-red-200 text-red-700 rounded-xl font-medium transition-colors duration-200 border border-red-200"
                >
                  <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                    ></path>
                  </svg>
                  {{ t('quickResponsesPage.delete') }}
                </button>
              </div>
            </div>

            <!-- Pictograms display -->
            <div class="bg-slate-50/50 rounded-xl p-4 border border-slate-100">
              <h4 class="text-sm font-medium text-slate-600 mb-3">Pittogrammi nella frase:</h4>
              <div class="flex flex-wrap gap-3">
                <div
                  v-for="id in phrase.pictogramIds"
                  :key="id"
                  class="w-16 h-16 bg-white rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden shadow-sm"
                >
                  <img
                    :src="`https://static.arasaac.org/pictograms/${id}/${id}_300.png`"
                    :alt="`Pittogramma ${id}`"
                    class="w-full h-full object-cover"
                    loading="lazy"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Empty state -->
        <div v-else class="text-center py-16">
          <div
            class="w-24 h-24 bg-slate-100 rounded-3xl flex items-center justify-center mx-auto mb-6"
          >
            <svg
              class="w-12 h-12 text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
              ></path>
            </svg>
          </div>
          <h3 class="text-xl font-semibold text-slate-700 mb-2">
            {{ t('quickResponsesPage.noSavedPhrasesTitle') }}
          </h3>
          <p class="text-slate-500 mb-8">{{ t('quickResponsesPage.noSavedPhrases') }}</p>

          <!-- CTA to create phrases -->
          <router-link
            to="/dictionary"
            class="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-emerald-500 to-blue-600 text-white rounded-xl font-medium hover:from-emerald-600 hover:to-blue-700 transition-all duration-200 shadow-lg"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M12 4v16m8-8H4"
              ></path>
            </svg>
            {{ t('quickResponsesPage.createFirstPhrase') }}
          </router-link>
        </div>

        <!-- Educational note -->
        <div class="mt-16">
          <div
            class="bg-white/70 backdrop-blur-sm rounded-2xl border border-slate-200 p-6 text-center shadow-lg"
          >
            <div
              class="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl mb-4"
            >
              <svg class="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
              </svg>
            </div>
            <p class="text-slate-700 font-medium">
              {{ t('quickResponsesPage.educationalNote') }}
            </p>
          </div>
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
const usePhrase = (phrase: any) => {
  // Clear current selection and load this phrase
  pictogramStore.clearPictograms()

  // Load pictograms from the phrase
  phrase.pictogramIds.forEach((id: string) => {
    // We need to reconstruct the pictogram object
    const pictogram = {
      _id: id,
      keywords: [{ keyword: 'Loaded from phrase' }], // This would ideally come from stored data
    }
    pictogramStore.addPictogram(pictogram)
  })

  // Navigate to dictionary to show the loaded phrase
  router.push('/dictionary')
}

// Speak phrase using Web Speech API
const speakPhrase = (phrase: any) => {
  if ('speechSynthesis' in window) {
    // Create a text representation of the phrase
    // In a real implementation, you might want to store actual text or keywords
    const text = phrase.name // For now, speak the phrase name

    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 0.8
    utterance.lang = 'it-IT'

    window.speechSynthesis.speak(utterance)
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
