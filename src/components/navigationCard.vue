<template>
  <div class="flex justify-center w-[30vh]">
    <div class="flex flex-wrap justify-center items-center gap-4">
      <div
        class="flex flex-col items-center justify-between cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105 border border-black"
        :style="{
          backgroundColor: color,
          width: cardWidth,
          height: cardHeight,
          borderRadius: borderRadius,
          boxShadow: '0 4px 10px rgba(0, 0, 0, 0.2)', // Ombra leggera di default

        }"
        @click="navigate"
      >
        <div class="text-center text-3xl font-bold text-black mt-4">
          {{ text }}
        </div>

        <div v-if="showDivider" class="w-full h-px bg-black"></div>

        <!-- Image Section -->
        <div class="mt-4 flex items-center gap-2">
          <slot name="icon">
            <img
              :src="resolvedIcon"
              alt="Navigation Icon"
              class="w-20 h-20"
              @error="handleImageError"
            />
          </slot>

          <div v-if="resolvedAdditionalIcons.length" class="flex gap-2">
            <img
              v-for="(icon, index) in resolvedAdditionalIcons"
              :key="index"
              :src="icon"
              alt="Additional Icon"
              class="w-20 h-20"
              @error="handleImageError"
            />
          </div>
        </div>

        <!-- Plus Button -->
        <button
          v-if="addable"
          class="mt-2 px-4 py-2 bg-blue-500 text-white rounded"
          @click.stop="handleAdd"
        >
          +
        </button>

        <div class="mb-4"></div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NavigationCard',
  props: {
    text: {
      type: String,
      required: false,
    },
    icon: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: false,
    },
    color: {
      type: String,
      required: false,
      default: '#ffffff',
    },
    cardWidth: {
      type: String,
      required: false,
      default: '17rem',
    },
    cardHeight: {
      type: String,
      required: false,
      default: '20rem',
    },
    borderRadius: {
      type: String,
      required: false,
      default: '3rem',
    },
    additionalIcons: {
      type: Array,
      required: false,
      default: () => [],
    },
    showDivider: {
      type: Boolean,
      required: false,
      default: true, // Divider is shown by default
    },
    addable: {
      type: Boolean,
      required: false,
      default: false, // Determines if the "plus" button is shown
    },
    id: {
      type: String,
      required: false,
    },
  },
  computed: {
    resolvedIcon() {
      // If the icon is a full URL, use it directly; otherwise, resolve local asset
      return this.icon.startsWith('http')
        ? this.icon
        : new URL(`../assets/icons/${this.icon}`, import.meta.url).href
    },
    resolvedAdditionalIcons() {
      // Ensure valid URLs are resolved for additional icons
      return this.additionalIcons.map((icon) => {
        try {
          const iconStr = icon as string
          return iconStr.startsWith('http')
            ? iconStr
            : new URL(`../assets/icons/${iconStr}`, import.meta.url).href
        } catch {
          console.error(`Invalid icon path: ${icon}`)
          return ''
        }
      })
    },
  },
  methods: {
    navigate() {
      if (this.route) {
        this.$router.push(this.route)
      }
    },
    handleImageError(event: Event) {
      console.warn('Image failed to load:', (event.target as HTMLImageElement).src)
      ;(event.target as HTMLImageElement).src = 'https://via.placeholder.com/300' // Fallback image
    },
    handleAdd() {
      this.$emit('add', this.id) // Ora passa l'ID corretto
    },
  },
}
</script>
