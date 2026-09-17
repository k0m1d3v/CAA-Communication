import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import { auth } from '../firebaseConfig.ts'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'

let listenerActive = false
let readyPromise: Promise<void> | null = null

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)
  const isLoading = ref(true) // Partiamo con isLoading a `true`

  const setUser = (firebaseUser: User | null) => {
    user.value = firebaseUser
  }

  // Inizializza lo store con lo stato dell'utente.
  // Sottoscrive onAuthStateChanged una sola volta per l'intera sessione,
  // anche se chiamata da più componenti.
  const initializeStore = () => {
    if (listenerActive) return
    listenerActive = true

    onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser) // Imposta l'utente
      isLoading.value = false // Disattiva il caricamento
    })
  }

  // Risolve quando il primo stato di autenticazione è stato determinato.
  // Usato dalla route guard per attendere prima di decidere se reindirizzare.
  const waitForAuthReady = (): Promise<void> => {
    if (!readyPromise) {
      readyPromise = new Promise((resolve) => {
        if (!isLoading.value) {
          resolve()
          return
        }
        const stop = watch(isLoading, (loading) => {
          if (!loading) {
            stop()
            resolve()
          }
        })
      })
    }
    return readyPromise
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return { user, isAuthenticated, isLoading, initializeStore, waitForAuthReady, logout }
})
