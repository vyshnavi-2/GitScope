import {
  CartesianGrid,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { Card } from '../common'

const PLACEHOLDER_DATA = [
  { label: 'Mon', value: 12 },
  { label: 'Tue', value: 18 },
  { label: 'Wed', value: 15 },
  { label: 'Thu', value: 22 },
  { label: 'Fri', value: 28 },
  { label: 'Sat', value: 20 },
  { label: 'Sun', value: 16 },
]

export default function ChartPlaceholder({
  title = 'Activity Overview',
  description = 'Chart data will be connected in a future step.',
  data = PLACEHOLDER_DATA,
  className,
}) {
  return (
    <Card className={className}>
      <div className="mb-6 space-y-1">
        <h3 className="text-base font-semibold text-surface-900 dark:text-surface-100">
          {title}
        </h3>
        <p className="text-sm text-surface-500 dark:text-surface-400">
          {description}
        </p>
      </div>

      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data} margin={{ top: 8, right: 8, left: -16, bottom: 0 }}>
            <CartesianGrid
              strokeDasharray="3 3"
              className="stroke-surface-200 dark:stroke-surface-700"
              vertical={false}
            />
            <XAxis
              dataKey="label"
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              className="fill-surface-500"
            />
            <YAxis
              tick={{ fontSize: 12 }}
              axisLine={false}
              tickLine={false}
              className="fill-surface-500"
            />
            <Tooltip
              contentStyle={{
                borderRadius: '0.5rem',
                border: '1px solid var(--color-surface-200)',
                backgroundColor: 'var(--color-surface-50)',
              }}
            />
            <Line
              type="monotone"
              dataKey="value"
              stroke="var(--color-accent-500)"
              strokeWidth={2}
              dot={false}
              activeDot={{ r: 4 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </Card>
  )
}
