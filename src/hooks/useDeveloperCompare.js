import { useCallback, useEffect, useRef, useState } from 'react'
import { getGitHubUser, getUserRepositories } from '../services/github'
import { computeDeveloperStats } from '../utils/analytics'
import { isRequestCanceled } from '../utils/cancel'
import { mapApiError, FETCH_STATUS } from '../utils/errors'

const COMPARE_MAX_REPO_PAGES = 5

async function fetchDeveloper(username, signal) {
  const user = await getGitHubUser(username, { signal })

  let repositories = []

  try {
    repositories = await getUserRepositories(username, {
      signal,
      maxPages: COMPARE_MAX_REPO_PAGES,
    })
  } catch (repoError) {
    if (isRequestCanceled(repoError)) throw repoError
    repositories = []
  }

  return {
    user,
    repositories,
    stats: computeDeveloperStats(user, repositories),
  }
}

async function fetchComparableDeveloper(username, signal) {
  try {
    return await fetchDeveloper(username, signal)
  } catch (err) {
    if (isRequestCanceled(err) || signal.aborted) throw err

    const mapped = mapApiError(err, 'developer')
    throw { ...mapped, message: `@${username} — ${mapped.message}` }
  }
}

export function normalizeCompareUsername(value) {
  return value.trim().replace(/^@+/, '')
}

export function isValidComparePair(usernameA, usernameB) {
  const a = normalizeCompareUsername(usernameA)
  const b = normalizeCompareUsername(usernameB)

  return a.length > 0 && b.length > 0 && a.toLowerCase() !== b.toLowerCase()
}

export function useDeveloperCompare(usernameA, usernameB, enabled = false) {
  const [status, setStatus] = useState(FETCH_STATUS.IDLE)
  const [developerA, setDeveloperA] = useState(null)
  const [developerB, setDeveloperB] = useState(null)
  const [error, setError] = useState(null)
  const abortRef = useRef(null)

  const normalizedA = normalizeCompareUsername(usernameA)
  const normalizedB = normalizeCompareUsername(usernameB)
  const canCompare = isValidComparePair(usernameA, usernameB)

  const runCompare = useCallback(async () => {
    if (!canCompare) return

    abortRef.current?.abort()
    const controller = new AbortController()
    abortRef.current = controller

    setStatus(FETCH_STATUS.LOADING)
    setError(null)
    setDeveloperA(null)
    setDeveloperB(null)

    try {
      const [resultA, resultB] = await Promise.all([
        fetchComparableDeveloper(normalizedA, controller.signal),
        fetchComparableDeveloper(normalizedB, controller.signal),
      ])

      if (controller.signal.aborted) return

      setDeveloperA(resultA)
      setDeveloperB(resultB)
      setStatus(FETCH_STATUS.SUCCESS)
    } catch (err) {
      if (isRequestCanceled(err) || controller.signal.aborted) return

      setDeveloperA(null)
      setDeveloperB(null)
      setError(err?.type ? err : mapApiError(err, 'developer'))
      setStatus(FETCH_STATUS.ERROR)
    }
  }, [canCompare, normalizedA, normalizedB])

  useEffect(() => {
    if (!enabled || !canCompare) {
      abortRef.current?.abort()
      if (!enabled) {
        setStatus(FETCH_STATUS.IDLE)
        setDeveloperA(null)
        setDeveloperB(null)
        setError(null)
      }
      return undefined
    }

    runCompare()

    return () => {
      abortRef.current?.abort()
    }
  }, [enabled, canCompare, normalizedA, normalizedB, runCompare])

  return {
    developerA,
    developerB,
    error,
    status,
    canCompare,
    isLoading: status === FETCH_STATUS.LOADING,
    isSuccess: status === FETCH_STATUS.SUCCESS,
    isError: status === FETCH_STATUS.ERROR,
    compare: runCompare,
  }
}

export const COMPARE_METRICS = [
  { key: 'followers', label: 'Followers', higherIsBetter: true },
  { key: 'following', label: 'Following', higherIsBetter: true },
  { key: 'repositories', label: 'Repositories', higherIsBetter: true },
  { key: 'stars', label: 'Total Stars', higherIsBetter: true },
  { key: 'forks', label: 'Total Forks', higherIsBetter: true },
  { key: 'languages', label: 'Languages', higherIsBetter: true },
  { key: 'accountAgeDays', label: 'Account Age', higherIsBetter: true },
]

/**
 * @param {object} statsA
 * @param {object} statsB
 */
export function buildCompareResults(statsA, statsB) {
  return COMPARE_METRICS.map((metric) => {
    const valueA = statsA[metric.key]
    const valueB = statsB[metric.key]

    let winner = 'tie'
    if (valueA > valueB) winner = 'a'
    else if (valueB > valueA) winner = 'b'

    return {
      ...metric,
      valueA,
      valueB,
      winner,
    }
  })
}
