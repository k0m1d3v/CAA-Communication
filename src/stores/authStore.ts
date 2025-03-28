import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth } from '../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth'

export const useAuthStore = defineStore('auth', () => {
  const user = ref<User | null>(null)
  const isAuthenticated = computed(() => user.value !== null)
  const isLoading = ref(true) // Partiamo con isLoading a `true`

  const setUser = (firebaseUser: User | null) => {
    user.value = firebaseUser
  }

  // Inizializza lo store con lo stato dell'utente
  const initializeStore = () => {
    isLoading.value = true // Imposta lo stato di caricamento
    onAuthStateChanged(auth, (firebaseUser) => {
      setUser(firebaseUser) // Imposta l'utente
      isLoading.value = false // Disattiva il caricamento
    })
  }

  const logout = async () => {
    await signOut(auth)
    setUser(null)
  }

  return { user, isAuthenticated, isLoading, initializeStore, logout }
})
