import { defineStore } from 'pinia'

export const usePictogramStore = defineStore('pictogramStore', {
  state: () => ({
    selectedPictograms: [] as string[], // Array to store selected pictogram IDs
  }),
  actions: {
    addPictogram(id: string) {
      if (!this.selectedPictograms.includes(id)) {
        this.selectedPictograms.push(id)
      }
    },
    removePictogram(id: string) {
      this.selectedPictograms = this.selectedPictograms.filter((pictogramId) => pictogramId !== id)
    },
    clearPictograms() {
      this.selectedPictograms = []
    },
  },
})
