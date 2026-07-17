import { useCallback, useEffect, useState } from 'react'
import {
  RECENT_SEARCHES_LIMIT,
  RECENT_SEARCHES_STORAGE_KEY,
} from '../constants'
import { getStorageItem, setStorageItem } from '../utils'

function readRecentSearches() {
  const raw = getStorageItem(RECENT_SEARCHES_STORAGE_KEY, '[]')

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed)
      ? parsed.filter((item) => typeof item === 'string' && item.trim())
      : []
  } catch {
    return []
  }
}

export function useRecentSearches() {
  const [recentSearches, setRecentSearches] = useState(readRecentSearches)

  useEffect(() => {
    setStorageItem(RECENT_SEARCHES_STORAGE_KEY, JSON.stringify(recentSearches))
  }, [recentSearches])

  const addRecentSearch = useCallback((value) => {
    const search = value.trim().replace(/^@+/, '')
    if (!search) return

    setRecentSearches((current) => [
      search,
      ...current.filter((item) => item.toLowerCase() !== search.toLowerCase()),
    ].slice(0, RECENT_SEARCHES_LIMIT))
  }, [])

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([])
  }, [])

  return {
    recentSearches,
    addRecentSearch,
    clearRecentSearches,
  }
}
