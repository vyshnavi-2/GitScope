import { useEffect, useState } from 'react'
import { getGitHubUser } from '../services/github'
import { mapApiError, FETCH_STATUS } from '../utils/errors'

export function useGitHubUser(username) {
  const [status, setStatus] = useState(FETCH_STATUS.IDLE)
  const [user, setUser] = useState(null)
  const [error, setError] = useState(null)

  useEffect(() => {
    if (!username) {
      setStatus(FETCH_STATUS.IDLE)
      setUser(null)
      setError(null)
      return undefined
    }

    const controller = new AbortController()

    async function fetchUser() {
      setStatus(FETCH_STATUS.LOADING)
      setError(null)

      try {
        const data = await getGitHubUser(username, { signal: controller.signal })
        setUser(data)
        setStatus(FETCH_STATUS.SUCCESS)
      } catch (err) {
        if (err?.originalError?.code === 'ERR_CANCELED') return

        setUser(null)
        setError(mapApiError(err, 'user'))
        setStatus(FETCH_STATUS.ERROR)
      }
    }

    fetchUser()

    return () => controller.abort()
  }, [username])

  return {
    user,
    error,
    status,
    isLoading: status === FETCH_STATUS.LOADING,
    isSuccess: status === FETCH_STATUS.SUCCESS,
    isError: status === FETCH_STATUS.ERROR,
  }
}
