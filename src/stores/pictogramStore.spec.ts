import { describe, it, expect, beforeEach, vi } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'

// pictogramStore pulls in backupStore -> firebaseConfig, which calls the
// real Firebase SDK at import time. Stub it out so tests never touch the
// network and stay fast/deterministic.
vi.mock('../firebaseConfig', () => ({
  auth: { currentUser: null },
  db: {},
}))

import { usePictogramStore } from './pictogramStore'

describe('pictogramStore', () => {
  beforeEach(() => {
    setActivePinia(createPinia())
  })

  it('adds a pictogram to the selection', () => {
    const store = usePictogramStore()
    store.addPictogram('123')
    expect(store.selectedPictograms).toEqual(['123'])
  })

  it('does not add duplicate pictograms', () => {
    const store = usePictogramStore()
    store.addPictogram('123')
    store.addPictogram('123')
    expect(store.selectedPictograms).toEqual(['123'])
  })

  it('removes a pictogram from the selection', () => {
    const store = usePictogramStore()
    store.addPictogram('123')
    store.addPictogram('456')
    store.removePictogram('123')
    expect(store.selectedPictograms).toEqual(['456'])
  })

  it('clears the whole selection', () => {
    const store = usePictogramStore()
    store.addPictogram('123')
    store.addPictogram('456')
    store.clearPictograms()
    expect(store.selectedPictograms).toEqual([])
  })

  it('saves the current selection as a named phrase and clears it', async () => {
    const store = usePictogramStore()
    store.addPictogram('123')
    store.addPictogram('456')

    await store.saveCurrentPhrase('  Hello  ')

    expect(store.selectedPictograms).toEqual([])
    expect(store.savedPhrases).toHaveLength(1)
    expect(store.savedPhrases[0]).toMatchObject({
      name: 'Hello',
      pictogramIds: ['123', '456'],
    })
  })

  it('does not save a phrase with a blank name', async () => {
    const store = usePictogramStore()
    store.addPictogram('123')

    await store.saveCurrentPhrase('   ')

    expect(store.savedPhrases).toHaveLength(0)
    expect(store.selectedPictograms).toEqual(['123'])
  })

  it('removes a saved phrase by name', () => {
    const store = usePictogramStore()
    store.savedPhrases.push({ name: 'Ciao', pictogramIds: ['1'] })
    store.removePhrase('Ciao')
    expect(store.savedPhrases).toHaveLength(0)
  })

  it('renames a saved phrase', () => {
    const store = usePictogramStore()
    store.savedPhrases.push({ name: 'Old', pictogramIds: ['1'] })
    store.renamePhrase('Old', 'New')
    expect(store.savedPhrases[0].name).toBe('New')
  })
})
