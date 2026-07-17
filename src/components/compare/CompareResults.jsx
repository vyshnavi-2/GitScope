import { motion } from 'framer-motion'
import { GitCompare, Trophy } from 'lucide-react'
import { buildCompareResults } from '../../hooks/useDeveloperCompare'
import { cn } from '../../utils'
import CompareMetricRow from './CompareMetricRow'
import CompareProfileCard from './CompareProfileCard'

export default function CompareResults({ developerA, developerB }) {
  const metrics = buildCompareResults(developerA.stats, developerB.stats)
  const winsA = metrics.filter((m) => m.winner === 'a').length
  const winsB = metrics.filter((m) => m.winner === 'b').length
  const overallWinner =
    winsA > winsB ? 'a' : winsB > winsA ? 'b' : 'tie'

  return (
    <div className="space-y-8">
      <div className="grid gap-6 lg:grid-cols-2">
        <CompareProfileCard developer={developerA} side="a" index={0} />
        <CompareProfileCard developer={developerB} side="b" index={1} />
      </div>

      <motion.div
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className={cn(
          'flex flex-col items-center justify-center rounded-2xl border px-6 py-8 text-center',
          overallWinner === 'tie'
            ? 'border-surface-200 bg-surface-50 dark:border-surface-800 dark:bg-surface-900/50'
            : overallWinner === 'a'
              ? 'border-accent-500/30 bg-accent-500/5 dark:border-accent-500/20'
              : 'border-purple-500/30 bg-purple-500/5 dark:border-purple-500/20',
        )}
      >
        <Trophy
          className={cn(
            'mb-3 h-8 w-8',
            overallWinner === 'a' && 'text-accent-500',
            overallWinner === 'b' && 'text-purple-500',
            overallWinner === 'tie' && 'text-surface-400',
          )}
          aria-hidden="true"
        />
        {overallWinner === 'tie' ? (
          <p className="text-lg font-semibold text-surface-900 dark:text-surface-100">
            It&apos;s a tie!
          </p>
        ) : (
          <p className="text-lg font-semibold text-surface-900 dark:text-surface-100">
            @{overallWinner === 'a' ? developerA.user.login : developerB.user.login}{' '}
            leads {overallWinner === 'a' ? winsA : winsB} of {metrics.length} metrics
          </p>
        )}
        <p className="mt-1 text-sm text-surface-500 dark:text-surface-400">
          {winsA} — {winsB} metric wins
        </p>
      </motion.div>

      <div>
        <div className="mb-4 flex items-center gap-2">
          <GitCompare className="h-5 w-5 text-surface-400" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
            Metric Comparison
          </h2>
        </div>

        <div className="grid gap-3 sm:grid-cols-2">
          {metrics.map((metric, index) => (
            <CompareMetricRow key={metric.key} metric={metric} index={index} />
          ))}
        </div>
      </div>
    </div>
  )
}
