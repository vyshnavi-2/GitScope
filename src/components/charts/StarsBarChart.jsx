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

export default function StarsBarChart({ data, delay = 0 }) {
  const { colors } = useChartTheme()

  if (!data.length) {
    return (
      <ChartCard
        title="Top Repositories by Stars"
        description="Most starred public repositories."
        delay={delay}
      >
        <p className="flex h-64 items-center justify-center text-sm text-surface-500">
          No repository data available.
        </p>
      </ChartCard>
    )
  }

  return (
    <ChartCard
      title="Top Repositories by Stars"
      description="Most starred public repositories."
      delay={delay}
    >
      <div className="h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={data}
            layout="vertical"
            margin={{ top: 4, right: 8, left: 0, bottom: 0 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke={colors.grid}
              horizontal={false}
            />
            <XAxis
              type="number"
              tick={{ fontSize: 11, fill: colors.axis }}
              axisLine={false}
              tickLine={false}
            />
            <YAxis
              type="category"
              dataKey="name"
              width={88}
              tick={{ fontSize: 11, fill: colors.axis }}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip
              content={
                <ChartTooltip
                  formatter={(value) => formatNumber(value)}
                />
              }
            />
            <Bar
              dataKey="stars"
              name="Stars"
              fill="var(--color-accent-500)"
              radius={[0, 4, 4, 0]}
              animationDuration={CHART_ANIMATION.duration}
              animationEasing={CHART_ANIMATION.easing}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </ChartCard>
  )
}
