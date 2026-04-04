import { Toaster as SonnerToaster } from 'sonner'

export function Toaster() {
  return (
    <SonnerToaster
      position="bottom-right"
      toastOptions={{
        style: {
          background: '#2C1810',
          color: '#FAF7F2',
          border: '1px solid rgba(250,247,242,0.12)',
          borderRadius: '12px',
          fontFamily: '"DM Sans", system-ui, sans-serif',
          fontSize: '14px',
        },
        classNames: {
          success: 'toast-success',
          error: 'toast-error',
        },
      }}
      richColors={false}
      expand={false}
      closeButton
    />
  )
}
