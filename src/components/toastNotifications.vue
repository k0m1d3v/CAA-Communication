<script setup lang="ts">
import { ref } from 'vue'

export interface Toast {
  id: string
  message: string
  type: 'success' | 'error' | 'warning' | 'info'
  duration?: number
  persistent?: boolean
}

const toasts = ref<Toast[]>([])
let idCounter = 0

const addToast = (toast: Omit<Toast, 'id'>) => {
  const id = `toast-${++idCounter}`
  const newToast: Toast = {
    id,
    duration: 6000, // slow readers need more than 4s to read and react
    ...toast,
  }

  toasts.value.push(newToast)

  if (!newToast.persistent && newToast.duration) {
    setTimeout(() => {
      removeToast(id)
    }, newToast.duration)
  }

  return id
}

const removeToast = (id: string) => {
  const index = toasts.value.findIndex((toast) => toast.id === id)
  if (index > -1) {
    toasts.value.splice(index, 1)
  }
}

const clearAll = () => {
  toasts.value = []
}

const getToastClass = (type: Toast['type']) => {
  const baseClass = 'toast'
  switch (type) {
    case 'success':
      return `${baseClass} toast-success`
    case 'error':
      return `${baseClass} toast-error`
    case 'warning':
      return `${baseClass} toast-warning`
    case 'info':
    default:
      return `${baseClass} toast-info`
  }
}

const getToastIcon = (type: Toast['type']) => {
  switch (type) {
    case 'success':
      return '✅'
    case 'error':
      return '❌'
    case 'warning':
      return '⚠️'
    case 'info':
    default:
      return 'ℹ️'
  }
}

// Expose methods for external use
defineExpose({
  addToast,
  removeToast,
  clearAll,
})

// Global toast functionality
if (typeof window !== 'undefined') {
  interface WindowWithToast extends Window {
    showToast?: (toast: Omit<Toast, 'id'>) => string
  }
  ;(window as WindowWithToast).showToast = addToast
}
</script>

<template>
  <teleport to="body">
    <div class="toast-container">
      <transition-group name="toast" tag="div" class="toast-wrapper">
        <div
          v-for="toast in toasts"
          :key="toast.id"
          :class="getToastClass(toast.type)"
          role="alert"
          :aria-live="toast.type === 'error' ? 'assertive' : 'polite'"
        >
          <div class="toast-content">
            <span class="toast-icon">{{ getToastIcon(toast.type) }}</span>
            <span class="toast-message">{{ toast.message }}</span>
          </div>

          <button
            @click="removeToast(toast.id)"
            class="toast-close"
            :aria-label="'Chiudi notifica'"
          >
            ✕
          </button>
        </div>
      </transition-group>
    </div>
  </teleport>
</template>

<style scoped>
.toast-container {
  position: fixed;
  top: 1rem;
  right: 1rem;
  z-index: 9999;
  pointer-events: none;
}

.toast-wrapper {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  max-width: 400px;
}

.toast {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: var(--space-2);
  padding: var(--space-4);
  border-radius: var(--radius-md);
  border: var(--border-w) solid var(--border);
  border-left-width: 8px;
  background: var(--surface);
  color: var(--ink);
  font-weight: 700;
  pointer-events: auto;
  max-width: 100%;
  word-wrap: break-word;
}

.toast-success {
  border-left-color: var(--success);
}

.toast-error {
  border-left-color: var(--danger);
}

.toast-warning {
  border-left-color: var(--warning);
}

.toast-info {
  border-left-color: var(--action);
}

.toast-content {
  display: flex;
  align-items: center;
  gap: 0.75rem;
  flex: 1;
  min-width: 0;
}

.toast-icon {
  font-size: 1.25rem;
  flex-shrink: 0;
}

.toast-message {
  line-height: 1.4;
  word-break: break-word;
}

.toast-close {
  background: var(--surface-sunken);
  border: var(--border-w) solid var(--border);
  color: var(--ink);
  width: var(--target-min);
  height: var(--target-min);
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  flex-shrink: 0;
}

/* Animations: opacity only, per the app's motion policy */
.toast-enter-active,
.toast-leave-active {
  transition: opacity var(--motion-fast);
}

.toast-enter-from,
.toast-leave-to {
  opacity: 0;
}

/* Responsive Design */
@media (max-width: 768px) {
  .toast-container {
    top: 0.5rem;
    right: 0.5rem;
    left: 0.5rem;
  }

  .toast-wrapper {
    max-width: none;
  }
}
</style>
