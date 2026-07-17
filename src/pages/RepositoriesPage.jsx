import { Link } from 'react-router-dom'
import { FolderGit2, Search } from 'lucide-react'
import { Button, Container, EmptyState, ErrorState, PageHeader, PageShell, Skeleton } from '../components/common'
import {
  RepositoryFilters,
  RepositoryList,
  RepositorySkeleton,
} from '../components/repository'
import { ProfileHeader } from '../components/dashboard'
import { ROUTES } from '../constants'
import { useActiveUsername } from '../hooks/useActiveUsername'
import { useGitHubUser } from '../hooks/useGitHubUser'
import { useRepositoryFilters } from '../hooks/useRepositoryFilters'
import { useUserRepositories } from '../hooks/useUserRepositories'

export default function RepositoriesPage() {
  const username = useActiveUsername()
  const { user, isLoading: isUserLoading } = useGitHubUser(username)
  const {
    repositories,
    isLoading: isReposLoading,
    isError,
    error,
  } = useUserRepositories(username)

  const {
    search,
    setSearch,
    sortBy,
    setSortBy,
    language,
    setLanguage,
    languages,
    filteredRepositories,
    totalCount,
    filteredCount,
  } = useRepositoryFilters(repositories)

  const isLoading = isUserLoading || isReposLoading

  if (!username) {
    return (
      <PageShell>
        <Container>
          <EmptyState
            icon={FolderGit2}
            title="No repositories to explore"
            description="Search for a GitHub developer on the home page to browse their public repositories."
            action={
              <Button as={Link} to={ROUTES.HOME}>
                <Search className="h-4 w-4" aria-hidden="true" />
                Search Developers
              </Button>
            }
          />
        </Container>
      </PageShell>
    )
  }

  return (
    <PageShell>
      <Container className="space-y-8">
        {isUserLoading && !user ? (
          <Skeleton className="h-48 rounded-2xl" />
        ) : (
          user && <ProfileHeader user={user} />
        )}

        <PageHeader
          eyebrow="Repository Explorer"
          icon={FolderGit2}
          title="Repositories"
          description={`Search, sort, and filter public repositories for @${username}.`}
        />

        {!isLoading && !isError && totalCount > 0 && (
          <RepositoryFilters
            search={search}
            onSearchChange={setSearch}
            sortBy={sortBy}
            onSortChange={setSortBy}
            language={language}
            onLanguageChange={setLanguage}
            languages={languages}
            totalCount={totalCount}
            filteredCount={filteredCount}
          />
        )}

        {isLoading && <RepositorySkeleton />}

        {isError && (
          <ErrorState error={error} title="Unable to load repositories" />
        )}

        {!isLoading && !isError && totalCount === 0 && (
          <EmptyState
            icon={FolderGit2}
            title="No public repositories"
            description={`@${username} doesn't have any public repositories to display.`}
          />
        )}

        {!isLoading && !isError && totalCount > 0 && (
          <RepositoryList repositories={filteredRepositories} />
        )}
      </Container>
    </PageShell>
  )
}
