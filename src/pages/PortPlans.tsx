import { motion } from 'framer-motion'
import { MapPin, Clock, Euro } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { itinerary } from '@/data/itinerary'

const typeColor: Record<string, string> = {
  embarkation: 'emerald',
  port: 'blue',
  sea: 'cyan',
  disembarkation: 'purple'
}

const typeLabel: Record<string, string> = {
  embarkation: 'Embarkation',
  port: 'Port Day',
  sea: 'Sea Day',
  disembarkation: 'Disembarkation'
}

export function PortPlans() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <MapPin size={24} className="text-rose-400" /> Port-by-Port Plans
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">
          Practical guide for every stop on our route.
        </p>
      </motion.div>

      <div className="space-y-4">
        {itinerary.map((port, i) => (
          <motion.div
            key={port.day}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.06 }}
          >
            <Card>
              {/* Header */}
              <div className="flex items-start justify-between gap-3 mb-4">
                <div className="flex items-start gap-3">
                  <span className="text-3xl shrink-0">{port.emoji}</span>
                  <div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <h2 className="font-bold text-lg text-white">{port.port}</h2>
                      <span className="text-sm text-[hsl(var(--muted-foreground))]">· {port.country}</span>
                    </div>
                    <p className="text-xs text-sky-400 mt-0.5">Day {port.day} · {port.date} · {port.dayLabel}</p>
                  </div>
                </div>
                <Badge variant={typeColor[port.type] as any}>{typeLabel[port.type]}</Badge>
              </div>

              {/* Times */}
              {(port.arrival !== '—' || port.departure !== '—') && (
                <div className="flex items-center gap-4 mb-3 text-sm">
                  <div className="flex items-center gap-1.5 text-[hsl(var(--muted-foreground))]">
                    <Clock size={14} />
                    {port.arrival !== '—' && <span>Arrive {port.arrival}</span>}
                    {port.arrival !== '—' && port.departure !== '—' && <span className="text-white/20">·</span>}
                    {port.departure !== '—' && <span className="text-amber-400 font-medium">⚠️ Depart {port.departure}</span>}
                  </div>
                </div>
              )}

              {/* Grid: Highlights, Tips, Food, Transport */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Highlights */}
                <div className="bg-sky-500/8 rounded-xl p-3 border border-sky-500/15">
                  <p className="text-xs font-semibold text-sky-400 mb-2">🗺️ What to See</p>
                  <ul className="space-y-1">
                    {port.highlights.map(h => (
                      <li key={h} className="text-xs text-[hsl(var(--foreground))] flex items-start gap-1.5">
                        <span className="text-sky-500 mt-0.5">·</span>{h}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Tips */}
                <div className="bg-emerald-500/8 rounded-xl p-3 border border-emerald-500/15">
                  <p className="text-xs font-semibold text-emerald-400 mb-2">💡 Economy Tips</p>
                  <ul className="space-y-1">
                    {port.tips.map(t => (
                      <li key={t} className="text-xs text-[hsl(var(--foreground))] flex items-start gap-1.5">
                        <span className="text-emerald-500 mt-0.5">·</span>{t}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Transport */}
                <div className="bg-violet-500/8 rounded-xl p-3 border border-violet-500/15">
                  <p className="text-xs font-semibold text-violet-400 mb-2">🚌 Transport</p>
                  <p className="text-xs text-[hsl(var(--foreground))]">{port.transportTip}</p>
                </div>

                {/* Food */}
                <div className="bg-amber-500/8 rounded-xl p-3 border border-amber-500/15">
                  <p className="text-xs font-semibold text-amber-400 mb-2 flex items-center gap-1">
                    <Euro size={12} /> Food · {port.budgetTarget}
                  </p>
                  <p className="text-xs text-[hsl(var(--foreground))]">{port.foodTip}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>
    </div>
  )
}
