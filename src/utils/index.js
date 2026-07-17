export * from './errors'
export {
  formatDate,
  formatJoinDate,
  formatNumber,
  formatRepositorySize,
  formatWebsite,
  getLanguageColor,
} from './format'

/**
 * Merges class names, filtering out falsy values.
 * @param {...(string | undefined | null | false)} classes
 * @returns {string}
 */
export function cn(...classes) {
  return classes.filter(Boolean).join(' ')
}

/**
 * Resolves a stored theme preference against the system color scheme.
 * @param {'light' | 'dark' | 'system'} theme
 * @returns {'light' | 'dark'}
 */
export function resolveTheme(theme) {
  if (theme === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }

  return theme
}

/**
 * Reads a value from localStorage safely.
 * @param {string} key
 * @param {string | null} fallback
 * @returns {string | null}
 */
export function getStorageItem(key, fallback = null) {
  try {
    return localStorage.getItem(key) ?? fallback
  } catch {
    return fallback
  }
}

/**
 * Writes a value to localStorage safely.
 * @param {string} key
 * @param {string} value
 */
export function setStorageItem(key, value) {
  try {
    localStorage.setItem(key, value)
  } catch {
    // Storage may be unavailable in private browsing or restricted contexts.
  }
}
