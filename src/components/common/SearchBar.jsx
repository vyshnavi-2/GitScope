import { Search, X } from 'lucide-react'
import { cn } from '../../utils'
import Skeleton from './Skeleton'

export default function SearchBar({
  value,
  onChange,
  onClear,
  onFocus,
  onKeyDown,
  inputRef,
  isLoading = false,
  placeholder = 'Search GitHub username…',
  label = 'Search GitHub username',
  className,
  id = 'github-search',
}) {
  return (
    <div className={cn('relative w-full', className)}>
      {label && (
        <label htmlFor={id} className="sr-only">
          {label}
        </label>
      )}

      <Search
        className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-surface-400"
        aria-hidden="true"
      />

      <input
        id={id}
        ref={inputRef}
        type="search"
        value={value ?? ''}
        onChange={(event) => onChange?.(event.target.value)}
        onFocus={onFocus}
        onKeyDown={onKeyDown}
        placeholder={placeholder}
        autoComplete="off"
        spellCheck="false"
        className={cn(
          'h-14 w-full rounded-xl border border-surface-200 bg-white/80 pl-12 pr-12',
          'text-base text-surface-900 placeholder:text-surface-400',
          'shadow-sm backdrop-blur-sm transition-all duration-200',
          'hover:border-surface-300 hover:shadow-md',
          'focus:border-accent-500/50 focus:outline-none focus:ring-4 focus:ring-accent-500/10',
          'dark:border-surface-700 dark:bg-surface-900/80 dark:text-surface-100',
          'dark:placeholder:text-surface-500 dark:hover:border-surface-600',
        )}
      />

      <div className="absolute right-4 top-1/2 flex -translate-y-1/2 items-center gap-2">
        {isLoading && <Skeleton className="h-5 w-5 rounded-full" />}
        {value && !isLoading && (
          <button
            type="button"
            onClick={onClear}
            className={cn(
              'inline-flex h-7 w-7 items-center justify-center rounded-md',
              'text-surface-400 transition-colors hover:bg-surface-100 hover:text-surface-600',
              'dark:hover:bg-surface-800 dark:hover:text-surface-200',
            )}
            aria-label="Clear search"
          >
            <X className="h-4 w-4" aria-hidden="true" />
          </button>
        )}
      </div>
    </div>
  )
}
