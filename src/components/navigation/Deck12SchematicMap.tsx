import { useState } from 'react'
import { AlertCircle, Upload } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

type MarkerPosition = 'elevator' | 'stairs' | 'zone-a' | 'zone-b' | 'zone-c' | 'cabin'

const markerPositions: { id: MarkerPosition; label: string; x: number; y: number }[] = [
  { id: 'elevator', label: 'Elevator lobby', x: 50, y: 50 },
  { id: 'stairs', label: 'Stairs', x: 50, y: 75 },
  { id: 'zone-a', label: 'Near 12001–12030', x: 25, y: 50 },
  { id: 'zone-b', label: 'Near 12031–12070', x: 50, y: 50 },
  { id: 'zone-c', label: 'Near 12071+', x: 75, y: 50 },
  { id: 'cabin', label: 'Cabin 12049 ✓', x: 52, y: 50 },
]

// Check if official deck plan image exists
const OFFICIAL_IMAGE_PATH = '/maps/msc-musica-deck-12.png'

function SchematicSVG({ marker }: { marker: MarkerPosition | null }) {
  // Approximate schematic of Deck 12 corridor layout
  // Ship: long oval shape, corridor runs fore-aft, cabins on both sides
  const cabinHighlight = (num: number) => num === 12049

  const portCabins = [12001, 12003, 12005, 12007, 12009, 12011, 12013, 12015, 12017, 12019, 12021, 12023, 12025, 12027, 12029, 12031, 12033, 12035, 12037, 12039, 12041, 12043, 12045, 12047, 12049, 12051, 12053, 12055]
  const starboardCabins = [12002, 12004, 12006, 12008, 12010, 12012, 12014, 12016, 12018, 12020, 12022, 12024, 12026, 12028, 12030, 12032, 12034, 12036, 12038, 12040, 12042, 12044, 12046, 12048, 12050, 12052, 12054, 12056]

  const markerX = marker === 'elevator' || marker === 'stairs' ? 380
    : marker === 'zone-a' ? 120
    : marker === 'zone-b' ? 260
    : marker === 'zone-c' ? 460
    : marker === 'cabin' ? 330 : null

  return (
    <svg viewBox="0 0 640 200" className="w-full" style={{ minHeight: '160px' }}>
      {/* Ship deck outline */}
      <rect x="10" y="10" width="620" height="180" rx="30" fill="#0f172a" stroke="#334155" strokeWidth="2" />

      {/* Corridor center */}
      <rect x="20" y="88" width="600" height="24" fill="#1e293b" stroke="#334155" strokeWidth="1" />
      <text x="320" y="103" textAnchor="middle" fill="#64748b" fontSize="8" fontWeight="500">CORRIDOR / CORRIDOIO — DECK 12</text>

      {/* PORT side label */}
      <text x="30" y="60" fill="#94a3b8" fontSize="7">PORT SIDE (odd numbers)</text>
      {/* STARBOARD side label */}
      <text x="30" y="170" fill="#94a3b8" fontSize="7">STARBOARD SIDE (even numbers)</text>

      {/* Elevator/stairs zone */}
      <rect x="360" y="15" width="40" height="65" fill="#334155" stroke="#4b6070" strokeWidth="1" rx="3" />
      <text x="380" y="40" textAnchor="middle" fill="#94a3b8" fontSize="7">LIFT</text>
      <text x="380" y="50" textAnchor="middle" fill="#94a3b8" fontSize="7">🛗</text>
      <rect x="360" y="120" width="40" height="60" fill="#334155" stroke="#4b6070" strokeWidth="1" rx="3" />
      <text x="380" y="143" textAnchor="middle" fill="#94a3b8" fontSize="7">LIFT</text>
      <text x="380" y="153" textAnchor="middle" fill="#94a3b8" fontSize="7">🛗</text>

      {/* Port side cabins (odd) */}
      {portCabins.map((num, i) => {
        const x = 22 + i * 20
        const highlight = cabinHighlight(num)
        return (
          <g key={num}>
            <rect x={x} y={15} width={18} height={60} fill={highlight ? '#22c55e30' : '#1e293b'} stroke={highlight ? '#22c55e' : '#334155'} strokeWidth={highlight ? 2 : 1} rx="2" />
            <text x={x + 9} y={35} textAnchor="middle" fill={highlight ? '#22c55e' : '#64748b'} fontSize={highlight ? '6' : '5'} fontWeight={highlight ? '700' : '400'} transform={`rotate(-90, ${x + 9}, 45)`}>{num}</text>
            {highlight && <text x={x + 9} y={70} textAnchor="middle" fill="#22c55e" fontSize="8">★</text>}
          </g>
        )
      })}

      {/* Starboard side cabins (even) */}
      {starboardCabins.map((num, i) => {
        const x = 22 + i * 20
        return (
          <g key={num}>
            <rect x={x} y={125} width={18} height={60} fill="#1e293b" stroke="#334155" strokeWidth="1" rx="2" />
            <text x={x + 9} y={145} textAnchor="middle" fill="#64748b" fontSize="5" transform={`rotate(-90, ${x + 9}, 155)`}>{num}</text>
          </g>
        )
      })}

      {/* YOU ARE HERE marker */}
      {markerX !== null && (
        <g>
          <circle cx={markerX} cy={100} r="8" fill="#0ea5e9" opacity="0.9" />
          <circle cx={markerX} cy={100} r="4" fill="white" />
          <text x={markerX} y={84} textAnchor="middle" fill="#0ea5e9" fontSize="9" fontWeight="700">YOU</text>
          <text x={markerX} y={76} textAnchor="middle" fill="#0ea5e9" fontSize="7">HERE</text>
        </g>
      )}

      {/* Cabin 12049 arrow */}
      <text x={330} y={8} textAnchor="middle" fill="#22c55e" fontSize="7" fontWeight="700">↑ 12049</text>
    </svg>
  )
}

export function Deck12SchematicMap() {
  const [marker, setMarker] = useState<MarkerPosition | null>(null)
  const [useOfficialImage, setUseOfficialImage] = useState(false)

  return (
    <Card>
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-bold text-white text-base">Deck 12 Visual Guide</h3>
          <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5">Schematic guide — not official deck plan</p>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-[10px] text-[hsl(var(--muted-foreground))] bg-white/5 px-2 py-1 rounded-lg border border-white/10">Ponte 12</span>
        </div>
      </div>

      {/* Warning */}
      <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl p-2.5 mb-3">
        <AlertCircle size={13} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-amber-200">Schematic guide, not official deck plan. Cabin positions are approximate. Always follow onboard signage.</p>
      </div>

      {/* Map area */}
      <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-900/60 mb-4">
        {useOfficialImage ? (
          <img
            src={OFFICIAL_IMAGE_PATH}
            alt="MSC Musica Deck 12 official plan"
            className="w-full"
            onError={() => setUseOfficialImage(false)}
          />
        ) : (
          <SchematicSVG marker={marker} />
        )}
      </div>

      {/* "You are here" selector */}
      <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide mb-2">Move "You are here" marker</p>
      <div className="grid grid-cols-2 gap-1.5 mb-4">
        {markerPositions.map(pos => (
          <button
            key={pos.id}
            onClick={() => setMarker(marker === pos.id ? null : pos.id)}
            className={cn(
              'text-xs px-3 py-2 rounded-xl border transition-all text-left',
              marker === pos.id
                ? 'bg-sky-500/20 border-sky-500/50 text-sky-300 font-semibold'
                : 'bg-white/4 border-white/10 text-[hsl(var(--muted-foreground))] hover:bg-white/8'
            )}
          >
            {pos.id === 'cabin' ? '🎯 ' : pos.id === 'elevator' ? '🛗 ' : pos.id === 'stairs' ? '🪜 ' : '📍 '}
            {pos.label}
          </button>
        ))}
      </div>

      {/* Replace with official image note */}
      <div className="flex items-start gap-2 bg-blue-500/10 border border-blue-500/20 rounded-xl p-3">
        <Upload size={13} className="text-blue-400 shrink-0 mt-0.5" />
        <p className="text-[11px] text-blue-300">
          <span className="font-semibold">Replace with official plan:</span> Add <code className="bg-white/10 px-1 rounded">public/maps/msc-musica-deck-12.png</code> to show the official MSC Musica Deck 12 map instead of this schematic.
        </p>
      </div>
    </Card>
  )
}
