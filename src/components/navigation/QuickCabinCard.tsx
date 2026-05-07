import { Anchor, BedDouble, Shield, Clock, ChefHat, CreditCard } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { CABIN_INFO } from '@/data/navigation'

export function QuickCabinCard() {
  return (
    <Card className="relative overflow-hidden border-sky-500/30 bg-gradient-to-br from-sky-950/80 to-blue-950/80">
      {/* Header bar */}
      <div className="flex items-center gap-3 mb-4">
        <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shrink-0">
          <Anchor size={20} className="text-white" />
        </div>
        <div>
          <h2 className="font-bold text-white text-base">Your Cabin at a Glance</h2>
          <p className="text-xs text-sky-300">{CABIN_INFO.ship} · Booking {CABIN_INFO.bookingNumber}</p>
        </div>
        <Badge variant="green" className="ml-auto">Paid ✓</Badge>
      </div>

      {/* Main cabin number — large and prominent */}
      <div className="bg-gradient-to-r from-sky-500/20 to-blue-500/20 border border-sky-500/40 rounded-2xl p-4 mb-4 text-center">
        <div className="flex items-center justify-center gap-3">
          <BedDouble size={24} className="text-sky-300" />
          <div>
            <p className="text-[10px] text-sky-300 uppercase tracking-widest mb-0.5">Cabin / Cabina</p>
            <p className="text-4xl font-black text-white tracking-tight">{CABIN_INFO.number}</p>
          </div>
          <div className="text-left">
            <p className="text-[10px] text-sky-300 uppercase tracking-widest mb-0.5">Deck / Ponte</p>
            <p className="text-4xl font-black text-sky-400 tracking-tight">{CABIN_INFO.deck}</p>
          </div>
        </div>
        <p className="text-xs text-sky-200/70 mt-2">{CABIN_INFO.type} · {CABIN_INFO.experience}</p>
      </div>

      {/* Info grid */}
      <div className="grid grid-cols-2 gap-2 mb-3">
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
          <Shield size={16} className="text-amber-400 shrink-0" />
          <div>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Muster Point</p>
            <p className="font-bold text-white text-sm">{CABIN_INFO.musterPoint}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
          <Clock size={16} className="text-emerald-400 shrink-0" />
          <div>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Check-in Opens</p>
            <p className="font-bold text-white text-sm">{CABIN_INFO.checkInOpens}</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
          <ChefHat size={16} className="text-violet-400 shrink-0" />
          <div>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Dinner Sitting</p>
            <p className="font-bold text-white text-sm">Primo Turno</p>
          </div>
        </div>
        <div className="flex items-center gap-2 bg-white/5 rounded-xl p-3">
          <Anchor size={16} className="text-sky-400 shrink-0" />
          <div>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Departure</p>
            <p className="font-bold text-white text-sm">{CABIN_INFO.departure}</p>
          </div>
        </div>
      </div>

      {/* Cruise Card reminder */}
      <div className="flex items-start gap-2 bg-amber-500/10 border border-amber-500/30 rounded-xl p-3">
        <CreditCard size={15} className="text-amber-400 shrink-0 mt-0.5" />
        <p className="text-xs text-amber-200">
          <span className="font-semibold">Cruise Card reminder:</span> Your card will be in an envelope on the cabin door when cabins are ready. Collect it immediately — it is your key and onboard payment card.
        </p>
      </div>
    </Card>
  )
}
