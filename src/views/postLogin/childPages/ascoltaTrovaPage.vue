<script setup lang="ts">
import { ref, onUnmounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/languageStore'
import BackHome from '@/components/backHome.vue'
import PageTitle from '@/components/pageTitle.vue'

interface Pictogram {
  _id: string
  keywords: { keyword: string }[]
}

interface Choice {
  id: string
  label: string
}

const OPTION_COUNT = 4

const languageStore = useLanguageStore()
const { t } = useI18n()

const isGameActive = ref(false)
const currentPictogram = ref<Pictogram | null>(null)
const options = ref<Choice[]>([])
const selectedOptionId = ref<string | null>(null)
const isAnswered = ref(false)
const isSpeaking = ref(false)
const feedback = ref('')
const feedbackType = ref<'success' | 'error' | 'info'>('info')
const isLoading = ref(false)
const score = ref(0)
let advanceTimeout: number | null = null

const keywordOf = (p: Pictogram) => p.keywords[0]?.keyword?.trim() || ''

const clearAdvanceTimeout = () => {
  if (advanceTimeout !== null) {
    clearTimeout(advanceTimeout)
    advanceTimeout = null
  }
}

const speakCurrentWord = () => {
  if (!currentPictogram.value || !('speechSynthesis' in window)) return

  const word = keywordOf(currentPictogram.value)
  if (!word) return

  window.speechSynthesis.cancel()
  const utterance = new SpeechSynthesisUtterance(word)
  utterance.lang = languageStore.language === 'it' ? 'it-IT' : 'en-US'
  utterance.rate = 0.85
  utterance.onstart = () => {
    isSpeaking.value = true
  }
  utterance.onend = () => {
    isSpeaking.value = false
  }
  window.speechSynthesis.speak(utterance)
}

const resetGame = () => {
  clearAdvanceTimeout()
  window.speechSynthesis?.cancel()
  isGameActive.value = false
  currentPictogram.value = null
  options.value = []
  selectedOptionId.value = null
  isAnswered.value = false
  isSpeaking.value = false
  feedback.value = ''
  feedbackType.value = 'info'
  isLoading.value = false
}

// Stesso principio di imparaPage: un'unica chiamata all'API scarica tutto il
// set di pittogrammi, da cui peschiamo sia la risposta corretta sia i
// distrattori, invece di fare una richiesta per ogni opzione.
const buildRound = (pool: Pictogram[]) => {
  const withKeyword = pool.filter((p) => keywordOf(p))
  if (withKeyword.length === 0) return null

  const correctIndex = Math.floor(Math.random() * withKeyword.length)
  const correct = withKeyword[correctIndex]
  const correctKeyword = keywordOf(correct).toLowerCase()

  const distractors: Pictogram[] = []
  const usedKeywords = new Set([correctKeyword])
  const remaining = withKeyword.filter((_, i) => i !== correctIndex)

  for (const candidate of remaining.sort(() => Math.random() - 0.5)) {
    if (distractors.length >= OPTION_COUNT - 1) break
    const kw = keywordOf(candidate).toLowerCase()
    if (usedKeywords.has(kw)) continue
    usedKeywords.add(kw)
    distractors.push(candidate)
  }

  const choices: Choice[] = [correct, ...distractors].map((p) => ({
    id: p._id,
    label: keywordOf(p),
  }))
  choices.sort(() => Math.random() - 0.5)

  return { correct, choices }
}

const pictogramImg = (id: string) => `https://static.arasaac.org/pictograms/${id}/${id}_300.png`

const fetchRound = async () => {
  clearAdvanceTimeout()
  isLoading.value = true
  feedback.value = ''
  selectedOptionId.value = null
  isAnswered.value = false

  try {
    const language = languageStore.language === 'it' ? 'it' : 'en'
    const response = await fetch(`https://api.arasaac.org/v1/pictograms/all/${language}`)

    if (!response.ok) throw new Error('API error')

    const data: Pictogram[] = await response.json()
    const round = buildRound(data)

    if (round) {
      currentPictogram.value = round.correct
      options.value = round.choices
      speakCurrentWord()
    } else {
      feedback.value = t('ascoltaTrovaPage.noDataFound')
      feedbackType.value = 'error'
    }
  } catch (error) {
    console.error('Error fetching pictogram:', error)
    feedback.value = t('ascoltaTrovaPage.loadError')
    feedbackType.value = 'error'
  } finally {
    isLoading.value = false
  }
}

const startGame = async () => {
  isGameActive.value = true
  score.value = 0
  await fetchRound()
}

const choose = (choice: Choice) => {
  if (isAnswered.value || !currentPictogram.value) return

  isAnswered.value = true
  selectedOptionId.value = choice.id

  if (choice.id === currentPictogram.value._id) {
    feedback.value = t('ascoltaTrovaPage.correct')
    feedbackType.value = 'success'
    score.value++
  } else {
    feedback.value = t('ascoltaTrovaPage.incorrect', {
      word: keywordOf(currentPictogram.value),
    })
    feedbackType.value = 'error'
  }

  advanceTimeout = window.setTimeout(() => {
    fetchRound()
  }, 1800)
}

onUnmounted(() => {
  clearAdvanceTimeout()
  window.speechSynthesis?.cancel()
})
</script>

<template>
  <div class="min-h-screen bg-canvas">
    <BackHome @before-home="resetGame" />

    <!-- Header -->
    <div class="container mx-auto px-4 pt-16 pb-8">
      <div class="text-center mb-8">
        <PageTitle title="Ascolta e Trova" />
        <p class="text-body-lg text-ink-soft mt-4">
          {{ t('ascoltaTrovaPage.subtitle') }}
        </p>
      </div>

      <!-- Game Interface -->
      <div v-if="!isGameActive" class="max-w-2xl mx-auto">
        <div class="surface-card text-center" style="padding: var(--space-8)">
          <h2 class="text-h2 font-bold text-ink mb-4">
            {{ t('ascoltaTrovaPage.welcomeTitle') }}
          </h2>

          <p class="text-ink-soft mb-8">
            {{ t('ascoltaTrovaPage.welcomeDescription') }}
          </p>

          <button type="button" class="btn-primary" @click="startGame">
            {{ t('ascoltaTrovaPage.startButton') }}
          </button>
        </div>
      </div>

      <!-- Active Game -->
      <div v-else class="max-w-2xl mx-auto">
        <div class="surface-card text-center mb-6 score-card">
          <span class="text-h3 font-bold text-ink">
            {{ t('ascoltaTrovaPage.score') }}: {{ score }}
          </span>
        </div>

        <div class="surface-card" style="padding: var(--space-8)">
          <div v-if="isLoading" class="text-center py-12">
            <p class="text-ink-soft">{{ t('ascoltaTrovaPage.loading') }}</p>
          </div>

          <div v-else-if="currentPictogram" class="text-center">
            <!-- Listen control -->
            <button
              type="button"
              class="btn-primary listen-button mb-8"
              :disabled="isSpeaking"
              @click="speakCurrentWord"
            >
              {{ isSpeaking ? t('ascoltaTrovaPage.speaking') : t('ascoltaTrovaPage.listenAgain') }}
            </button>

            <!-- Choices: pittogrammi soli, senza etichetta — l'abbinamento
                 deve passare dall'ascolto, non dalla lettura del testo. -->
            <div class="choice-image-grid">
              <button
                v-for="choice in options"
                :key="choice.id"
                type="button"
                class="pictogram-tile choice-tile"
                :class="{
                  'choice-correct': isAnswered && choice.id === currentPictogram._id,
                  'choice-wrong': isAnswered && choice.id === selectedOptionId && choice.id !== currentPictogram._id,
                }"
                :aria-disabled="isAnswered"
                :aria-label="isAnswered ? choice.label : t('ascoltaTrovaPage.optionAriaLabel')"
                @click="choose(choice)"
              >
                <img :src="pictogramImg(choice.id)" alt="" class="choice-tile-img" />
                <span v-if="isAnswered" class="choice-tile-label">{{ choice.label }}</span>
              </button>
            </div>

            <!-- Feedback -->
            <div
              v-if="feedback"
              class="feedback-box mt-6"
              :class="`feedback-${feedbackType}`"
              role="status"
            >
              {{ feedback }}
            </div>

            <!-- Game Controls -->
            <div class="mt-8 flex justify-center gap-4">
              <button type="button" class="btn-secondary" @click="fetchRound">
                {{ t('ascoltaTrovaPage.skipButton') }}
              </button>

              <button type="button" class="btn-danger" @click="resetGame">
                {{ t('ascoltaTrovaPage.quitButton') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.score-card {
  padding: var(--space-4);
}

.listen-button {
  min-height: var(--target-lg);
  padding: 0 var(--space-8);
  font-size: var(--text-h3);
}

.choice-image-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: var(--space-4);
  max-width: 28rem;
  margin: 0 auto;
}

.choice-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding: var(--space-2);
  aspect-ratio: 1;
}

.choice-tile-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.choice-tile-label {
  font-size: var(--text-label);
  font-weight: 700;
  color: var(--ink);
}

.choice-tile[aria-disabled='true'] {
  cursor: default;
}

.choice-correct {
  border-color: var(--success);
  border-width: 4px;
  background: var(--success-tint);
}

.choice-wrong {
  border-color: var(--danger);
  border-width: 4px;
  background: var(--danger-tint);
}

.feedback-box {
  display: inline-block;
  padding: var(--space-2) var(--space-4);
  border-radius: var(--radius-sm);
  border-left: 8px solid transparent;
  font-weight: 700;
}

.feedback-success {
  background: var(--success-tint);
  border-left-color: var(--success);
  color: var(--ink);
}

.feedback-error {
  background: var(--danger-tint);
  border-left-color: var(--danger);
  color: var(--ink);
}

.feedback-info {
  background: var(--action-tint);
  border-left-color: var(--action);
  color: var(--ink);
}

@media (max-width: 480px) {
  .choice-image-grid {
    grid-template-columns: 1fr 1fr;
    max-width: 20rem;
  }
}
</style>
