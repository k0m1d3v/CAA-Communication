import { defineStore } from 'pinia'
import { ref } from 'vue'
import { auth, db } from '../firebaseConfig'
import { doc, setDoc, getDoc, onSnapshot, serverTimestamp } from 'firebase/firestore'

export interface SavedPhrase {
  id: string
  name: string
  pictogramIds: string[]
  createdAt: Date
  lastUsed?: Date
  useCount: number
}

export const useBackupStore = defineStore('backup', () => {
  const isOnline = ref(navigator.onLine)
  const lastSyncTime = ref<Date | null>(null)
  const pendingChanges = ref<SavedPhrase[]>([])

  // Salva una frase nel cloud
  const savePhraseToCloud = async (phrase: SavedPhrase) => {
    const user = auth.currentUser
    if (!user) return

    try {
      const userDocRef = doc(db, 'users', user.uid)
      const phrasesRef = doc(userDocRef, 'phrases', phrase.id)

      await setDoc(phrasesRef, {
        ...phrase,
        syncedAt: serverTimestamp(),
      })

      lastSyncTime.value = new Date()
    } catch (error) {
      console.error('Errore nel salvataggio cloud:', error)
      // Aggiungi alla coda di modifiche pending se offline
      pendingChanges.value.push(phrase)
    }
  }

  // Recupera frasi dal cloud
  const loadPhrasesFromCloud = async (): Promise<SavedPhrase[]> => {
    const user = auth.currentUser
    if (!user) return []

    try {
      const userDocRef = doc(db, 'users', user.uid)
      const docSnap = await getDoc(userDocRef)

      if (docSnap.exists()) {
        return docSnap.data()?.phrases || []
      }
    } catch (error) {
      console.error('Errore nel caricamento cloud:', error)
    }

    return []
  }

  // Sincronizzazione automatica
  const setupAutoSync = () => {
    const user = auth.currentUser
    if (!user) return

    const userDocRef = doc(db, 'users', user.uid)

    return onSnapshot(userDocRef, (doc) => {
      if (doc.exists()) {
        // Aggiorna i dati locali con quelli dal cloud
        lastSyncTime.value = new Date()
      }
    })
  }

  // Gestione stato online/offline
  const handleOnlineStatus = () => {
    window.addEventListener('online', () => {
      isOnline.value = true
      syncPendingChanges()
    })

    window.addEventListener('offline', () => {
      isOnline.value = false
    })
  }

  // Sincronizza modifiche pending quando si torna online
  const syncPendingChanges = async () => {
    if (!isOnline.value || pendingChanges.value.length === 0) return

    for (const phrase of pendingChanges.value) {
      await savePhraseToCloud(phrase)
    }

    pendingChanges.value = []
  }

  return {
    isOnline,
    lastSyncTime,
    pendingChanges,
    savePhraseToCloud,
    loadPhrasesFromCloud,
    setupAutoSync,
    handleOnlineStatus,
    syncPendingChanges,
  }
})
