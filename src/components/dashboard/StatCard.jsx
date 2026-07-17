import { memo } from 'react'
import { motion } from 'framer-motion'
import { cn, formatNumber } from '../../utils'

function StatCard({
  label,
  value,
  icon: Icon,
  index = 0,
  className,
}) {
  const formattedValue =
    typeof value === 'number' ? formatNumber(value) : value

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: index * 0.08 }}
      className={cn(
        'rounded-xl border border-surface-200 bg-white p-5 shadow-sm',
        'dark:border-surface-800 dark:bg-surface-900',
        className,
      )}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-sm font-medium text-surface-500 dark:text-surface-400">
            {label}
          </p>
          <p className="mt-2 text-2xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
            {formattedValue}
          </p>
        </div>
        {Icon && (
          <div className="rounded-lg bg-accent-500/10 p-2.5 text-accent-500">
            <Icon className="h-5 w-5" aria-hidden="true" />
          </div>
        )}
      </div>
    </motion.div>
  )
}

export default memo(StatCard)
