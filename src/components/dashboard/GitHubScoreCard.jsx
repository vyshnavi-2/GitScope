import { memo, useMemo } from 'react'
import { motion } from 'framer-motion'
import { HelpCircle, Trophy } from 'lucide-react'
import { computeGitHubScore } from '../../utils/analytics'
import { cn } from '../../utils'

function GitHubScoreCard({ user, repositories = [], isLoading = false }) {
  const score = useMemo(
    () => (user ? computeGitHubScore(user, repositories) : 0),
    [repositories, user],
  )

  return (
    <motion.section
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: 0.1 }}
      className={cn(
        'rounded-xl border border-accent-500/20 bg-gradient-to-br from-accent-500/10 to-white p-5 shadow-sm',
        'dark:from-accent-500/10 dark:to-surface-900',
      )}
      aria-labelledby="github-score-title"
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="flex items-center gap-2">
            <Trophy className="h-4 w-4 text-accent-500" aria-hidden="true" />
            <h2
              id="github-score-title"
              className="text-sm font-medium text-surface-600 dark:text-surface-300"
            >
              GitHub Score
            </h2>
            <span className="group relative inline-flex">
              <HelpCircle
                className="h-3.5 w-3.5 text-surface-400"
                aria-label="Score details"
                tabIndex={0}
              />
              <span className="pointer-events-none absolute left-1/2 top-6 z-10 hidden w-64 -translate-x-1/2 rounded-lg border border-surface-200 bg-white p-3 text-xs leading-5 text-surface-600 shadow-xl group-hover:block group-focus-within:block dark:border-surface-700 dark:bg-surface-900 dark:text-surface-300">
                Calculated from followers, public repositories, total stars,
                total forks, and account age. Repository data uses the public
                repositories currently loaded by GitScope.
              </span>
            </span>
          </div>

          <p className="mt-3 text-3xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
            {isLoading ? '—' : score}
            <span className="text-base font-semibold text-surface-400">
              {' '}
              / 100
            </span>
          </p>
        </div>

        <div
          className="relative h-14 w-14 rounded-full bg-surface-100 dark:bg-surface-800"
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background: `conic-gradient(rgb(16 185 129) ${score * 3.6}deg, transparent 0deg)`,
            }}
          />
          <div className="absolute inset-1.5 rounded-full bg-white dark:bg-surface-900" />
        </div>
      </div>
    </motion.section>
  )
}

export default memo(GitHubScoreCard)
