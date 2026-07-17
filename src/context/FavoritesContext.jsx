import { useCallback, useEffect, useMemo, useState } from 'react'
import { FAVORITES_STORAGE_KEY } from '../constants'
import { getStorageItem, setStorageItem } from '../utils'
import { FavoritesContext } from './favoritesContextValue'

function normalizeFavorite(user) {
  if (!user?.login) return null

  return {
    id: user.id ?? user.login,
    login: user.login,
    name: user.name ?? null,
    avatar_url: user.avatar_url ?? '',
    html_url: user.html_url ?? `https://github.com/${user.login}`,
    bio: user.bio ?? null,
    location: user.location ?? null,
    company: user.company ?? null,
    blog: user.blog ?? '',
    followers: user.followers ?? 0,
    following: user.following ?? 0,
    public_repos: user.public_repos ?? 0,
    created_at: user.created_at ?? null,
    saved_at: new Date().toISOString(),
  }
}

function readFavorites() {
  const raw = getStorageItem(FAVORITES_STORAGE_KEY, '[]')

  try {
    const parsed = JSON.parse(raw)
    return Array.isArray(parsed)
      ? parsed.filter((favorite) => favorite?.login)
      : []
  } catch {
    return []
  }
}

export function FavoritesProvider({ children }) {
  const [favorites, setFavorites] = useState(readFavorites)

  useEffect(() => {
    setStorageItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites))
  }, [favorites])

  const addFavorite = useCallback((user) => {
    const favorite = normalizeFavorite(user)
    if (!favorite) return

    setFavorites((current) => {
      const withoutExisting = current.filter(
        (item) => item.login.toLowerCase() !== favorite.login.toLowerCase(),
      )
      return [favorite, ...withoutExisting]
    })
  }, [])

  const removeFavorite = useCallback((login) => {
    setFavorites((current) =>
      current.filter((item) => item.login.toLowerCase() !== login.toLowerCase()),
    )
  }, [])

  const toggleFavorite = useCallback((user) => {
    if (!user?.login) return

    setFavorites((current) => {
      const exists = current.some(
        (item) => item.login.toLowerCase() === user.login.toLowerCase(),
      )

      if (exists) {
        return current.filter(
          (item) => item.login.toLowerCase() !== user.login.toLowerCase(),
        )
      }

      const favorite = normalizeFavorite(user)
      return favorite ? [favorite, ...current] : current
    })
  }, [])

  const isFavorite = useCallback(
    (login) =>
      Boolean(login) &&
      favorites.some((item) => item.login.toLowerCase() === login.toLowerCase()),
    [favorites],
  )

  const value = useMemo(
    () => ({
      favorites,
      favoriteCount: favorites.length,
      addFavorite,
      removeFavorite,
      toggleFavorite,
      isFavorite,
    }),
    [addFavorite, favorites, isFavorite, removeFavorite, toggleFavorite],
  )

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  )
}
