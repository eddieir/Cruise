import { useState } from 'react'
import { Search, AlertCircle, CheckCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'

function parseCabin(cabin: string): { deck: number | null; range: string; action: string } | null {
  const num = parseInt(cabin.replace(/\D/g, ''), 10)
  if (isNaN(num) || num < 1001 || num > 20999) return null
  const deck = Math.floor(num / 1000)
  const local = num % 1000
  const range = local <= 30 ? `${deck * 1000 + 1}–${deck * 1000 + 30}`
    : local <= 70 ? `${deck * 1000 + 31}–${deck * 1000 + 70}`
    : `${deck * 1000 + 71}+`
  const action = `Go to Deck ${deck} and follow cabin signage for ${range.split('–')[0]} area.`
  return { deck, range, action }
}

export function CabinFinder() {
  const [input, setInput] = useState('12049')
  const result = parseCabin(input)
  const isOurs = input.trim() === '12049'

  return (
    <Card>
      <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
        <Search size={17} className="text-sky-400" />
        Cabin Finder
      </h3>
      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">Enter any cabin number to find its deck and corridor area.</p>

      {/* Input */}
      <div className="relative mb-4">
        <input
          type="text"
          inputMode="numeric"
          value={input}
          onChange={e => setInput(e.target.value)}
          placeholder="e.g. 12049"
          className="w-full bg-white/5 border border-white/15 rounded-xl px-4 py-3 text-white text-lg font-bold placeholder-[hsl(var(--muted-foreground))] focus:outline-none focus:border-sky-500/60 focus:bg-sky-500/5 transition-all"
        />
        {isOurs && (
          <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[10px] bg-sky-500/20 text-sky-300 px-2 py-0.5 rounded-full border border-sky-500/30">Your cabin</span>
        )}
      </div>

      {/* Result */}
      {result ? (
        <div className="space-y-2">
          <div className="grid grid-cols-3 gap-2">
            <div className="bg-sky-500/10 border border-sky-500/20 rounded-xl p-3 text-center">
              <p className="text-[10px] text-sky-300 mb-1">Deck</p>
              <p className="text-2xl font-black text-white">{result.deck}</p>
              <p className="text-[10px] text-sky-300">Ponte {result.deck}</p>
            </div>
            <div className="col-span-2 bg-white/5 border border-white/10 rounded-xl p-3">
              <p className="text-[10px] text-[hsl(var(--muted-foreground))] mb-1">Cabin range on this deck</p>
              <p className="text-sm font-bold text-white">{result.range}</p>
              <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-1">{result.action}</p>
            </div>
          </div>

          <div className={`flex items-start gap-2 rounded-xl p-3 border ${isOurs ? 'bg-emerald-500/10 border-emerald-500/30' : 'bg-blue-500/10 border-blue-500/20'}`}>
            {isOurs
              ? <CheckCircle size={14} className="text-emerald-400 shrink-0 mt-0.5" />
              : <Search size={14} className="text-blue-400 shrink-0 mt-0.5" />
            }
            <div>
              {isOurs ? (
                <p className="text-xs text-emerald-200 font-medium">This is your assigned cabin. Go to Deck 12, follow signs for cabins 12031–12070, then locate 12049 on the odd-number (port) side of the corridor.</p>
              ) : (
                <p className="text-xs text-blue-200">Go to Deck {result.deck} via elevator or stairs. Follow corridor signs for the {result.range} cabin range.</p>
              )}
            </div>
          </div>
        </div>
      ) : (
        <div className="flex items-center gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3">
          <AlertCircle size={14} className="text-red-400 shrink-0" />
          <p className="text-xs text-red-300">Enter a valid cabin number (e.g. 12049, 7022, 9130).</p>
        </div>
      )}

      {/* Warning */}
      <div className="mt-3 flex items-start gap-2 bg-amber-500/10 border border-amber-500/25 rounded-xl p-3">
        <AlertCircle size={13} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-200">
          Cabin assignments can change. Always verify your final cabin number in the MSC app or on your printed ticket before boarding.
        </p>
      </div>
    </Card>
  )
}
