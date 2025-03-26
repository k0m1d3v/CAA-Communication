import { defineStore } from 'pinia'
import { ref, computed } from 'vue'
import { auth } from '../firebaseConfig'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import type { User } from 'firebase/auth' // Use a type-only import for User

export const useAuthStore = defineStore('auth', () => {
  // Explicitly define the type of `user` as `User | null`
  const user = ref<User | null>(null)

  // Computed property to check if the user is authenticated
  const isAuthenticated = computed(() => user.value !== null)

  // Initialize the store by setting up the auth state listener
  const initializeStore = () => {
    onAuthStateChanged(auth, (firebaseUser) => {
      user.value = firebaseUser
    })
  }

  // Logout function
  const logout = async () => {
    try {
      await signOut(auth)
      user.value = null
      console.log('User logged out')
    } catch (error) {
      console.error('Logout error:', error)
    }
  }

  return { user, isAuthenticated, initializeStore, logout }
})
