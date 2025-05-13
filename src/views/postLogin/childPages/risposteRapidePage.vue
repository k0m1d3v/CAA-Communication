<template>
<BackHome />

<div class="mt-10 flex flex-col items-center space-y-6 sm:space-y-8">
<h2 class="text-2xl font-bold mb-4 text-center text-gray-800">
Frasi salvate
</h2>

<!-- Frasi salvate -->
<div
v-if="savedPhrases.length > 0"
class="flex flex-col gap-6 px-4 w-full max-w-screen-lg mx-auto"
>
<div
v-for="phrase in savedPhrases"
:key="phrase.name"
class="bg-white rounded-xl shadow-lg hover:shadow-2xl transition-shadow p-4 space-y-4"
>
<h3 class="font-semibold text-center text-lg text-gray-800">
{{ phrase.name }}
</h3>

<!-- Pittogrammi in linea -->
<div class="flex overflow-x-auto gap-4 px-2 py-2">
<SelectedPictogram
v-for="id in phrase.pictogramIds"
:key="id"
:id="id"
:pictograms="pictograms"
@remove="removePhrase(phrase.name)"
/>
</div>

<!-- Pulsanti -->
<div class="flex justify-between mt-4">
<button
class="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600"
@click="removePhrase(phrase.name)"
>
Elimina
</button>
<button
class="bg-yellow-500 text-white px-4 py-2 rounded-md hover:bg-yellow-600"
@click="promptRename(phrase.name)"
>
Modifica
</button>
</div>
</div>
</div>

<!-- Messaggio se non ci sono frasi -->
<div v-else class="text-center text-gray-500">
<p>{{ t('savedPhrasesPage.noSavedPhrases') }}</p>
</div>
</div>

<HelpNavigator />
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { usePictogramStore } from '@/stores/pictogramStore'
import { useI18n } from 'vue-i18n'
import BackHome from '@/components/backHome.vue'
import SelectedPictogram from '@/components/selectedPictogram.vue'
import HelpNavigator from '@/components/helpNavigator.vue'

const pictogramStore = usePictogramStore()
const { t } = useI18n()

const savedPhrases = computed(() => pictogramStore.savedPhrases)
const pictograms = computed(() => pictogramStore.pictograms)

// Rimuovi frase
const removePhrase = (name: string) => {
pictogramStore.removePhrase(name)
}

// Rinomina frase
const promptRename = (oldName: string) => {
const newName = window.prompt('Inserisci il nuovo nome', oldName)
if (newName && newName.trim()) {
pictogramStore.renamePhrase(oldName, newName.trim())
}
}
</script>
