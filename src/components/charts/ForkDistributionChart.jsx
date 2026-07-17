import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { CHART_ANIMATION } from '../../constants/charts'
import { useChartTheme } from '../../hooks/useChartTheme'
import { formatNumber } from '../../utils/format'
import ChartCard from './ChartCard'
import ChartTooltip from './ChartTooltip'

export default function ForkDistributionChart({ data, delay = 0 }) {
  const { colors } = useChartTheme()

  if (!data.length) {
    return (
      <ChartCard
        title="Fork Distribution"
        description="Repositories with the most forks."
        delay={delay}
      >
        <p className="flex h-64 items-center justify-center text-sm text-surface-500">
          No fork data available.
        </p>
      </ChartCard>
    )
  }

  return (
    <ChartCard
      title="Fork Distribution"
      description="Repositories with the most forks."
      delay={delay}
    >
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            margin={{ top: 8, right: 8, left: -12, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.grid}
              vertical={false}
            />
            <XAxis
              dataKey="name"
              tick={{ fontSize: 10, fill: colors.axis }}
              axisLine={false}
              tickLine={false}
              interval={0}
              angle={-30}
              textAnchor="end"
              height={60}
            />
            <YAxis
              tick={{ fontSize: 11, fill: colors.axis }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={
                <ChartTooltip formatter={(value) => formatNumber(value)} />
              }
            />
            <Bar
              dataKey="forks"
              name="Forks"
              fill="#6366f1"
              radius={[4, 4, 0, 0]}
              animationDuration={CHART_ANIMATION.duration}
              animationEasing={CHART_ANIMATION.easing}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
