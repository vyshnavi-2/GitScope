import { cn } from '../../utils'

export default function Skeleton({ className, ...props }) {
  return (
    <div
      className={cn(
        'animate-pulse rounded-lg bg-surface-200 dark:bg-surface-800',
        className,
      )}
      aria-hidden="true"
      {...props}
    />
  )
}

export function UserResultSkeleton() {
  return (
    <div className="flex items-center gap-4 rounded-xl border border-surface-200 bg-white p-4 dark:border-surface-800 dark:bg-surface-900">
      <Skeleton className="h-12 w-12 shrink-0 rounded-full" />
      <div className="flex flex-1 flex-col gap-2">
        <Skeleton className="h-4 w-32" />
        <Skeleton className="h-3 w-48" />
      </div>
    </div>
  )
}
