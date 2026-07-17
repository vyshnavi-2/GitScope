import { memo, useMemo } from 'react'
import { BookOpen, GitFork, Languages, Star } from 'lucide-react'
import { StatCard } from '../dashboard'
import {
  computeAnalyticsSummary,
  computeForkData,
  computeLanguageStats,
  computeSizeData,
  computeStarsData,
  computeTimelineData,
} from '../../utils/analytics'
import ForkDistributionChart from './ForkDistributionChart'
import LanguagePieChart from './LanguagePieChart'
import RepositorySizeChart from './RepositorySizeChart'
import RepositoryTimeline from './RepositoryTimeline'
import StarsBarChart from './StarsBarChart'

function AnalyticsDashboard({ repositories, username }) {
  const {
    summary,
    languageData,
    starsData,
    timelineData,
    forkData,
    sizeData,
  } = useMemo(
    () => ({
      summary: computeAnalyticsSummary(repositories),
      languageData: computeLanguageStats(repositories),
      starsData: computeStarsData(repositories),
      timelineData: computeTimelineData(repositories),
      forkData: computeForkData(repositories),
      sizeData: computeSizeData(repositories),
    }),
    [repositories],
  )

  const stats = [
    { label: 'Total Stars', value: summary.totalStars, icon: Star },
    { label: 'Total Forks', value: summary.totalForks, icon: GitFork },
    { label: 'Repositories', value: summary.totalRepos, icon: BookOpen },
    { label: 'Languages', value: summary.languages, icon: Languages },
  ]

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-2xl font-bold tracking-tight text-surface-900 dark:text-surface-50">
          Insights
        </h2>
        <p className="mt-1 text-surface-600 dark:text-surface-400">
          Repository analytics for @{username}, inspired by GitHub Insights.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat, index) => (
          <StatCard key={stat.label} {...stat} index={index} />
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <LanguagePieChart data={languageData} delay={0.1} />
        <RepositoryTimeline data={timelineData} delay={0.15} />
        <StarsBarChart data={starsData} delay={0.2} />
        <ForkDistributionChart data={forkData} delay={0.25} />
        <RepositorySizeChart data={sizeData} delay={0.3} />
      </div>
    </div>
  )
}

export default memo(AnalyticsDashboard)
