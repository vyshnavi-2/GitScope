import { motion } from 'framer-motion'
import { GitBranch, GitCommit, GitPullRequest, Star } from 'lucide-react'

const FLOAT_VARIANTS = {
  animate: (custom) => ({
    y: [0, -8, 0],
    transition: {
      duration: 3 + custom * 0.5,
      repeat: Infinity,
      ease: 'easeInOut',
    },
  }),
}

const NODES = [
  { Icon: GitCommit, x: '12%', y: '18%', delay: 0, color: 'text-accent-500' },
  { Icon: GitBranch, x: '78%', y: '22%', delay: 0.4, color: 'text-purple-400' },
  { Icon: GitPullRequest, x: '68%', y: '72%', delay: 0.8, color: 'text-blue-400' },
  { Icon: Star, x: '22%', y: '68%', delay: 1.2, color: 'text-amber-400' },
]

export default function GitHubIllustration({ className }) {
  return (
    <div className={className} aria-hidden="true">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, ease: 'easeOut' }}
        className="relative mx-auto aspect-square w-full max-w-md"
      >
        {/* Glow ring */}
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          className="absolute inset-4 rounded-full bg-gradient-to-tr from-accent-500/20 via-transparent to-purple-500/20 blur-2xl"
        />

        {/* Outer orbit */}
        <div className="absolute inset-0 rounded-full border border-dashed border-surface-300/60 dark:border-surface-700/60" />

        {/* Inner core */}
        <div className="absolute inset-[18%] rounded-full border border-surface-200 bg-white/60 shadow-xl backdrop-blur-md dark:border-surface-700 dark:bg-surface-900/60">
          <div className="absolute inset-0 flex items-center justify-center">
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="flex h-24 w-24 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-emerald-600 shadow-lg shadow-accent-500/30"
            >
              <GitBranch className="h-10 w-10 text-white" strokeWidth={1.5} />
            </motion.div>
          </div>

          {/* Contribution grid */}
          <div className="absolute bottom-6 left-1/2 grid -translate-x-1/2 grid-cols-7 gap-1">
            {Array.from({ length: 21 }).map((_, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + i * 0.03 }}
                className="h-2 w-2 rounded-sm bg-accent-500/30"
                style={{
                  opacity: 0.3 + (i % 5) * 0.15,
                  backgroundColor:
                    i % 3 === 0
                      ? 'var(--color-accent-500)'
                      : i % 3 === 1
                        ? 'color-mix(in srgb, var(--color-accent-500) 60%, transparent)'
                        : 'color-mix(in srgb, var(--color-accent-500) 30%, transparent)',
                }}
              />
            ))}
          </div>
        </div>

        {/* Floating nodes */}
        {NODES.map(({ Icon, x, y, delay, color }, index) => (
          <motion.div
            key={index}
            custom={index}
            variants={FLOAT_VARIANTS}
            animate="animate"
            initial={{ opacity: 0, scale: 0 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay }}
            className="absolute flex h-11 w-11 items-center justify-center rounded-xl border border-surface-200 bg-white shadow-lg dark:border-surface-700 dark:bg-surface-800"
            style={{ left: x, top: y }}
          >
            <Icon className={`h-5 w-5 ${color}`} strokeWidth={1.75} />
          </motion.div>
        ))}

        {/* Connection lines */}
        <svg className="absolute inset-0 h-full w-full" viewBox="0 0 400 400">
          <motion.path
            d="M 80 80 Q 200 120 280 90"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-surface-300 dark:text-surface-700"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, delay: 0.3 }}
          />
          <motion.path
            d="M 90 280 Q 200 240 270 290"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            className="text-surface-300 dark:text-surface-700"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 0.6 }}
            transition={{ duration: 1.5, delay: 0.6 }}
          />
        </svg>
      </motion.div>
    </div>
  )
}
