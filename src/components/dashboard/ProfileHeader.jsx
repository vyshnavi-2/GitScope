import { motion } from 'framer-motion'
import {
  Building2,
  Calendar,
  Copy,
  ExternalLink,
  Globe,
  MapPin,
} from 'lucide-react'
import { FavoriteButton } from '../common'
import { useToast } from '../../hooks/useToast'
import { formatJoinDate, formatWebsite } from '../../utils/format'
import { cn } from '../../utils'

function MetaItem({ icon: Icon, children, href }) {
  const content = (
    <span className="inline-flex items-center gap-2 text-sm text-surface-600 dark:text-surface-400">
      <Icon className="h-4 w-4 shrink-0 text-surface-400" aria-hidden="true" />
      <span className="truncate">{children}</span>
    </span>
  )

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="transition-colors hover:text-accent-500 dark:hover:text-accent-400"
      >
        {content}
      </a>
    )
  }

  return content
}

export default function ProfileHeader({ user }) {
  const displayName = user.name || user.login
  const website = formatWebsite(user.blog)
  const { showToast } = useToast()

  const handleCopyProfile = async () => {
    try {
      await navigator.clipboard.writeText(user.html_url)
      showToast({
        type: 'success',
        message: `Copied @${user.login}'s profile link.`,
      })
    } catch {
      showToast({
        type: 'error',
        message: 'Could not copy profile link.',
      })
    }
  }

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className={cn(
        'overflow-hidden rounded-2xl border border-surface-200 bg-white shadow-sm',
        'dark:border-surface-800 dark:bg-surface-900',
      )}
    >
      <div className="h-24 bg-gradient-to-r from-accent-500/20 via-emerald-400/10 to-purple-500/10 sm:h-28" />

      <div className="relative px-6 pb-6 sm:px-8">
        <div className="-mt-12 flex flex-col gap-6 sm:-mt-14 sm:flex-row sm:items-end sm:justify-between">
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end">
            <img
              src={user.avatar_url}
              alt=""
              className="h-24 w-24 rounded-2xl border-4 border-white object-cover shadow-lg ring-1 ring-surface-200 sm:h-28 sm:w-28 dark:border-surface-900 dark:ring-surface-700"
            />

            <div className="min-w-0 pb-1">
              <h1 className="truncate text-2xl font-bold tracking-tight text-surface-900 sm:text-3xl dark:text-surface-50">
                {displayName}
              </h1>
              <p className="mt-1 text-base text-surface-500 dark:text-surface-400">
                @{user.login}
              </p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 self-start sm:self-auto">
            <FavoriteButton user={user} showLabel />
            <button
              type="button"
              onClick={handleCopyProfile}
              className={cn(
                'inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg px-4',
                'border border-surface-200 bg-surface-50 text-sm font-medium text-surface-700',
                'transition-all hover:bg-surface-100 hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-accent-500/15',
                'dark:border-surface-700 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700',
              )}
            >
              Copy Link
              <Copy className="h-4 w-4" aria-hidden="true" />
            </button>
            <a
              href={user.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                'inline-flex h-10 shrink-0 items-center justify-center gap-2 rounded-lg px-4',
                'border border-surface-200 bg-surface-50 text-sm font-medium text-surface-700',
                'transition-all hover:bg-surface-100 hover:shadow-sm focus:outline-none focus:ring-4 focus:ring-accent-500/15',
                'dark:border-surface-700 dark:bg-surface-800 dark:text-surface-200 dark:hover:bg-surface-700',
              )}
            >
              View on GitHub
              <ExternalLink className="h-4 w-4" aria-hidden="true" />
            </a>
          </div>
        </div>

        {user.bio && (
          <p className="mt-6 max-w-3xl text-base leading-relaxed text-surface-600 dark:text-surface-300">
            {user.bio}
          </p>
        )}

        <div className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
          {user.location && (
            <MetaItem icon={MapPin}>{user.location}</MetaItem>
          )}
          {user.company && (
            <MetaItem icon={Building2}>{user.company}</MetaItem>
          )}
          {website && (
            <MetaItem icon={Globe} href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`}>
              {website}
            </MetaItem>
          )}
          <MetaItem icon={Calendar}>
            Joined {formatJoinDate(user.created_at)}
          </MetaItem>
        </div>
      </div>
    </motion.section>
  )
}
