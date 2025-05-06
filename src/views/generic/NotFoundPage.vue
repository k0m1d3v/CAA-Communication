
<script lang="ts">
  import { useI18n } from 'vue-i18n';

  export default {
    name: 'NotFoundPage',
    setup() {
      const { t } = useI18n();
      return { t };
    },
  };
</script>

<template>
  <div class="flex flex-col justify-center items-center h-screen text-center text-gray-800">
    <h1 class="text-4xl font-bold mb-4">{{ t('notFound')}}</h1>
    <p class="text-lg mb-6">{{t('notFoundSubtitle')}}</p>
    <router-link
      to="/"
      class="text-blue-500 border border-blue-500 px-4 py-2 rounded hover:bg-blue-500 hover:text-white transition"
    >
      {{t('goHome')}}
    </router-link>
  </div>

</template>

