import { motion } from 'framer-motion'
import { Card } from '../common'
import { cn } from '../../utils'

export default function ChartCard({
  title,
  description,
  children,
  className,
  delay = 0,
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay }}
    >
      <Card className={cn('h-full', className)}>
        <div className="mb-5 space-y-1">
          <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100">
            {title}
          </h3>
          {description && (
            <p className="text-sm text-surface-500 dark:text-surface-400">
              {description}
            </p>
          )}
        </div>
        {children}
      </Card>
    </motion.div>
  )
}
