import { Search, SlidersHorizontal } from 'lucide-react'
import {
  REPO_SORT_LABELS,
} from '../../constants/repositories'
import { cn } from '../../utils'

const selectClassName = cn(
  'h-11 rounded-lg border border-surface-200 bg-white px-3 text-sm text-surface-900',
  'transition-colors hover:border-surface-300',
  'focus:border-accent-500/50 focus:outline-none focus:ring-4 focus:ring-accent-500/10',
  'dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100 dark:hover:border-surface-600',
)

export default function RepositoryFilters({
  search,
  onSearchChange,
  sortBy,
  onSortChange,
  language,
  onLanguageChange,
  languages,
  totalCount,
  filteredCount,
}) {
  return (
    <div className="space-y-4">
      <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
        <div className="relative min-w-0 flex-1 lg:max-w-md">
          <label htmlFor="repository-search" className="sr-only">
            Search repositories
          </label>
          <Search
            className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-surface-400"
            aria-hidden="true"
          />
          <input
            id="repository-search"
            type="search"
            value={search}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Search repositories…"
            className={cn(
              'h-11 w-full rounded-lg border border-surface-200 bg-white pl-10 pr-4 text-sm',
              'text-surface-900 placeholder:text-surface-400',
              'transition-colors hover:border-surface-300',
              'focus:border-accent-500/50 focus:outline-none focus:ring-4 focus:ring-accent-500/10',
              'dark:border-surface-700 dark:bg-surface-900 dark:text-surface-100',
              'dark:placeholder:text-surface-500 dark:hover:border-surface-600',
            )}
          />
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <label className="flex items-center gap-2">
            <SlidersHorizontal
              className="hidden h-4 w-4 text-surface-400 sm:block"
              aria-hidden="true"
            />
            <span className="sr-only">Sort repositories</span>
            <select
              value={sortBy}
              onChange={(event) => onSortChange(event.target.value)}
              className={selectClassName}
            >
              {Object.entries(REPO_SORT_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </label>

          <label className="flex items-center gap-2">
            <span className="sr-only">Filter by language</span>
            <select
              value={language}
              onChange={(event) => onLanguageChange(event.target.value)}
              className={selectClassName}
            >
              {languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang === 'all' ? 'All Languages' : lang}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <p className="text-sm text-surface-500 dark:text-surface-400">
        Showing {filteredCount} of {totalCount} repositories
      </p>
    </div>
  )
}
