import { Link } from 'react-router-dom'
import { GitBranch } from 'lucide-react'
import { APP_NAME, ROUTES } from '../../constants'
import { cn } from '../../utils'

export default function Logo({ className, showTagline = false }) {
  return (
    <Link
      to={ROUTES.HOME}
      className={cn(
        'group inline-flex items-center gap-2.5 transition-opacity hover:opacity-90',
        className,
      )}
      aria-label={`${APP_NAME} home`}
    >
      <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-accent-500/10 text-accent-500 ring-1 ring-accent-500/20 transition-colors group-hover:bg-accent-500/15">
        <GitBranch className="h-5 w-5" aria-hidden="true" />
      </span>

      <span className="flex flex-col">
        <span className="text-base font-semibold tracking-tight text-surface-900 dark:text-surface-50">
          {APP_NAME}
        </span>
        {showTagline && (
          <span className="text-xs text-surface-500 dark:text-surface-400">
            Developer Dashboard
          </span>
        )}
      </span>
    </Link>
  )
}
