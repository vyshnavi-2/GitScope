import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from 'recharts'
import { CHART_ANIMATION, getChartColor } from '../../constants/charts'
import ChartCard from './ChartCard'
import ChartTooltip from './ChartTooltip'

export default function LanguagePieChart({ data, delay = 0 }) {
  if (!data.length) {
    return (
      <ChartCard
        title="Language Distribution"
        description="Breakdown of programming languages across repositories."
        delay={delay}
      >
        <p className="flex h-64 items-center justify-center text-sm text-surface-500">
          No language data available.
        </p>
      </ChartCard>
    )
  }

  return (
    <ChartCard
      title="Language Distribution"
      description="Breakdown of programming languages across repositories."
      delay={delay}
    >
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={90}
              paddingAngle={2}
              animationDuration={CHART_ANIMATION.duration}
              animationEasing={CHART_ANIMATION.easing}
            >
              {data.map((entry, index) => (
                <Cell
                  key={entry.name}
                  fill={getChartColor(entry.name, index)}
                  stroke="transparent"
                />
              ))}
            </Pie>
            <Tooltip
              content={
                <ChartTooltip formatter={(value) => `${value} repos`} />
              }
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 flex flex-wrap gap-3">
        {data.slice(0, 6).map((entry, index) => (
          <div key={entry.name} className="flex items-center gap-2 text-xs">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: getChartColor(entry.name, index) }}
            />
            <span className="text-surface-600 dark:text-surface-400">
              {entry.name} ({entry.value})
            </span>
          </div>
        ))}
      </div>
    </ChartCard>
  )
}
