import { useState } from 'react'
import { ChevronDown, ChevronUp, AlertCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { shipLocations } from '@/data/shipLocations'

const typeColors: Record<string, 'green' | 'blue' | 'yellow' | 'red' | 'default'> = {
  cabin: 'blue',
  restaurant: 'green',
  entertainment: 'blue',
  leisure: 'green',
  service: 'default',
  safety: 'red',
  gangway: 'yellow',
  other: 'default',
}

export function CabinToShipLocations() {
  const [expanded, setExpanded] = useState<string | null>(null)

  return (
    <Card>
      <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
        🗺️ Cabin → Key Ship Locations
      </h3>
      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">
        From Cabin 12049 (Deck 12), how to reach each area. Based on typical MSC Musica layout — verify with onboard signage.
      </p>

      <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl p-2.5 mb-4">
        <AlertCircle size={12} className="text-blue-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-blue-300">Deck numbers are approximate for MSC Musica. Follow onboard signs and daily programme for exact locations.</p>
      </div>

      <div className="space-y-1.5">
        {shipLocations.map(loc => {
          const isOpen = expanded === loc.id
          return (
            <div key={loc.id}>
              <button
                onClick={() => setExpanded(isOpen ? null : loc.id)}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl bg-white/4 border border-white/8 hover:bg-white/8 transition-all"
              >
                <span className="text-xl shrink-0">{loc.icon}</span>
                <div className="flex-1 text-left">
                  <p className="text-sm font-semibold text-white">{loc.name}</p>
                  {loc.deck !== null && (
                    <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Deck {loc.deck}{loc.deckItalian ? ` / ${loc.deckItalian}` : ''}</p>
                  )}
                </div>
                <Badge variant={typeColors[loc.type]}>{loc.type}</Badge>
                {isOpen ? <ChevronUp size={14} className="text-[hsl(var(--muted-foreground))] shrink-0" /> : <ChevronDown size={14} className="text-[hsl(var(--muted-foreground))] shrink-0" />}
              </button>

              {isOpen && (
                <div className="mx-1 mb-1 bg-white/3 border border-white/8 border-t-0 rounded-b-xl px-4 py-3 space-y-2">
                  {loc.note && (
                    <p className="text-[11px] text-[hsl(var(--muted-foreground))] italic">{loc.note}</p>
                  )}
                  <div className="bg-sky-500/10 border border-sky-500/20 rounded-lg p-2.5">
                    <p className="text-[10px] text-sky-400 font-semibold uppercase tracking-wide mb-1">How to get there</p>
                    <p className="text-xs text-sky-200">{loc.directions}</p>
                  </div>
                  {loc.type === 'safety' && (
                    <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-2.5">
                      <p className="text-[11px] text-red-300 font-semibold">⚠️ Learn the exact location during the mandatory muster drill on embarkation day.</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </Card>
  )
}
