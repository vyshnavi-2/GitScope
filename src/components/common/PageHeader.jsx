import { cn } from '../../utils'

export default function PageHeader({
  eyebrow,
  icon: Icon,
  title,
  description,
  action,
  tone = 'accent',
  className,
}) {
  const tones = {
    accent:
      'border-accent-500/20 bg-accent-500/10 text-accent-600 dark:text-accent-400',
    rose:
      'border-rose-500/20 bg-rose-500/10 text-rose-600 dark:text-rose-300',
    purple:
      'border-purple-500/20 bg-purple-500/10 text-purple-600 dark:text-purple-300',
  }

  return (
    <header
      className={cn(
        'flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between',
        className,
      )}
    >
      <div className="space-y-2">
        {eyebrow && (
          <div
            className={cn(
              'inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wider',
              tones[tone],
            )}
          >
            {Icon && <Icon className="h-3.5 w-3.5" aria-hidden="true" />}
            {eyebrow}
          </div>
        )}
        <h1 className="text-3xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
          {title}
        </h1>
        {description && (
          <p className="max-w-2xl text-surface-600 dark:text-surface-400">
            {description}
          </p>
        )}
      </div>

      {action && <div className="shrink-0">{action}</div>}
    </header>
  )
}
