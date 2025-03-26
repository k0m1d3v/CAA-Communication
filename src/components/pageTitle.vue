<template>
  <div class="page-title">
    <h1>{{ title }}</h1>
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

<style scoped>
.page-title {
  text-align: center;
  margin-top: 20px;
}

h1 {
  font-size: 4rem;
  font-weight: bold;
  color: #000000;
}
</style>
