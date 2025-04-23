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
        class="absolute right-2 top-1/2 -translate-y-1/2 text-gray-500 hover:text-red-500 hover:scale-110 transform focus:outline-none transition-transform duration-200"
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
