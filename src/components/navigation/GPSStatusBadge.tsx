import { Navigation, NavigationOff, Wifi, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'

interface GPSStatusBadgeProps {
  gpsAvailable: boolean | null
  isOnline: boolean
  className?: string
}

export function GPSStatusBadge({ gpsAvailable, isOnline, className }: GPSStatusBadgeProps) {
  return (
    <div className={cn('flex items-center gap-2 flex-wrap', className)}>
      <div className={cn(
        'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        gpsAvailable === null
          ? 'bg-slate-500/20 border-slate-500/40 text-slate-300'
          : gpsAvailable
            ? 'bg-emerald-500/20 border-emerald-500/40 text-emerald-300'
            : 'bg-red-500/20 border-red-500/40 text-red-300'
      )}>
        {gpsAvailable === null ? (
          <><Navigation size={11} className="animate-pulse" /> GPS: checking…</>
        ) : gpsAvailable ? (
          <><Navigation size={11} /> GPS: available</>
        ) : (
          <><NavigationOff size={11} /> GPS: unavailable</>
        )}
      </div>

      <div className={cn(
        'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
        isOnline
          ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
          : 'bg-orange-500/20 border-orange-500/40 text-orange-300'
      )}>
        {isOnline ? (
          <><Wifi size={11} /> Online map available</>
        ) : (
          <><WifiOff size={11} /> Offline schematic mode</>
        )}
      </div>
    </div>
  )
}
