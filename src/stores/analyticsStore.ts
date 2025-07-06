import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth, db } from '../firebaseConfig'
import {
  collection,
  addDoc,
  query,
  where,
  orderBy,
  getDocs,
  serverTimestamp,
} from 'firebase/firestore'

export interface UsageEvent {
  id?: string
  userId: string
  eventType: 'pictogram_used' | 'phrase_created' | 'voice_activated' | 'page_visited'
  pictogramId?: string
  phraseId?: string
  pageName?: string
  timestamp: Date
  sessionId: string
  metadata?: Record<string, string | number | boolean>
}

export interface ProgressReport {
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

export const useAnalyticsStore = defineStore('analytics', () => {
  const currentSessionId = ref(generateSessionId())
  const events = ref<UsageEvent[]>([])

  // Genera un ID di sessione unico
  function generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`
  }

  // Traccia un evento
  const trackEvent = async (
    eventData: Omit<UsageEvent, 'id' | 'userId' | 'timestamp' | 'sessionId'>,
  ) => {
    const user = auth.currentUser
    if (!user) return

    const event: UsageEvent = {
      ...eventData,
      userId: user.uid,
      timestamp: new Date(),
      sessionId: currentSessionId.value,
    }

    // Salva localmente
    events.value.push(event)

    // Salva nel cloud
    try {
      await addDoc(collection(db, 'analytics'), {
        ...event,
        timestamp: serverTimestamp(),
      })
    } catch (error) {
      console.error('Errore nel tracking:', error)
    }
  }

  // Traccia uso pictogramma
  const trackPictogramUsage = (pictogramId: string, context?: string) => {
    trackEvent({
      eventType: 'pictogram_used',
      pictogramId,
      metadata: context ? { context } : undefined,
    })
  }

  // Traccia creazione frase
  const trackPhraseCreation = (phraseId: string, pictogramCount: number) => {
    trackEvent({
      eventType: 'phrase_created',
      phraseId,
      metadata: { pictogramCount },
    })
  }

  // Traccia attivazione voce
  const trackVoiceActivation = (duration?: number) => {
    trackEvent({
      eventType: 'voice_activated',
      metadata: duration ? { duration } : undefined,
    })
  }

  // Traccia visita pagina
  const trackPageVisit = (pageName: string) => {
    trackEvent({
      eventType: 'page_visited',
      pageName,
    })
  }

  // Genera report di progresso
  const generateProgressReport = async (
    userId: string,
    period: 'day' | 'week' | 'month',
  ): Promise<ProgressReport | null> => {
    try {
      const startDate = new Date()

      switch (period) {
        case 'day':
          startDate.setDate(startDate.getDate() - 1)
          break
        case 'week':
          startDate.setDate(startDate.getDate() - 7)
          break
        case 'month':
          startDate.setMonth(startDate.getMonth() - 1)
          break
      }

      const q = query(
        collection(db, 'analytics'),
        where('userId', '==', userId),
        where('timestamp', '>=', startDate),
        orderBy('timestamp', 'desc'),
      )

      const querySnapshot = await getDocs(q)
      const eventData: UsageEvent[] = []

      querySnapshot.forEach((doc) => {
        eventData.push({ id: doc.id, ...doc.data() } as UsageEvent)
      })

      return analyzeEvents(eventData, userId, period)
    } catch (error) {
      console.error('Errore nella generazione del report:', error)
      return null
    }
  }

  // Analizza gli eventi per generare insights
  const analyzeEvents = (
    events: UsageEvent[],
    userId: string,
    period: 'day' | 'week' | 'month',
  ): ProgressReport => {
    const pictogramEvents = events.filter((e) => e.eventType === 'pictogram_used')
    const phraseEvents = events.filter((e) => e.eventType === 'phrase_created')
    const voiceEvents = events.filter((e) => e.eventType === 'voice_activated')

    const uniquePictograms = new Set(pictogramEvents.map((e) => e.pictogramId))
    const pictogramCounts = new Map<string, number>()

    pictogramEvents.forEach((event) => {
      if (event.pictogramId) {
        pictogramCounts.set(event.pictogramId, (pictogramCounts.get(event.pictogramId) || 0) + 1)
      }
    })

    const mostUsedPictograms = Array.from(pictogramCounts.entries())
      .map(([id, count]) => ({ id, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10)

    // Determina il trend di progresso (logica semplificata)
    const progressTrend: 'improving' | 'stable' | 'declining' =
      uniquePictograms.size > 10 ? 'improving' : uniquePictograms.size > 5 ? 'stable' : 'declining'

    // Genera raccomandazioni
    const recommendations = generateRecommendations(
      uniquePictograms.size,
      phraseEvents.length,
      voiceEvents.length,
    )

    return {
      userId,
      period,
      totalPictogramsUsed: pictogramEvents.length,
      uniquePictogramsUsed: uniquePictograms.size,
      phrasesCreated: phraseEvents.length,
      voiceActivations: voiceEvents.length,
      mostUsedPictograms,
      progressTrend,
      recommendations,
    }
  }

  // Genera raccomandazioni basate sui dati
  const generateRecommendations = (
    uniquePictograms: number,
    phrases: number,
    voiceUse: number,
  ): string[] => {
    const recommendations: string[] = []

    if (uniquePictograms < 5) {
      recommendations.push('Prova ad esplorare più pictogrammi per arricchire il vocabolario')
    }

    if (phrases < 3) {
      recommendations.push('Sperimenta con la creazione di frasi più complesse')
    }

    if (voiceUse < 2) {
      recommendations.push('Utilizza di più la funzione di sintesi vocale per praticare')
    }

    if (uniquePictograms > 20) {
      recommendations.push('Ottimo progresso! Continua ad esplorare nuove combinazioni')
    }

    return recommendations
  }

  // Statistiche in tempo reale
  const currentSessionStats = computed(() => {
    const sessionEvents = events.value.filter((e) => e.sessionId === currentSessionId.value)

    return {
      pictogramsUsed: sessionEvents.filter((e) => e.eventType === 'pictogram_used').length,
      phrasesCreated: sessionEvents.filter((e) => e.eventType === 'phrase_created').length,
      voiceActivations: sessionEvents.filter((e) => e.eventType === 'voice_activated').length,
      duration: sessionEvents.length > 0 ? Date.now() - sessionEvents[0].timestamp.getTime() : 0,
    }
  })

  return {
    currentSessionId,
    events,
    trackEvent,
    trackPictogramUsage,
    trackPhraseCreation,
    trackVoiceActivation,
    trackPageVisit,
    generateProgressReport,
    currentSessionStats,
  }
})
