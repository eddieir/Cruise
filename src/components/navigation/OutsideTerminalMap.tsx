import { useState, useCallback, useEffect } from 'react'
import { Navigation, MapPin, CheckCircle, AlertCircle, ExternalLink, Footprints, Car } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { GPSStatusBadge } from './GPSStatusBadge'
import { TERMINAL_COORDS, stationToTerminalSteps } from '@/data/navigation'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'

type LocationStatus = 'none' | 'at-station' | 'en-route' | 'at-terminal' | 'arrived'

function haversineDistance(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371000
  const phi1 = lat1 * Math.PI / 180
  const phi2 = lat2 * Math.PI / 180
  const dPhi = (lat2 - lat1) * Math.PI / 180
  const dLam = (lon2 - lon1) * Math.PI / 180
  const a = Math.sin(dPhi / 2) ** 2 + Math.cos(phi1) * Math.cos(phi2) * Math.sin(dLam / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

// SVG schematic route map
function OfflineRouteDiagram({ locationStatus }: { locationStatus: LocationStatus }) {
  const nodes = [
    { id: 'station', x: 60, y: 40, label: 'Piazza Principe Station', sub: 'Start', color: locationStatus !== 'none' ? '#22c55e' : '#94a3b8' },
    { id: 'gramsci', x: 180, y: 80, label: 'Via A. Gramsci', sub: '~10 min walk', color: locationStatus === 'en-route' || locationStatus === 'at-terminal' || locationStatus === 'arrived' ? '#22c55e' : '#94a3b8' },
    { id: 'ponte', x: 300, y: 40, label: 'Ponte dei Mille', sub: 'Port entrance', color: locationStatus === 'at-terminal' || locationStatus === 'arrived' ? '#22c55e' : '#94a3b8' },
    { id: 'terminal', x: 420, y: 80, label: 'MSC Terminal', sub: 'Security + Check-in', color: locationStatus === 'arrived' ? '#22c55e' : '#94a3b8' },
  ]

  return (
    <div className="rounded-xl overflow-hidden border border-white/10 bg-slate-900/60">
      <p className="text-[10px] text-center text-[hsl(var(--muted-foreground))] py-1.5 border-b border-white/10">
        Schematic route — not to scale
      </p>
      <svg viewBox="0 0 480 130" className="w-full" style={{ minHeight: '100px' }}>
        {/* Route line */}
        <polyline
          points={nodes.map(n => `${n.x},${n.y}`).join(' ')}
          stroke="#334155"
          strokeWidth="3"
          fill="none"
          strokeDasharray="6 3"
        />
        {/* Active portion */}
        {nodes.slice(0, locationStatus === 'none' ? 1 : locationStatus === 'at-station' ? 1 : locationStatus === 'en-route' ? 2 : locationStatus === 'at-terminal' ? 3 : 4).map((n, i, arr) => {
          if (i === 0) return null
          const prev = arr[i - 1]
          return (
            <line key={n.id} x1={prev.x} y1={prev.y} x2={n.x} y2={n.y}
              stroke="#22c55e" strokeWidth="3" />
          )
        })}
        {/* Nodes */}
        {nodes.map((n) => (
          <g key={n.id}>
            <circle cx={n.x} cy={n.y} r="10" fill={n.color} opacity="0.9" />
            <circle cx={n.x} cy={n.y} r="5" fill="white" opacity="0.9" />
            <text x={n.x} y={n.y + 24} textAnchor="middle" fill={n.color} fontSize="9" fontWeight="600">{n.label}</text>
            <text x={n.x} y={n.y + 34} textAnchor="middle" fill="#64748b" fontSize="7">{n.sub}</text>
          </g>
        ))}
        {/* Ship icon at end */}
        <text x={420} y={110} textAnchor="middle" fontSize="16">🚢</text>
      </svg>
    </div>
  )
}

export function OutsideTerminalMap() {
  const { isOnline } = useStore()
  const [gpsAvailable, setGpsAvailable] = useState<boolean | null>(null)
  const [coords, setCoords] = useState<{ lat: number; lng: number } | null>(null)
  const [locationStatus, setLocationStatus] = useState<LocationStatus>('none')
  const [distanceToTerminal, setDistanceToTerminal] = useState<number | null>(null)
  const [gpsError, setGpsError] = useState<string | null>(null)
  const [luggage, setLuggage] = useState<'light' | 'heavy'>('light')

  useEffect(() => {
    if (!navigator.geolocation) {
      setGpsAvailable(false)
    } else {
      setGpsAvailable(null)
    }
  }, [])

  const requestGPS = useCallback(() => {
    if (!navigator.geolocation) {
      setGpsAvailable(false)
      setGpsError('Geolocation is not supported by your browser.')
      return
    }
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords
        setGpsAvailable(true)
        setCoords({ lat: latitude, lng: longitude })
        setGpsError(null)
        const distStation = haversineDistance(latitude, longitude, TERMINAL_COORDS.station.lat, TERMINAL_COORDS.station.lng)
        const distTerminal = haversineDistance(latitude, longitude, TERMINAL_COORDS.terminal.lat, TERMINAL_COORDS.terminal.lng)
        setDistanceToTerminal(Math.round(distTerminal))
        if (distTerminal < 150) setLocationStatus('arrived')
        else if (distStation < 200) setLocationStatus('at-station')
        else if (distTerminal < 600) setLocationStatus('at-terminal')
        else setLocationStatus('en-route')
      },
      (err) => {
        setGpsAvailable(false)
        if (err.code === 1) setGpsError('GPS permission denied. Allow location access and try again.')
        else if (err.code === 2) setGpsError('GPS signal unavailable. Using offline schematic mode.')
        else setGpsError('GPS timed out. Using offline schematic mode.')
      },
      { enableHighAccuracy: true, timeout: 10000 }
    )
  }, [])

  const openInMaps = () => {
    const url = `https://www.openstreetmap.org/directions?engine=graphhopper_foot&route=${TERMINAL_COORDS.station.lat}%2C${TERMINAL_COORDS.station.lng}%3B${TERMINAL_COORDS.terminal.lat}%2C${TERMINAL_COORDS.terminal.lng}`
    window.open(url, '_blank', 'noopener')
  }

  const statusColors: Record<LocationStatus, string> = {
    none: 'bg-slate-500/20 text-slate-300 border-slate-500/30',
    'at-station': 'bg-blue-500/20 text-blue-300 border-blue-500/30',
    'en-route': 'bg-amber-500/20 text-amber-300 border-amber-500/30',
    'at-terminal': 'bg-violet-500/20 text-violet-300 border-violet-500/30',
    arrived: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30',
  }

  const statusLabels: Record<LocationStatus, string> = {
    none: 'Not started',
    'at-station': 'At Piazza Principe Station',
    'en-route': 'En route to terminal',
    'at-terminal': 'Near terminal',
    arrived: '✓ Arrived at MSC Terminal!',
  }

  return (
    <Card>
      <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
        <Navigation size={18} className="text-sky-400" />
        Station → Terminal (Outside Navigation)
      </h3>
      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">
        GPS works outside the ship. Use this section to navigate from Genova Piazza Principe station to the cruise terminal.
      </p>

      <GPSStatusBadge gpsAvailable={gpsAvailable} isOnline={isOnline} className="mb-4" />

      {/* Status badge */}
      <div className={cn('flex items-center gap-2 px-3 py-2 rounded-xl border text-sm font-medium mb-4', statusColors[locationStatus])}>
        <MapPin size={14} />
        {statusLabels[locationStatus]}
        {distanceToTerminal !== null && locationStatus !== 'arrived' && (
          <span className="ml-auto text-xs opacity-80">{distanceToTerminal > 1000 ? `${(distanceToTerminal / 1000).toFixed(1)} km` : `${distanceToTerminal} m`} to terminal</span>
        )}
      </div>

      {/* GPS error */}
      {gpsError && (
        <div className="flex items-start gap-2 bg-red-500/10 border border-red-500/30 rounded-xl p-3 mb-4">
          <AlertCircle size={14} className="text-red-400 shrink-0 mt-0.5" />
          <p className="text-xs text-red-300">{gpsError}</p>
        </div>
      )}

      {/* Luggage selector */}
      <div className="mb-4">
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-2">My luggage is:</p>
        <div className="grid grid-cols-2 gap-2">
          {[
            { id: 'light', label: 'Light — I can walk', icon: <Footprints size={14} />, note: '~12–15 min walk' },
            { id: 'heavy', label: 'Heavy — take a taxi', icon: <Car size={14} />, note: 'Taxi €8–€12 approx.' },
          ].map(opt => (
            <button
              key={opt.id}
              onClick={() => setLuggage(opt.id as 'light' | 'heavy')}
              className={cn(
                'flex items-center gap-2 p-3 rounded-xl border text-sm text-left transition-all',
                luggage === opt.id
                  ? 'bg-sky-500/20 border-sky-500/50 text-sky-300'
                  : 'bg-white/5 border-white/10 text-[hsl(var(--muted-foreground))] hover:bg-white/10'
              )}
            >
              {opt.icon}
              <div>
                <p className="font-medium text-xs">{opt.label}</p>
                <p className="text-[10px] opacity-70">{opt.note}</p>
              </div>
            </button>
          ))}
        </div>
        {luggage === 'heavy' && (
          <div className="mt-2 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200">
            <span className="font-semibold">Taxi tip:</span> Taxi rank is outside Piazza Principe station main exit. Agree price beforehand or ensure meter is running. Ask for "Terminal Crociere MSC / Ponte dei Mille."
          </div>
        )}
      </div>

      {/* SVG Schematic Map */}
      <OfflineRouteDiagram locationStatus={locationStatus} />

      {/* Step-by-step route */}
      <div className="mt-4 space-y-2">
        <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Route Steps</p>
        {stationToTerminalSteps.map((step, i) => (
          <div key={step.id} className="flex items-start gap-3 bg-white/4 rounded-xl p-3">
            <div className="w-7 h-7 rounded-full bg-sky-500/20 flex items-center justify-center shrink-0 text-sm">
              {step.icon}
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-[10px] text-sky-400 font-bold uppercase">{i + 1}</span>
                <p className="text-xs font-semibold text-white">{step.title}</p>
              </div>
              <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-0.5">{step.detail}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Action buttons */}
      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          onClick={requestGPS}
          className="flex items-center justify-center gap-2 bg-sky-500/20 hover:bg-sky-500/30 border border-sky-500/40 rounded-xl py-3 text-sm font-semibold text-sky-300 transition-all"
        >
          <Navigation size={15} /> Use GPS
        </button>
        <button
          disabled={!isOnline}
          onClick={openInMaps}
          className={cn(
            'flex items-center justify-center gap-2 border rounded-xl py-3 text-sm font-semibold transition-all',
            isOnline
              ? 'bg-white/5 hover:bg-white/10 border-white/15 text-white'
              : 'bg-white/3 border-white/8 text-slate-600 cursor-not-allowed'
          )}
        >
          <ExternalLink size={15} /> Open in OSM
        </button>
      </div>

      {/* Manual location buttons */}
      <div className="mt-3 grid grid-cols-2 gap-2">
        {[
          { label: 'I am at Piazza Principe', status: 'at-station' as LocationStatus, icon: '🚂' },
          { label: 'I am walking to terminal', status: 'en-route' as LocationStatus, icon: '🚶' },
          { label: 'I see the terminal', status: 'at-terminal' as LocationStatus, icon: '⚓' },
          { label: 'Mark arrived at ship', status: 'arrived' as LocationStatus, icon: '✅' },
        ].map(btn => (
          <button
            key={btn.status}
            onClick={() => setLocationStatus(btn.status)}
            className={cn(
              'flex items-center gap-2 px-3 py-2.5 rounded-xl border text-xs font-medium transition-all text-left',
              locationStatus === btn.status
                ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
                : 'bg-white/4 border-white/10 text-[hsl(var(--muted-foreground))] hover:bg-white/8'
            )}
          >
            <span>{btn.icon}</span>
            {btn.label}
            {locationStatus === btn.status && <CheckCircle size={12} className="ml-auto" />}
          </button>
        ))}
      </div>

      {/* Coords display when GPS active */}
      {coords && (
        <div className="mt-3 bg-white/4 rounded-xl p-3 text-[10px] text-[hsl(var(--muted-foreground))] font-mono">
          Current: {coords.lat.toFixed(5)}, {coords.lng.toFixed(5)}
          {distanceToTerminal !== null && ` · ${distanceToTerminal}m to terminal`}
        </div>
      )}
    </Card>
  )
}
