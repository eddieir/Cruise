import { useStore } from '@/store/useStore'
import { Wifi, WifiOff } from 'lucide-react'
import { cn } from '@/lib/utils'

export function OfflineStatusBadge() {
  const isOnline = useStore(s => s.isOnline)

  return (
    <div
      className={cn(
        'flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium transition-all',
        isOnline
          ? 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30'
          : 'bg-amber-500/15 text-amber-400 border border-amber-500/30'
      )}
    >
      {isOnline ? <Wifi size={12} /> : <WifiOff size={12} />}
      {isOnline ? 'Online' : 'Offline'}
    </div>
  )
}
