import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import {
  Wallet, UtensilsCrossed, Wifi, Activity,
  MapPin, ListChecks, AlertTriangle, ShieldAlert,
  Anchor, Euro, AlertCircle, Navigation, BedDouble
} from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { ThreeDItineraryGallery } from '@/components/three/ThreeDItineraryGallery'
import { useStore } from '@/store/useStore'
import { itinerary } from '@/data/itinerary'
import { BUDGET_TARGET, BUDGET_CEILING } from '@/data/budget'
import { formatEuro } from '@/lib/utils'

const quickLinks = [
  { to: '/navigation', icon: Navigation, label: "Cabin Navigator", color: 'from-indigo-500 to-blue-600', desc: 'Find Cabin 12049 · GPS guide' },
  { to: '/budget', icon: Wallet, label: "Budget Tracker", color: 'from-sky-500 to-blue-600', desc: 'Track every euro' },
  { to: '/food', icon: UtensilsCrossed, label: "Food Plan", color: 'from-emerald-500 to-teal-600', desc: 'Day-by-day meals' },
  { to: '/activities', icon: Activity, label: "Free Activities", color: 'from-violet-500 to-purple-600', desc: 'Free vs paid onboard' },
  { to: '/internet', icon: Wifi, label: "Internet Strategy", color: 'from-orange-500 to-amber-600', desc: 'SIM & Wi-Fi plan' },
  { to: '/ports', icon: MapPin, label: "Port Plans", color: 'from-rose-500 to-pink-600', desc: 'What to do in each port' },
  { to: '/packing', icon: ListChecks, label: "Packing List", color: 'from-cyan-500 to-sky-600', desc: 'Checklist' },
  { to: '/avoid', icon: AlertTriangle, label: "Avoid List", color: 'from-red-500 to-orange-600', desc: 'What not to do' },
  { to: '/emergency', icon: ShieldAlert, label: "Emergency Rules", color: 'from-slate-500 to-gray-600', desc: 'If things go wrong' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.06 } } }
const item = { hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }

export function Dashboard() {
  const { getTotalSpent } = useStore()
  const totalSpent = getTotalSpent()
  const remaining = BUDGET_TARGET - totalSpent
  const budgetStatus = totalSpent <= BUDGET_TARGET ? 'safe'
    : totalSpent <= BUDGET_CEILING ? 'caution' : 'danger'

  return (
    <div className="space-y-8">
      {/* Hero */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-sky-600 via-blue-700 to-indigo-800 p-6 md:p-8">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMwLTkuOTQtOC4wNi0xOC0xOC0xOFMwIDguMDYgMCAxOHM4LjA2IDE4IDE4IDE4IDE4LTguMDYgMTgtMTh6IiBzdHJva2U9InJnYmEoMjU1LDI1NSwyNTUsMC4wNSkiIHN0cm9rZS13aWR0aD0iMSIvPjwvZz48L3N2Zz4=')] opacity-30" />
          <div className="relative z-10">
            <div className="flex items-start justify-between flex-wrap gap-4">
              <div>
                <div className="flex items-center gap-2 mb-2">
                  <Anchor size={20} className="text-sky-200" />
                  <span className="text-sky-200 text-sm font-medium">MSC Musica</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-white leading-tight">
                  Economical Cruise<br />Planner 2026
                </h1>
                <p className="text-sky-200 mt-2 text-sm">26 May – 2 June 2026 · 8 days / 7 nights</p>
              </div>
              <div className="flex flex-wrap gap-2">
                <Badge variant="green">Cruise Paid ✓</Badge>
                <Badge variant="blue">2 Passengers</Badge>
                <Badge variant="default">Italy · France · Spain</Badge>
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mt-6">
              {[
                { label: 'Remaining Balance', value: '€0', icon: Euro, color: 'text-emerald-300' },
                { label: 'Budget Target', value: formatEuro(BUDGET_TARGET), icon: Wallet, color: 'text-sky-300' },
                { label: 'Safety Ceiling', value: formatEuro(BUDGET_CEILING), icon: AlertCircle, color: 'text-amber-300' }
              ].map(({ label, value, icon: Icon, color }) => (
                <div key={label} className="bg-white/10 rounded-2xl p-3 text-center backdrop-blur-sm">
                  <Icon size={16} className={`${color} mx-auto mb-1`} />
                  <div className={`text-lg font-bold ${color}`}>{value}</div>
                  <div className="text-[10px] text-white/60 mt-0.5">{label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Find Cabin CTA */}
      <motion.div initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}>
        <Link to="/navigation">
          <div className="flex items-center gap-4 rounded-2xl bg-gradient-to-r from-indigo-600/80 to-blue-700/80 border border-indigo-500/40 p-4 hover:from-indigo-600 hover:to-blue-700 transition-all">
            <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">
              <BedDouble size={24} className="text-white" />
            </div>
            <div className="flex-1">
              <p className="font-bold text-white text-base">Find Cabin 12049</p>
              <p className="text-indigo-200 text-xs mt-0.5">GPS guide · Embarkation checklist · Deck 12 map</p>
            </div>
            <div className="text-white/60">
              <Navigation size={20} />
            </div>
          </div>
        </Link>
      </motion.div>

      {/* Warning Banner */}
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}>
        <div className="flex items-start gap-3 rounded-2xl bg-amber-500/10 border border-amber-500/30 p-4">
          <AlertCircle size={20} className="text-amber-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-semibold text-amber-300">Golden Rule</p>
            <p className="text-sm text-amber-200/80 mt-0.5">
              Do not scan your cruise card unless you know the item is included in your fare. When in doubt — ask.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Budget snapshot */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.25 }}>
        <Card>
          <div className="flex items-center justify-between mb-3">
            <h2 className="font-semibold text-base flex items-center gap-2">
              <Wallet size={18} className="text-sky-400" /> Budget Snapshot
            </h2>
            <Badge variant={budgetStatus === 'safe' ? 'green' : budgetStatus === 'caution' ? 'yellow' : 'red'}>
              {budgetStatus === 'safe' ? 'On Track' : budgetStatus === 'caution' ? 'Over Target' : 'Over Ceiling!'}
            </Badge>
          </div>
          <div className="grid grid-cols-3 gap-3 mb-4 text-center">
            <div>
              <p className="text-xl font-bold text-white">{formatEuro(totalSpent)}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Spent</p>
            </div>
            <div>
              <p className={`text-xl font-bold ${remaining >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
                {remaining >= 0 ? formatEuro(remaining) : `-${formatEuro(-remaining)}`}
              </p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Remaining</p>
            </div>
            <div>
              <p className="text-xl font-bold text-amber-400">{formatEuro(BUDGET_CEILING)}</p>
              <p className="text-xs text-[hsl(var(--muted-foreground))]">Ceiling</p>
            </div>
          </div>
          <ProgressBar value={totalSpent} max={BUDGET_CEILING} colorAuto />
          <Link to="/budget" className="mt-3 text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1">
            Open Budget Tracker →
          </Link>
        </Card>
      </motion.div>

      {/* 3D Itinerary */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
        <h2 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
          <MapPin size={18} className="text-sky-400" /> Your Route
        </h2>
        <ThreeDItineraryGallery ports={itinerary} />
      </motion.div>

      {/* Trip info */}
      <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}>
        <h2 className="text-lg font-bold text-white mb-3">Trip Strategy</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {[
            { icon: '🌐', label: 'Internet', value: 'WINDTRE & Iliad SIM in ports only. Airplane mode at sea.' },
            { icon: '🍽️', label: 'Food', value: 'All meals in included buffet/restaurant. Zero paid food onboard.' },
            { icon: '🎭', label: 'Entertainment', value: 'Free shows, theatre, music, pool, gym. No casino or spa.' },
            { icon: '✈️', label: 'Excursions', value: 'Walk and use public transport independently. No paid excursions.' },
          ].map(({ icon, label, value }) => (
            <Card key={label} glass className="flex items-start gap-3">
              <span className="text-2xl shrink-0">{icon}</span>
              <div>
                <p className="font-semibold text-sm text-white">{label}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{value}</p>
              </div>
            </Card>
          ))}
        </div>
      </motion.div>

      {/* Quick links */}
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        transition={{ delayChildren: 0.4 }}
      >
        <h2 className="text-lg font-bold text-white mb-3">Quick Access</h2>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
          {quickLinks.map(({ to, icon: Icon, label, color, desc }) => (
            <motion.div key={to} variants={item}>
              <Link to={to}>
                <Card glass className="flex flex-col items-center text-center py-4 gap-2 hover:border-sky-500/40 hover:bg-sky-500/5 transition-all">
                  <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${color} flex items-center justify-center`}>
                    <Icon size={18} className="text-white" />
                  </div>
                  <span className="text-sm font-semibold text-white">{label}</span>
                  <span className="text-[10px] text-[hsl(var(--muted-foreground))]">{desc}</span>
                </Card>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}
