<template>
  <div class="flex flex-col justify-center items-center h-screen text-center text-gray-800">
    <h1 class="text-4xl font-bold mb-4">404 - Page Not Found</h1>
    <p class="text-lg mb-6">The page you are looking for does not exist.</p>
    <router-link
      to="/"
      class="text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition"
    >
      Go back to the homepage
    </router-link>
  </div>
</template>

<script lang="ts">
export default {
  name: 'NotFoundPage',
}
</script>
