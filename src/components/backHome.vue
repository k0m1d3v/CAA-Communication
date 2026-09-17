<template>
  <button type="button" class="back-home-btn" :aria-label="t('common.home')" @click="handleClick">
    <img src="@/assets/icons/homeIcon.png" alt="" class="back-home-icon" />
    <span>{{ t('common.home') }}</span>
  </button>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n()
const router = useRouter()

const emit = defineEmits(['before-home'])

const handleClick = () => {
  emit('before-home')
  router.push('/home')
}
</script>

<style scoped>
.back-home-btn {
  position: fixed;
  top: var(--space-4);
  left: var(--space-4);
  z-index: 50;
  min-height: var(--target);
  padding: 0 var(--space-4);
  background: var(--surface);
  border: var(--border-w) solid var(--border);
  border-radius: var(--radius-sm);
  font-weight: 700;
}

.back-home-icon {
  width: 28px;
  height: 28px;
}
</style>
