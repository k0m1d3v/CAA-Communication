export type ToastType = 'success' | 'error' | 'warning' | 'info'

interface WindowWithToast extends Window {
  showToast?: (toast: { message: string; type: ToastType; duration?: number }) => string
}

// Thin wrapper around the global `showToast` that `toastNotifications.vue`
// exposes once mounted. Safe to call before the component mounts (e.g. from
// a Pinia store) or outside the browser (SSR/tests) — it just no-ops.
export function notify(message: string, type: ToastType = 'info') {
  ;(window as unknown as WindowWithToast).showToast?.({ message, type })
}
