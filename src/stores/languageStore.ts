import { defineStore } from 'pinia';
import i18n from '@/i18n';

type SupportedLanguage = 'en' | 'it';

// Ensure language from localStorage is valid
function getInitialLanguage(): SupportedLanguage {
  const stored = localStorage.getItem('language');
  return stored === 'en' || stored === 'it' ? stored : 'en';
}

export const useLanguageStore = defineStore('language', {
  state: () => ({
    language: getInitialLanguage(),
  }),
  actions: {
    setLanguage(newLanguage: SupportedLanguage) {
      this.language = newLanguage;
      // Set both locale and global locale to ensure reactivity
      if (i18n.global) {
        i18n.global.locale = newLanguage;
      }
      // Store preference for next visit
      localStorage.setItem('language', newLanguage);
    },
  },
});
