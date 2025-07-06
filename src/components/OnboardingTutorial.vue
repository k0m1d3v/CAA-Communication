<template>
  <div v-if="showOnboarding" class="onboarding-overlay">
    <div class="onboarding-modal">
      <!-- Progress Bar -->
      <div class="progress-bar">
        <div class="progress-fill" :style="{ width: `${(currentStep / totalSteps) * 100}%` }"></div>
      </div>

      <!-- Step Content -->
      <div class="step-content">
        <div v-if="currentStep === 1" class="step">
          <div class="step-icon">👋</div>
          <h2>Benvenuto in ComuniCAA!</h2>
          <p>
            Ti guideremo attraverso le funzionalità principali per aiutarti a comunicare meglio.
          </p>
          <img src="@/assets/icons/homeIcon.png" alt="Home" class="demo-image" />
        </div>

        <div v-if="currentStep === 2" class="step">
          <div class="step-icon">🖼️</div>
          <h2>Pictogrammi</h2>
          <p>
            I pictogrammi sono immagini che rappresentano parole o concetti. Puoi selezionarli per
            creare frasi.
          </p>
          <div class="demo-pictograms">
            <img src="@/assets/icons/parola.png" alt="Parola" class="pictogram-demo" />
            <span class="plus">+</span>
            <img src="@/assets/icons/risposta.png" alt="Risposta" class="pictogram-demo" />
            <span class="equals">=</span>
            <span class="phrase">💬 Frase!</span>
          </div>
        </div>

        <div v-if="currentStep === 3" class="step">
          <div class="step-icon">🔊</div>
          <h2>Sintesi Vocale</h2>
          <p>
            Puoi ascoltare le tue frasi utilizzando la sintesi vocale. Premi il pulsante speaker per
            sentire il testo.
          </p>
          <button class="demo-voice-button" @click="playDemoVoice">🔊 Prova la voce</button>
        </div>

        <div v-if="currentStep === 4" class="step">
          <div class="step-icon">📱</div>
          <h2>Navigazione</h2>
          <p>Usa i menu per navigare tra le diverse sezioni: Dizionario, Giochi e Parliamo.</p>
          <div class="navigation-demo">
            <div class="nav-item">📖 Dizionario</div>
            <div class="nav-item">🎮 Giochi</div>
            <div class="nav-item">💬 Parliamo</div>
          </div>
        </div>

        <div v-if="currentStep === 5" class="step">
          <div class="step-icon">⚙️</div>
          <h2>Personalizzazione</h2>
          <p>
            Puoi personalizzare l'applicazione nelle impostazioni: dimensione del testo, contrasto e
            molto altro.
          </p>
          <div class="settings-demo">
            <div class="setting-item">🔤 Dimensione testo</div>
            <div class="setting-item">🌓 Contrasto elevato</div>
            <div class="setting-item">👁️ Eye tracking</div>
          </div>
        </div>

        <div v-if="currentStep === 6" class="step">
          <div class="step-icon">🎉</div>
          <h2>Tutto Pronto!</h2>
          <p>
            Ora sei pronto per iniziare a usare ComuniCAA. Ricorda: puoi sempre accedere all'aiuto
            premendo il pulsante "?" in alto a destra.
          </p>
          <div class="demo-help">
            <span class="help-button">?</span>
            <span class="arrow">←</span>
            <span class="help-text">Premi qui per aiuto</span>
          </div>
        </div>
      </div>

      <!-- Navigation Buttons -->
      <div class="step-navigation">
        <button v-if="currentStep > 1" @click="previousStep" class="nav-button secondary">
          ← Indietro
        </button>

        <button v-if="currentStep < totalSteps" @click="nextStep" class="nav-button primary">
          Avanti →
        </button>

        <button
          v-if="currentStep === totalSteps"
          @click="completeOnboarding"
          class="nav-button primary"
        >
          Inizia! 🚀
        </button>
      </div>

      <!-- Skip Button -->
      <button @click="skipOnboarding" class="skip-button">Salta tutorial</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useAuthStore } from '../stores/authStore'

const authStore = useAuthStore()

const showOnboarding = ref(false)
const currentStep = ref(1)
const totalSteps = ref(6)

onMounted(() => {
  // Mostra onboarding solo per nuovi utenti
  const hasSeenOnboarding = localStorage.getItem('has-seen-onboarding')
  if (!hasSeenOnboarding && authStore.user) {
    showOnboarding.value = true
  }
})

const nextStep = () => {
  if (currentStep.value < totalSteps.value) {
    currentStep.value++
  }
}

const previousStep = () => {
  if (currentStep.value > 1) {
    currentStep.value--
  }
}

const completeOnboarding = () => {
  localStorage.setItem('has-seen-onboarding', 'true')
  showOnboarding.value = false

  // Tracker evento completamento onboarding
  // analyticsStore.trackEvent({ eventType: 'onboarding_completed' })
}

const skipOnboarding = () => {
  localStorage.setItem('has-seen-onboarding', 'true')
  showOnboarding.value = false

  // Tracker evento skip onboarding
  // analyticsStore.trackEvent({ eventType: 'onboarding_skipped', metadata: { step: currentStep.value } })
}

const playDemoVoice = () => {
  const utterance = new SpeechSynthesisUtterance('Ciao! Questa è la sintesi vocale di ComuniCAA.')
  utterance.lang = 'it-IT'
  speechSynthesis.speak(utterance)
}
</script>

<style scoped>
.onboarding-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.8);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 10000;
  animation: fadeIn 0.3s ease-in-out;
}

.onboarding-modal {
  background: white;
  border-radius: 20px;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
  animation: slideUp 0.3s ease-out;
}

.progress-bar {
  height: 4px;
  background: #e5e7eb;
  border-radius: 20px 20px 0 0;
}

.progress-fill {
  height: 100%;
  background: linear-gradient(90deg, #3b82f6, #8b5cf6);
  border-radius: 20px 20px 0 0;
  transition: width 0.3s ease;
}

.step-content {
  padding: 2rem;
  text-align: center;
}

.step {
  animation: slideInContent 0.3s ease-out;
}

.step-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
}

.step h2 {
  font-size: 1.5rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 1rem;
}

.step p {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 1.5rem;
}

.demo-image {
  width: 80px;
  height: 80px;
  margin: 1rem auto;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.demo-pictograms {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
  flex-wrap: wrap;
}

.pictogram-demo {
  width: 50px;
  height: 50px;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
}

.plus,
.equals {
  font-size: 1.5rem;
  font-weight: bold;
  color: #3b82f6;
}

.phrase {
  font-size: 1.2rem;
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  font-weight: bold;
}

.demo-voice-button {
  background: linear-gradient(135deg, #10b981, #3b82f6);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-size: 1.1rem;
  cursor: pointer;
  transition: transform 0.2s ease;
}

.demo-voice-button:hover {
  transform: scale(1.05);
}

.navigation-demo,
.settings-demo {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin: 1rem 0;
}

.nav-item,
.setting-item {
  background: #f3f4f6;
  padding: 0.75rem;
  border-radius: 8px;
  color: #374151;
  font-weight: 500;
}

.demo-help {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 1rem;
  margin: 1rem 0;
}

.help-button {
  width: 40px;
  height: 40px;
  background: #3b82f6;
  color: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  font-weight: bold;
  font-size: 1.2rem;
}

.arrow {
  font-size: 1.5rem;
  color: #3b82f6;
  animation: bounce 1s infinite;
}

.help-text {
  color: #6b7280;
  font-style: italic;
}

.step-navigation {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
  border-top: 1px solid #e5e7eb;
}

.nav-button {
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 500;
  border: none;
  cursor: pointer;
  transition: all 0.2s ease;
}

.nav-button.primary {
  background: linear-gradient(135deg, #3b82f6, #8b5cf6);
  color: white;
}

.nav-button.primary:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 8px rgba(59, 130, 246, 0.3);
}

.nav-button.secondary {
  background: #f3f4f6;
  color: #6b7280;
}

.nav-button.secondary:hover {
  background: #e5e7eb;
}

.skip-button {
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: transparent;
  border: none;
  color: #6b7280;
  font-size: 0.875rem;
  cursor: pointer;
  text-decoration: underline;
}

.skip-button:hover {
  color: #374151;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px) scale(0.95);
  }
  to {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}

@keyframes slideInContent {
  from {
    opacity: 0;
    transform: translateX(20px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes bounce {
  0%,
  20%,
  50%,
  80%,
  100% {
    transform: translateX(0);
  }
  40% {
    transform: translateX(-5px);
  }
  60% {
    transform: translateX(-3px);
  }
}
</style>
