import { useCallback, useEffect, useMemo, useState } from 'react'
import {
  THEME_STORAGE_KEY,
  THEMES,
} from '../constants'
import { getStorageItem, resolveTheme, setStorageItem } from '../utils'
import { ThemeContext } from './themeContextValue'

function getInitialTheme() {
  const stored = getStorageItem(THEME_STORAGE_KEY, THEMES.SYSTEM)
  return Object.values(THEMES).includes(stored) ? stored : THEMES.SYSTEM
}

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(getInitialTheme)
  const [resolvedTheme, setResolvedTheme] = useState(() =>
    resolveTheme(getInitialTheme()),
  )

  const applyTheme = useCallback((nextTheme) => {
    const resolved = resolveTheme(nextTheme)
    const root = document.documentElement

    root.classList.toggle('dark', resolved === 'dark')
    root.dataset.theme = resolved
    setResolvedTheme(resolved)
  }, [])

  const setTheme = useCallback(
    (nextTheme) => {
      setThemeState(nextTheme)
      setStorageItem(THEME_STORAGE_KEY, nextTheme)
      applyTheme(nextTheme)
    },
    [applyTheme],
  )

  const toggleTheme = useCallback(() => {
    const nextResolved = resolvedTheme === 'dark' ? THEMES.LIGHT : THEMES.DARK
    setTheme(nextResolved)
  }, [resolvedTheme, setTheme])

  useEffect(() => {
    applyTheme(theme)
  }, [applyTheme, theme])

  useEffect(() => {
    if (theme !== THEMES.SYSTEM) return undefined

    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')

    const handleChange = () => applyTheme(THEMES.SYSTEM)

    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [applyTheme, theme])

  const value = useMemo(
    () => ({
      theme,
      resolvedTheme,
      isDark: resolvedTheme === 'dark',
      setTheme,
      toggleTheme,
    }),
    [theme, resolvedTheme, setTheme, toggleTheme],
  )

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  )
}
