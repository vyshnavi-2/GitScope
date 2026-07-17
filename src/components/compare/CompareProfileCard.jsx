import { motion } from 'framer-motion'
import { FavoriteButton } from '../common'
import { formatJoinDate } from '../../utils/format'
import { cn } from '../../utils'

export default function CompareProfileCard({ developer, side, index }) {
  const { user, stats } = developer
  const isLeft = side === 'a'

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -20 : 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      className={cn(
        'rounded-2xl border bg-white p-6 dark:bg-surface-900',
        isLeft
          ? 'border-accent-500/30 dark:border-accent-500/20'
          : 'border-purple-500/30 dark:border-purple-500/20',
      )}
    >
      <div className="flex items-center gap-4">
        <img
          src={user.avatar_url}
          alt=""
          className={cn(
            'h-16 w-16 rounded-xl object-cover ring-2',
            isLeft
              ? 'ring-accent-500/30'
              : 'ring-purple-500/30',
          )}
        />
        <div className="min-w-0 flex-1">
          <p className="truncate text-lg font-bold text-surface-900 dark:text-surface-50">
            {user.name || user.login}
          </p>
          <p className="text-sm text-surface-500 dark:text-surface-400">
            @{user.login}
          </p>
          <p className="mt-1 text-xs text-surface-400 dark:text-surface-500">
            Joined {formatJoinDate(user.created_at)}
          </p>
        </div>
        <FavoriteButton user={user} size="sm" />
      </div>

      {stats.languageList.length > 0 && (
        <div className="mt-4 flex flex-wrap gap-1.5">
          {stats.languageList.slice(0, 5).map((lang) => (
            <span
              key={lang}
              className="rounded-md bg-surface-100 px-2 py-0.5 text-xs text-surface-600 dark:bg-surface-800 dark:text-surface-300"
            >
              {lang}
            </span>
          ))}
          {stats.languageList.length > 5 && (
            <span className="text-xs text-surface-400">
              +{stats.languageList.length - 5}
            </span>
          )}
        </div>
      )}
    </motion.div>
  )
}
