import { cn } from '../../utils'

export default function Spinner({ className, size = 'md' }) {
  const sizes = {
    sm: 'h-4 w-4 border-2',
    md: 'h-5 w-5 border-2',
    lg: 'h-6 w-6 border-[2.5px]',
  }

  return (
    <span
      role="status"
      aria-label="Loading"
      className={cn(
        'inline-block animate-spin rounded-full border-surface-300 border-t-accent-500',
        'dark:border-surface-600 dark:border-t-accent-400',
        sizes[size],
        className,
      )}
    />
  )
}
