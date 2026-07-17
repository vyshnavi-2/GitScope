import { cn } from '../../utils'

export default function PageShell({ children, className, ...props }) {
  return (
    <div className={cn('py-10 sm:py-12', className)} {...props}>
      {children}
    </div>
  )
}
