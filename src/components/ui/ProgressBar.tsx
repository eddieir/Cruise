import { cn } from '@/lib/utils'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  label?: string
  colorAuto?: boolean
}

export function ProgressBar({ value, max = 100, className, showLabel, label, colorAuto = true }: ProgressBarProps) {
  const pct = Math.min((value / max) * 100, 100)

  const barColor = colorAuto
    ? pct < 70 ? 'bg-emerald-500'
    : pct < 100 ? 'bg-amber-500'
    : 'bg-red-500'
    : 'bg-sky-500'

  return (
    <div className={cn('space-y-1', className)}>
      {(showLabel || label) && (
        <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))]">
          <span>{label}</span>
          <span>{Math.round(pct)}%</span>
        </div>
      )}
      <div className="h-2 w-full rounded-full bg-white/10 overflow-hidden">
        <div
          className={cn('h-full rounded-full transition-all duration-500', barColor)}
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  )
}
