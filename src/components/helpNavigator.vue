<template>
  <div
    class="fixed bottom-4 right-4 flex flex-col items-center justify-center w-24 h-24 rounded-full bg-transparent text-black cursor-pointer text-center border border-black hover:bg-blue-700"
    @click="navigateToHelp"
  >
    <img src="@/assets/icons/helpIcon.png" alt="Help Icon" class="w-10 h-10" />
    <span class="text-sm mt-1 font-bold">Aiuto</span>
  </div>
</template>

<script lang="ts">
export default {
  name: 'HelpNavigator',
  methods: {
    navigateToHelp() {
      this.$router.push('/help')
    },
  },
}
</script>
