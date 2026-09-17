<template>
  <div class="search-bar">
    <label class="search-label" :for="inputId">{{ t('dictionaryPage.searchLabel') }}</label>
    <div class="search-field">
      <input
        :id="inputId"
        type="text"
        :value="modelValue"
        @input="updateValue(($event.target as HTMLInputElement).value)"
        :placeholder="t('dictionaryPage.searchPlaceholder')"
        class="search-input"
      />
      <button
        v-if="modelValue"
        type="button"
        @click="clearSearch"
        class="btn-secondary search-clear"
      >
        {{ t('dictionaryPage.clearSearch') }}
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useId } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()
const inputId = useId()

defineProps({
  modelValue: {
    type: String,
    required: true,
  },
})

const emit = defineEmits(['update:modelValue'])

function updateValue(value: string) {
  emit('update:modelValue', value)
}

function clearSearch() {
  emit('update:modelValue', '')
}
</script>

<style scoped>
.search-bar {
  width: 100%;
  max-width: 28rem;
  margin: 0 auto;
}

.search-label {
  display: block;
  font-weight: 700;
  color: var(--ink);
  margin-bottom: var(--space-2);
}

.search-field {
  display: flex;
  gap: var(--space-2);
  align-items: center;
}

.search-input {
  flex: 1;
  min-height: var(--target);
  padding: 0 var(--space-4);
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius-sm);
  background: var(--surface);
  color: var(--ink);
  font: inherit;
  font-size: var(--text-body);
}

.search-clear {
  flex-shrink: 0;
}
</style>
