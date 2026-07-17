/**
 * @param {number} value
 * @returns {string}
 */
export function formatNumber(value) {
  return new Intl.NumberFormat('en-US', {
    notation: value >= 10_000 ? 'compact' : 'standard',
    maximumFractionDigits: 1,
  }).format(value)
}

/**
 * @param {string} dateString
 * @returns {string}
 */
export function formatDate(dateString) {
  if (!dateString) return '—'

  return new Intl.DateTimeFormat('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}

/**
 * @param {string} dateString
 * @returns {string}
 */
export function formatJoinDate(dateString) {
  if (!dateString) return '—'

  return new Intl.DateTimeFormat('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  }).format(new Date(dateString))
}

/**
 * @param {string | null | undefined} url
 * @returns {string | null}
 */
export function formatWebsite(url) {
  if (!url) return null

  return url.replace(/^https?:\/\//, '').replace(/\/$/, '')
}

/**
 * @param {number} kilobytes
 * @returns {string}
 */
export function formatRepositorySize(kilobytes = 0) {
  if (kilobytes < 1024) return `${formatNumber(kilobytes)} KB`
  return `${formatNumber(kilobytes / 1024)} MB`
}

/**
 * @param {string} language
 * @param {Record<string, string>} colorMap
 * @returns {string}
 */
export function getLanguageColor(language, colorMap) {
  if (!language) return colorMap.default
  return colorMap[language] ?? colorMap.default
}
