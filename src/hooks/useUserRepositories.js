import { useEffect, useState } from 'react'
import { getUserRepositories } from '../services/github'
import { mapApiError, FETCH_STATUS } from '../utils/errors'

export function useUserRepositories(username, options = {}) {
  const { maxPages } = options
  const [status, setStatus] = useState(FETCH_STATUS.IDLE)
  const [repositories, setRepositories] = useState([])
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) {
      setStatus(FETCH_STATUS.IDLE)
      setRepositories([])
      setError(null)
      return undefined
    }

    const controller = new AbortController()

    async function fetchRepositories() {
      setStatus(FETCH_STATUS.LOADING)
      setError(null)

      try {
        const data = await getUserRepositories(username, {
          signal: controller.signal,
          maxPages,
        })
        setRepositories(data)
        setStatus(FETCH_STATUS.SUCCESS)
      } catch (err) {
        if (err?.originalError?.code === 'ERR_CANCELED') return

        setRepositories([])
        setError(mapApiError(err, 'repositories'))
        setStatus(FETCH_STATUS.ERROR)
      }
    }

    fetchRepositories()

    return () => controller.abort()
  }, [maxPages, username])

  return {
    repositories,
    error,
    status,
    isLoading: status === FETCH_STATUS.LOADING,
    isSuccess: status === FETCH_STATUS.SUCCESS,
    isError: status === FETCH_STATUS.ERROR,
  }
}
