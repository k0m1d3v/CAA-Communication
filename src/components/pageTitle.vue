<template>
  <div class="text-center mt-5">
    <h1 class="text-display font-bold text-ink cursor-default">{{ title }}</h1>
  </div>
</template>

<script lang="ts">
export default {
  name: 'PageTitle',
  props: {
    title: {
      type: String,
      required: true,
    },
  },
}
</script>
