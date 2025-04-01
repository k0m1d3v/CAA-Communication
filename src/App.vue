<script setup lang="ts">
import { RouterView } from 'vue-router'
import './assets/main.css'
import LanguageSwitch from '@/components/languageSwitch.vue';
</script>

<template>
  <div id="app">
    <RouterView />
    <language-switch />
  </div>
</template>

<style scoped></style>
