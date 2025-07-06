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
    duration: 4000,
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
  padding: 1rem 1.25rem;
  border-radius: 12px;
  box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  color: white;
  font-weight: 500;
  pointer-events: auto;
  transition: all 0.3s ease;
  max-width: 100%;
  word-wrap: break-word;
}

.toast:hover {
  transform: translateX(-5px);
  box-shadow: 0 15px 35px rgba(0, 0, 0, 0.15);
}

.toast-success {
  background: linear-gradient(135deg, #10b981 0%, #059669 100%);
}

.toast-error {
  background: linear-gradient(135deg, #ef4444 0%, #dc2626 100%);
}

.toast-warning {
  background: linear-gradient(135deg, #f59e0b 0%, #d97706 100%);
}

.toast-info {
  background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%);
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
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: white;
  width: 1.5rem;
  height: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.875rem;
  transition: all 0.2s ease;
  flex-shrink: 0;
  margin-left: 0.5rem;
}

.toast-close:hover {
  background: rgba(255, 255, 255, 0.3);
  transform: scale(1.1);
}

/* Animations */
.toast-enter-active,
.toast-leave-active {
  transition: all 0.3s ease;
}

.toast-enter-from {
  opacity: 0;
  transform: translateX(100%);
}

.toast-leave-to {
  opacity: 0;
  transform: translateX(100%);
}

.toast-move {
  transition: transform 0.3s ease;
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

  .toast {
    padding: 0.875rem 1rem;
    font-size: 0.9rem;
  }

  .toast-icon {
    font-size: 1.125rem;
  }
}

/* Dark mode support */
@media (prefers-color-scheme: dark) {
  .toast {
    backdrop-filter: blur(15px);
    border-color: rgba(255, 255, 255, 0.1);
  }
}

/* High contrast mode support */
@media (prefers-contrast: high) {
  .toast {
    border-width: 2px;
    font-weight: 600;
  }
}

/* Reduced motion support */
@media (prefers-reduced-motion: reduce) {
  .toast-enter-active,
  .toast-leave-active,
  .toast-move {
    transition: none;
  }

  .toast:hover {
    transform: none;
  }

  .toast-close:hover {
    transform: none;
  }
}
</style>
