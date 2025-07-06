<script setup lang="ts">
import { useI18n } from 'vue-i18n'

import { useLanguageStore } from '../../stores/languageStore'

const { t } = useI18n()
const languageStore = useLanguageStore()

const toggleLanguage = () => {
  const newLang = languageStore.language === 'it' ? 'en' : 'it'
  languageStore.setLanguage(newLang)
}

// Team members data
const teamMembers = [
  {
    key: 'mirko',
    gradient: 'from-blue-500 to-indigo-600',
    icon: '💻',
  },
  {
    key: 'lorenzo',
    gradient: 'from-emerald-500 to-blue-600',
    icon: '🎨',
  },
  {
    key: 'federico',
    gradient: 'from-purple-500 to-pink-600',
    icon: '⚡',
  },
]
</script>

<template>
  <!-- Modern Credits Page -->
  <div class="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
    <!-- Top navbar with language switcher -->
    <nav class="relative p-6 flex justify-between items-center">
      <router-link
        to="/"
        class="text-slate-600 hover:text-slate-800 transition-colors duration-200 text-sm font-medium flex items-center gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M15 19l-7-7 7-7"
          ></path>
        </svg>
        Torna alla Home
      </router-link>

      <!-- Language Switcher -->
      <button
        @click="toggleLanguage"
        class="relative group bg-white/80 backdrop-blur-sm border border-slate-200 rounded-full px-4 py-2 text-sm font-medium text-slate-700 hover:bg-white hover:border-slate-300 transition-all duration-200 shadow-sm"
        aria-label="Cambia lingua"
      >
        <div class="flex items-center gap-2">
          <span
            class="w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold bg-gradient-to-r from-blue-500 to-indigo-600 text-white"
          >
            {{ languageStore.language.toUpperCase() }}
          </span>
          <span class="hidden sm:inline">
            {{ languageStore.language === 'it' ? 'Italiano' : 'English' }}
          </span>
        </div>
      </button>
    </nav>

    <!-- Main content -->
    <div class="container mx-auto px-6 pt-8 pb-16">
      <!-- Header section -->
      <div class="text-center mb-16">
        <div
          class="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-3xl mb-8 shadow-xl"
        >
          <svg class="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
            ></path>
          </svg>
        </div>

        <h1 class="text-5xl font-bold text-slate-800 mb-6">Chi Siamo</h1>
        <p class="text-xl text-slate-600 max-w-3xl mx-auto leading-relaxed mb-8">
          Un team di studenti appassionati dell'IIS Volta Lodi, uniti dalla missione di rendere la
          comunicazione accessibile a tutti attraverso la tecnologia.
        </p>

        <!-- School badge -->
        <div
          class="inline-block bg-white/80 backdrop-blur-sm rounded-2xl border border-white/50 px-8 py-4 shadow-lg"
        >
          <div class="flex items-center justify-center gap-3">
            <div
              class="w-10 h-10 bg-gradient-to-r from-amber-400 to-orange-500 rounded-xl flex items-center justify-center"
            >
              <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"
                ></path>
              </svg>
            </div>
            <div class="text-left">
              <h3 class="text-lg font-bold text-slate-800">IIS Volta Lodi</h3>
              <p class="text-sm text-slate-600">Progetto didattico per l'accessibilità</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Team members section -->
      <div class="max-w-6xl mx-auto">
        <h2 class="text-3xl font-bold text-center text-slate-800 mb-12">Il Nostro Team</h2>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Mirko -->
          <div class="group">
            <div
              class="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              <!-- Member header with gradient -->
              <div
                class="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 text-center relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div class="relative z-10">
                  <div
                    class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
                  >
                    💻
                  </div>
                  <h3 class="text-2xl font-bold text-white mb-2">Mirko Faccio</h3>
                  <p class="text-white/90 font-medium">Lead Developer</p>
                </div>
              </div>

              <!-- Member content -->
              <div class="p-8">
                <p class="text-slate-600 leading-relaxed mb-6">
                  Sviluppatore fullstack con passione per l'accessibilità e le tecnologie
                  innovative. Esperto in Vue.js e TypeScript.
                </p>

                <!-- Social links -->
                <div class="flex justify-center gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    class="w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-xl flex items-center justify-center transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    class="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Lorenzo -->
          <div class="group">
            <div
              class="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              <!-- Member header with gradient -->
              <div
                class="bg-gradient-to-r from-emerald-500 to-blue-600 p-8 text-center relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div class="relative z-10">
                  <div
                    class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
                  >
                    🎨
                  </div>
                  <h3 class="text-2xl font-bold text-white mb-2">Lorenzo Torri</h3>
                  <p class="text-white/90 font-medium">UI/UX Designer</p>
                </div>
              </div>

              <!-- Member content -->
              <div class="p-8">
                <p class="text-slate-600 leading-relaxed mb-6">
                  Designer creativo specializzato in accessibilità e user experience. Responsabile
                  dell'interfaccia utente e del design system.
                </p>

                <!-- Social links -->
                <div class="flex justify-center gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    class="w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-xl flex items-center justify-center transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    class="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>

          <!-- Federico -->
          <div class="group">
            <div
              class="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2"
            >
              <!-- Member header with gradient -->
              <div
                class="bg-gradient-to-r from-purple-500 to-pink-600 p-8 text-center relative overflow-hidden"
              >
                <div class="absolute inset-0 bg-white/10 backdrop-blur-sm"></div>
                <div class="relative z-10">
                  <div
                    class="w-20 h-20 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center mx-auto mb-4 text-3xl"
                  >
                    ⚡
                  </div>
                  <h3 class="text-2xl font-bold text-white mb-2">Federico Rossi</h3>
                  <p class="text-white/90 font-medium">Backend Developer</p>
                </div>
              </div>

              <!-- Member content -->
              <div class="p-8">
                <p class="text-slate-600 leading-relaxed mb-6">
                  Esperto in architetture backend e database. Responsabile dell'infrastruttura e
                  delle API che rendono possibile il progetto.
                </p>

                <!-- Social links -->
                <div class="flex justify-center gap-4">
                  <a
                    href="https://github.com"
                    target="_blank"
                    class="w-12 h-12 bg-slate-800 hover:bg-slate-700 text-white rounded-xl flex items-center justify-center transition-colors duration-200"
                    aria-label="GitHub"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
                      />
                    </svg>
                  </a>
                  <a
                    href="https://linkedin.com"
                    target="_blank"
                    class="w-12 h-12 bg-blue-600 hover:bg-blue-700 text-white rounded-xl flex items-center justify-center transition-colors duration-200"
                    aria-label="LinkedIn"
                  >
                    <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path
                        d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"
                      />
                    </svg>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Project info section -->
      <div class="mt-20 max-w-4xl mx-auto">
        <div
          class="bg-white/80 backdrop-blur-sm rounded-3xl border border-white/50 shadow-xl p-8 lg:p-12"
        >
          <div class="text-center">
            <div
              class="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-emerald-400 to-blue-500 rounded-2xl mb-6"
            >
              <svg class="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                ></path>
              </svg>
            </div>
            <h3 class="text-2xl font-bold text-slate-800 mb-4">Un Progetto del Cuore</h3>
            <p class="text-slate-600 leading-relaxed mb-8">
              Questo progetto è nato dalla passione degli studenti dell'IIS Volta Lodi per
              l'accessibilità e l'inclusione. È completamente gratuito e open source, sviluppato con
              l'obiettivo di supportare la comunicazione aumentativa e alternativa.
            </p>

            <!-- Features grid -->
            <div class="grid md:grid-cols-3 gap-6 mt-8">
              <div class="text-center">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-green-400 to-emerald-500 rounded-xl mx-auto mb-3 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    ></path>
                  </svg>
                </div>
                <h4 class="font-semibold text-slate-800">100% Gratuito</h4>
                <p class="text-sm text-slate-600">Nessun costo nascosto</p>
              </div>

              <div class="text-center">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-xl mx-auto mb-3 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                    ></path>
                  </svg>
                </div>
                <h4 class="font-semibold text-slate-800">Open Source</h4>
                <p class="text-sm text-slate-600">Codice aperto e trasparente</p>
              </div>

              <div class="text-center">
                <div
                  class="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-xl mx-auto mb-3 flex items-center justify-center"
                >
                  <svg
                    class="w-6 h-6 text-white"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      stroke-width="2"
                      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                    ></path>
                  </svg>
                </div>
                <h4 class="font-semibold text-slate-800">Con Passione</h4>
                <p class="text-sm text-slate-600">Fatto con il cuore</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
