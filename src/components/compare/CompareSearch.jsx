import { GitCompare } from 'lucide-react'
import { SearchBar, Skeleton } from '../common'
import { cn } from '../../utils'

export default function CompareSearch({
  usernameA,
  usernameB,
  onChangeA,
  onChangeB,
  onClearA,
  onClearB,
  isLoading,
  isSameUser,
  action,
}) {
  return (
    <div className="space-y-4">
      <div className="grid gap-4 md:grid-cols-2">
        <div>
          <label
            htmlFor="compare-user-a"
            className="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300"
          >
            Developer A
          </label>
          <SearchBar
            id="compare-user-a"
            label={null}
            value={usernameA}
            onChange={onChangeA}
            onClear={onClearA}
            isLoading={isLoading}
            placeholder="First GitHub username…"
          />
        </div>

        <div>
          <label
            htmlFor="compare-user-b"
            className="mb-2 block text-sm font-medium text-surface-700 dark:text-surface-300"
          >
            Developer B
          </label>
          <SearchBar
            id="compare-user-b"
            label={null}
            value={usernameB}
            onChange={onChangeB}
            onClear={onClearB}
            isLoading={false}
            placeholder="Second GitHub username…"
          />
        </div>
      </div>

      {action && <div className="flex justify-end">{action}</div>}

      {isSameUser && !isLoading && (
        <div className="flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800 dark:border-amber-900/50 dark:bg-amber-950/40 dark:text-amber-200">
          <GitCompare className="h-4 w-4 shrink-0" aria-hidden="true" />
          Enter two different usernames to compare.
        </div>
      )}

      {isLoading && (
        <div
          className={cn(
            'flex items-center justify-center gap-3 rounded-xl border border-surface-200',
            'bg-surface-50 px-4 py-6 dark:border-surface-800 dark:bg-surface-900/50',
          )}
        >
          <Skeleton className="h-5 w-5 rounded-full" />
          <p className="text-sm text-surface-600 dark:text-surface-400">
            Fetching developer profiles and repositories…
          </p>
        </div>
      )}
    </div>
  )
}
