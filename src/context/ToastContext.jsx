import { useCallback, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { CheckCircle2, Info, X, XCircle } from 'lucide-react'
import { cn } from '../utils'
import { ToastContext } from './toastContextValue'

const TOAST_ICONS = {
  success: CheckCircle2,
  error: XCircle,
  info: Info,
}

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([])

  const dismissToast = useCallback((id) => {
    setToasts((current) => current.filter((toast) => toast.id !== id))
  }, [])

  const showToast = useCallback(
    ({ message, type = 'info', duration = 2800 }) => {
      const id = crypto.randomUUID?.() ?? `${Date.now()}-${Math.random()}`
      const toast = { id, message, type }

      setToasts((current) => [toast, ...current].slice(0, 3))
      window.setTimeout(() => dismissToast(id), duration)
    },
    [dismissToast],
  )

  const value = useMemo(
    () => ({ showToast, dismissToast }),
    [dismissToast, showToast],
  )

  return (
    <ToastContext.Provider value={value}>
      {children}
      <ToastViewport toasts={toasts} onDismiss={dismissToast} />
    </ToastContext.Provider>
  )
}

function ToastViewport({ toasts, onDismiss }) {
  return (
    <div
      className="fixed right-4 top-20 z-[70] flex w-[min(100%-2rem,22rem)] flex-col gap-2"
      aria-live="polite"
      aria-relevant="additions"
    >
      <AnimatePresence initial={false}>
        {toasts.map((toast) => {
          const Icon = TOAST_ICONS[toast.type] ?? Info

          return (
            <motion.div
              key={toast.id}
              initial={{ opacity: 0, x: 24, scale: 0.98 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: 24, scale: 0.98 }}
              transition={{ duration: 0.18 }}
              className={cn(
                'flex items-start gap-3 rounded-xl border bg-white/95 p-3 text-sm shadow-lg backdrop-blur',
                'dark:bg-surface-900/95',
                toast.type === 'success' &&
                  'border-accent-500/20 text-surface-800 dark:text-surface-100',
                toast.type === 'error' &&
                  'border-red-500/25 text-surface-800 dark:text-surface-100',
                toast.type === 'info' &&
                  'border-surface-200 text-surface-800 dark:border-surface-700 dark:text-surface-100',
              )}
              role={toast.type === 'error' ? 'alert' : 'status'}
            >
              <Icon
                className={cn(
                  'mt-0.5 h-4 w-4 shrink-0',
                  toast.type === 'success' && 'text-accent-500',
                  toast.type === 'error' && 'text-red-500',
                  toast.type === 'info' && 'text-surface-400',
                )}
                aria-hidden="true"
              />
              <p className="min-w-0 flex-1 leading-5">{toast.message}</p>
              <button
                type="button"
                onClick={() => onDismiss(toast.id)}
                className="rounded-md p-1 text-surface-400 transition-colors hover:bg-surface-100 hover:text-surface-700 dark:hover:bg-surface-800 dark:hover:text-surface-100"
                aria-label="Dismiss notification"
              >
                <X className="h-3.5 w-3.5" aria-hidden="true" />
              </button>
            </motion.div>
          )
        })}
      </AnimatePresence>
    </div>
  )
}
