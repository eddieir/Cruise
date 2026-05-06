import { Anchor } from 'lucide-react'
import { DarkModeToggle } from '@/components/ui/DarkModeToggle'
import { OfflineStatusBadge } from '@/components/ui/OfflineStatusBadge'

export function MobileHeader() {
  return (
    <header className="md:hidden sticky top-0 z-40 bg-[hsl(var(--card))]/95 backdrop-blur-md border-b border-[hsl(var(--border))] px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center">
            <Anchor size={15} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-tight">MSC Musica</p>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Cruise Planner</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <OfflineStatusBadge />
          <DarkModeToggle />
        </div>
      </div>
    </header>
  )
}
