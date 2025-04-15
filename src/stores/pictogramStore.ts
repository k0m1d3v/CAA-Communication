import { defineStore } from 'pinia'

export const usePictogramStore = defineStore('pictogramStore', {
  state: () => ({
    selectedPictograms: [] as string[], // Use a plain array for reactivity
  }),
  actions: {
    addPictogram(id: string) {
      if (!this.selectedPictograms.includes(id)) {
        this.selectedPictograms.push(id)
      }
    },
    removePictogram(id: string) {
      console.log('removePictogram called with id:', id) // Debug log
      console.log('Before removal:', this.selectedPictograms) // Debug log
      const index = this.selectedPictograms.indexOf(id)
      if (index > -1) {
        this.selectedPictograms.splice(index, 1) // Use splice to modify the array
      }
      console.log('After removal:', this.selectedPictograms) // Debug log
    },
    clearPictograms() {
      this.selectedPictograms = [] // Reset the array
    },
  },
})
