import { Link } from 'react-router-dom'
import { Home } from 'lucide-react'
import { Button, Container } from '../components/common'
import { ROUTES } from '../constants'

export default function NotFoundPage() {
  return (
    <div className="flex flex-1 items-center py-20">
      <Container className="text-center">
        <p className="text-sm font-medium uppercase tracking-wider text-accent-500">
          404
        </p>
        <h1 className="mt-2 text-4xl font-bold text-surface-900 dark:text-surface-50">
          Page not found
        </h1>
        <p className="mx-auto mt-4 max-w-md text-surface-600 dark:text-surface-400">
          The page you are looking for does not exist or may have been moved.
        </p>
        <Button as={Link} to={ROUTES.HOME} className="mt-8" variant="secondary">
          <Home className="h-4 w-4" aria-hidden="true" />
          Back to Home
        </Button>
      </Container>
    </div>
  )
}
