import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clock, ExternalLink, Search } from 'lucide-react'
import { getDashboardPath } from '../../constants'
import { cn } from '../../utils'
import { UserResultSkeleton } from './Skeleton'

export default function SearchSuggestions({
  users = [],
  recentSearches = [],
  showSkeleton,
  isOpen,
  activeIndex,
  onSelect,
  onHover,
}) {
  if (!isOpen) return null

  const items =
    users.length > 0
      ? users.map((user) => ({ type: 'user', key: user.id, user, label: user.login }))
      : recentSearches.map((login) => ({ type: 'recent', key: login, label: login }))

  if (showSkeleton) {
    return (
      <div className="mt-3 rounded-2xl border border-surface-200 bg-white p-2 shadow-xl dark:border-surface-800 dark:bg-surface-900">
        {Array.from({ length: 3 }).map((_, index) => (
          <UserResultSkeleton key={index} />
        ))}
      </div>
    )
  }

  if (items.length === 0) return null

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.18 }}
      className="mt-3 overflow-hidden rounded-2xl border border-surface-200 bg-white p-2 text-left shadow-xl dark:border-surface-800 dark:bg-surface-900"
      role="listbox"
      aria-label={users.length > 0 ? 'Search suggestions' : 'Recent searches'}
    >
      <p className="px-3 py-2 text-xs font-semibold uppercase tracking-wide text-surface-400">
        {users.length > 0 ? 'Suggestions' : 'Recent searches'}
      </p>

      {items.map((item, index) => (
        <SuggestionItem
          key={item.key}
          item={item}
          isActive={index === activeIndex}
          onSelect={onSelect}
          onHover={() => onHover(index)}
        />
      ))}
    </motion.div>
  )
}

function SuggestionItem({ item, isActive, onSelect, onHover }) {
  const login = item.user?.login ?? item.label
  const avatar = item.user?.avatar_url

  return (
    <Link
      to={getDashboardPath(login)}
      onMouseEnter={onHover}
      onClick={(event) => {
        event.preventDefault()
        onSelect(login)
      }}
      className={cn(
        'flex items-center gap-3 rounded-xl px-3 py-2.5 transition-colors',
        isActive
          ? 'bg-accent-500/10 text-surface-900 dark:text-surface-50'
          : 'hover:bg-surface-100 dark:hover:bg-surface-800',
      )}
      role="option"
      aria-selected={isActive}
    >
      {avatar ? (
        <img
          src={avatar}
          alt=""
          className="h-9 w-9 rounded-full ring-1 ring-surface-200 dark:ring-surface-700"
          loading="lazy"
        />
      ) : (
        <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-surface-100 text-surface-400 dark:bg-surface-800">
          {item.type === 'recent' ? (
            <Clock className="h-4 w-4" aria-hidden="true" />
          ) : (
            <Search className="h-4 w-4" aria-hidden="true" />
          )}
        </span>
      )}

      <span className="min-w-0 flex-1">
        <span className="block truncate font-medium">@{login}</span>
        <span className="block truncate text-xs text-surface-500 dark:text-surface-400">
          {item.type === 'recent' ? 'Search again' : 'Open developer profile'}
        </span>
      </span>

      <ExternalLink className="h-4 w-4 text-surface-300" aria-hidden="true" />
    </Link>
  )
}
