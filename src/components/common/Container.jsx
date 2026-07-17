import { cn } from '../../utils'

const maxWidths = {
  sm: 'max-w-3xl',
  md: 'max-w-5xl',
  lg: 'max-w-6xl',
  xl: 'max-w-7xl',
  full: 'max-w-full',
}

export default function Container({
  as: Component = 'div',
  size = 'xl',
  className,
  children,
  ...props
}) {
  return (
    <Component
      className={cn(
        'mx-auto w-full px-4 sm:px-6 lg:px-8',
        maxWidths[size],
        className,
      )}
      {...props}
    >
      {children}
    </Component>
  )
}
