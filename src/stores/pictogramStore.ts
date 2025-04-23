import { defineStore } from 'pinia'

export const usePictogramStore = defineStore('pictogramStore', {
  state: () => ({
    selectedPictograms: [] as string[], // Rimaniamo con le stringhe
  }),
  actions: {
    addPictogram(id: string) {
      const stringId = String(id)
      if (!this.selectedPictograms.includes(stringId)) {
        this.selectedPictograms.push(stringId)
      }
    },
    removePictogram(id: string) {
      console.log('removePictogram called with id:', id)
      console.log('Before removal:', this.selectedPictograms)

      const stringId = String(id)
      this.selectedPictograms = this.selectedPictograms.filter(
        (pictogramId) => pictogramId !== stringId
      )

      console.log('After removal:', this.selectedPictograms)
    },
    clearPictograms() {
      this.selectedPictograms = []
    },
  },
})
