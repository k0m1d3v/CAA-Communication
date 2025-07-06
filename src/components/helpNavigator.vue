<template>
  <div class="help-navigator" ref="navigatorRef">
    <!-- Pulsante principale di aiuto -->
    <button
      @click="toggleMainMenu"
      :class="[
        'help-button',
        { 'help-button-open': isMainOpen },
        { 'help-button-pulse': hasNotifications },
      ]"
      :aria-label="t('helpNavigator.toggleHelp')"
      :aria-expanded="isMainOpen"
    >
      <div class="help-icon">
        <span v-if="!isMainOpen">❓</span>
        <span v-else>✕</span>
      </div>
      <span class="help-text">{{ t('helpNavigator.help') }}</span>
    </button>

    <!-- Menu principale di aiuto -->
    <transition name="help-menu">
      <div v-if="isMainOpen" class="help-menu">
        <div class="help-header">
          <h3 class="help-title">
            <span class="mr-2">🆘</span>
            {{ t('helpNavigator.assistanceCenter') }}
          </h3>
        </div>

        <div class="help-content">
          <!-- Quick Actions -->
          <div class="help-section">
            <h4 class="section-title">{{ t('helpNavigator.quickActions') }}</h4>

            <div class="action-grid">
              <!-- Emergency Phrases -->
              <button @click="showEmergencyPhrases" class="help-action emergency">
                <span class="action-icon">🚨</span>
                <span class="action-text">{{ t('helpNavigator.emergency') }}</span>
              </button>

              <!-- Tutorial -->
              <button @click="startTutorial" class="help-action tutorial">
                <span class="action-icon">🎓</span>
                <span class="action-text">{{ t('helpNavigator.tutorial') }}</span>
              </button>

              <!-- Text to Speech -->
              <button
                @click="toggleTextToSpeech"
                :class="['help-action', 'tts', { active: isListening }]"
              >
                <span class="action-icon">
                  {{ isListening ? '🔊' : '🔇' }}
                </span>
                <span class="action-text">
                  {{ isListening ? t('helpNavigator.listening') : t('helpNavigator.textToSpeech') }}
                </span>
              </button>

              <!-- Accessibility -->
              <button @click="openAccessibility" class="help-action accessibility">
                <span class="action-icon">♿</span>
                <span class="action-text">{{ t('helpNavigator.accessibility') }}</span>
              </button>

              <!-- Fast Responses -->
              <button @click="openFastResponses" class="help-action fast-responses">
                <span class="action-icon">⚡</span>
                <span class="action-text">{{ t('helpNavigator.fastResponses') }}</span>
                <span v-if="savedPhrasesCount > 0" class="phrase-count">{{
                  savedPhrasesCount
                }}</span>
              </button>
            </div>
          </div>

          <!-- Help Topics -->
          <div class="help-section">
            <h4 class="section-title">{{ t('helpNavigator.helpTopics') }}</h4>

            <div class="topic-list">
              <button
                v-for="topic in helpTopics"
                :key="topic.id"
                @click="showTopic(topic)"
                class="topic-item"
              >
                <span class="topic-icon">{{ topic.icon }}</span>
                <span class="topic-title">{{ t(`helpNavigator.topics.${topic.id}`) }}</span>
                <span class="topic-arrow">→</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Emergency Phrases Modal -->
    <transition name="modal">
      <div v-if="showEmergency" class="modal-overlay" @click="closeEmergency">
        <div class="emergency-modal" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">
              <span class="mr-2">🚨</span>
              {{ t('helpNavigator.emergencyPhrases') }}
            </h3>
            <button @click="closeEmergency" class="close-button">✕</button>
          </div>

          <div class="modal-content">
            <div class="emergency-grid">
              <button
                v-for="phrase in emergencyPhrases"
                :key="phrase.id"
                @click="speakPhrase(phrase.text)"
                class="emergency-phrase"
              >
                <span class="phrase-icon">{{ phrase.icon }}</span>
                <span class="phrase-text">{{
                  t(`helpNavigator.emergencyPhrasesList.${phrase.id}`)
                }}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Fast Responses Modal -->
    <transition name="modal">
      <div v-if="showFastResponsesModal" class="modal-overlay" @click="closeFastResponses">
        <div class="fast-responses-modal" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">
              <span class="mr-2">⚡</span>
              {{ t('helpNavigator.fastResponses') }}
            </h3>
            <button @click="closeFastResponses" class="close-button">✕</button>
          </div>

          <div class="modal-content">
            <div v-if="pictogramStore.savedPhrases.length === 0" class="empty-state">
              <div class="empty-icon">📝</div>
              <p class="empty-text">{{ t('helpNavigator.noSavedPhrases') }}</p>
              <button @click="goToDictionary" class="create-phrase-btn">
                <span class="mr-2">➕</span>
                {{ t('helpNavigator.createFirstPhrase') }}
              </button>
            </div>

            <div v-else class="phrases-grid">
              <div
                v-for="(phrase, index) in pictogramStore.savedPhrases"
                :key="index"
                class="phrase-card"
              >
                <div class="phrase-header">
                  <h4 class="phrase-name">{{ phrase.name }}</h4>
                  <span class="phrase-count"
                    >{{ phrase.pictogramIds.length }} {{ t('helpNavigator.pictograms') }}</span
                  >
                </div>

                <div class="phrase-actions">
                  <button
                    @click="usePhrase(phrase)"
                    class="action-btn use"
                    :title="t('helpNavigator.usePhrase')"
                  >
                    <span class="action-icon">📝</span>
                    {{ t('helpNavigator.use') }}
                  </button>

                  <button
                    @click="speakSavedPhrase(phrase)"
                    class="action-btn speak"
                    :title="t('helpNavigator.speakPhrase')"
                  >
                    <span class="action-icon">🔊</span>
                    {{ t('helpNavigator.speak') }}
                  </button>
                </div>
              </div>
            </div>

            <div v-if="pictogramStore.savedPhrases.length > 0" class="modal-footer">
              <button @click="goToDictionary" class="secondary-btn">
                <span class="mr-2">➕</span>
                {{ t('helpNavigator.createNewPhrase') }}
              </button>
            </div>
          </div>
        </div>
      </div>
    </transition>

    <!-- Help Topic Modal -->
    <transition name="modal">
      <div v-if="selectedTopic" class="modal-overlay" @click="closeTopic">
        <div class="topic-modal" @click.stop>
          <div class="modal-header">
            <h3 class="modal-title">
              <span class="mr-2">{{ selectedTopic.icon }}</span>
              {{ t(`helpNavigator.topics.${selectedTopic.id}`) }}
            </h3>
            <button @click="closeTopic" class="close-button">✕</button>
          </div>

          <div class="modal-content">
            <div class="topic-content">
              <p>{{ t(`helpNavigator.topicContent.${selectedTopic.id}`) }}</p>

              <div v-if="selectedTopic.steps" class="topic-steps">
                <ol>
                  <li v-for="(step, index) in selectedTopic.steps" :key="index">
                    {{ t(`helpNavigator.steps.${selectedTopic.id}.${index}`) }}
                  </li>
                </ol>
              </div>
            </div>
          </div>
        </div>
      </div>
    </transition>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount, computed } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { usePictogramStore } from '../stores/pictogramStore'

const { t } = useI18n()
const router = useRouter()
const pictogramStore = usePictogramStore()

// Types
interface HelpTopic {
  id: string
  icon: string
  steps?: number
}

interface SavedPhrase {
  name: string
  pictogramIds: string[]
}

// State
const navigatorRef = ref<HTMLElement | null>(null)
const isMainOpen = ref(false)
const showEmergency = ref(false)
const showFastResponsesModal = ref(false)
const selectedTopic = ref<HelpTopic | null>(null)
const listening = ref(false)
const isListening = ref(false)
const hasNotifications = ref(false)

// Computed
const savedPhrasesCount = computed(() => pictogramStore.savedPhrases.length)

// Help topics configuration
const helpTopics = [
  { id: 'caa', icon: '💬', steps: 3 },
  { id: 'pictograms', icon: '🖼️', steps: 4 },
  { id: 'navigation', icon: '🧭', steps: 3 },
  { id: 'voice', icon: '🔊', steps: 2 },
  { id: 'accessibility', icon: '♿', steps: 4 },
]

// Emergency phrases configuration
const emergencyPhrases = [
  { id: 'help', icon: '🆘', text: 'Ho bisogno di aiuto' },
  { id: 'doctor', icon: '👨‍⚕️', text: 'Ho bisogno di un dottore' },
  { id: 'water', icon: '💧', text: "Ho sete, vorrei dell'acqua" },
  { id: 'bathroom', icon: '🚻', text: 'Devo andare in bagno' },
  { id: 'pain', icon: '😣', text: 'Ho dolore' },
  { id: 'home', icon: '🏠', text: 'Voglio andare a casa' },
]

let clickHandler: ((e: MouseEvent) => void) | null = null

// Main actions
const toggleMainMenu = () => {
  isMainOpen.value = !isMainOpen.value
  if (!isMainOpen.value) {
    // Reset states when closing
    showEmergency.value = false
    showFastResponsesModal.value = false
    selectedTopic.value = null
    stopListening()
  }
}

const showEmergencyPhrases = () => {
  showEmergency.value = true
  isMainOpen.value = false
}

const closeEmergency = () => {
  showEmergency.value = false
}

const showTopic = (topic: HelpTopic) => {
  selectedTopic.value = topic
  isMainOpen.value = false
}

const closeTopic = () => {
  selectedTopic.value = null
}

// Fast Responses functionality
const openFastResponses = () => {
  showFastResponsesModal.value = true
  isMainOpen.value = false
}

const closeFastResponses = () => {
  showFastResponsesModal.value = false
}

const usePhrase = (phrase: SavedPhrase) => {
  // Load the pictograms into the store
  pictogramStore.clearPictograms()
  phrase.pictogramIds.forEach((id: string) => {
    pictogramStore.addPictogram(id)
  })

  // Navigate to dictionary and close modal
  router.push('/dizionario')
  closeFastResponses()
  isMainOpen.value = false
}

const speakSavedPhrase = (phrase: SavedPhrase) => {
  speakText(phrase.name)
}

const goToDictionary = () => {
  router.push('/dizionario')
  closeFastResponses()
  isMainOpen.value = false
}

// Tutorial functionality
const startTutorial = () => {
  isMainOpen.value = false
  // You can emit an event or use a global state to start tutorial
  console.log('Starting tutorial...')

  // Example: navigate to a tutorial page or trigger tutorial modal
  // router.push('/tutorial')

  // Or emit event for parent component to handle
  // emit('start-tutorial')

  // For now, show a simple alert
  alert(t('helpNavigator.tutorialMessage'))
}

// Text to Speech functionality
const toggleTextToSpeech = () => {
  if (listening.value) {
    stopListening()
  } else {
    startListening()
  }
}

const startListening = () => {
  listening.value = true
  isListening.value = true
  isMainOpen.value = false

  // Remove previous handler if any
  if (clickHandler) {
    document.removeEventListener('click', clickHandler, true)
  }

  clickHandler = (e: MouseEvent) => {
    if (!navigatorRef.value || navigatorRef.value.contains(e.target as Node)) {
      return
    }

    const element = e.target as HTMLElement
    let text = ''

    if (element.innerText) {
      text = element.innerText
    } else if (element.textContent) {
      text = element.textContent || ''
    }

    if (text.trim()) {
      speakText(text)
    }

    stopListening()
  }

  setTimeout(() => {
    if (clickHandler) {
      document.addEventListener('click', clickHandler, true)
    }
  }, 100)
}

const stopListening = () => {
  listening.value = false
  isListening.value = false

  if (clickHandler) {
    document.removeEventListener('click', clickHandler, true)
    clickHandler = null
  }
}

// Speech synthesis
const speakText = (text: string) => {
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel()
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.rate = 0.8
    utterance.pitch = 1
    utterance.volume = 0.8
    window.speechSynthesis.speak(utterance)
  }
}

const speakPhrase = (text: string) => {
  speakText(text)
  closeEmergency()
}

// Accessibility panel
const openAccessibility = () => {
  isMainOpen.value = false
  // Trigger accessibility panel open
  // This would need to communicate with the accessibility panel component
  console.log('Opening accessibility panel...')

  // You could emit an event or use a global state
  // emit('open-accessibility')

  // Or dispatch a custom event
  document.dispatchEvent(new CustomEvent('open-accessibility-panel'))
}

// Click outside handler
const handleClickOutside = (event: MouseEvent) => {
  if (navigatorRef.value && !navigatorRef.value.contains(event.target as Node)) {
    isMainOpen.value = false
    showEmergency.value = false
    showFastResponsesModal.value = false
    selectedTopic.value = null
    stopListening()
  }
}

// Keyboard shortcuts
const handleKeyDown = (event: KeyboardEvent) => {
  // F1 - Open help
  if (event.key === 'F1') {
    event.preventDefault()
    toggleMainMenu()
  }

  // Escape - Close all modals
  if (event.key === 'Escape') {
    isMainOpen.value = false
    showEmergency.value = false
    showFastResponsesModal.value = false
    selectedTopic.value = null
    stopListening()
  }

  // Ctrl/Cmd + H - Emergency help
  if ((event.ctrlKey || event.metaKey) && event.key === 'h') {
    event.preventDefault()
    showEmergencyPhrases()
  }

  // Ctrl/Cmd + R - Fast Responses
  if ((event.ctrlKey || event.metaKey) && event.key === 'r') {
    event.preventDefault()
    openFastResponses()
  }
}

// Lifecycle
onMounted(() => {
  document.addEventListener('click', handleClickOutside)
  document.addEventListener('keydown', handleKeyDown)

  // Check for notifications (example: new features, updates)
  // hasNotifications.value = checkForNotifications()
})

onBeforeUnmount(() => {
  document.removeEventListener('click', handleClickOutside)
  document.removeEventListener('keydown', handleKeyDown)
  stopListening()
})
</script>

<style scoped>
/* === HELP NAVIGATOR STYLES === */

.help-navigator {
  position: fixed;
  bottom: 1rem;
  right: 1rem;
  z-index: 1000;
}

/* Help Button */
.help-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 5rem;
  height: 5rem;
  background: linear-gradient(135deg, #ff6b6b 0%, #feca57 100%);
  color: white;
  border: none;
  border-radius: 50%;
  cursor: pointer;
  transition: all 0.3s ease;
  box-shadow: 0 8px 25px rgba(255, 107, 107, 0.4);
  position: relative;
  overflow: hidden;
}

.help-button:hover {
  transform: translateY(-2px) scale(1.05);
  box-shadow: 0 12px 35px rgba(255, 107, 107, 0.5);
}

.help-button-open {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
}

.help-button-pulse {
  animation: pulse 2s infinite;
}

@keyframes pulse {
  0%,
  100% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.1);
  }
}

.help-icon {
  font-size: 1.5rem;
  transition: transform 0.2s ease;
}

.help-text {
  position: absolute;
  bottom: -2rem;
  left: 50%;
  transform: translateX(-50%);
  font-size: 0.75rem;
  font-weight: 600;
  opacity: 0;
  transition: opacity 0.2s ease;
  white-space: nowrap;
}

.help-button:hover .help-text {
  opacity: 1;
}

/* Help Menu */
.help-menu {
  position: absolute;
  bottom: 6rem;
  right: 0;
  width: 350px;
  background: white;
  border-radius: 16px;
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.15);
  border: 1px solid #e2e8f0;
  overflow: hidden;
}

.help-header {
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  padding: 1rem 1.5rem;
}

.help-title {
  font-size: 1.125rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
}

.help-content {
  padding: 1.5rem;
}

.help-section {
  margin-bottom: 1.5rem;
}

.help-section:last-child {
  margin-bottom: 0;
}

.section-title {
  font-size: 0.875rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 1rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
}

/* Action Grid */
.action-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 0.75rem;
}

.help-action {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1rem 0.75rem;
  border: 2px solid #e2e8f0;
  border-radius: 12px;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.help-action:hover {
  border-color: #667eea;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(102, 126, 234, 0.15);
}

.help-action.active {
  border-color: #ff6b6b;
  background: #fff5f5;
}

.help-action.emergency {
  border-color: #ef4444;
  color: #dc2626;
}

.help-action.emergency:hover {
  border-color: #dc2626;
  background: #fef2f2;
}

.help-action.tutorial {
  border-color: #10b981;
  color: #059669;
}

.help-action.tutorial:hover {
  border-color: #059669;
  background: #ecfdf5;
}

.help-action.tts {
  border-color: #3b82f6;
  color: #2563eb;
}

.help-action.tts:hover {
  border-color: #2563eb;
  background: #eff6ff;
}

.help-action.accessibility {
  border-color: #8b5cf6;
  color: #7c3aed;
}

.help-action.accessibility:hover {
  border-color: #7c3aed;
  background: #f5f3ff;
}

.help-action.fast-responses {
  border-color: #f59e0b;
  color: #d97706;
  position: relative;
}

.help-action.fast-responses:hover {
  border-color: #d97706;
  background: #fffbeb;
}

.phrase-count {
  position: absolute;
  top: -8px;
  right: -8px;
  background: #ef4444;
  color: white;
  border-radius: 50%;
  width: 20px;
  height: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid white;
}

.action-icon {
  font-size: 1.5rem;
  margin-bottom: 0.5rem;
}

.action-text {
  font-size: 0.75rem;
  font-weight: 500;
}

/* Topic List */
.topic-list {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.topic-item {
  display: flex;
  align-items: center;
  padding: 0.75rem 1rem;
  background: #f8faff;
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: left;
  width: 100%;
}

.topic-item:hover {
  background: #e0e7ff;
  border-color: #c7d2fe;
}

.topic-icon {
  font-size: 1.25rem;
  margin-right: 0.75rem;
}

.topic-title {
  flex: 1;
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

.topic-arrow {
  color: #9ca3af;
  font-weight: 600;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1001;
}

.emergency-modal,
.topic-modal,
.fast-responses-modal {
  background: white;
  border-radius: 16px;
  box-shadow: 0 25px 50px rgba(0, 0, 0, 0.25);
  max-width: 90vw;
  max-height: 90vh;
  overflow-y: auto;
  width: 100%;
  max-width: 500px;
}

.modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1.5rem;
  border-bottom: 1px solid #e2e8f0;
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
  color: white;
  border-radius: 16px 16px 0 0;
}

.modal-title {
  font-size: 1.25rem;
  font-weight: 600;
  margin: 0;
  display: flex;
  align-items: center;
}

.close-button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 2rem;
  height: 2rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.2s ease;
}

.close-button:hover {
  background: rgba(255, 255, 255, 0.3);
}

.modal-content {
  padding: 1.5rem;
}

/* Emergency Grid */
.emergency-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
}

.emergency-phrase {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 1.5rem 1rem;
  background: #fef2f2;
  border: 2px solid #fecaca;
  border-radius: 12px;
  cursor: pointer;
  transition: all 0.2s ease;
  text-align: center;
}

.emergency-phrase:hover {
  border-color: #ef4444;
  background: #fee2e2;
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(239, 68, 68, 0.15);
}

.phrase-icon {
  font-size: 2rem;
  margin-bottom: 0.5rem;
}

.phrase-text {
  font-size: 0.875rem;
  font-weight: 500;
  color: #374151;
}

/* Topic Content */
.topic-content {
  line-height: 1.6;
  color: #374151;
}

.topic-steps {
  margin-top: 1.5rem;
}

.topic-steps ol {
  padding-left: 1.5rem;
}

.topic-steps li {
  margin-bottom: 0.5rem;
  color: #6b7280;
}

/* Fast Responses Styles */
.fast-responses-modal {
  max-width: 600px;
}

.empty-state {
  text-align: center;
  padding: 2rem;
}

.empty-icon {
  font-size: 4rem;
  margin-bottom: 1rem;
  opacity: 0.6;
}

.empty-text {
  color: #6b7280;
  margin-bottom: 1.5rem;
  font-size: 1rem;
}

.create-phrase-btn {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
  color: white;
  border: none;
  padding: 0.75rem 1.5rem;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.create-phrase-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(245, 158, 11, 0.3);
}

.phrases-grid {
  display: grid;
  gap: 1rem;
  max-height: 400px;
  overflow-y: auto;
}

.phrase-card {
  background: #f8faff;
  border: 1px solid #e2e8f0;
  border-radius: 12px;
  padding: 1rem;
  transition: all 0.2s ease;
}

.phrase-card:hover {
  background: #f1f5f9;
  border-color: #cbd5e1;
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
}

.phrase-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;
}

.phrase-name {
  font-size: 1rem;
  font-weight: 600;
  color: #1f2937;
  margin: 0;
}

.phrase-count {
  font-size: 0.75rem;
  color: #6b7280;
  background: #e5e7eb;
  padding: 0.25rem 0.5rem;
  border-radius: 4px;
}

.phrase-actions {
  display: flex;
  gap: 0.5rem;
}

.action-btn {
  flex: 1;
  padding: 0.5rem 0.75rem;
  border-radius: 6px;
  border: 1px solid;
  background: white;
  cursor: pointer;
  transition: all 0.2s ease;
  font-size: 0.875rem;
  font-weight: 500;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.25rem;
}

.action-btn.use {
  border-color: #3b82f6;
  color: #2563eb;
}

.action-btn.use:hover {
  background: #eff6ff;
  border-color: #2563eb;
}

.action-btn.speak {
  border-color: #10b981;
  color: #059669;
}

.action-btn.speak:hover {
  background: #ecfdf5;
  border-color: #059669;
}

.action-icon {
  font-size: 1rem;
}

.modal-footer {
  border-top: 1px solid #e2e8f0;
  padding: 1rem 0 0;
  margin-top: 1.5rem;
  text-align: center;
}

.secondary-btn {
  background: #f3f4f6;
  color: #374151;
  border: 1px solid #d1d5db;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  font-weight: 500;
  cursor: pointer;
  transition: all 0.2s ease;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
}

.secondary-btn:hover {
  background: #e5e7eb;
  border-color: #9ca3af;
}

/* Animations */
.help-menu-enter-active,
.help-menu-leave-active {
  transition: all 0.3s ease;
}

.help-menu-enter-from,
.help-menu-leave-to {
  opacity: 0;
  transform: translateY(20px) scale(0.95);
}

.modal-enter-active,
.modal-leave-active {
  transition: all 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
  opacity: 0;
}

.modal-enter-from .emergency-modal,
.modal-enter-from .topic-modal,
.modal-enter-from .fast-responses-modal,
.modal-leave-to .emergency-modal,
.modal-leave-to .topic-modal,
.modal-leave-to .fast-responses-modal {
  transform: scale(0.9) translateY(20px);
}

/* Responsive Design */
@media (max-width: 768px) {
  .help-navigator {
    bottom: 0.5rem;
    right: 0.5rem;
  }

  .help-menu {
    width: calc(100vw - 1rem);
    max-width: 320px;
    right: 0;
  }

  .action-grid {
    grid-template-columns: 1fr;
  }

  .emergency-grid {
    grid-template-columns: 1fr;
  }

  .emergency-modal,
  .topic-modal,
  .fast-responses-modal {
    margin: 1rem;
    max-width: calc(100vw - 2rem);
  }
}

/* Accessibility */
@media (prefers-reduced-motion: reduce) {
  .help-button,
  .help-action,
  .topic-item,
  .emergency-phrase {
    transition: none;
  }

  .help-button:hover {
    transform: none;
  }

  .help-button-pulse {
    animation: none;
  }
}

/* High contrast mode */
@media (prefers-contrast: high) {
  .help-button,
  .help-action,
  .topic-item,
  .emergency-phrase {
    border-width: 3px;
  }

  .help-menu,
  .emergency-modal,
  .topic-modal {
    border: 3px solid #000;
  }
}

/* Focus indicators */
.help-button:focus,
.help-action:focus,
.topic-item:focus,
.emergency-phrase:focus,
.close-button:focus {
  outline: 3px solid #ffd700;
  outline-offset: 2px;
}
</style>
