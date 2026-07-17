import { memo } from 'react'
import { FolderGit2 } from 'lucide-react'
import { EmptyState } from '../common/ErrorState'
import RepositoryCard from './RepositoryCard'

function RepositoryList({ repositories }) {
  if (!repositories.length) {
    return (
      <EmptyState
        icon={FolderGit2}
        title="No repositories found"
        description="Try adjusting your search query or language filter to find matching repositories."
      />
    )
  }

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
      {repositories.map((repository, index) => (
        <RepositoryCard
          key={repository.id}
          repository={repository}
          index={index}
        />
      ))}
    </div>
  )
}

export default memo(RepositoryList)
