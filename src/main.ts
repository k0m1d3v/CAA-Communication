import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from './i18n'

import App from './App.vue'
import router from './router'

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

// Mount app
app.mount('#app')
