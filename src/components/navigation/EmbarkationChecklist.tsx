import { CheckCircle2, Circle, RotateCcw } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { embarkationSteps } from '@/data/navigation'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'

const typeColors: Record<string, string> = {
  arrival: 'text-sky-400',
  document: 'text-violet-400',
  luggage: 'text-amber-400',
  security: 'text-red-400',
  boarding: 'text-emerald-400',
  cabin: 'text-blue-400',
  safety: 'text-orange-400',
}

export function EmbarkationChecklist() {
  const { embarkationChecklist, toggleEmbarkationStep, getEmbarkationProgress } = useStore()
  const { done, total } = getEmbarkationProgress()
  const allDone = done >= total

  const resetChecklist = () => {
    embarkationSteps.forEach(s => {
      if (embarkationChecklist[s.id]) toggleEmbarkationStep(s.id)
    })
  }

  return (
    <Card>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-bold text-white text-base">Embarkation Checklist</h3>
          <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">Tap each step when complete</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs font-medium text-[hsl(var(--muted-foreground))]">{done}/{total}</span>
          <button onClick={resetChecklist} title="Reset checklist" className="p-1.5 rounded-lg hover:bg-white/10 text-[hsl(var(--muted-foreground))] transition-all">
            <RotateCcw size={14} />
          </button>
        </div>
      </div>

      <ProgressBar value={done} max={total} colorAuto className="mb-4" />

      {allDone && (
        <div className="bg-emerald-500/15 border border-emerald-500/30 rounded-xl p-3 mb-4 text-center">
          <p className="text-sm font-bold text-emerald-300">🎉 All steps complete! Enjoy your cruise!</p>
        </div>
      )}

      <div className="space-y-2">
        {embarkationSteps.map((step) => {
          const checked = !!embarkationChecklist[step.id]
          return (
            <button
              key={step.id}
              onClick={() => toggleEmbarkationStep(step.id)}
              className={cn(
                'w-full flex items-start gap-3 p-3 rounded-xl border text-left transition-all',
                checked
                  ? 'bg-emerald-500/10 border-emerald-500/25 opacity-75'
                  : 'bg-white/4 border-white/10 hover:bg-white/8 hover:border-white/20'
              )}
            >
              {/* Step number */}
              <div className={cn(
                'w-6 h-6 rounded-full flex items-center justify-center shrink-0 text-[10px] font-bold border mt-0.5',
                checked
                  ? 'bg-emerald-500/30 border-emerald-500/40 text-emerald-300'
                  : 'bg-white/10 border-white/20 text-[hsl(var(--muted-foreground))]'
              )}>
                {step.step}
              </div>

              {/* Icon */}
              <span className="text-lg shrink-0">{step.icon}</span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <p className={cn('text-sm font-semibold', checked ? 'text-[hsl(var(--muted-foreground))] line-through' : 'text-white')}>
                  {step.title}
                </p>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5 leading-relaxed">{step.detail}</p>
              </div>

              {/* Check icon */}
              <div className="shrink-0 mt-0.5">
                {checked
                  ? <CheckCircle2 size={18} className="text-emerald-400" />
                  : <Circle size={18} className="text-[hsl(var(--muted-foreground))]" />
                }
              </div>
            </button>
          )
        })}
      </div>
    </Card>
  )
}
