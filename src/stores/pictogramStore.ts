import { defineStore } from 'pinia'
import { useBackupStore } from './backupStore'

export const usePictogramStore = defineStore('pictogramStore', {
  state: () => ({
    selectedPictograms: [] as string[],
    savedPhrases: [] as Array<{ name: string; pictogramIds: string[] }>,
  }),

  actions: {
    // 1. Aggiunge un pittogramma alla selezione
    addPictogram(id: string) {
      const stringId = String(id)
      if (!this.selectedPictograms.includes(stringId)) {
        this.selectedPictograms.push(stringId)
      }
    },

    // 2. Rimuove un pittogramma dalla selezione
    removePictogram(id: string) {
      const stringId = String(id)
      this.selectedPictograms = this.selectedPictograms.filter(
        (pictogramId) => pictogramId !== stringId,
      )
    },

    // 3. Svuota la selezione
    clearPictograms() {
      this.selectedPictograms = []
    },

    // 4. Salva la frase corrente con un nome personalizzato (con backup automatico)
    async saveCurrentPhrase(name: string) {
      const trimmed = name.trim()
      if (!trimmed) return

      const newPhrase = {
        id: `phrase_${Date.now()}`,
        name: trimmed,
        pictogramIds: [...this.selectedPictograms],
        createdAt: new Date(),
        useCount: 0,
      }

      this.savedPhrases.push(newPhrase)
      this.selectedPictograms = []

      // Backup automatico su cloud
      try {
        const backupStore = useBackupStore()
        await backupStore.savePhraseToCloud(newPhrase)
      } catch (error) {
        console.warn('Backup cloud fallito, salvato localmente:', error)
      }
    },

    // 5. Rimuove un'intera frase salvata
    removePhrase(name: string) {
      this.savedPhrases = this.savedPhrases.filter((p) => p.name !== name)
    },

    // 6. Rinomina una frase salvata
    renamePhrase(oldName: string, newName: string) {
      const trimmed = newName.trim()
      if (!trimmed) return
      const phrase = this.savedPhrases.find((p) => p.name === oldName)
      if (phrase) phrase.name = trimmed
    },
  },
})
