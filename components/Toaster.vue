<script setup>
import { ref, onMounted } from 'vue'
import { setToastHandler } from '~/composables/useToast'

const toasts = ref([])
let toastId = 0

const addToast = (message, options = {}) => {
  const id = ++toastId
  const toast = {
    id,
    message,
    type: options.type || 'info',
    duration: options.duration || 3000,
  }
  toasts.value.push(toast)

  if (toast.duration > 0) {
    setTimeout(() => {
      removeToast(id)
    }, toast.duration)
  }
  return id
}

const removeToast = (id) => {
  toasts.value = toasts.value.filter(t => t.id !== id)
}

onMounted(() => {
  setToastHandler((message, options) => {
    addToast(message, options)
  })
})

const getIcon = (type) => {
  switch (type) {
    case 'success':
      return `<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>`
    case 'error':
      return `<circle cx="12" cy="12" r="10"/><line x1="12" y1="8" x2="12" y2="12"/><line x1="12" y1="16" x2="12.01" y2="16"/>`
    case 'warning':
      return `<path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"/><line x1="12" y1="9" x2="12" y2="13"/><line x1="12" y1="17" x2="12.01" y2="17"/>`
    default:
      return `<circle cx="12" cy="12" r="10"/><line x1="12" y1="16" x2="12" y2="12"/><line x1="12" y1="8" x2="12.01" y2="8"/>`
  }
}
</script>

<template>
  <Teleport to="body">
    <div class="fixed top-0 inset-x-0 z-[100] flex flex-col items-center pointer-events-none p-4 gap-2">
      <TransitionGroup
        enter-active-class="transition ease-out duration-300"
        enter-from-class="opacity-0 -translate-y-4"
        enter-to-class="opacity-100 translate-y-0"
        leave-active-class="transition ease-in duration-200"
        leave-from-class="opacity-100 translate-y-0"
        leave-to-class="opacity-0 -translate-y-4"
        class="flex flex-col items-center gap-2 w-full"
      >
        <div
          v-for="toast in toasts"
          :key="toast.id"
          class="pointer-events-auto min-w-[300px] max-w-md rounded-lg border shadow-lg overflow-hidden"
          :class="{
            'bg-card border-border': toast.type === 'info',
            'bg-card border-primary': toast.type === 'success',
            'bg-card border-destructive': toast.type === 'error',
            'bg-card border-yellow-500': toast.type === 'warning',
          }"
        >
          <div class="flex items-start gap-3 p-3">
            <div class="flex-shrink-0 mt-0.5">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                :class="{
                  'text-primary': toast.type === 'info' || toast.type === 'success',
                  'text-destructive': toast.type === 'error',
                  'text-yellow-500': toast.type === 'warning',
                }"
                v-html="getIcon(toast.type)"
              />
            </div>
            <div class="flex-1 text-sm text-foreground">
              {{ toast.message }}
            </div>
            <button
              @click="removeToast(toast.id)"
              class="flex-shrink-0 text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </Teleport>
</template>
