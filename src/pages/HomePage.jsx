import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import { useLocation, useNavigate } from 'react-router-dom'
import {
  Activity,
  BarChart3,
  GitBranch,
  Search,
  Shield,
  Zap,
} from 'lucide-react'
import {
  Card,
  Container,
  SearchBar,
  SearchSuggestions,
} from '../components/common'
import { GradientBackground, GitHubIllustration } from '../components/landing'
import { APP_DESCRIPTION, APP_NAME, getDashboardPath } from '../constants'
import { useGitHubSearch } from '../hooks/useGitHubSearch'
import { useRecentSearches } from '../hooks/useRecentSearches'
import { useToast } from '../hooks/useToast'

const FEATURES = [
  {
    icon: Search,
    title: 'Instant User Lookup',
    description:
      'Find any GitHub developer in seconds with debounced, real-time search.',
  },
  {
    icon: BarChart3,
    title: 'Developer Insights',
    description:
      'Visualize contributions, activity trends, and repository performance at a glance.',
  },
  {
    icon: Activity,
    title: 'Activity Tracking',
    description:
      'Monitor contribution patterns and engagement metrics across repositories.',
  },
  {
    icon: GitBranch,
    title: 'Repository Overview',
    description:
      'Browse repositories with a clean, structured layout designed for quick scanning.',
  },
  {
    icon: Shield,
    title: 'Production Ready',
    description:
      'Built with error handling, rate-limit awareness, and scalable architecture.',
  },
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      'Optimized with debounced requests, skeleton loaders, and smooth animations.',
  },
]

const fadeUp = {
  initial: { opacity: 0, y: 24 },
  animate: { opacity: 1, y: 0 },
}

const staggerContainer = {
  animate: {
    transition: { staggerChildren: 0.1 },
  },
}

export default function HomePage() {
  const navigate = useNavigate()
  const location = useLocation()
  const searchInputRef = useRef(null)
  const lastErrorRef = useRef(null)
  const [isSuggestionsOpen, setIsSuggestionsOpen] = useState(false)
  const [activeIndex, setActiveIndex] = useState(0)
  const {
    query,
    setQuery,
    isLoading,
    showSkeleton,
    showError,
    users,
    error,
  } = useGitHubSearch()
  const { recentSearches, addRecentSearch } = useRecentSearches()
  const { showToast } = useToast()

  const suggestionItems = useMemo(
    () =>
      users.length > 0
        ? users.map((user) => user.login)
        : recentSearches,
    [recentSearches, users],
  )

  const selectDeveloper = useCallback(
    (login) => {
      if (!login) return
      addRecentSearch(login)
      setIsSuggestionsOpen(false)
      setQuery(login)
      navigate(getDashboardPath(login))
    },
    [addRecentSearch, navigate, setQuery],
  )

  useEffect(() => {
    const handleShortcut = (event) => {
      if (event.key === 'Escape') {
        setIsSuggestionsOpen(false)
      }
    }

    window.addEventListener('keydown', handleShortcut)
    return () => window.removeEventListener('keydown', handleShortcut)
  }, [])

  useEffect(() => {
    setActiveIndex(0)
    if (query.trim()) {
      setIsSuggestionsOpen(true)
    }
  }, [query])

  useEffect(() => {
    if (location.hash !== '#search') return

    searchInputRef.current?.focus()
    setIsSuggestionsOpen(true)
  }, [location.hash])

  useEffect(() => {
    if (!showError || !error?.message || lastErrorRef.current === error.message) {
      return
    }

    lastErrorRef.current = error.message
    showToast({ type: 'error', message: error.message })
  }, [error, showError, showToast])

  const handleClear = () => {
    setQuery('')
    setIsSuggestionsOpen(recentSearches.length > 0)
  }

  const handleSearchKeyDown = (event) => {
    if (event.key === 'ArrowDown') {
      event.preventDefault()
      setIsSuggestionsOpen(true)
      setActiveIndex((index) =>
        suggestionItems.length ? (index + 1) % suggestionItems.length : 0,
      )
      return
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault()
      setIsSuggestionsOpen(true)
      setActiveIndex((index) =>
        suggestionItems.length
          ? (index - 1 + suggestionItems.length) % suggestionItems.length
          : 0,
      )
      return
    }

    if (event.key === 'Enter' && isSuggestionsOpen) {
      event.preventDefault()
      selectDeveloper(suggestionItems[activeIndex] ?? query.trim())
      return
    }

    if (event.key === 'Escape') {
      setIsSuggestionsOpen(false)
    }
  }

  return (
    <div className="relative">
      <GradientBackground />

      {/* Hero */}
      <section className="relative pt-16 pb-20 sm:pt-20 sm:pb-28 lg:pt-24">
        <Container>
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
            <motion.div
              variants={staggerContainer}
              initial="initial"
              animate="animate"
              className="text-center lg:text-left"
            >
              <motion.div variants={fadeUp} transition={{ duration: 0.5 }}>
                <span className="inline-flex items-center rounded-full border border-accent-500/20 bg-accent-500/10 px-3.5 py-1.5 text-xs font-medium tracking-wide text-accent-600 uppercase dark:text-accent-400">
                  Premium GitHub Dashboard
                </span>
              </motion.div>

              <motion.h1
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="mt-6 text-balance text-4xl font-bold tracking-tight text-surface-900 sm:text-5xl lg:text-[3.5rem] lg:leading-[1.1] dark:text-surface-50"
              >
                Understand GitHub
                <span className="mt-1 block bg-gradient-to-r from-accent-500 via-emerald-400 to-teal-500 bg-clip-text text-transparent">
                  like never before
                </span>
              </motion.h1>

              <motion.p
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="mx-auto mt-6 max-w-xl text-lg leading-relaxed text-surface-600 lg:mx-0 dark:text-surface-400"
              >
                {APP_DESCRIPTION} Search any developer to get started.
              </motion.p>

              <motion.div
                variants={fadeUp}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="mx-auto mt-10 max-w-xl lg:mx-0"
              >
                <SearchBar
                  inputRef={searchInputRef}
                  value={query}
                  onChange={setQuery}
                  onClear={handleClear}
                  onFocus={() => setIsSuggestionsOpen(true)}
                  onKeyDown={handleSearchKeyDown}
                  isLoading={isLoading}
                  placeholder={`Search a ${APP_NAME} developer…`}
                />

                <SearchSuggestions
                  isOpen={isSuggestionsOpen && !showError}
                  showSkeleton={showSkeleton}
                  users={users}
                  recentSearches={recentSearches}
                  activeIndex={activeIndex}
                  onHover={setActiveIndex}
                  onSelect={selectDeveloper}
                />
              </motion.div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: 'easeOut' }}
              className="hidden lg:block"
            >
              <GitHubIllustration />
            </motion.div>
          </div>

          {/* Mobile illustration */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="mx-auto mt-8 max-w-xs lg:hidden"
          >
            <GitHubIllustration />
          </motion.div>
        </Container>
      </section>

      {/* Features */}
      <section className="relative border-t border-surface-200/60 bg-white/50 py-20 backdrop-blur-sm sm:py-24 dark:border-surface-800/60 dark:bg-surface-900/30">
        <Container>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-80px' }}
            transition={{ duration: 0.5 }}
            className="mx-auto max-w-2xl text-center"
          >
            <h2 className="text-3xl font-bold tracking-tight text-surface-900 sm:text-4xl dark:text-surface-50">
              Everything you need
            </h2>
            <p className="mt-4 text-surface-600 dark:text-surface-400">
              A thoughtfully crafted toolkit for exploring GitHub profiles,
              repositories, and developer activity.
            </p>
          </motion.div>

          <motion.div
            variants={staggerContainer}
            initial="initial"
            whileInView="animate"
            viewport={{ once: true, margin: '-60px' }}
            className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {FEATURES.map(({ icon: Icon, title, description }) => (
              <motion.div
                key={title}
                variants={fadeUp}
                transition={{ duration: 0.4 }}
              >
                <Card variant="interactive" className="group h-full">
                  <div className="mb-4 inline-flex rounded-lg bg-accent-500/10 p-2.5 text-accent-500 transition-colors group-hover:bg-accent-500/15">
                    <Icon className="h-5 w-5" aria-hidden="true" />
                  </div>
                  <h3 className="text-lg font-semibold text-surface-900 dark:text-surface-100">
                    {title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-surface-500 dark:text-surface-400">
                    {description}
                  </p>
                </Card>
              </motion.div>
            ))}
          </motion.div>
        </Container>
      </section>
    </div>
  )
}
