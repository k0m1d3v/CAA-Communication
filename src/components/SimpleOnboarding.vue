<template>
  <div
    v-if="showOnboarding"
    class="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
  >
    <div class="bg-white rounded-2xl max-w-lg w-full p-8 relative animate-pulse">
      <!-- Close button -->
      <button
        @click="skipOnboarding"
        class="absolute top-4 right-4 text-gray-400 hover:text-gray-600 text-xl font-bold"
      >
        ✕
      </button>

      <!-- Step indicator -->
      <div class="flex justify-center mb-6">
        <div class="flex gap-2">
          <div
            v-for="n in totalSteps"
            :key="n"
            :class="[
              'w-3 h-3 rounded-full transition-colors',
              n <= currentStep ? 'bg-blue-500' : 'bg-gray-200',
            ]"
          ></div>
        </div>
      </div>

      <!-- Step content -->
      <div class="text-center">
        <div v-if="currentStep === 1">
          <div class="text-4xl mb-4">👋</div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Benvenuto!</h2>
          <p class="text-gray-600 mb-6">Scopri come usare la tua nuova app di comunicazione!</p>
        </div>

        <div v-if="currentStep === 2">
          <div class="text-4xl mb-4">💬</div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Crea Frasi</h2>
          <p class="text-gray-600 mb-6">Usa i pittogrammi per creare e condividere le tue frasi.</p>
        </div>

        <div v-if="currentStep === 3">
          <div class="text-4xl mb-4">📊</div>
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Monitora Progressi</h2>
          <p class="text-gray-600 mb-6">Visualizza le tue statistiche e i tuoi miglioramenti!</p>
        </div>
      </div>

      <!-- Navigation buttons -->
      <div class="flex justify-between mt-8">
        <button
          v-if="currentStep > 1"
          @click="prevStep"
          class="px-6 py-2 text-gray-600 hover:text-gray-800 transition-colors"
        >
          Indietro
        </button>
        <div v-else></div>

        <button
          @click="currentStep < totalSteps ? nextStep() : completeOnboarding()"
          class="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
        >
          {{ currentStep < totalSteps ? 'Continua' : 'Inizia!' }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'

const showOnboarding = ref(false)
const currentStep = ref(1)
const totalSteps = 3

onMounted(() => {
  // Show onboarding for new users
  const hasSeenOnboarding = localStorage.getItem('hasSeenOnboarding')
  if (!hasSeenOnboarding) {
    setTimeout(() => {
      showOnboarding.value = true
    }, 1000)
  }
})

const nextStep = () => {
  if (currentStep.value < totalSteps) {
    currentStep.value++
  }
}

const prevStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const completeOnboarding = () => {
  localStorage.setItem('hasSeenOnboarding', 'true')
  showOnboarding.value = false
}

const skipOnboarding = () => {
  localStorage.setItem('hasSeenOnboarding', 'true')
  showOnboarding.value = false
}
</script>

<script lang="ts">
export default {
  name: 'SimpleOnboarding',
}
</script>

<style scoped>
@keyframes pulse {
  0%,
  100% {
    opacity: 1;
  }
  50% {
    opacity: 0.95;
  }
}

.animate-pulse {
  animation: pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
}
</style>
