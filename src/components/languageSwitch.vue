<template>
  <div class="flex items-center space-x-4 fixed top-4 right-5 z-50">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      class="w-6 h-6"
      :class="{'opacity-40': language !== 'en', 'opacity-100': language === 'en'}"
    >
      <rect width="640" height="480" fill="#b22234" />
      <path fill="#fff" d="M0 37.5h640v37.5H0zM0 112.5h640v37.5H0zM0 187.5h640v37.5H0zM0 262.5h640v37.5H0zM0 337.5h640v37.5H0zM0 412.5h640v37.5H0z" />
      <path fill="#3c3b6e" d="M0 0h280v210H0z" />
      <g fill="#fff">
        <!-- Stars omitted for brevity -->
      </g>
    </svg>
    <button
      @click="toggleLanguage"
      class="relative w-14 h-8 bg-blue-200 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-400 transition"
    >
      <span
        :class="{
          'translate-x-6 bg-blue-600': language === 'it',
          'translate-x-1 bg-blue-400': language === 'en'
        }"
        class="absolute top-1 left-1 w-6 h-6 rounded-full transform transition"
      ></span>
    </button>
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 640 480"
      class="w-6 h-6"
      :class="{'opacity-40': language !== 'it', 'opacity-100': language === 'it'}"
    >
      <g fill-rule="evenodd" stroke-width="1pt">
        <path fill="#fff" d="M0 0h640v480H0z" />
        <path fill="#009246" d="M0 0h213.33v480H0z" />
        <path fill="#ce2b37" d="M426.67 0H640v480H426.67z" />
      </g>
    </svg>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue';
import { useLanguageStore } from '@/stores/languageStore';

export default {
  setup() {
    const languageStore = useLanguageStore();
    const language = computed(() => languageStore.language);

    const toggleLanguage = () => {
      languageStore.setLanguage(language.value === 'en' ? 'it' : 'en');
    };

    return {
      language,
      toggleLanguage,
    };
  },
};
</script>

<style scoped>
/* Add any additional styles if needed */
</style>
