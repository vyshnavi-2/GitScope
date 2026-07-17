import { memo, useMemo } from 'react'
import {
  BookOpen,
  FileText,
  Users,
} from 'lucide-react'
import StatCard from './StatCard'

function ProfileStats({ user }) {
  const stats = useMemo(
    () => [
      {
        label: 'Followers',
        value: user.followers,
        icon: Users,
      },
      {
        label: 'Following',
        value: user.following,
        icon: Users,
      },
      {
        label: 'Public Repositories',
        value: user.public_repos,
        icon: BookOpen,
      },
      {
        label: 'Public Gists',
        value: user.public_gists,
        icon: FileText,
      },
    ],
    [user.followers, user.following, user.public_gists, user.public_repos],
  )

  return (
    <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
      {stats.map((stat, index) => (
        <StatCard key={stat.label} {...stat} index={index} />
      ))}
    </div>
  )
}

export default memo(ProfileStats)
