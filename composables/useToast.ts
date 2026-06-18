interface ToastOptions {
  type?: 'success' | 'error' | 'info' | 'warning'
  duration?: number
}

let toastHandler: ((message: string, options?: ToastOptions) => void) | null = null

export const setToastHandler = (handler: typeof toastHandler) => {
  toastHandler = handler
}

export const useToast = () => {
  const toast = (message: string, options?: ToastOptions) => {
    if (toastHandler) {
      toastHandler(message, options)
    } else {
      console.warn('Toaster not mounted yet')
    }
  }
  return {
    toast,
    success: (message: string, options?: ToastOptions) => toast(message, { ...options, type: 'success' }),
    error: (message: string, options?: ToastOptions) => toast(message, { ...options, type: 'error' }),
    info: (message: string, options?: ToastOptions) => toast(message, { ...options, type: 'info' }),
    warning: (message: string, options?: ToastOptions) => toast(message, { ...options, type: 'warning' }),
  }
}
