import { useMemo } from 'react'
import { CHART_THEME } from '../constants/charts'
import { useTheme } from './useTheme'

export function useChartTheme() {
  const { isDark } = useTheme()

  return useMemo(
    () => ({
      isDark,
      colors: isDark ? CHART_THEME.dark : CHART_THEME.light,
    }),
    [isDark],
  )
}
