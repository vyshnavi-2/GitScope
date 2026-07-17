import { motion } from 'framer-motion'
import { Crown } from 'lucide-react'
import { cn } from '../../utils'
import { formatCompareValue } from './formatCompareValue'

export default function CompareMetricRow({ metric, index }) {
  const { label, key, valueA, valueB, winner } = metric

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.15 + index * 0.05 }}
      className="rounded-xl border border-surface-200 bg-white p-4 dark:border-surface-800 dark:bg-surface-900"
    >
      <p className="mb-3 text-center text-sm font-medium text-surface-500 dark:text-surface-400">
        {label}
      </p>

      <div className="grid grid-cols-[1fr_auto_1fr] items-center gap-3">
        <CompareValue
          value={formatCompareValue(key, valueA)}
          isWinner={winner === 'a'}
          align="left"
          accent="accent"
        />

        <span className="text-xs font-medium uppercase tracking-wider text-surface-400">
          vs
        </span>

        <CompareValue
          value={formatCompareValue(key, valueB)}
          isWinner={winner === 'b'}
          align="right"
          accent="purple"
        />
      </div>

      {winner === 'tie' && (
        <p className="mt-2 text-center text-xs text-surface-400">Tied</p>
      )}
    </motion.div>
  )
}

function CompareValue({ value, isWinner, align, accent }) {
  return (
    <div
      className={cn(
        'flex items-center gap-1.5',
        align === 'right' ? 'justify-end' : 'justify-start',
      )}
    >
      {isWinner && align === 'left' && (
        <Crown className="h-4 w-4 shrink-0 text-accent-500" aria-hidden="true" />
      )}

      <span
        className={cn(
          'text-lg font-bold tabular-nums',
          isWinner && accent === 'accent' && 'text-accent-600 dark:text-accent-400',
          isWinner && accent === 'purple' && 'text-purple-600 dark:text-purple-400',
          !isWinner && 'text-surface-700 dark:text-surface-300',
        )}
      >
        {value}
      </span>

      {isWinner && align === 'right' && (
        <Crown className="h-4 w-4 shrink-0 text-purple-500" aria-hidden="true" />
      )}
    </div>
  )
}
