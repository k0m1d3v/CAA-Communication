<script setup lang="ts">
import { RouterView } from 'vue-router'
import HelpNavigator from './components/helpNavigator.vue'
import ToastNotifications from './components/toastNotifications.vue'
import './assets/main.css'
import './assets/accessibility.css'
</script>

<template>
  <div id="app">
    <RouterView />

    <!-- Global components -->
    <HelpNavigator />
    <ToastNotifications />
  </div>
</template>

<style scoped></style>
