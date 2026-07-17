import api from './api'

/**
 * Search GitHub users by login name.
 * @param {string} query
 * @param {{ signal?: AbortSignal }} options
 */
export async function searchGitHubUsers(query, { signal } = {}) {
  const response = await api.get('/search/users', {
    params: {
      q: `${query} in:login`,
      per_page: 6,
      sort: 'followers',
      order: 'desc',
    },
    signal,
  })

  return response.data
}

/**
 * Fetch a GitHub user profile.
 * @param {string} username
 * @param {{ signal?: AbortSignal }} options
 */
export async function getGitHubUser(username, { signal } = {}) {
  const response = await api.get(`/users/${username}`, { signal })
  return response.data
}

/**
 * Fetch all public repositories for a user (paginated).
 * @param {string} username
 * @param {{ signal?: AbortSignal, maxPages?: number }} options
 */
export async function getUserRepositories(username, { signal, maxPages } = {}) {
  const repositories = []
  let page = 1

  while (true) {
    const response = await api.get(`/users/${username}/repos`, {
      params: {
        per_page: 100,
        page,
        sort: 'updated',
        direction: 'desc',
      },
      signal,
    })

    repositories.push(...response.data)

    if (response.data.length < 100) break
    if (maxPages && page >= maxPages) break
    page += 1
  }

  return repositories
}

/**
 * Fetch the plain-text README for a repository.
 * @param {string} owner
 * @param {string} repo
 * @param {{ signal?: AbortSignal }} options
 */
export async function getRepositoryReadme(owner, repo, { signal } = {}) {
  const response = await api.get(`/repos/${owner}/${repo}/readme`, {
    headers: {
      Accept: 'application/vnd.github.raw',
    },
    responseType: 'text',
    signal,
  })

  return response.data
}
