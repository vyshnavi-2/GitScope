import { motion } from 'framer-motion'
import {
  AlertCircle,
  Clock,
  Search,
  WifiOff,
} from 'lucide-react'
import { ERROR_TYPES } from '../../utils/errors'
import { cn } from '../../utils'

const ERROR_ICONS = {
  [ERROR_TYPES.NOT_FOUND]: AlertCircle,
  [ERROR_TYPES.RATE_LIMIT]: Clock,
  [ERROR_TYPES.NETWORK]: WifiOff,
  [ERROR_TYPES.UNKNOWN]: AlertCircle,
}

export default function ErrorState({
  error,
  title = 'Something went wrong',
  className,
}) {
  const Icon = ERROR_ICONS[error?.type] ?? AlertCircle
  const isRateLimit = error?.type === ERROR_TYPES.RATE_LIMIT

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'rounded-xl border px-6 py-8 text-center',
        isRateLimit
          ? 'border-amber-200 bg-amber-50 dark:border-amber-900/50 dark:bg-amber-950/40'
          : 'border-red-200 bg-red-50 dark:border-red-900/50 dark:bg-red-950/40',
        className,
      )}
      role="alert"
    >
      <div
        className={cn(
          'mx-auto mb-4 inline-flex rounded-full p-3',
          isRateLimit
            ? 'bg-amber-100 text-amber-700 dark:bg-amber-900/40 dark:text-amber-200'
            : 'bg-red-100 text-red-700 dark:bg-red-900/40 dark:text-red-200',
        )}
      >
        <Icon className="h-6 w-6" aria-hidden="true" />
      </div>
      <h2
        className={cn(
          'text-lg font-semibold',
          isRateLimit
            ? 'text-amber-900 dark:text-amber-100'
            : 'text-red-900 dark:text-red-100',
        )}
      >
        {title}
      </h2>
      <p
        className={cn(
          'mx-auto mt-2 max-w-md text-sm',
          isRateLimit
            ? 'text-amber-800 dark:text-amber-200'
            : 'text-red-800 dark:text-red-200',
        )}
      >
        {error?.message}
      </p>
    </motion.div>
  )
}

export function EmptyState({
  icon: Icon = Search,
  title,
  description,
  action,
  className,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex flex-col items-center rounded-xl border border-surface-200 bg-white px-6 py-16 text-center',
        'dark:border-surface-800 dark:bg-surface-900',
        className,
      )}
    >
      <div className="mb-4 rounded-full bg-surface-100 p-4 dark:bg-surface-800">
        <Icon
          className="h-8 w-8 text-surface-400 dark:text-surface-500"
          aria-hidden="true"
        />
      </div>
      <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
        {title}
      </h2>
      <p className="mt-2 max-w-md text-sm text-surface-500 dark:text-surface-400">
        {description}
      </p>
      {action && <div className="mt-6">{action}</div>}
    </motion.div>
  )
}
