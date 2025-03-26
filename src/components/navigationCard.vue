<template>
  <div class="flex justify-center w-[30vh]">
    <div class="flex flex-wrap justify-center items-center gap-4">
      <div
        class="flex flex-col items-center justify-center rounded-3xl cursor-pointer hover:shadow-2xl transition-transform transform hover:scale-105"
        :style="{ backgroundColor: color, width: cardWidth, height: cardHeight }"
        @click="navigate"
      >
        <div class="text-center text-3xl font-bold text-black relative -top-18">
          {{ text }}
        </div>
        <div class="w-full h-px bg-black relative -top-12"></div>
        <div class="mt-4">
          <slot name="icon">
            <img :src="resolvedIcon" alt="Navigation Icon" class="w-20 h-20" />
          </slot>
        </div>
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
      required: true,
    },
    icon: {
      type: String,
      required: true,
    },
    route: {
      type: String,
      required: true,
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
  },
  computed: {
    resolvedIcon() {
      return this.icon ? new URL(`../assets/icons/${this.icon}`, import.meta.url).href : ''
    },
  },
  methods: {
    navigate() {
      this.$router.push(this.route)
    },
  },
}
</script>
