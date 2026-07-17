import { memo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import {
  BookOpen,
  CircleDot,
  Code2,
  ExternalLink,
  GitFork,
  MessageCircle,
  Radio,
  Scale,
  Star,
} from 'lucide-react'
import { LANGUAGE_COLORS } from '../../constants/repositories'
import { getRepositoryReadme } from '../../services/github'
import {
  formatDate,
  formatNumber,
  formatRepositorySize,
  getLanguageColor,
} from '../../utils/format'
import { Button, Card, Skeleton } from '../common'

function RepositoryCard({ repository, index = 0 }) {
  const [isExpanded, setIsExpanded] = useState(false)
  const [readme, setReadme] = useState('')
  const [isReadmeLoading, setIsReadmeLoading] = useState(false)
  const [readmeError, setReadmeError] = useState(null)
  const license =
    repository.license?.spdx_id ||
    repository.license?.name ||
    'Unlicensed'

  const languageColor = getLanguageColor(
    repository.language,
    LANGUAGE_COLORS,
  )
  const owner = repository.owner?.login

  const handleToggleDetails = async () => {
    const nextExpanded = !isExpanded
    setIsExpanded(nextExpanded)

    if (!nextExpanded || readme || isReadmeLoading || !owner) return

    setIsReadmeLoading(true)
    setReadmeError(null)

    try {
      const content = await getRepositoryReadme(owner, repository.name)
      setReadme(extractReadmePreview(content))
    } catch {
      setReadmeError('README preview unavailable.')
    } finally {
      setIsReadmeLoading(false)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, delay: Math.min(index * 0.04, 0.4) }}
    >
      <Card
        as="article"
        className="group flex h-full flex-col transition-all duration-200 hover:border-accent-500/25 hover:shadow-md"
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <a
              href={repository.html_url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-semibold text-surface-900 transition-colors group-hover:text-accent-600 dark:text-surface-100 dark:group-hover:text-accent-400"
            >
              <span className="truncate">{repository.name}</span>
              <ExternalLink
                className="h-3.5 w-3.5 shrink-0 opacity-0 transition-opacity group-hover:opacity-100"
                aria-hidden="true"
              />
            </a>
          </div>

          {repository.language && (
            <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-surface-100 px-2.5 py-1 text-xs font-medium text-surface-600 dark:bg-surface-800 dark:text-surface-300">
              <span
                className="h-2.5 w-2.5 rounded-full"
                style={{ backgroundColor: languageColor }}
                aria-hidden="true"
              />
              {repository.language}
            </span>
          )}
        </div>

        <p className="mt-3 line-clamp-2 flex-1 text-sm leading-relaxed text-surface-500 dark:text-surface-400">
          {repository.description || 'No description provided.'}
        </p>

        {repository.topics?.length > 0 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {repository.topics.slice(0, 4).map((topic) => (
              <span
                key={topic}
                className="rounded-md bg-accent-500/10 px-2 py-0.5 text-xs font-medium text-accent-600 dark:text-accent-400"
              >
                {topic}
              </span>
            ))}
            {repository.topics.length > 4 && (
              <span className="rounded-md bg-surface-100 px-2 py-0.5 text-xs text-surface-500 dark:bg-surface-800 dark:text-surface-400">
                +{repository.topics.length - 4}
              </span>
            )}
          </div>
        )}

        <div className="mt-5 flex flex-wrap items-center gap-x-4 gap-y-2 border-t border-surface-100 pt-4 text-xs text-surface-500 dark:border-surface-800 dark:text-surface-400">
          <span className="inline-flex items-center gap-1.5">
            <Star className="h-3.5 w-3.5" aria-hidden="true" />
            {formatNumber(repository.stargazers_count)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <GitFork className="h-3.5 w-3.5" aria-hidden="true" />
            {formatNumber(repository.forks_count)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <MessageCircle className="h-3.5 w-3.5" aria-hidden="true" />
            {formatNumber(repository.open_issues_count)}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <Scale className="h-3.5 w-3.5" aria-hidden="true" />
            {license}
          </span>
          <span className="inline-flex items-center gap-1.5">
            <CircleDot className="h-3.5 w-3.5" aria-hidden="true" />
            Updated {formatDate(repository.updated_at)}
          </span>
        </div>

        <div className="mt-5">
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={handleToggleDetails}
            aria-expanded={isExpanded}
            className="w-full"
          >
            {isExpanded ? 'Hide details' : 'View details'}
          </Button>
        </div>

        <AnimatePresence initial={false}>
          {isExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.22 }}
              className="overflow-hidden"
            >
              <RepositoryDetails
                repository={repository}
                license={license}
                readme={readme}
                readmeError={readmeError}
                isReadmeLoading={isReadmeLoading}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </Card>
    </motion.div>
  )
}

export default memo(RepositoryCard)

function RepositoryDetails({
  repository,
  license,
  readme,
  readmeError,
  isReadmeLoading,
}) {
  const details = [
    {
      label: 'Primary language',
      value: repository.language || 'Not specified',
      icon: Code2,
    },
    {
      label: 'Repository size',
      value: formatRepositorySize(repository.size),
      icon: BookOpen,
    },
    {
      label: 'Default branch',
      value: repository.default_branch || 'main',
      icon: GitFork,
    },
    {
      label: 'Open issues',
      value: formatNumber(repository.open_issues_count),
      icon: MessageCircle,
    },
    {
      label: 'Watchers',
      value: formatNumber(repository.watchers_count),
      icon: Radio,
    },
    {
      label: 'License',
      value: license,
      icon: Scale,
    },
  ]

  return (
    <div className="mt-5 space-y-4 border-t border-surface-100 pt-5 dark:border-surface-800">
      {repository.topics?.length > 0 && (
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-wide text-surface-400">
            Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {repository.topics.map((topic) => (
              <span
                key={topic}
                className="rounded-md bg-surface-100 px-2 py-0.5 text-xs text-surface-600 dark:bg-surface-800 dark:text-surface-300"
              >
                {topic}
              </span>
            ))}
          </div>
        </div>
      )}

      <div className="grid gap-2 sm:grid-cols-2">
        {details.map(({ label, value, icon: Icon }) => (
          <div
            key={label}
            className="rounded-lg bg-surface-50 p-3 dark:bg-surface-800/70"
          >
            <p className="flex items-center gap-1.5 text-xs text-surface-500 dark:text-surface-400">
              <Icon className="h-3.5 w-3.5" aria-hidden="true" />
              {label}
            </p>
            <p className="mt-1 truncate text-sm font-semibold text-surface-900 dark:text-surface-100">
              {value}
            </p>
          </div>
        ))}
      </div>

      <div className="rounded-lg bg-surface-50 p-3 dark:bg-surface-800/70">
        <p className="mb-2 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wide text-surface-400">
          <BookOpen className="h-3.5 w-3.5" aria-hidden="true" />
          README preview
        </p>
        {isReadmeLoading && <Skeleton className="h-20 rounded-lg" />}
        {!isReadmeLoading && readme && (
          <p className="line-clamp-5 whitespace-pre-line text-sm leading-6 text-surface-600 dark:text-surface-300">
            {readme}
          </p>
        )}
        {!isReadmeLoading && !readme && (
          <p className="text-sm text-surface-500 dark:text-surface-400">
            {readmeError || 'No README preview available.'}
          </p>
        )}
      </div>

      <p className="text-xs text-surface-400">
        Last updated {formatDate(repository.updated_at)}
      </p>
    </div>
  )
}

function extractReadmePreview(content) {
  return content
    .replace(/```[\s\S]*?```/g, '')
    .replace(/!\[[^\]]*]\([^)]*\)/g, '')
    .replace(/\[[^\]]+]\([^)]*\)/g, (match) => match.match(/\[([^\]]+)]/)?.[1] ?? '')
    .replace(/^#{1,6}\s+/gm, '')
    .split(/\n\s*\n/)
    .map((section) => section.trim())
    .find(Boolean)
    ?.slice(0, 600) ?? ''
}
