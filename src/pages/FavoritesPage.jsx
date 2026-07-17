import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Heart, Search, Trash2 } from 'lucide-react'
import {
  Button,
  Container,
  DeveloperProfileCard,
  EmptyState,
  PageHeader,
  PageShell,
} from '../components/common'
import { ROUTES } from '../constants'
import { useFavorites } from '../hooks/useFavorites'
import { useToast } from '../hooks/useToast'

export default function FavoritesPage() {
  const { favorites, removeFavorite } = useFavorites()
  const { showToast } = useToast()

  const handleRemoveFavorite = (login) => {
    removeFavorite(login)
    showToast({
      type: 'info',
      message: `Removed @${login} from favorites.`,
    })
  }

  return (
    <PageShell>
      <Container className="space-y-8">
        <PageHeader
          eyebrow="Saved Profiles"
          icon={Heart}
          tone="rose"
          title="Favorite Developers"
          description="Keep a personal shortlist of GitHub profiles. Favorites are stored locally in this browser, so they are fast, private, and available the next time you open GitScope."
          action={
            favorites.length > 0 && (
            <Button as={Link} to={ROUTES.HOME} variant="secondary">
              <Search className="h-4 w-4" aria-hidden="true" />
              Find Developers
            </Button>
            )
          }
        />

        {favorites.length === 0 ? (
          <EmptyState
            icon={Heart}
            title="No favorites yet"
            description="You haven't added any favorite developers yet."
            action={
              <Button as={Link} to={ROUTES.HOME}>
                <Search className="h-4 w-4" aria-hidden="true" />
                Search Developers
              </Button>
            }
          />
        ) : (
          <motion.div
            layout
            className="grid gap-5 md:grid-cols-2 xl:grid-cols-3"
          >
            {favorites.map((favorite, index) => (
              <DeveloperProfileCard
                key={favorite.login}
                user={favorite}
                index={index}
                action={
                  <Button
                    type="button"
                    variant="ghost"
                    onClick={() => handleRemoveFavorite(favorite.login)}
                    className="text-rose-600 hover:bg-rose-50 hover:text-rose-700 dark:text-rose-300 dark:hover:bg-rose-950/40"
                  >
                    <Trash2 className="h-4 w-4" aria-hidden="true" />
                    Remove
                  </Button>
                }
              />
            ))}
          </motion.div>
        )}
      </Container>
    </PageShell>
  )
}
