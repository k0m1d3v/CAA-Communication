<template>
  <div class="analytics-dashboard p-6 bg-gradient-to-br from-blue-50 to-indigo-100 min-h-screen">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-800 mb-2">📊 Dashboard Analytics</h1>
        <p class="text-gray-600">Monitora i progressi e l'utilizzo dell'applicazione</p>
      </div>

      <!-- Statistiche in Tempo Reale -->
      <div class="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-blue-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Sessione Corrente</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ formatDuration(analyticsStore.currentSessionStats.duration) }}
              </p>
            </div>
            <div class="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">⏱️</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-green-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Pictogrammi Usati</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ analyticsStore.currentSessionStats.pictogramsUsed }}
              </p>
            </div>
            <div class="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">🖼️</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-purple-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Frasi Create</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ analyticsStore.currentSessionStats.phrasesCreated }}
              </p>
            </div>
            <div class="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">💬</span>
            </div>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow-lg p-6 border-l-4 border-orange-500">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm font-medium text-gray-600">Sintesi Vocale</p>
              <p class="text-2xl font-bold text-gray-900">
                {{ analyticsStore.currentSessionStats.voiceActivations }}
              </p>
            </div>
            <div class="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center">
              <span class="text-2xl">🔊</span>
            </div>
          </div>
        </div>
      </div>

      <!-- Controlli Periodo -->
      <div class="bg-white rounded-xl shadow-lg p-6 mb-8">
        <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
          <h2 class="text-xl font-semibold text-gray-800">Report di Progresso</h2>

          <div class="flex gap-2">
            <button
              v-for="period in periods"
              :key="period"
              @click="
                () => {
                  selectedPeriod = period
                  generateReport()
                }
              "
              :class="[
                'px-4 py-2 rounded-lg font-medium transition-colors',
                selectedPeriod === period
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200',
              ]"
            >
              {{ period === 'day' ? 'Giorno' : period === 'week' ? 'Settimana' : 'Mese' }}
            </button>
          </div>
        </div>
      </div>

      <!-- Report di Progresso -->
      <div v-if="progressReport" class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <!-- Statistiche Generali -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">📈 Statistiche Generali</h3>

          <div class="space-y-4">
            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-600">Pictogrammi Totali</span>
              <span class="font-bold text-blue-600">{{ progressReport.totalPictogramsUsed }}</span>
            </div>

            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-600">Pictogrammi Unici</span>
              <span class="font-bold text-green-600">{{
                progressReport.uniquePictogramsUsed
              }}</span>
            </div>

            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-600">Frasi Create</span>
              <span class="font-bold text-purple-600">{{ progressReport.phrasesCreated }}</span>
            </div>

            <div class="flex justify-between items-center p-3 bg-gray-50 rounded-lg">
              <span class="text-gray-600">Uso Sintesi Vocale</span>
              <span class="font-bold text-orange-600">{{ progressReport.voiceActivations }}</span>
            </div>
          </div>

          <!-- Trend di Progresso -->
          <div class="mt-6 p-4 rounded-lg" :class="getTrendClass(progressReport.progressTrend)">
            <div class="flex items-center gap-2">
              <span class="text-2xl">{{ getTrendIcon(progressReport.progressTrend) }}</span>
              <div>
                <p class="font-semibold">Trend: {{ getTrendText(progressReport.progressTrend) }}</p>
                <p class="text-sm opacity-90">
                  {{ getTrendDescription(progressReport.progressTrend) }}
                </p>
              </div>
            </div>
          </div>
        </div>

        <!-- Pictogrammi Più Usati -->
        <div class="bg-white rounded-xl shadow-lg p-6">
          <h3 class="text-lg font-semibold text-gray-800 mb-4">🏆 Pictogrammi Più Usati</h3>

          <div class="space-y-3">
            <div
              v-for="(pictogram, index) in progressReport.mostUsedPictograms.slice(0, 5)"
              :key="pictogram.id"
              class="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
            >
              <div class="flex items-center gap-3">
                <span
                  class="w-6 h-6 bg-blue-500 text-white rounded-full flex items-center justify-center text-sm font-bold"
                >
                  {{ index + 1 }}
                </span>
                <span class="text-gray-700">Pictogramma {{ pictogram.id }}</span>
              </div>
              <div class="flex items-center gap-2">
                <span class="text-sm text-gray-500">{{ pictogram.count }} usi</span>
                <div class="w-16 bg-gray-200 rounded-full h-2">
                  <div
                    class="bg-blue-500 h-2 rounded-full"
                    :style="{
                      width: `${(pictogram.count / progressReport.mostUsedPictograms[0].count) * 100}%`,
                    }"
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Raccomandazioni -->
      <div v-if="progressReport?.recommendations.length" class="bg-white rounded-xl shadow-lg p-6">
        <h3 class="text-lg font-semibold text-gray-800 mb-4">💡 Raccomandazioni</h3>

        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div
            v-for="(recommendation, index) in progressReport.recommendations"
            :key="index"
            class="p-4 bg-yellow-50 border-l-4 border-yellow-400 rounded-lg"
          >
            <div class="flex items-start gap-3">
              <span class="text-yellow-600 text-xl">💡</span>
              <p class="text-gray-700">{{ recommendation }}</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Loading State -->
      <div v-if="loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../../../stores/authStore'

// Definizione temporanea del tipo ProgressReport
interface ProgressReport {
  userId: string
  period: 'day' | 'week' | 'month'
  totalPictogramsUsed: number
  uniquePictogramsUsed: number
  phrasesCreated: number
  voiceActivations: number
  mostUsedPictograms: Array<{ id: string; count: number }>
  progressTrend: 'improving' | 'stable' | 'declining'
  recommendations: string[]
}

// Mock analytics store per ora
const mockAnalyticsStore = {
  currentSessionStats: {
    duration: 0,
    pictogramsUsed: 0,
    phrasesCreated: 0,
    voiceActivations: 0,
  },
  generateProgressReport: async (userId: string, period: string): Promise<ProgressReport> => {
    // Mock data per ora
    return {
      userId,
      period: period as 'day' | 'week' | 'month',
      totalPictogramsUsed: 25,
      uniquePictogramsUsed: 12,
      phrasesCreated: 8,
      voiceActivations: 15,
      mostUsedPictograms: [
        { id: 'casa', count: 10 },
        { id: 'cibo', count: 8 },
        { id: 'giocare', count: 6 },
        { id: 'acqua', count: 5 },
        { id: 'mamma', count: 4 },
      ],
      progressTrend: 'improving' as const,
      recommendations: [
        'Ottimo progresso nel vocabolario!',
        'Prova a creare frasi più lunghe',
        'Continua ad usare la sintesi vocale',
      ],
    }
  },
}

const authStore = useAuthStore()
const analyticsStore = mockAnalyticsStore

const periods = ['day', 'week', 'month'] as const
const selectedPeriod = ref<'day' | 'week' | 'month'>('week')
const progressReport = ref<ProgressReport | null>(null)
const loading = ref(false)

const generateReport = async () => {
  if (!authStore.user) return

  loading.value = true
  try {
    progressReport.value = await analyticsStore.generateProgressReport(
      authStore.user.uid,
      selectedPeriod.value,
    )
  } catch (error) {
    console.error('Errore nella generazione del report:', error)
  } finally {
    loading.value = false
  }
}

const formatDuration = (ms: number): string => {
  const minutes = Math.floor(ms / 60000)
  const seconds = Math.floor((ms % 60000) / 1000)
  return `${minutes}:${seconds.toString().padStart(2, '0')}`
}

const getTrendClass = (trend: string): string => {
  switch (trend) {
    case 'improving':
      return 'bg-green-100 border border-green-200 text-green-800'
    case 'stable':
      return 'bg-blue-100 border border-blue-200 text-blue-800'
    case 'declining':
      return 'bg-orange-100 border border-orange-200 text-orange-800'
    default:
      return 'bg-gray-100 border border-gray-200 text-gray-800'
  }
}

const getTrendIcon = (trend: string): string => {
  switch (trend) {
    case 'improving':
      return '📈'
    case 'stable':
      return '➡️'
    case 'declining':
      return '📉'
    default:
      return '❓'
  }
}

const getTrendText = (trend: string): string => {
  switch (trend) {
    case 'improving':
      return 'In Miglioramento'
    case 'stable':
      return 'Stabile'
    case 'declining':
      return 'In Calo'
    default:
      return 'Non Determinato'
  }
}

const getTrendDescription = (trend: string): string => {
  switch (trend) {
    case 'improving':
      return 'Ottimo lavoro! I progressi sono evidenti.'
    case 'stable':
      return 'Prestazioni costanti, continua così.'
    case 'declining':
      return 'Prova nuove strategie per migliorare.'
    default:
      return 'Serve più tempo per valutare il trend.'
  }
}

onMounted(() => {
  generateReport()
})
</script>

<style scoped>
.analytics-dashboard {
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
