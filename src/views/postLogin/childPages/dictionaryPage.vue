<template>
<BackHome />

<!-- Scaled container -->
<div class="transform scale-90 md:scale-100 flex flex-col items-center mt-10 space-y-6 sm:space-y-8">
<!-- SearchBar -->
<SearchBar
class="w-full max-w-xs sm:max-w-md md:max-w-lg lg:max-w-xl"
v-model="searchQuery"
:placeholder="t('dictionaryPage.searchPlaceholder')"
/>

<!-- Grid container -->
<div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-3 gap-6 px-4 w-full max-w-screen-lg mx-auto justify-center">
<!-- Responsive grid -->
<NavigationCard
v-for="pictogram in pictograms"
:key="pictogram._id"
:text="pictogram.keywords[0]?.keyword || t('dictionaryPage.noTitle')"
:icon="computedIconUrl(pictogram)"
class="h-52"
:card-height="'200px'"
:border-radius="'30px'"
:show-divider="true"
:addable="true"
@add="pictogramStore.addPictogram(pictogram._id)"
/>
</div>
</div>

<HelpNavigator />

<!-- Display selected pictograms -->
<div class="mt-6 bg-white rounded-xl shadow-md p-4 max-w-screen-lg mx-auto">
<h2 class="text-lg font-bold mb-4 text-center">
{{ t('dictionaryPage.SelectedPictogram') }}
</h2>
<div class="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 px-4">
<SelectedPictogram
v-for="id in pictogramStore.selectedPictograms"
:key="id"
:id="id"
:pictograms="pictograms"
@remove="removePictogram(id)"
/>
</div>

<!-- Buttons for save and clear -->
<div class="flex justify-center mt-4 space-x-4">
<button
class="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
@click="savePhrase"
>
+
</button>
<button
class="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
@click="clearSelectedPictograms"
>
{{ t('dictionaryPage.clearButton') }}
</button>
</div>
</div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useAuthStore } from '@/stores/authStore'
import { useLanguageStore } from '@/stores/languageStore'
import { usePictogramStore } from '@/stores/pictogramStore'
import BackHome from '@/components/backHome.vue'
import HelpNavigator from '@/components/helpNavigator.vue'
import SearchBar from '@/components/searchBar.vue'
import NavigationCard from '@/components/navigationCard.vue'
import SelectedPictogram from '@/components/selectedPictogram.vue'

interface Pictogram {
_id: string
keywords: { keyword: string }[]
}

const authStore = useAuthStore()
const languageStore = useLanguageStore()
const pictogramStore = usePictogramStore()
const router = useRouter()
const { t } = useI18n()

const searchQuery = ref('')
const pictograms = ref<Pictogram[]>([])
const debounceTimeout = ref<number | null>(null)

// Costruisce l’URL dell’icona
const computedIconUrl = (p: Pictogram) =>
p._id
? `https://static.arasaac.org/pictograms/${p._id}/${p._id}_300.png`
: 'https://via.placeholder.com/300'

// Fetch API
const fetchPictograms = async (query: string) => {
try {
const lang = languageStore.language
const res = await fetch(`https://api.arasaac.org/v1/pictograms/${lang}/bestsearch/${query}`)
if (!res.ok) throw new Error('Fetch error')
pictograms.value = (await res.json()) as Pictogram[]
} catch (e) {
console.error(e)
}
}

// Debounce search
watch(searchQuery, q => {
if (debounceTimeout.value) clearTimeout(debounceTimeout.value)
if (q.trim()) {
debounceTimeout.value = window.setTimeout(() => fetchPictograms(q), 300)
} else {
pictograms.value = []
}
})

// Rimuovi singolo
const removePictogram = (id: string) => {
pictogramStore.removePictogram(id)
}

// Clear all
const clearSelectedPictograms = () => {
pictogramStore.clearPictograms()
}

// Salva con prompt per il nome
const savePhrase = () => {
const name = window.prompt(t('dictionaryPage.enterPhraseNamePrompt'), '')
if (name && name.trim()) {
pictogramStore.saveCurrentPhrase(name.trim())
}
}

// Auth redirect
onMounted(() => {
authStore.initializeStore()
watch(
() => authStore.isLoading,
loading => {
if (!loading && !authStore.user) router.push('/login')
},
{ immediate: true }
)
})
</script>
