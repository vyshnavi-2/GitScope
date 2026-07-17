import { memo } from 'react'
import { Heart } from 'lucide-react'
import { useFavorites } from '../../hooks/useFavorites'
import { useToast } from '../../hooks/useToast'
import { cn } from '../../utils'

function FavoriteButton({
  user,
  size = 'md',
  className,
  showLabel = false,
  onToggle,
}) {
  const { isFavorite, toggleFavorite } = useFavorites()
  const { showToast } = useToast()
  const saved = isFavorite(user?.login)

  const handleClick = (event) => {
    event.preventDefault()
    event.stopPropagation()
    toggleFavorite(user)
    showToast({
      type: saved ? 'info' : 'success',
      message: saved
        ? `Removed @${user?.login} from favorites.`
        : `Added @${user?.login} to favorites.`,
    })
    onToggle?.(!saved)
  }

  const label = saved
    ? `Remove ${user?.login ?? 'developer'} from favorites`
    : `Save ${user?.login ?? 'developer'} to favorites`

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-pressed={saved}
      aria-label={label}
      title={label}
      className={cn(
        'inline-flex shrink-0 items-center justify-center gap-2 rounded-lg border font-medium',
        'transition-all duration-200 focus:outline-none focus:ring-4 focus:ring-accent-500/15',
        saved
          ? 'border-rose-200 bg-rose-50 text-rose-600 hover:bg-rose-100 dark:border-rose-900/60 dark:bg-rose-950/40 dark:text-rose-300'
          : 'border-surface-200 bg-white text-surface-500 hover:border-accent-500/30 hover:bg-accent-500/5 hover:text-accent-600 dark:border-surface-700 dark:bg-surface-900 dark:text-surface-300 dark:hover:border-accent-500/30 dark:hover:text-accent-400',
        size === 'sm' ? 'h-9 px-3 text-xs' : 'h-10 px-4 text-sm',
        !showLabel && (size === 'sm' ? 'w-9 px-0' : 'w-10 px-0'),
        className,
      )}
    >
      <Heart
        className={cn('h-4 w-4', saved && 'fill-current')}
        aria-hidden="true"
      />
      {showLabel && <span>{saved ? 'Saved' : 'Save'}</span>}
    </button>
  )
}

export default memo(FavoriteButton)
