import { LANGUAGE_COLORS } from '../constants/repositories'

export const CHART_PALETTE = [
  '#10b981',
  '#6366f1',
  '#f59e0b',
  '#ec4899',
  '#06b6d4',
  '#8b5cf6',
  '#f97316',
  '#14b8a6',
  '#ef4444',
  '#84cc16',
]

export const CHART_ANIMATION = {
  duration: 900,
  easing: 'ease-out',
}

export function getChartColor(name, index) {
  return LANGUAGE_COLORS[name] ?? CHART_PALETTE[index % CHART_PALETTE.length]
}

export const CHART_THEME = {
  light: {
    grid: '#e2e8f0',
    axis: '#64748b',
    tooltipBg: '#ffffff',
    tooltipBorder: '#e2e8f0',
    tooltipText: '#0f172a',
  },
  dark: {
    grid: '#334155',
    axis: '#94a3b8',
    tooltipBg: '#1e293b',
    tooltipBorder: '#334155',
    tooltipText: '#f1f5f9',
  },
}
