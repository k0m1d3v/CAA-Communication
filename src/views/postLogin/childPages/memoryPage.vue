<script setup lang="ts">
import { ref, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useLanguageStore } from '@/stores/languageStore'
import BackHome from '@/components/backHome.vue'
import PageTitle from '@/components/pageTitle.vue'

interface Pictogram {
  _id: string
  keywords: { keyword: string }[]
}

interface Card {
  uid: number
  pictogramId: string
  keyword: string
  matched: boolean
}

const PAIR_COUNT = 6
const MISMATCH_DELAY = 900

const languageStore = useLanguageStore()
const { t } = useI18n()

const isGameActive = ref(false)
const isLoading = ref(false)
const loadError = ref(false)
const cards = ref<Card[]>([])
const flippedUids = ref<number[]>([])
const matchedCount = ref(0)
const moves = ref(0)
const isChecking = ref(false)
let uidCounter = 0

const keywordOf = (p: Pictogram) => p.keywords[0]?.keyword?.trim() || ''
const pictogramImg = (id: string) => `https://static.arasaac.org/pictograms/${id}/${id}_300.png`

const isWon = computed(() => cards.value.length > 0 && matchedCount.value === cards.value.length)

const resetGame = () => {
  isGameActive.value = false
  isLoading.value = false
  loadError.value = false
  cards.value = []
  flippedUids.value = []
  matchedCount.value = 0
  moves.value = 0
  isChecking.value = false
}

// Riusa lo stesso principio degli altri giochi: una sola chiamata scarica
// tutto il set di pittogrammi, da cui peschiamo N coppie invece di fare una
// richiesta per ogni carta.
const buildBoard = (pool: Pictogram[]): Card[] | null => {
  const withKeyword = pool.filter((p) => keywordOf(p))
  if (withKeyword.length < PAIR_COUNT) return null

  const usedKeywords = new Set<string>()
  const chosen: Pictogram[] = []

  for (const candidate of withKeyword.sort(() => Math.random() - 0.5)) {
    if (chosen.length >= PAIR_COUNT) break
    const kw = keywordOf(candidate).toLowerCase()
    if (usedKeywords.has(kw)) continue
    usedKeywords.add(kw)
    chosen.push(candidate)
  }

  if (chosen.length < PAIR_COUNT) return null

  const board: Card[] = []
  for (const p of chosen) {
    board.push({ uid: uidCounter++, pictogramId: p._id, keyword: keywordOf(p), matched: false })
    board.push({ uid: uidCounter++, pictogramId: p._id, keyword: keywordOf(p), matched: false })
  }
  return board.sort(() => Math.random() - 0.5)
}

const startGame = async () => {
  isGameActive.value = true
  isLoading.value = true
  loadError.value = false
  matchedCount.value = 0
  moves.value = 0
  flippedUids.value = []

  try {
    const language = languageStore.language === 'it' ? 'it' : 'en'
    const response = await fetch(`https://api.arasaac.org/v1/pictograms/all/${language}`)
    if (!response.ok) throw new Error('API error')

    const data: Pictogram[] = await response.json()
    const board = buildBoard(data)

    if (board) {
      cards.value = board
    } else {
      loadError.value = true
    }
  } catch (error) {
    console.error('Error fetching pictograms:', error)
    loadError.value = true
  } finally {
    isLoading.value = false
  }
}

const isFlipped = (card: Card) => card.matched || flippedUids.value.includes(card.uid)

const flip = (card: Card) => {
  if (isChecking.value || card.matched || flippedUids.value.includes(card.uid)) return
  if (flippedUids.value.length >= 2) return

  flippedUids.value.push(card.uid)

  if (flippedUids.value.length === 2) {
    moves.value++
    isChecking.value = true

    const [firstUid, secondUid] = flippedUids.value
    const first = cards.value.find((c) => c.uid === firstUid)
    const second = cards.value.find((c) => c.uid === secondUid)

    if (first && second && first.pictogramId === second.pictogramId) {
      first.matched = true
      second.matched = true
      matchedCount.value += 2
      flippedUids.value = []
      isChecking.value = false
    } else {
      setTimeout(() => {
        flippedUids.value = []
        isChecking.value = false
      }, MISMATCH_DELAY)
    }
  }
}
</script>

<template>
  <div class="min-h-screen bg-canvas">
    <BackHome @before-home="resetGame" />

    <!-- Header -->
    <div class="container mx-auto px-4 pt-16 pb-8">
      <div class="text-center mb-8">
        <PageTitle title="Memory" />
        <p class="text-body-lg text-ink-soft mt-4">
          {{ t('memoryPage.subtitle') }}
        </p>
      </div>

      <!-- Welcome -->
      <div v-if="!isGameActive" class="max-w-2xl mx-auto">
        <div class="surface-card text-center" style="padding: var(--space-8)">
          <h2 class="text-h2 font-bold text-ink mb-4">
            {{ t('memoryPage.welcomeTitle') }}
          </h2>

          <p class="text-ink-soft mb-8">
            {{ t('memoryPage.welcomeDescription') }}
          </p>

          <button type="button" class="btn-primary" @click="startGame">
            {{ t('memoryPage.startButton') }}
          </button>
        </div>
      </div>

      <!-- Active game -->
      <div v-else class="max-w-3xl mx-auto">
        <div class="surface-card text-center mb-6 score-card">
          <span class="text-h3 font-bold text-ink">
            {{ t('memoryPage.moves') }}: {{ moves }}
          </span>
        </div>

        <div class="surface-card" style="padding: var(--space-6)">
          <div v-if="isLoading" class="text-center py-12">
            <p class="text-ink-soft">{{ t('memoryPage.loading') }}</p>
          </div>

          <div v-else-if="loadError" class="text-center py-12">
            <p class="text-ink-soft mb-4">{{ t('memoryPage.loadError') }}</p>
            <button type="button" class="btn-primary" @click="startGame">
              {{ t('memoryPage.startButton') }}
            </button>
          </div>

          <!-- Won state -->
          <div v-else-if="isWon" class="text-center py-8">
            <h3 class="text-h2 font-bold text-ink mb-4">{{ t('memoryPage.wonTitle') }}</h3>
            <p class="text-ink-soft mb-8">{{ t('memoryPage.wonDescription', { moves }) }}</p>
            <button type="button" class="btn-primary" @click="startGame">
              {{ t('memoryPage.playAgain') }}
            </button>
          </div>

          <!-- Board -->
          <div v-else class="memory-grid">
            <button
              v-for="card in cards"
              :key="card.uid"
              type="button"
              class="pictogram-tile memory-card"
              :class="{ 'memory-card-matched': card.matched }"
              :aria-disabled="card.matched || isChecking"
              :aria-label="isFlipped(card) ? card.keyword : t('memoryPage.hiddenCardAriaLabel')"
              @click="flip(card)"
            >
              <img
                v-if="isFlipped(card)"
                :src="pictogramImg(card.pictogramId)"
                alt=""
                class="memory-card-img"
              />
              <span v-else class="memory-card-back" aria-hidden="true">?</span>
            </button>
          </div>

          <!-- Game Controls -->
          <div v-if="!isWon" class="mt-8 flex justify-center gap-4">
            <button type="button" class="btn-danger" @click="resetGame">
              {{ t('memoryPage.quitButton') }}
            </button>
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

.memory-grid {
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: var(--space-2);
}

.memory-card {
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: var(--space-1);
}

.memory-card[aria-disabled='true'] {
  cursor: default;
}

.memory-card-back {
  font-size: var(--text-display);
  font-weight: 800;
  color: var(--ink-soft);
}

.memory-card-img {
  width: 100%;
  height: 100%;
  object-fit: contain;
}

.memory-card-matched {
  border-color: var(--success);
  background: var(--success-tint);
}

@media (max-width: 640px) {
  .memory-grid {
    grid-template-columns: repeat(3, 1fr);
  }
}
</style>
