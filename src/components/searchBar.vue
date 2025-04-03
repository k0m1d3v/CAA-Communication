<template>
  <div class="w-full max-w-md mx-auto">
    <div class="relative">
      <input
        type="text"
        :value="modelValue"
        @input="updateValue(($event.target as HTMLInputElement).value)"
        placeholder="Search..."
        class="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />
      <button
        v-if="modelValue"
        @click="clearSearch"
        class="absolute right-2 top-2 text-gray-500 hover:text-gray-700 focus:outline-none"
      >
        ✕
      </button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { defineProps, defineEmits } from 'vue'

// Props e eventi
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
