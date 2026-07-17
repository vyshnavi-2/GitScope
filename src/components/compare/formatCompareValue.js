import { formatNumber } from '../../utils/format'

export function formatCompareValue(key, value) {
  if (key === 'accountAgeDays') {
    const years = Math.floor(value / 365)
    const days = value % 365
    if (years > 0) return `${years}y ${days}d`
    return `${days} days`
  }

  return formatNumber(value)
}
