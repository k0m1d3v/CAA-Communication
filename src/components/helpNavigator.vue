<template>
  <div class="fixed bottom-4 right-4" ref="menuRef">
    <!-- Bottone trasformabile -->
    <div
      @click="toggleMenu"
      :class="[
        'flex items-center justify-center transition-all duration-300 ease-in-out cursor-pointer',
        isOpen ? 'w-72 h-20 rounded-full' : 'w-24 h-24 rounded-full',
        'bg-yellow-200 border border-black shadow-lg',
        'transform transition-transform duration-200 ease-in-out hover:scale-110'
      ]"
    >
      <!-- Contenuto bottone iniziale -->
      <transition name="fade" mode="out-in">
        <div v-if="!isOpen" key="closed" class="flex flex-col items-center justify-center">
          <img
            src="@/assets/icons/helpIcon.png"
            alt="Aiuto Icon"
            class="w-10 h-10 mb-1"
          />
          <span class="font-bold text-lg text-black">Aiuto</span>
        </div>

        <!-- Contenuto menu -->
        <div v-else key="open" class="flex items-center justify-between w-full px-4">
          <span class="text-3xl font-bold text-black">?</span>
          <img src="@/assets/icons/undefined.png" alt="Menu Icon" class="h-12" />
          <!-- Voice Reader Button -->
          <button
            @click.stop="activateVoiceReader"
            :class="['ml-4 px-3 py-2 rounded bg-blue-400 text-white font-bold', listening ? 'ring-2 ring-blue-700' : '']"
            title="Attiva lettore vocale"
          >
            <span v-if="!listening">🔊</span>
            <span v-else>Seleziona testo...</span>
          </button>
        </div>
      </transition>
    </div>
  </div>
</template>

<script lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'

export default {
  name: 'HelpBubble',
  setup() {
    const isOpen = ref(false)
    const menuRef = ref<HTMLElement | null>(null)
    const listening = ref(false)
    let lastClickHandler: ((e: MouseEvent) => void) | null = null

    const toggleMenu = () => {
      isOpen.value = !isOpen.value
      if (!isOpen.value) listening.value = false
    }

    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.value && !menuRef.value.contains(event.target as Node)) {
        isOpen.value = false
        listening.value = false
      }
    }

    // Voice Reader logic
    const activateVoiceReader = () => {
      listening.value = true
      // Remove previous handler if any
      if (lastClickHandler) document.removeEventListener('click', lastClickHandler, true)
      lastClickHandler = (e: MouseEvent) => {
        if (!menuRef.value || menuRef.value.contains(e.target as Node)) return
        const el = e.target as HTMLElement
        let text = ''
        if (el.innerText) text = el.innerText
        else if (el.textContent) text = el.textContent || ''
        if (text.trim()) {
          window.speechSynthesis.cancel()
          const utter = new window.SpeechSynthesisUtterance(text)
          window.speechSynthesis.speak(utter)
        }
        listening.value = false
        document.removeEventListener('click', lastClickHandler!, true)
      }
      setTimeout(() => {
        document.addEventListener('click', lastClickHandler!, true)
      }, 0)
    }

    onMounted(() => {
      document.addEventListener('click', handleClickOutside)
    })

    onBeforeUnmount(() => {
      document.removeEventListener('click', handleClickOutside)
      if (lastClickHandler) document.removeEventListener('click', lastClickHandler, true)
    })

    return {
      isOpen,
      toggleMenu,
      menuRef,
      listening,
      activateVoiceReader,
    }
  },
}
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
