import { Moon, Sun } from 'lucide-react'
import { useTheme } from '../../hooks/useTheme'
import { useToast } from '../../hooks/useToast'
import { cn } from '../../utils'

export default function ThemeToggle({ className }) {
  const { isDark, toggleTheme } = useTheme()
  const { showToast } = useToast()

  const handleToggle = () => {
    toggleTheme()
    showToast({
      type: 'info',
      message: isDark ? 'Light mode enabled.' : 'Dark mode enabled.',
    })
  }

  return (
    <button
      type="button"
      onClick={handleToggle}
      className={cn(
        'inline-flex h-10 w-10 items-center justify-center rounded-lg',
        'border border-surface-200 bg-surface-100 text-surface-600',
        'transition-colors hover:bg-surface-200 hover:text-surface-900',
        'dark:border-surface-700 dark:bg-surface-800 dark:text-surface-300',
        'dark:hover:bg-surface-700 dark:hover:text-surface-100',
        className,
      )}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
    >
      {isDark ? (
        <Sun className="h-4 w-4" aria-hidden="true" />
      ) : (
        <Moon className="h-4 w-4" aria-hidden="true" />
      )}
    </button>
  )
}
