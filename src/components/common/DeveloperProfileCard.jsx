import { memo } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import {
  Building2,
  Calendar,
  ExternalLink,
  MapPin,
  Users,
} from 'lucide-react'
import { getDashboardPath } from '../../constants'
import { cn, formatJoinDate, formatNumber } from '../../utils'
import FavoriteButton from './FavoriteButton'

function DeveloperProfileCard({
  user,
  index = 0,
  compact = false,
  showFavorite = true,
  action,
  className,
}) {
  const displayName = user.name || user.login

  return (
    <motion.article
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.32, delay: Math.min(index * 0.04, 0.2) }}
      whileHover={{ y: -3 }}
      className={cn(
        'group relative overflow-hidden rounded-2xl border border-surface-200 bg-white p-5 shadow-sm',
        'transition-all duration-300 hover:border-accent-500/30 hover:shadow-xl hover:shadow-accent-500/10',
        'dark:border-surface-800 dark:bg-surface-900 dark:hover:border-accent-500/30',
        className,
      )}
    >
      <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-accent-500 via-emerald-400 to-purple-500 opacity-70" />

      <div className="flex items-start gap-4">
        <Link
          to={getDashboardPath(user.login)}
          className="shrink-0 rounded-2xl focus:outline-none focus:ring-4 focus:ring-accent-500/20"
          aria-label={`Open ${user.login}'s dashboard`}
        >
          <img
            src={user.avatar_url}
            alt=""
            loading="lazy"
            className={cn(
              'rounded-2xl object-cover ring-2 ring-surface-100 transition-transform duration-300 group-hover:scale-105 dark:ring-surface-800',
              compact ? 'h-14 w-14' : 'h-16 w-16',
            )}
          />
        </Link>

        <div className="min-w-0 flex-1">
          <Link
            to={getDashboardPath(user.login)}
            className="block rounded-md focus:outline-none focus:ring-4 focus:ring-accent-500/15"
          >
            <h3 className="truncate text-lg font-bold text-surface-900 transition-colors group-hover:text-accent-600 dark:text-surface-50 dark:group-hover:text-accent-400">
              {displayName}
            </h3>
            <p className="truncate text-sm text-surface-500 dark:text-surface-400">
              @{user.login}
            </p>
          </Link>

          {!compact && user.bio && (
            <p className="mt-3 line-clamp-2 text-sm leading-6 text-surface-600 dark:text-surface-300">
              {user.bio}
            </p>
          )}
        </div>

        {showFavorite && <FavoriteButton user={user} size="sm" />}
      </div>

      <dl className="mt-5 grid grid-cols-3 gap-2 text-center">
        <Stat label="Repos" value={formatNumber(user.public_repos ?? 0)} />
        <Stat label="Followers" value={formatNumber(user.followers ?? 0)} />
        <Stat label="Following" value={formatNumber(user.following ?? 0)} />
      </dl>

      <div className="mt-4 flex flex-wrap gap-x-4 gap-y-2 text-xs text-surface-500 dark:text-surface-400">
        {user.location && <Meta icon={MapPin}>{user.location}</Meta>}
        {user.company && <Meta icon={Building2}>{user.company}</Meta>}
        {user.created_at && (
          <Meta icon={Calendar}>Joined {formatJoinDate(user.created_at)}</Meta>
        )}
        {!user.location && !user.company && !user.created_at && (
          <Meta icon={Users}>GitHub developer</Meta>
        )}
      </div>

      <div className="mt-5 flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
        <Link
          to={getDashboardPath(user.login)}
          className={cn(
            'inline-flex h-10 items-center justify-center rounded-lg px-4 text-sm font-medium',
            'bg-accent-500 text-white shadow-sm shadow-accent-500/20 transition-all',
            'hover:bg-accent-600 hover:shadow-md focus:outline-none focus:ring-4 focus:ring-accent-500/20',
          )}
        >
          View Profile
        </Link>

        {action ?? (
          <a
            href={user.html_url}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              'inline-flex h-10 items-center justify-center gap-2 rounded-lg px-3 text-sm font-medium',
              'text-surface-500 transition-colors hover:bg-surface-100 hover:text-surface-800',
              'focus:outline-none focus:ring-4 focus:ring-accent-500/15',
              'dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-surface-100',
            )}
          >
            GitHub
            <ExternalLink className="h-4 w-4" aria-hidden="true" />
          </a>
        )}
      </div>
    </motion.article>
  )
}

function Stat({ label, value }) {
  return (
    <div className="rounded-xl bg-surface-50 px-2 py-3 dark:bg-surface-800/70">
      <dt className="text-[11px] font-medium uppercase tracking-wide text-surface-400">
        {label}
      </dt>
      <dd className="mt-1 text-sm font-bold tabular-nums text-surface-900 dark:text-surface-100">
        {value}
      </dd>
    </div>
  )
}

function Meta({ icon: Icon, children }) {
  return (
    <span className="inline-flex min-w-0 items-center gap-1.5">
      <Icon className="h-3.5 w-3.5 shrink-0" aria-hidden="true" />
      <span className="truncate">{children}</span>
    </span>
  )
}

export default memo(DeveloperProfileCard)
