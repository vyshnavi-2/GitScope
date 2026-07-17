import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { cn } from '../../utils'
import Button from './Button'

export default function ActionCard({
  title,
  description,
  to,
  actionLabel,
  icon: Icon = ArrowRight,
  variant = 'primary',
  className,
}) {
  return (
    <section
      className={cn(
        'group flex flex-col gap-4 rounded-2xl border border-surface-200 bg-white/80 p-6 shadow-sm',
        'transition-all duration-300 hover:-translate-y-0.5 hover:border-accent-500/25 hover:shadow-lg hover:shadow-accent-500/10',
        'sm:flex-row sm:items-center sm:justify-between',
        'dark:border-surface-800 dark:bg-surface-900/80',
        className,
      )}
    >
      <div>
        <h2 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
          {title}
        </h2>
        <p className="mt-1 text-sm leading-6 text-surface-500 dark:text-surface-400">
          {description}
        </p>
      </div>
      <Button as={Link} to={to} variant={variant} className="shrink-0">
        {actionLabel}
        <Icon className="h-4 w-4" aria-hidden="true" />
      </Button>
    </section>
  )
}
