import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CHART_ANIMATION } from '../../constants/charts'
import { useChartTheme } from '../../hooks/useChartTheme'
import ChartCard from './ChartCard'
import ChartTooltip from './ChartTooltip'

export default function RepositoryTimeline({ data, delay = 0 }) {
  const { colors } = useChartTheme()

  if (!data.length) {
    return (
      <ChartCard
        title="Repository Timeline"
        description="Repositories created per year."
        delay={delay}
      >
        <p className="flex h-64 items-center justify-center text-sm text-surface-500">
          No timeline data available.
        </p>
      </ChartCard>
    )
  }

  return (
    <ChartCard
      title="Repository Timeline"
      description="Repositories created per year."
      delay={delay}
    >
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 8, right: 8, left: -16, bottom: 0 }}
          >
            <defs>
              <linearGradient id="timelineGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="var(--color-accent-500)" stopOpacity={0.35} />
                <stop offset="100%" stopColor="var(--color-accent-500)" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.grid}
              vertical={false}
            />
            <XAxis
              dataKey="year"
              tick={{ fontSize: 11, fill: colors.axis }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              allowDecimals={false}
              tick={{ fontSize: 11, fill: colors.axis }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={
                <ChartTooltip formatter={(value) => `${value} repos`} />
              }
            />
            <Area
              type="monotone"
              dataKey="count"
              name="Repositories"
              stroke="var(--color-accent-500)"
              strokeWidth={2}
              fill="url(#timelineGradient)"
              animationDuration={CHART_ANIMATION.duration}
              animationEasing={CHART_ANIMATION.easing}
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
