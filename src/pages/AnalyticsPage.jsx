import { lazy, Suspense } from 'react'
import { Link } from 'react-router-dom'
import { BarChart3, Search } from 'lucide-react'
import { Button, Container, EmptyState, ErrorState, PageShell, Skeleton } from '../components/common'
import { RepositorySkeleton } from '../components/repository'
import { ROUTES } from '../constants'
import { useActiveUsername } from '../hooks/useActiveUsername'
import { useUserRepositories } from '../hooks/useUserRepositories'

const AnalyticsDashboard = lazy(() =>
  import('../components/charts/AnalyticsDashboard'),
)

function AnalyticsSkeleton() {
  return (
    <div className="space-y-6" role="status" aria-label="Loading analytics">
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {Array.from({ length: 4 }).map((_, index) => (
          <Skeleton key={index} className="h-28 rounded-xl" />
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        {Array.from({ length: 5 }).map((_, index) => (
          <Skeleton key={index} className="h-80 rounded-2xl" />
        ))}
      </div>
    </div>
  )
}

export default function AnalyticsPage() {
  const username = useActiveUsername()
  const { repositories, isLoading, isError, error } = useUserRepositories(username)

  if (!username) {
    return (
      <PageShell>
        <Container>
          <EmptyState
            icon={BarChart3}
            title="No analytics to display"
            description="Search for a GitHub developer on the home page to view their repository insights."
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
        {isLoading && <RepositorySkeleton count={3} />}

        {isError && (
          <ErrorState error={error} title="Unable to load analytics" />
        )}

        {!isLoading && !isError && repositories.length === 0 && (
          <EmptyState
            icon={BarChart3}
            title="No repository data"
            description={`@${username} has no public repositories to analyze.`}
          />
        )}

        {!isLoading && !isError && repositories.length > 0 && (
          <Suspense fallback={<AnalyticsSkeleton />}>
            <AnalyticsDashboard
              repositories={repositories}
              username={username}
            />
          </Suspense>
        )}
      </Container>
    </PageShell>
  )
}
