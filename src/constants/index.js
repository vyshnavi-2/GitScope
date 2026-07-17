export const APP_NAME = 'GitScope'
export const APP_TAGLINE = 'GitHub Developer Dashboard'
export const APP_DESCRIPTION =
  'A premium dashboard for exploring GitHub profiles, repositories, and developer insights.'

export const ROUTES = {
  HOME: '/',
  DASHBOARD: '/dashboard',
  DASHBOARD_USER: '/dashboard/:username',
  REPOSITORIES: '/repositories',
  REPOSITORIES_USER: '/repositories/:username',
  ANALYTICS: '/analytics',
  ANALYTICS_USER: '/analytics/:username',
  COMPARE: '/compare',
  FAVORITES: '/favorites',
  NOT_FOUND: '*',
}

export const getDashboardPath = (username) => `/dashboard/${username}`
export const getRepositoriesPath = (username) => `/repositories/${username}`
export const getAnalyticsPath = (username) => `/analytics/${username}`

export const NAV_LINKS = [
  { label: 'Home', path: ROUTES.HOME },
  { label: 'Dashboard', path: ROUTES.DASHBOARD },
  { label: 'Repositories', path: ROUTES.REPOSITORIES },
]

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || 'https://api.github.com'

export const API_TIMEOUT = 15_000

export const GITHUB_API_VERSION = '2022-11-28'

export const THEME_STORAGE_KEY = 'gitscope-theme'

export const FAVORITES_STORAGE_KEY = 'gitscope-favorite-developers'

export const RECENT_SEARCHES_STORAGE_KEY = 'gitscope-recent-searches'

export const RECENT_SEARCHES_LIMIT = 8

export const THEMES = {
  LIGHT: 'light',
  DARK: 'dark',
  SYSTEM: 'system',
}

export const FOOTER_LINKS = [
  { label: 'GitHub', href: 'https://github.com', external: true },
  { label: 'Documentation', href: 'https://docs.github.com', external: true },
  { label: 'API', href: 'https://docs.github.com/en/rest', external: true },
]

export const CURRENT_YEAR = new Date().getFullYear()

export const SEARCH_DEBOUNCE_MS = 500
