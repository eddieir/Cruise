import { Link, useLocation } from 'react-router-dom'
import { cn } from '@/lib/utils'
import {
  LayoutDashboard, Wallet, UtensilsCrossed, Wifi,
  Activity, MapPin, Shirt, ListChecks, ShieldAlert,
  AlertTriangle, Anchor
} from 'lucide-react'
import { DarkModeToggle } from '@/components/ui/DarkModeToggle'
import { OfflineStatusBadge } from '@/components/ui/OfflineStatusBadge'
import { InstallPWAButton } from '@/components/ui/InstallPWAButton'

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/budget', icon: Wallet, label: 'Budget Tracker' },
  { to: '/food', icon: UtensilsCrossed, label: 'Food Plan' },
  { to: '/internet', icon: Wifi, label: 'Internet Strategy' },
  { to: '/activities', icon: Activity, label: 'Activities' },
  { to: '/ports', icon: MapPin, label: 'Port Plans' },
  { to: '/clothing', icon: Shirt, label: 'Clothing' },
  { to: '/packing', icon: ListChecks, label: 'Packing List' },
  { to: '/avoid', icon: AlertTriangle, label: 'Avoid List' },
  { to: '/emergency', icon: ShieldAlert, label: 'Emergency Rules' },
]

export function DesktopSidebar() {
  const { pathname } = useLocation()

  return (
    <aside className="hidden md:flex flex-col w-60 shrink-0 h-screen sticky top-0 bg-[hsl(var(--card))] border-r border-[hsl(var(--border))] overflow-y-auto">
      {/* Logo */}
      <div className="p-4 border-b border-[hsl(var(--border))]">
        <div className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-sky-500 to-blue-600 flex items-center justify-center shrink-0">
            <Anchor size={18} className="text-white" />
          </div>
          <div>
            <p className="font-bold text-sm leading-tight text-[hsl(var(--foreground))]">MSC Musica</p>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))]">Cruise Planner 2026</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-3 space-y-0.5">
        {navItems.map(({ to, icon: Icon, label }) => {
          const active = pathname === to
          return (
            <Link
              key={to}
              to={to}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm transition-all',
                active
                  ? 'bg-sky-500/15 text-sky-400 font-medium border border-sky-500/25'
                  : 'text-[hsl(var(--muted-foreground))] hover:bg-white/5 hover:text-[hsl(var(--foreground))]'
              )}
            >
              <Icon size={17} strokeWidth={active ? 2.5 : 1.8} />
              {label}
            </Link>
          )
        })}
      </nav>

      {/* Footer */}
      <div className="p-3 border-t border-[hsl(var(--border))] space-y-2">
        <InstallPWAButton />
        <div className="flex items-center justify-between">
          <OfflineStatusBadge />
          <DarkModeToggle />
        </div>
        <p className="text-[10px] text-[hsl(var(--muted-foreground))] text-center">
          26 May – 2 June 2026
        </p>
      </div>
    </aside>
  )
}
