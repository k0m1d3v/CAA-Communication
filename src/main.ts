import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'

import App from './App.vue'
import router from './router'
import { useAuthStore } from './stores/authStore'
import { useAccessibilityStore } from './stores/accessibilityStore'

// Initialize app
const app = createApp(App)
const pinia = createPinia()

// Use plugins
app.use(pinia)
app.use(router)
app.use(i18n)

// Initialize language from localStorage if available
const storedLang = localStorage.getItem('language')
if (storedLang === 'en' || storedLang === 'it') {
  i18n.global.locale = storedLang
}

// Start the auth listener once for the whole session (the router guard
// and every page rely on this instead of each subscribing on its own).
useAuthStore().initializeStore()

// Load and apply persisted accessibility settings before mounting, so they
// take effect immediately instead of only when the settings panel opens.
useAccessibilityStore().loadSettings()

// Mount app
app.mount('#app')
