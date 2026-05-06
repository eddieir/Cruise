import { motion } from 'framer-motion'
import { Wifi, WifiOff, Smartphone, Download, AlertCircle, CheckCircle2 } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { useStore } from '@/store/useStore'
import { wifiOptions } from '@/data/budget'
import { formatEuro } from '@/lib/utils'

const rules = [
  { icon: '✅', text: 'Use WINDTRE or Iliad SIM data only in ports or near land', status: 'safe' },
  { icon: '✅', text: 'Keep airplane mode ON while the ship is sailing', status: 'safe' },
  { icon: '✅', text: 'Download offline maps (Maps.me / Google Maps) before departure', status: 'safe' },
  { icon: '✅', text: 'Download all tickets, booking docs, insurance documents before departure', status: 'safe' },
  { icon: '✅', text: 'Take screenshots of all important information', status: 'safe' },
  { icon: '✅', text: 'Install this app as a PWA for offline access', status: 'safe' },
  { icon: '❌', text: 'Never use maritime or satellite roaming — costs can be catastrophic', status: 'danger' },
  { icon: '❌', text: 'Do not buy MSC Wi-Fi unless absolutely necessary', status: 'danger' },
  { icon: '❌', text: 'Do not stream video or music at sea', status: 'danger' },
]

export function InternetStrategy() {
  const { wifiOption, setWifiOption } = useStore()
  const selected = wifiOptions.find(o => o.id === wifiOption)!

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Wifi size={24} className="text-orange-400" /> Internet Strategy
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">
          Stay connected in ports for free. Avoid the ship's Wi-Fi.
        </p>
      </motion.div>

      {/* SIM cards */}
      <div className="grid grid-cols-2 gap-3">
        {[
          { label: 'Peyman', sim: 'WINDTRE SIM', icon: '📱', color: 'from-orange-500 to-red-500' },
          { label: 'Mozhgan', sim: 'Iliad SIM', icon: '📱', color: 'from-rose-500 to-pink-500' }
        ].map(({ label, sim, icon, color }) => (
          <Card key={label} glass className="text-center py-4">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center text-xl mx-auto mb-2`}>
              {icon}
            </div>
            <p className="font-semibold text-sm text-white">{label}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{sim}</p>
            <Badge variant="green" className="mt-2">€0 extra in ports</Badge>
          </Card>
        ))}
      </div>

      {/* Rules */}
      <Card>
        <h2 className="font-semibold text-white mb-3 flex items-center gap-2">
          <Smartphone size={18} className="text-orange-400" /> Ground Rules
        </h2>
        <ul className="space-y-2.5">
          {rules.map(({ icon, text, status }) => (
            <li key={text} className={`flex items-start gap-3 text-sm rounded-xl px-3 py-2 ${
              status === 'safe' ? 'bg-emerald-500/8' : 'bg-red-500/8'
            }`}>
              <span className="text-base shrink-0">{icon}</span>
              <span className={status === 'safe' ? 'text-emerald-200' : 'text-red-200'}>{text}</span>
            </li>
          ))}
        </ul>
      </Card>

      {/* Wi-Fi cost selector */}
      <Card>
        <h2 className="font-semibold text-white mb-1 flex items-center gap-2">
          <Wifi size={18} className="text-orange-400" /> MSC Wi-Fi Impact Calculator
        </h2>
        <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">
          Select an option to see the impact on your total trip budget.
        </p>
        <div className="space-y-2">
          {wifiOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setWifiOption(opt.id as typeof wifiOption)}
              className={`w-full flex items-center justify-between p-4 rounded-xl border transition-all text-left ${
                wifiOption === opt.id
                  ? 'border-orange-500 bg-orange-500/15'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div className="flex items-center gap-3">
                {opt.id === 'none' ? <WifiOff size={20} className="text-emerald-400" /> : <Wifi size={20} className="text-orange-400" />}
                <div>
                  <p className="text-sm font-semibold text-white">{opt.label}</p>
                  <p className="text-xs text-[hsl(var(--muted-foreground))]">{opt.description}</p>
                </div>
              </div>
              <div className="text-right shrink-0 ml-3">
                <Badge variant={opt.badgeColor}>{opt.badge}</Badge>
                <p className="text-sm font-bold text-white mt-1">+{formatEuro(opt.cost)}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">Total ≈ {formatEuro(opt.tripTotal)}</p>
              </div>
            </button>
          ))}
        </div>
        {selected && (
          <div className={`mt-4 p-3 rounded-xl border ${
            selected.id === 'none' ? 'bg-emerald-500/10 border-emerald-500/30' :
            selected.id === 'one-device' ? 'bg-amber-500/10 border-amber-500/30' :
            'bg-red-500/10 border-red-500/30'
          }`}>
            <p className={`text-sm font-semibold ${
              selected.id === 'none' ? 'text-emerald-300' :
              selected.id === 'one-device' ? 'text-amber-300' : 'text-red-300'
            }`}>
              {selected.id === 'none'
                ? '✅ Recommended — Stays within €350 target'
                : selected.id === 'one-device'
                ? '⚠️ Exceeds €350 target — only if essential'
                : '🚨 Well above ceiling — avoid this option'}
            </p>
          </div>
        )}
      </Card>

      {/* Before departure checklist */}
      <Card>
        <h2 className="font-semibold text-white mb-3 flex items-center gap-2">
          <Download size={18} className="text-sky-400" /> Download Before Departure
        </h2>
        <ul className="space-y-2">
          {[
            'Offline maps for all ports (Marseille, Valencia, Ibiza, Cagliari, Civitavecchia, Genova)',
            'Google Translate offline for French, Spanish, Italian',
            'This cruise planner app (Install as PWA)',
            'Screenshots of cruise ticket and booking confirmation',
            'Screenshots of train tickets (Turin ↔ Genova)',
            'Screenshots of travel insurance documents',
            'Health card photos',
            'Port return times for each day',
          ].map(item => (
            <li key={item} className="flex items-start gap-2 text-sm text-[hsl(var(--foreground))]">
              <CheckCircle2 size={16} className="text-sky-400 shrink-0 mt-0.5" />
              {item}
            </li>
          ))}
        </ul>
      </Card>

      {/* Port-by-port signal guide */}
      <Card>
        <h2 className="font-semibold text-white mb-3 flex items-center gap-2">
          <AlertCircle size={18} className="text-orange-400" /> Port Signal Guide
        </h2>
        <div className="space-y-2">
          {[
            { port: 'Genova', signal: 'Full Italian signal (WINDTRE + Iliad)', note: 'Use freely' },
            { port: 'Marseille', signal: 'French signal in port area', note: 'EU roaming included for most plans' },
            { port: 'Valencia', signal: 'Spanish signal in port area', note: 'EU roaming included for most plans' },
            { port: 'Ibiza', signal: 'Spanish signal in port area', note: 'EU roaming included for most plans' },
            { port: 'At Sea', signal: 'No signal / Maritime satellite only', note: '⛔ Airplane mode mandatory' },
            { port: 'Cagliari', signal: 'Full Italian signal (WINDTRE + Iliad)', note: 'Use freely' },
            { port: 'Civitavecchia', signal: 'Full Italian signal (WINDTRE + Iliad)', note: 'Use freely' },
          ].map(({ port, signal, note }) => (
            <div key={port} className="flex items-center justify-between gap-2 py-2 border-b border-white/5 last:border-0">
              <div>
                <p className="text-sm font-medium text-white">{port}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{signal}</p>
              </div>
              <Badge variant={note.includes('⛔') ? 'red' : 'green'}>{note}</Badge>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
