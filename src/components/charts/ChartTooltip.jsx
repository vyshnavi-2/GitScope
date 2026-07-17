import { useChartTheme } from '../../hooks/useChartTheme'

export default function ChartTooltip({ active, payload, label, formatter }) {
  const { colors } = useChartTheme()

  if (!active || !payload?.length) return null

  return (
    <div
      className="rounded-lg border px-3 py-2 text-xs shadow-lg"
      style={{
        backgroundColor: colors.tooltipBg,
        borderColor: colors.tooltipBorder,
        color: colors.tooltipText,
      }}
    >
      {label && <p className="mb-1 font-medium">{label}</p>}
      {payload.map((entry) => (
        <p key={entry.name} className="text-surface-500 dark:text-surface-400">
          {entry.name}:{' '}
          <span className="font-semibold text-surface-900 dark:text-surface-100">
            {formatter ? formatter(entry.value, entry.name) : entry.value}
          </span>
        </p>
      ))}
    </div>
  )
}
