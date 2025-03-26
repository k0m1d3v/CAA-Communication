<template>
  <button
    @click="goHome"
    class="fixed top-5 left-5 z-50 p-2 flex items-center justify-center cursor-pointer hover:scale-110 transition-transform duration-300"
    aria-label="Go to Home"
  >
    <img src="@/assets/icons/homeIcon.png" alt="Home Icon" class="w-15 h-15" />
  </button>
</template>

<script lang="ts">
export default {
  name: 'BackHome',
  methods: {
    goHome() {
      this.$router.push('/home')
    },
  },
}
</script>
