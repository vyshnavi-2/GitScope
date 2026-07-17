/**
 * @param {Array<object>} repositories
 */
export function computeAnalyticsSummary(repositories) {
  const languages = new Set(
    repositories.map((repo) => repo.language).filter(Boolean),
  )

  return {
    totalStars: repositories.reduce(
      (sum, repo) => sum + repo.stargazers_count,
      0,
    ),
    totalForks: repositories.reduce((sum, repo) => sum + repo.forks_count, 0),
    totalRepos: repositories.length,
    languages: languages.size,
  }
}

/**
 * @param {Array<object>} repositories
 */
export function computeLanguageStats(repositories) {
  const counts = {}

  repositories.forEach((repo) => {
    if (!repo.language) return
    counts[repo.language] = (counts[repo.language] ?? 0) + 1
  })

  return Object.entries(counts)
    .map(([name, value]) => ({ name, value }))
    .sort((a, b) => b.value - a.value)
}

/**
 * @param {Array<object>} repositories
 * @param {number} [limit=8]
 */
export function computeStarsData(repositories, limit = 8) {
  return [...repositories]
    .sort((a, b) => b.stargazers_count - a.stargazers_count)
    .slice(0, limit)
    .map((repo) => ({
      name: truncateLabel(repo.name, 14),
      fullName: repo.name,
      stars: repo.stargazers_count,
    }))
}

/**
 * @param {Array<object>} repositories
 */
export function computeTimelineData(repositories) {
  const counts = {}

  repositories.forEach((repo) => {
    const year = new Date(repo.created_at).getFullYear()
    counts[year] = (counts[year] ?? 0) + 1
  })

  return Object.entries(counts)
    .map(([year, count]) => ({ year, count: Number(count) }))
    .sort((a, b) => a.year - b.year)
}

/**
 * @param {Array<object>} repositories
 * @param {number} [limit=8]
 */
export function computeForkData(repositories, limit = 8) {
  return [...repositories]
    .sort((a, b) => b.forks_count - a.forks_count)
    .slice(0, limit)
    .map((repo) => ({
      name: truncateLabel(repo.name, 14),
      fullName: repo.name,
      forks: repo.forks_count,
    }))
}

/**
 * @param {Array<object>} repositories
 * @param {number} [limit=8]
 */
export function computeSizeData(repositories, limit = 8) {
  return [...repositories]
    .filter((repo) => repo.size > 0)
    .sort((a, b) => b.size - a.size)
    .slice(0, limit)
    .map((repo) => ({
      name: truncateLabel(repo.name, 14),
      fullName: repo.name,
      size: repo.size,
    }))
}

/**
 * @param {object} user
 * @param {Array<object>} repositories
 */
export function computeDeveloperStats(user, repositories) {
  const languageSet = new Set(
    repositories.map((repo) => repo.language).filter(Boolean),
  )

  return {
    followers: user.followers,
    following: user.following,
    repositories: user.public_repos,
    stars: repositories.reduce((sum, repo) => sum + repo.stargazers_count, 0),
    forks: repositories.reduce((sum, repo) => sum + repo.forks_count, 0),
    languages: languageSet.size,
    accountAgeDays: getAccountAgeDays(user.created_at),
    languageList: [...languageSet].sort(),
  }
}

/**
 * @param {object} user
 * @param {Array<object>} repositories
 */
export function computeGitHubScore(user, repositories = []) {
  const totals = computeAnalyticsSummary(repositories)
  const accountAgeDays = getAccountAgeDays(user.created_at)

  const score =
    scoreByThreshold(user.followers, 5_000) * 25 +
    scoreByThreshold(user.public_repos, 100) * 20 +
    scoreByThreshold(totals.totalStars, 10_000) * 25 +
    scoreByThreshold(totals.totalForks, 2_500) * 15 +
    scoreByThreshold(accountAgeDays, 365 * 8) * 15

  return Math.min(100, Math.round(score))
}

function scoreByThreshold(value = 0, threshold) {
  return Math.min(1, Math.log10(value + 1) / Math.log10(threshold + 1))
}

/**
 * @param {string} createdAt
 */
export function getAccountAgeDays(createdAt) {
  const created = new Date(createdAt)
  const now = new Date()
  return Math.floor((now - created) / (1000 * 60 * 60 * 24))
}

/**
 * @param {string} label
 * @param {number} max
 */
function truncateLabel(label, max) {
  if (label.length <= max) return label
  return `${label.slice(0, max - 1)}…`
}
