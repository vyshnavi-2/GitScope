import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { AlertCircle, Clock, ExternalLink, WifiOff } from 'lucide-react'
import { getDashboardPath } from '../../constants'
import { SEARCH_ERROR_TYPES } from '../../hooks/useGitHubSearch'
import { cn } from '../../utils'
import FavoriteButton from './FavoriteButton'
import { UserResultSkeleton } from './Skeleton'

const ERROR_ICONS = {
  [SEARCH_ERROR_TYPES.NOT_FOUND]: AlertCircle,
  [SEARCH_ERROR_TYPES.RATE_LIMIT]: Clock,
  [SEARCH_ERROR_TYPES.NETWORK]: WifiOff,
  [SEARCH_ERROR_TYPES.UNKNOWN]: AlertCircle,
}

function SearchError({ error }) {
  const Icon = ERROR_ICONS[error.type] ?? AlertCircle

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      className={cn(
        'flex items-start gap-3 rounded-xl border px-4 py-3 text-sm',
        error.type === SEARCH_ERROR_TYPES.RATE_LIMIT
          ? 'border-amber-200 bg-amber-50 text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200'
          : 'border-red-200 bg-red-50 text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200',
      )}
      role="alert"
    >
      <Icon className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
      <p>{error.message}</p>
    </motion.div>
  )
}

function UserResult({ user, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.05, duration: 0.3 }}
      className={cn(
        'group flex items-center gap-4 rounded-xl border border-surface-200 bg-white p-4',
        'transition-all duration-200 hover:border-accent-500/30 hover:shadow-md',
        'dark:border-surface-800 dark:bg-surface-900 dark:hover:border-accent-500/30',
      )}
    >
      <Link
        to={getDashboardPath(user.login)}
        className="flex min-w-0 flex-1 items-center gap-4"
      >
        <img
          src={user.avatar_url}
          alt=""
          className="h-12 w-12 rounded-full ring-2 ring-surface-100 transition-transform group-hover:scale-105 dark:ring-surface-800"
          loading="lazy"
        />
        <div className="min-w-0 flex-1 text-left">
          <p className="truncate font-semibold text-surface-900 dark:text-surface-100">
            {user.login}
          </p>
          <p className="truncate text-sm text-surface-500 dark:text-surface-400">
            View profile dashboard
          </p>
        </div>
      </Link>

      <FavoriteButton user={user} size="sm" />

      <a
        href={user.html_url}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg',
          'text-surface-400 transition-colors hover:bg-surface-100 hover:text-surface-600',
          'dark:hover:bg-surface-800 dark:hover:text-surface-200',
        )}
        aria-label={`Open ${user.login} on GitHub`}
      >
        <ExternalLink className="h-4 w-4" aria-hidden="true" />
      </a>
    </motion.div>
  )
}

export default function SearchResults({
  showSkeleton,
  showResults,
  showError,
  users,
  error,
  skeletonCount = 3,
}) {
  if (!showSkeleton && !showResults && !showError) return null

  return (
    <div className="mt-4 space-y-3">
      {showSkeleton &&
        Array.from({ length: skeletonCount }).map((_, index) => (
          <UserResultSkeleton key={index} />
        ))}

      {showError && error && <SearchError error={error} />}

      {showResults &&
        users.map((user, index) => (
          <UserResult key={user.id} user={user} index={index} />
        ))}
    </div>
  )
}
