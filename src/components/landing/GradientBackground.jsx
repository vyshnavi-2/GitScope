import { motion } from 'framer-motion'

export default function GradientBackground() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-surface-50 via-surface-50 to-surface-100 dark:from-surface-950 dark:via-surface-950 dark:to-surface-900" />

      {/* Animated orbs */}
      <motion.div
        animate={{ x: [0, 30, 0], y: [0, -20, 0] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-accent-500/15 blur-[100px] dark:bg-accent-500/10"
      />
      <motion.div
        animate={{ x: [0, -25, 0], y: [0, 25, 0] }}
        transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute -right-24 top-20 h-[450px] w-[450px] rounded-full bg-purple-500/10 blur-[90px] dark:bg-purple-500/8"
      />
      <motion.div
        animate={{ x: [0, 20, 0], y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute bottom-0 left-1/3 h-[350px] w-[350px] rounded-full bg-blue-500/8 blur-[80px] dark:bg-blue-500/5"
      />

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.35] dark:opacity-[0.15]"
        style={{
          backgroundImage: `
            linear-gradient(to right, var(--color-surface-300) 1px, transparent 1px),
            linear-gradient(to bottom, var(--color-surface-300) 1px, transparent 1px)
          `,
          backgroundSize: '64px 64px',
          maskImage: 'radial-gradient(ellipse 70% 60% at 50% 30%, black 20%, transparent 70%)',
        }}
      />

      {/* Radial fade */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-surface-50 dark:to-surface-950" />
    </div>
  )
}
