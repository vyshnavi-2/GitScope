import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'
import { MainLayout } from '../components/layout'
import { Container, Skeleton } from '../components/common'
import { ROUTES } from '../constants'

const AnalyticsPage = lazy(() => import('../pages/AnalyticsPage'))
const ComparePage = lazy(() => import('../pages/ComparePage'))
const DashboardPage = lazy(() => import('../pages/DashboardPage'))
const FavoritesPage = lazy(() => import('../pages/FavoritesPage'))
const HomePage = lazy(() => import('../pages/HomePage'))
const NotFoundPage = lazy(() => import('../pages/NotFoundPage'))
const RepositoriesPage = lazy(() => import('../pages/RepositoriesPage'))

function PageLoader() {
  return (
    <div className="py-10 sm:py-12" role="status" aria-label="Loading page">
      <Container className="space-y-6">
        <Skeleton className="h-8 w-48" />
        <Skeleton className="h-40 w-full rounded-2xl" />
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
          <Skeleton className="h-32 rounded-xl" />
        </div>
      </Container>
    </div>
  )
}

export default function AppRoutes() {
  return (
    <Suspense fallback={<PageLoader />}>
      <Routes>
        <Route element={<MainLayout />}>
          <Route index path={ROUTES.HOME} element={<HomePage />} />
          <Route path={ROUTES.DASHBOARD} element={<DashboardPage />} />
          <Route path={ROUTES.DASHBOARD_USER} element={<DashboardPage />} />
          <Route path={ROUTES.REPOSITORIES} element={<RepositoriesPage />} />
          <Route path={ROUTES.REPOSITORIES_USER} element={<RepositoriesPage />} />
          <Route path={ROUTES.ANALYTICS} element={<AnalyticsPage />} />
          <Route path={ROUTES.ANALYTICS_USER} element={<AnalyticsPage />} />
          <Route path={ROUTES.COMPARE} element={<ComparePage />} />
          <Route path={ROUTES.FAVORITES} element={<FavoritesPage />} />
          <Route path={ROUTES.NOT_FOUND} element={<NotFoundPage />} />
        </Route>
      </Routes>
    </Suspense>
  )
}
