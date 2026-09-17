import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToastNotifications from './toastNotifications.vue'

describe('toastNotifications', () => {
  it('renders a toast pushed via addToast and removes it via removeToast', async () => {
    const wrapper = mount(ToastNotifications)
    const vm = wrapper.vm as unknown as {
      addToast: (t: { message: string; type: 'info' }) => string
      removeToast: (id: string) => void
    }

    // The toast list is rendered via <teleport to="body">, so it lands
    // outside wrapper.element — assert against the real document body.
    const id = vm.addToast({ message: 'Ciao mondo', type: 'info' })
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).toContain('Ciao mondo')

    vm.removeToast(id)
    await wrapper.vm.$nextTick()

    expect(document.body.textContent).not.toContain('Ciao mondo')
  })

  it('exposes addToast globally as window.showToast once mounted', () => {
    mount(ToastNotifications)
    const globalToast = (window as unknown as { showToast?: unknown }).showToast
    expect(typeof globalToast).toBe('function')
  })
})
