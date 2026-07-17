import { Link } from 'react-router-dom'
import { BarChart3, FolderGit2, Search, UserRound } from 'lucide-react'
import {
  ActionCard,
  Button,
  Container,
  EmptyState,
  ErrorState,
  PageShell,
} from '../components/common'
import {
  GitHubScoreCard,
  ProfileHeader,
  ProfileSkeleton,
  ProfileStats,
} from '../components/dashboard'
import { getAnalyticsPath, getRepositoriesPath, ROUTES } from '../constants'
import { useActiveUsername } from '../hooks/useActiveUsername'
import { useGitHubUser } from '../hooks/useGitHubUser'
import { useUserRepositories } from '../hooks/useUserRepositories'

export default function DashboardPage() {
  const username = useActiveUsername()
  const { user, isLoading, isError, error } = useGitHubUser(username)
  const {
    repositories,
    isLoading: isRepositoriesLoading,
  } = useUserRepositories(username, { maxPages: 2 })

  if (!username) {
    return (
      <PageShell>
        <Container>
          <EmptyState
            icon={UserRound}
            title="No profile selected"
            description="Search for a GitHub developer on the home page to view their profile dashboard."
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
      <Container>
        {isLoading && <ProfileSkeleton />}

        {isError && (
          <ErrorState error={error} title="Unable to load profile" />
        )}

        {user && (
          <div className="space-y-8">
            <ProfileHeader user={user} />
            <GitHubScoreCard
              user={user}
              repositories={repositories}
              isLoading={isRepositoriesLoading}
            />
            <ProfileStats user={user} />

            <div className="grid gap-4 lg:grid-cols-2">
              <ActionCard
                title="Explore repositories"
                description={`Browse, search, and filter all public repositories for @${user.login}.`}
                to={getRepositoriesPath(user.login)}
                actionLabel="View Repositories"
                icon={FolderGit2}
              />

              <ActionCard
                title="View insights"
                description={`Charts and analytics generated from @${user.login}'s repository data.`}
                to={getAnalyticsPath(user.login)}
                actionLabel="Open Analytics"
                icon={BarChart3}
                variant="secondary"
              />
            </div>
          </div>
        )}
      </Container>
    </PageShell>
  )
}
