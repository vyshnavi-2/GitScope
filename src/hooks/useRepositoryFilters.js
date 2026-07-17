import { useMemo, useState } from 'react'
import { REPO_SORT_OPTIONS } from '../constants/repositories'

export function useRepositoryFilters(repositories) {
  const [search, setSearch] = useState('')
  const [sortBy, setSortBy] = useState(REPO_SORT_OPTIONS.STARS)
  const [language, setLanguage] = useState('all')

  const languages = useMemo(() => {
    const unique = new Set(
      repositories
        .map((repo) => repo.language)
        .filter(Boolean),
    )

    return ['all', ...Array.from(unique).sort()]
  }, [repositories])

  const filteredRepositories = useMemo(() => {
    const query = search.trim().toLowerCase()

    let result = repositories.filter((repo) => {
      const matchesSearch =
        !query ||
        repo.name.toLowerCase().includes(query) ||
        repo.description?.toLowerCase().includes(query) ||
        repo.topics?.some((topic) => topic.toLowerCase().includes(query))

      const matchesLanguage =
        language === 'all' || repo.language === language

      return matchesSearch && matchesLanguage
    })

    result = [...result].sort((a, b) => {
      switch (sortBy) {
        case REPO_SORT_OPTIONS.STARS:
          return b.stargazers_count - a.stargazers_count
        case REPO_SORT_OPTIONS.UPDATED:
          return new Date(b.updated_at) - new Date(a.updated_at)
        case REPO_SORT_OPTIONS.NAME:
          return a.name.localeCompare(b.name)
        default:
          return 0
      }
    })

    return result
  }, [repositories, search, sortBy, language])

  return {
    search,
    setSearch,
    sortBy,
    setSortBy,
    language,
    setLanguage,
    languages,
    filteredRepositories,
    totalCount: repositories.length,
    filteredCount: filteredRepositories.length,
  }
}
