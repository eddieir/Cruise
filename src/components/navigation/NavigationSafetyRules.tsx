import { AlertTriangle, ShieldAlert, Info } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { cn } from '@/lib/utils'

const rules = [
  {
    id: 'no-elevator-emergency',
    severity: 'critical' as const,
    icon: '🚫',
    title: 'Do NOT use elevators in an emergency',
    detail: 'During any emergency signal or drill, use the stairs only. Elevators may stop or trap occupants.',
  },
  {
    id: 'emergency-signal',
    severity: 'critical' as const,
    icon: '📢',
    title: 'Emergency signal: 7 short + 1 long blast',
    detail: 'If you hear 7 short horn blasts followed by 1 long blast: go to your cabin, collect essential medicines if instructed, then proceed to Muster Point C immediately.',
  },
  {
    id: 'muster-point',
    severity: 'critical' as const,
    icon: '📍',
    title: 'Your Muster Point is C',
    detail: 'Learn the exact location of Muster Point C during the mandatory safety drill on embarkation day. Do not guess — attend the drill.',
  },
  {
    id: 'documents',
    severity: 'warning' as const,
    icon: '📄',
    title: 'Keep ID/passport accessible during embarkation',
    detail: 'Do not pack passports in checked luggage. Keep both passports, boarding confirmations, and Cruise Card in your hand bag.',
  },
  {
    id: 'medicines',
    severity: 'warning' as const,
    icon: '💊',
    title: 'Medicines and valuables in hand luggage only',
    detail: 'Checked bags can take hours to arrive at the cabin. Always carry medicines, money, phone, charger, and valuables yourself.',
  },
  {
    id: 'balcony',
    severity: 'warning' as const,
    icon: '🌬️',
    title: 'Do not leave objects on the balcony',
    detail: 'Wind at sea can blow items overboard. Secure anything on the balcony. Never lean over the railing.',
  },
  {
    id: 'no-kettle',
    severity: 'warning' as const,
    icon: '⚡',
    title: 'No heating devices allowed onboard',
    detail: 'Electric kettles, moka pots, irons, candles, and coffee machines are strictly prohibited. Fire risk. MSC will confiscate them.',
  },
  {
    id: 'food-rule',
    severity: 'info' as const,
    icon: '🍫',
    title: 'Only dry packaged food/drinks allowed onboard',
    detail: 'You cannot bring homemade food or drinks. Only sealed dry packaged products (crackers, protein bars, chocolate, taralli) are permitted.',
  },
  {
    id: 'cruise-card',
    severity: 'info' as const,
    icon: '💳',
    title: 'Do not scan Cruise Card unless you are sure it is free',
    detail: 'Scanning your card authorises a charge. Always ask "Is this included?" before scanning at bars, restaurants, or activity desks.',
  },
  {
    id: 'low-battery',
    severity: 'info' as const,
    icon: '🔋',
    title: 'Low battery: this app works offline',
    detail: 'This PWA app works offline. All navigation data is stored locally. Reduce screen brightness to save battery. Use a power bank.',
  },
  {
    id: 'no-data',
    severity: 'info' as const,
    icon: '✈️',
    title: 'No mobile data: keep airplane mode on at sea',
    detail: 'Maritime roaming is extremely expensive. Use airplane mode at sea. This app and all navigation guides work fully offline.',
  },
]

const severityStyle = {
  critical: { border: 'border-red-500/40', bg: 'bg-red-500/10', icon: <ShieldAlert size={14} className="text-red-400 shrink-0 mt-0.5" /> },
  warning: { border: 'border-amber-500/35', bg: 'bg-amber-500/10', icon: <AlertTriangle size={14} className="text-amber-400 shrink-0 mt-0.5" /> },
  info: { border: 'border-blue-500/30', bg: 'bg-blue-500/8', icon: <Info size={14} className="text-blue-400 shrink-0 mt-0.5" /> },
}

export function NavigationSafetyRules() {
  return (
    <Card>
      <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
        <ShieldAlert size={17} className="text-red-400" />
        Safety & Important Rules
      </h3>
      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">Navigation-specific safety reminders for embarkation and onboard.</p>

      <div className="space-y-2">
        {rules.map(rule => {
          const style = severityStyle[rule.severity]
          return (
            <div key={rule.id} className={cn('flex items-start gap-3 rounded-xl border p-3', style.border, style.bg)}>
              <span className="text-base shrink-0">{rule.icon}</span>
              <div className="flex-1">
                <div className="flex items-start gap-2">
                  {style.icon}
                  <p className="text-xs font-semibold text-white leading-snug">{rule.title}</p>
                </div>
                <p className="text-[11px] text-[hsl(var(--muted-foreground))] mt-1 leading-relaxed">{rule.detail}</p>
              </div>
            </div>
          )
        })}
      </div>
    </Card>
  )
}
