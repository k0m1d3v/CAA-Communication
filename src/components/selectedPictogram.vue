<template>
  <div class="selected-pictogram">
    <div class="pictogram-tile selected-pictogram-tile">
      <img :src="icon" alt="" class="selected-pictogram-img" @error="onImgError" />
      <span class="selected-pictogram-label">{{ text }}</span>
    </div>
    <button type="button" class="btn-danger selected-pictogram-remove" @click="removePictogram">
      {{ t('common.removePictogram') }}
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import fallbackIcon from '../assets/icons/undefined.png'

const { t } = useI18n()

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
    return fallbackIcon
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

const onImgError = (event: Event) => {
  ;(event.target as HTMLImageElement).src = fallbackIcon
}

const removePictogram = () => {
  emit('remove', props.id)
}
</script>

<style scoped>
.selected-pictogram {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: var(--space-1);
  width: 104px;
}

.selected-pictogram-tile {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: var(--space-1);
  padding: var(--space-1);
  width: 100%;
}

.selected-pictogram-img {
  width: 84px;
  height: 74px;
  object-fit: contain;
}

.selected-pictogram-label {
  font-size: var(--text-label);
  font-weight: 700;
  color: var(--ink);
  text-align: center;
}

.selected-pictogram-remove {
  width: 100%;
  min-height: var(--target-min);
  padding: 0 var(--space-2);
  font-size: var(--text-label);
}
</style>
