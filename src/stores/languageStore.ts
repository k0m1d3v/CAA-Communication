import { defineStore } from 'pinia';

export const useLanguageStore = defineStore('language', {
  state: () => ({
    language: 'en', // Default language
  }),
  actions: {
    setLanguage(newLanguage: string) {
      this.language = newLanguage;
    },
  },
});
