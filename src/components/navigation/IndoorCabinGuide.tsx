import { useState } from 'react'
import { AlertTriangle, ChevronRight } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { routeModes } from '@/data/navigation'
import { cn } from '@/lib/utils'

const stepTypeIcons: Record<string, string> = {
  walk: '🚶',
  elevator: '🛗',
  stairs: '🪜',
  landmark: '📍',
  warning: '⚠️',
  arrive: '✅',
  info: 'ℹ️',
}

const stepTypeColors: Record<string, string> = {
  walk: 'border-sky-500/30 bg-sky-500/10',
  elevator: 'border-violet-500/30 bg-violet-500/10',
  stairs: 'border-amber-500/30 bg-amber-500/10',
  landmark: 'border-blue-500/30 bg-blue-500/10',
  warning: 'border-red-500/30 bg-red-500/10',
  arrive: 'border-emerald-500/30 bg-emerald-500/10',
  info: 'border-slate-500/30 bg-slate-500/10',
}

export function IndoorCabinGuide() {
  const [selectedMode, setSelectedMode] = useState(routeModes[0].id)
  const mode = routeModes.find(m => m.id === selectedMode)!

  return (
    <Card>
      <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
        🚢 Ship Entrance → Cabin 10142
      </h3>

      {/* GPS warning */}
      <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 mb-4">
        <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-200">
          <span className="font-semibold">GPS is not reliable inside the ship.</span> MSC Musica is a steel structure — GPS signal does not penetrate across decks. Use this offline step-by-step guide instead.
        </p>
      </div>

      {/* Mode selector */}
      <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-2">Choose your route</p>
      <div className="grid grid-cols-1 gap-1.5 mb-5">
        {routeModes.map(m => (
          <button
            key={m.id}
            onClick={() => setSelectedMode(m.id)}
            className={cn(
              'flex items-center gap-3 px-3 py-2.5 rounded-xl border text-left transition-all',
              selectedMode === m.id
                ? 'bg-sky-500/20 border-sky-500/50 text-sky-300'
                : 'bg-white/4 border-white/10 text-[hsl(var(--muted-foreground))] hover:bg-white/8'
            )}
          >
            <span className="text-lg">{m.icon}</span>
            <div className="flex-1">
              <p className="text-sm font-semibold">{m.label}</p>
              <p className="text-[11px] opacity-70">{m.description}</p>
            </div>
            {selectedMode === m.id && <Badge variant="blue">Active</Badge>}
          </button>
        ))}
      </div>

      {/* Steps */}
      <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-3">
        {mode.icon} {mode.label}
      </p>
      <div className="relative">
        {/* Connecting line */}
        <div className="absolute left-[22px] top-6 bottom-6 w-0.5 bg-white/10 z-0" />

        <div className="space-y-3 relative z-10">
          {mode.steps.map((step, i) => (
            <div key={step.id} className="flex items-start gap-3">
              {/* Step number circle */}
              <div className="w-11 h-11 rounded-full bg-slate-800 border border-white/15 flex flex-col items-center justify-center shrink-0 z-10">
                <span className="text-base">{stepTypeIcons[step.type] || '●'}</span>
                <span className="text-[9px] font-bold text-[hsl(var(--muted-foreground))]">{i + 1}</span>
              </div>
              {/* Content */}
              <div className={cn('flex-1 rounded-xl border p-3', stepTypeColors[step.type] || 'border-white/10 bg-white/4')}>
                <div className="flex items-start justify-between gap-2">
                  <p className="text-sm font-semibold text-white leading-snug">{step.instruction}</p>
                  {step.type === 'arrive' && <ChevronRight size={14} className="text-emerald-400 shrink-0 mt-0.5" />}
                </div>
                {step.detail && <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">{step.detail}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Reminder */}
      <div className="mt-4 bg-blue-500/10 border border-blue-500/30 rounded-xl p-3 text-xs text-blue-200">
        <span className="font-semibold">Remember:</span> Cabin 10142 is on Deck 10 (Ponte 10). The luggage tag on your checked bags also shows Ponte 10 / Cabina 10142 — confirm they match before handing bags to porters.
      </div>
    </Card>
  )
}
