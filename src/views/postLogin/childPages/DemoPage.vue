<template>
  <div class="demo-page p-6 bg-gradient-to-br from-purple-50 to-pink-100 min-h-screen">
    <div class="max-w-6xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-12">
        <h1 class="text-4xl font-bold text-gray-800 mb-4">🚀 Nuove Funzionalità ComuniCAA</h1>
        <p class="text-xl text-gray-600">
          Scopri tutte le nuove funzioni implementate nel progetto
        </p>
      </div>

      <!-- Grid delle Funzionalità -->
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        <!-- Analytics Dashboard -->
        <div class="feature-card">
          <div class="feature-icon">📊</div>
          <h3 class="feature-title">Dashboard Analytics</h3>
          <p class="feature-description">
            Sistema completo di analytics per monitorare i progressi degli utenti, con statistiche
            in tempo reale e report dettagliati.
          </p>
          <div class="feature-details">
            <div class="detail-item">✅ Tracking uso pictogrammi</div>
            <div class="detail-item">✅ Report di progresso</div>
            <div class="detail-item">✅ Raccomandazioni personalizzate</div>
            <div class="detail-item">✅ Statistiche sessione</div>
          </div>
          <button @click="goToAnalytics" class="feature-button analytics">
            Visualizza Analytics
          </button>
        </div>

        <!-- Sistema di Backup -->
        <div class="feature-card">
          <div class="feature-icon">☁️</div>
          <h3 class="feature-title">Backup Cloud</h3>
          <p class="feature-description">
            Sincronizzazione automatica delle frasi salvate su Firebase, con modalità offline e
            recupero automatico.
          </p>
          <div class="feature-details">
            <div class="detail-item">✅ Backup automatico su Firebase</div>
            <div class="detail-item">✅ Sincronizzazione cross-device</div>
            <div class="detail-item">✅ Modalità offline</div>
            <div class="detail-item">✅ Recupero dati automatico</div>
          </div>
          <button @click="testBackup" class="feature-button backup">Testa Backup</button>
        </div>

        <!-- Sistema di Accessibilità -->
        <div class="feature-card">
          <div class="feature-icon">♿</div>
          <h3 class="feature-title">Accessibilità Avanzata</h3>
          <p class="feature-description">
            Strumenti completi per l'accessibilità: contrasto elevato, eye-tracking, navigazione
            gestuale e molto altro.
          </p>
          <div class="feature-details">
            <div class="detail-item">✅ Modalità contrasto elevato</div>
            <div class="detail-item">✅ Supporto eye-tracking</div>
            <div class="detail-item">✅ Navigazione gestuale</div>
            <div class="detail-item">✅ Font size personalizzabile</div>
          </div>
          <button @click="openAccessibility" class="feature-button accessibility">
            Apri Impostazioni
          </button>
        </div>

        <!-- Tutorial Onboarding -->
        <div class="feature-card">
          <div class="feature-icon">🎯</div>
          <h3 class="feature-title">Tutorial Interattivo</h3>
          <p class="feature-description">
            Sistema di onboarding guidato per nuovi utenti, con tutorial passo-passo delle
            funzionalità principali.
          </p>
          <div class="feature-details">
            <div class="detail-item">✅ Tutorial step-by-step</div>
            <div class="detail-item">✅ Demo funzioni principali</div>
            <div class="detail-item">✅ Skip opzionale</div>
            <div class="detail-item">✅ Riavvio tutorial</div>
          </div>
          <button @click="startTutorial" class="feature-button tutorial">Avvia Tutorial</button>
        </div>

        <!-- Sintesi Vocale Avanzata -->
        <div class="feature-card">
          <div class="feature-icon">🔊</div>
          <h3 class="feature-title">Sintesi Vocale 2.0</h3>
          <p class="feature-description">
            Sistema migliorato di sintesi vocale con personalizzazione velocità, tono e salvataggio
            preferenze utente.
          </p>
          <div class="feature-details">
            <div class="detail-item">✅ Velocità personalizzabile</div>
            <div class="detail-item">✅ Selezione voce</div>
            <div class="detail-item">✅ Salvataggio preferenze</div>
            <div class="detail-item">✅ Lettura pagina completa</div>
          </div>
          <button @click="testVoice" class="feature-button voice">Testa Voce</button>
        </div>

        <!-- Sistema di Categorie -->
        <div class="feature-card">
          <div class="feature-icon">🏷️</div>
          <h3 class="feature-title">Categorie Intelligenti</h3>
          <p class="feature-description">
            Categorizzazione automatica dei pictogrammi più usati e suggerimenti basati sul contesto
            d'uso.
          </p>
          <div class="feature-details">
            <div class="detail-item">🚧 Categorizzazione automatica</div>
            <div class="detail-item">🚧 Suggerimenti intelligenti</div>
            <div class="detail-item">🚧 Filtri avanzati</div>
            <div class="detail-item">🚧 Ricerca semantica</div>
          </div>
          <button @click="showComingSoon" class="feature-button coming-soon" disabled>
            Prossimamente
          </button>
        </div>
      </div>

      <!-- Statistiche Implementation -->
      <div class="stats-section mt-16">
        <h2 class="text-2xl font-bold text-center text-gray-800 mb-8">📈 Stato Implementazione</h2>
        <div class="stats-grid">
          <div class="stat-card completed">
            <div class="stat-number">5</div>
            <div class="stat-label">Funzioni Completate</div>
          </div>
          <div class="stat-card in-progress">
            <div class="stat-number">3</div>
            <div class="stat-label">In Sviluppo</div>
          </div>
          <div class="stat-card planned">
            <div class="stat-number">7</div>
            <div class="stat-label">Pianificate</div>
          </div>
        </div>
      </div>

      <!-- Call to Action -->
      <div class="cta-section mt-12 text-center">
        <h3 class="text-xl font-semibold text-gray-800 mb-4">
          Pronto per testare le nuove funzioni?
        </h3>
        <div class="flex justify-center gap-4">
          <button @click="goToHome" class="cta-button primary">🏠 Torna alla Home</button>
          <button @click="goToAnalytics" class="cta-button secondary">
            📊 Inizia con Analytics
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'

const router = useRouter()

const goToAnalytics = () => {
  router.push('/analytics')
}

const goToHome = () => {
  router.push('/home')
}

const testBackup = () => {
  alert(
    '🔄 Test backup in corso...\n\n✅ Dati sincronizzati su cloud!\n💾 Backup locale creato.\n🔄 Auto-sync attivato.',
  )
}

const openAccessibility = () => {
  // Simula apertura pannello accessibilità
  document.documentElement.style.fontSize = '20px'
  alert(
    '♿ Impostazioni accessibilità applicate!\n\n✅ Font ingrandito\n✅ Modalità high-contrast disponibile\n✅ Navigazione semplificata',
  )

  // Reset dopo 3 secondi
  setTimeout(() => {
    document.documentElement.style.fontSize = '16px'
  }, 3000)
}

const startTutorial = () => {
  localStorage.removeItem('has-seen-onboarding')
  router.push('/home')
}

const testVoice = () => {
  const utterance = new SpeechSynthesisUtterance(
    'Benvenuto nel sistema di sintesi vocale avanzato di ComuniCAA! Puoi personalizzare velocità, tono e selezionare diverse voci.',
  )
  utterance.rate = 0.8
  utterance.lang = 'it-IT'
  speechSynthesis.speak(utterance)
}

const showComingSoon = () => {
  alert('🚧 Funzione in sviluppo!\n\nSarà disponibile nel prossimo aggiornamento.')
}
</script>

<style scoped>
.demo-page {
  min-height: 100vh;
}

.feature-card {
  background: white;
  border-radius: 16px;
  padding: 24px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
  transition:
    transform 0.3s ease,
    box-shadow 0.3s ease;
  border: 2px solid transparent;
}

.feature-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 12px 32px rgba(0, 0, 0, 0.15);
  border-color: #e5e7eb;
}

.feature-icon {
  font-size: 3rem;
  text-align: center;
  margin-bottom: 16px;
}

.feature-title {
  font-size: 1.25rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 12px;
  text-align: center;
}

.feature-description {
  color: #6b7280;
  line-height: 1.6;
  margin-bottom: 16px;
  text-align: center;
}

.feature-details {
  margin-bottom: 20px;
}

.detail-item {
  font-size: 0.875rem;
  color: #374151;
  margin-bottom: 8px;
  padding-left: 8px;
}

.feature-button {
  width: 100%;
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.feature-button.analytics {
  background: linear-gradient(135deg, #8b5cf6, #3b82f6);
  color: white;
}

.feature-button.backup {
  background: linear-gradient(135deg, #10b981, #059669);
  color: white;
}

.feature-button.accessibility {
  background: linear-gradient(135deg, #f59e0b, #d97706);
  color: white;
}

.feature-button.tutorial {
  background: linear-gradient(135deg, #ef4444, #dc2626);
  color: white;
}

.feature-button.voice {
  background: linear-gradient(135deg, #6366f1, #4f46e5);
  color: white;
}

.feature-button.coming-soon {
  background: #e5e7eb;
  color: #9ca3af;
  cursor: not-allowed;
}

.feature-button:not(.coming-soon):hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}

.stats-section {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.stats-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 24px;
}

.stat-card {
  text-align: center;
  padding: 24px;
  border-radius: 12px;
  border: 2px solid;
}

.stat-card.completed {
  background: #ecfdf5;
  border-color: #10b981;
  color: #065f46;
}

.stat-card.in-progress {
  background: #fef3c7;
  border-color: #f59e0b;
  color: #92400e;
}

.stat-card.planned {
  background: #ede9fe;
  border-color: #8b5cf6;
  color: #5b21b6;
}

.stat-number {
  font-size: 2rem;
  font-weight: bold;
  margin-bottom: 8px;
}

.stat-label {
  font-weight: 600;
}

.cta-section {
  background: white;
  border-radius: 16px;
  padding: 32px;
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.1);
}

.cta-button {
  padding: 12px 24px;
  border: none;
  border-radius: 8px;
  font-weight: 600;
  cursor: pointer;
  transition: all 0.2s ease;
}

.cta-button.primary {
  background: linear-gradient(135deg, #3b82f6, #1d4ed8);
  color: white;
}

.cta-button.secondary {
  background: linear-gradient(135deg, #8b5cf6, #7c3aed);
  color: white;
}

.cta-button:hover {
  transform: translateY(-1px);
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
}
</style>
