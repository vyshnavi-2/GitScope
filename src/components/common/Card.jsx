import { cn } from '../../utils'

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
}

const variants = {
  default: 'border-surface-200 bg-white shadow-sm dark:border-surface-800 dark:bg-surface-900',
  interactive:
    'border-surface-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-500/25 hover:shadow-lg hover:shadow-accent-500/10 dark:border-surface-800 dark:bg-surface-900',
  muted:
    'border-surface-200 bg-surface-50/70 shadow-sm dark:border-surface-800 dark:bg-surface-900/70',
}

export default function Card({
  as: Component = 'div',
  className,
  children,
  padding = 'md',
  variant = 'default',
  ...props
}) {
  return (
    <Component
      className={cn(
        'rounded-xl border',
        variants[variant],
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
