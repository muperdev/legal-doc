'use client'

import { Toaster } from 'sonner'

export function ToastProvider() {
  return (
    <Toaster
      position="top-right"
      toastOptions={{
        style: {
          background: 'rgb(0 0 0 / 0.8)',
          color: 'white',
          border: '1px solid rgb(63 63 70)',
        },
      }}
    />
  )
}
