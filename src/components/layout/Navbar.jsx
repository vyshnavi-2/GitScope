import { useState } from 'react'
import { NavLink, useParams } from 'react-router-dom'
import { AnimatePresence, motion } from 'framer-motion'
import { Heart, Menu, X } from 'lucide-react'
import { Logo, ThemeToggle } from '../common'
import {
  getAnalyticsPath,
  getDashboardPath,
  getRepositoriesPath,
  ROUTES,
} from '../../constants'
import { cn } from '../../utils'

const NAV_ITEMS = [
  { label: 'Home', resolvePath: () => ROUTES.HOME },
  {
    label: 'Dashboard',
    resolvePath: (username) =>
      username ? getDashboardPath(username) : ROUTES.DASHBOARD,
  },
  {
    label: 'Repositories',
    resolvePath: (username) =>
      username ? getRepositoriesPath(username) : ROUTES.REPOSITORIES,
  },
  {
    label: 'Analytics',
    resolvePath: (username) =>
      username ? getAnalyticsPath(username) : ROUTES.ANALYTICS,
  },
  {
    label: 'Compare',
    resolvePath: () => ROUTES.COMPARE,
  },
  {
    label: 'Favorites',
    resolvePath: () => ROUTES.FAVORITES,
  },
]

function NavItem({ to, label, onClick }) {
  const isFavorites = label === 'Favorites'

  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cn(
          'inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
          isActive
            ? 'bg-accent-500/10 text-accent-600 dark:text-accent-400'
            : 'text-surface-600 hover:bg-surface-100 hover:text-surface-900 dark:text-surface-300 dark:hover:bg-surface-800 dark:hover:text-surface-100',
        )
      }
    >
      {isFavorites && <Heart className="h-3.5 w-3.5" aria-hidden="true" />}
      {label}
    </NavLink>
  )
}

export default function Navbar() {
  const { username } = useParams()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const closeMobileMenu = () => setIsMobileMenuOpen(false)
  const navLinks = NAV_ITEMS.map((item) => ({
    label: item.label,
    path: item.resolvePath(username),
  }))

  return (
    <header className="sticky top-0 z-50 border-b border-surface-200/80 bg-surface-50/80 backdrop-blur-md dark:border-surface-800/80 dark:bg-surface-950/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        <nav
          className="hidden items-center gap-1 md:flex"
          aria-label="Main navigation"
        >
          {navLinks.map((link) => (
            <NavItem key={link.label} to={link.path} label={link.label} />
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <button
            type="button"
            className={cn(
              'inline-flex h-10 w-10 items-center justify-center rounded-lg md:hidden',
              'border border-surface-200 bg-surface-100 text-surface-600',
              'hover:bg-surface-200 dark:border-surface-700 dark:bg-surface-800',
              'dark:text-surface-300 dark:hover:bg-surface-700',
            )}
            onClick={() => setIsMobileMenuOpen((prev) => !prev)}
            aria-expanded={isMobileMenuOpen}
            aria-controls="mobile-nav"
            aria-label={isMobileMenuOpen ? 'Close menu' : 'Open menu'}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" aria-hidden="true" />
            ) : (
              <Menu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.nav
            id="mobile-nav"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="overflow-hidden border-t border-surface-200 md:hidden dark:border-surface-800"
            aria-label="Mobile navigation"
          >
            <div className="flex flex-col gap-1 px-4 py-3">
              {navLinks.map((link) => (
                <NavItem
                  key={link.label}
                  to={link.path}
                  label={link.label}
                  onClick={closeMobileMenu}
                />
              ))}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  )
}
