import { useEffect, useState } from 'react'
import { SEARCH_DEBOUNCE_MS } from '../constants'
import { searchGitHubUsers } from '../services/github'
import { useDebounce } from './useDebounce'

export const SEARCH_STATUS = {
  IDLE: 'idle',
  LOADING: 'loading',
  SUCCESS: 'success',
  ERROR: 'error',
}

export const SEARCH_ERROR_TYPES = {
  NOT_FOUND: 'not_found',
  RATE_LIMIT: 'rate_limit',
  NETWORK: 'network',
  UNKNOWN: 'unknown',
}

function mapSearchError(error) {
  const status = error?.status
  const message = error?.message?.toLowerCase() ?? ''

  if (
    status === 403 &&
    (message.includes('rate limit') || message.includes('abuse'))
  ) {
    return {
      type: SEARCH_ERROR_TYPES.RATE_LIMIT,
      message:
        'GitHub API rate limit reached. Please wait a moment or add a token in your .env file.',
    }
  }

  if (
    status === null ||
    message.includes('network') ||
    message.includes('timeout')
  ) {
    return {
      type: SEARCH_ERROR_TYPES.NETWORK,
      message:
        'Unable to reach GitHub. Check your connection and try again.',
    }
  }

  return {
    type: SEARCH_ERROR_TYPES.UNKNOWN,
    message: error?.message || 'Something went wrong. Please try again.',
  }
}

export function useGitHubSearch(debounceMs = SEARCH_DEBOUNCE_MS) {
  const [query, setQuery] = useState('')
  const debouncedQuery = useDebounce(query.trim(), debounceMs)
  const [status, setStatus] = useState(SEARCH_STATUS.IDLE)
  const [users, setUsers] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!debouncedQuery) {
      setStatus(SEARCH_STATUS.IDLE)
      setUsers([])
      setError(null)
      return undefined
    }

    const controller = new AbortController()

    async function runSearch() {
      setStatus(SEARCH_STATUS.LOADING)
      setError(null)

      try {
        const data = await searchGitHubUsers(debouncedQuery, {
          signal: controller.signal,
        })

        if (!data.items?.length) {
          setStatus(SEARCH_STATUS.ERROR)
          setUsers([])
          setError({
            type: SEARCH_ERROR_TYPES.NOT_FOUND,
            message: `No GitHub user found for "${debouncedQuery}".`,
          })
          return
        }

        setUsers(data.items)
        setStatus(SEARCH_STATUS.SUCCESS)
      } catch (err) {
        if (err?.originalError?.code === 'ERR_CANCELED') return

        setStatus(SEARCH_STATUS.ERROR)
        setUsers([])
        setError(mapSearchError(err))
      }
    }

    runSearch()

    return () => controller.abort()
  }, [debouncedQuery])

  const isLoading = status === SEARCH_STATUS.LOADING
  const hasQuery = query.trim().length > 0
  const showSkeleton = isLoading && hasQuery
  const showResults = status === SEARCH_STATUS.SUCCESS && users.length > 0
  const showError = status === SEARCH_STATUS.ERROR && error

  return {
    query,
    setQuery,
    status,
    users,
    error,
    isLoading,
    hasQuery,
    showSkeleton,
    showResults,
    showError,
  }
}
