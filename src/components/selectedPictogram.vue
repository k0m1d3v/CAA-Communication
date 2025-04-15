<template>
  <div class="flex flex-col items-center gap-2 relative">
    <NavigationCard
      :icon="icon"
      :text="text"
      class="h-40"
      :card-height="'120px'"
      :card-width="'160px'"
      :border-radius="'20px'"
      :show-divider="false"
      :addable="false"
    />
    <button
      class="absolute top-0 right-0 w-6 h-6 flex items-center justify-center bg-red-500 text-white rounded-full text-sm font-bold hover:bg-red-600"
      @click="removePictogram"
      aria-label="Remove pictogram"
    >
      ×
    </button>
  </div>
</template>

<script setup lang="ts">
import NavigationCard from './navigationCard.vue'
import { computed } from 'vue'

// Define the Pictogram interface
interface Pictogram {
  _id: string
  keywords: {
    keyword: string
  }[]
}

// Props with explicit types
const props = defineProps<{
  id: string
  pictograms: Pictogram[]
}>()

const emit = defineEmits(['remove'])

// Computed properties
const icon = computed(() => {
  if (!props.id) {
    return 'https://dummyimage.com/300x300/cccccc/000000&text=No+Image'
  }
  return `https://static.arasaac.org/pictograms/${props.id}/${props.id}_300.png`
})

const text = computed(() => {
  if (!props.pictograms || props.pictograms.length === 0) {
    return ''
  }
  const pictogram = props.pictograms.find((p) => p._id === props.id)
  return pictogram?.keywords[0]?.keyword || ''
})

const removePictogram = () => {
  console.log('Emitting remove event with id:', props.id) // Debug log
  emit('remove', props.id)
}
</script>
