import { useState, type ReactNode } from 'react'
import { motion } from 'framer-motion'
import { Navigation, BedDouble, ListChecks, Map, Compass, Shield, ChevronDown, ChevronUp, Euro, Wifi, WifiOff } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { QuickCabinCard } from '@/components/navigation/QuickCabinCard'
import { OutsideTerminalMap } from '@/components/navigation/OutsideTerminalMap'
import { EmbarkationChecklist } from '@/components/navigation/EmbarkationChecklist'
import { IndoorCabinGuide } from '@/components/navigation/IndoorCabinGuide'
import { Deck12SchematicMap } from '@/components/navigation/Deck12SchematicMap'
import { CabinFinder } from '@/components/navigation/CabinFinder'
import { CabinToShipLocations } from '@/components/navigation/CabinToShipLocations'
import { NavigationSafetyRules } from '@/components/navigation/NavigationSafetyRules'
import { useStore } from '@/store/useStore'
import { cn } from '@/lib/utils'

type SectionId = 'cabin-card' | 'outside-map' | 'embarkation' | 'indoor-guide' | 'deck-map' | 'cabin-finder' | 'ship-locations' | 'safety' | 'budget-summary'

const sections: { id: SectionId; label: string; icon: ReactNode; desc: string }[] = [
  { id: 'cabin-card', label: 'Cabin Info', icon: <BedDouble size={15} />, desc: 'Your quick cabin reference card' },
  { id: 'outside-map', label: 'Station → Terminal', icon: <Navigation size={15} />, desc: 'GPS & offline route to cruise port' },
  { id: 'embarkation', label: 'Embarkation Steps', icon: <ListChecks size={15} />, desc: 'Step-by-step boarding checklist' },
  { id: 'indoor-guide', label: 'Ship → Cabin', icon: <Compass size={15} />, desc: 'Indoor guide to Cabin 12049' },
  { id: 'deck-map', label: 'Deck 12 Map', icon: <Map size={15} />, desc: 'Visual schematic of Deck 12' },
  { id: 'cabin-finder', label: 'Cabin Finder', icon: <BedDouble size={15} />, desc: 'Find any cabin by number' },
  { id: 'ship-locations', label: 'Ship Locations', icon: <Map size={15} />, desc: 'Key places from Cabin 12049' },
  { id: 'safety', label: 'Safety Rules', icon: <Shield size={15} />, desc: 'Emergency signals & rules' },
  { id: 'budget-summary', label: 'Budget Summary', icon: <Euro size={15} />, desc: 'Trip cost overview' },
]

const container = { hidden: {}, show: { transition: { staggerChildren: 0.07 } } }
const item = { hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }

function BudgetSummaryCard() {
  return (
    <Card>
      <h3 className="font-bold text-white text-base mb-1 flex items-center gap-2">
        <Euro size={17} className="text-emerald-400" />
        Budget Summary (Updated)
      </h3>
      <p className="text-xs text-[hsl(var(--muted-foreground))] mb-4">Based on final ticket. Cruise fully paid.</p>

      <div className="grid grid-cols-3 gap-2 mb-4">
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-emerald-400">€1,608</p>
          <p className="text-[10px] text-emerald-300 mt-0.5">Cruise Total</p>
        </div>
        <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-emerald-400">€1,608</p>
          <p className="text-[10px] text-emerald-300 mt-0.5">Paid</p>
        </div>
        <div className="bg-slate-500/10 border border-slate-500/30 rounded-xl p-3 text-center">
          <p className="text-xl font-black text-white">€0</p>
          <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-0.5">Balance</p>
        </div>
      </div>

      <div className="space-y-1.5 mb-4">
        <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))] uppercase tracking-wide">Extra costs plan (2 people)</p>
        {[
          { label: 'Turin ↔ Genova train', range: '€40–€70', color: 'text-sky-300' },
          { label: 'Genova station ↔ terminal', range: '€0–€10', color: 'text-emerald-300' },
          { label: 'Supermarket dry snacks', range: '€15–€25', color: 'text-emerald-300' },
          { label: 'Port coffee / water / snacks', range: '€45–€70', color: 'text-amber-300' },
          { label: 'Port public transport', range: '€50–€80', color: 'text-amber-300' },
          { label: 'Onboard paid drinks (avoid)', range: '€0–€30', color: 'text-red-300' },
          { label: 'Emergency buffer', range: '€80–€100', color: 'text-amber-300' },
        ].map(row => (
          <div key={row.label} className="flex items-center justify-between text-xs">
            <span className="text-[hsl(var(--muted-foreground))]">{row.label}</span>
            <span className={`font-semibold ${row.color}`}>{row.range}</span>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-3 gap-2 mb-3">
        <div className="bg-emerald-500/10 border border-emerald-500/25 rounded-xl p-2.5 text-center">
          <p className="text-sm font-bold text-emerald-400">€280–€320</p>
          <p className="text-[10px] text-emerald-300 mt-0.5">Ultra-disciplined</p>
        </div>
        <div className="bg-sky-500/10 border border-sky-500/25 rounded-xl p-2.5 text-center">
          <p className="text-sm font-bold text-sky-400">€330–€350</p>
          <p className="text-[10px] text-sky-300 mt-0.5">Strict target</p>
        </div>
        <div className="bg-amber-500/10 border border-amber-500/25 rounded-xl p-2.5 text-center">
          <p className="text-sm font-bold text-amber-400">€450</p>
          <p className="text-[10px] text-amber-300 mt-0.5">Safe ceiling</p>
        </div>
      </div>

      <div className="bg-amber-500/10 border border-amber-500/30 rounded-xl p-3 text-xs text-amber-200">
        <span className="font-semibold">Correction:</span> The €350 target still aligns with the ticket. The only update is that homemade food/drinks cannot be brought onboard — only dry packaged products are allowed. Hotel service charge and MSC Executive insurance are already included in the paid fare.
      </div>
    </Card>
  )
}

export function CabinNavigatorPage() {
  const { isOnline } = useStore()
  const [openSections, setOpenSections] = useState<Set<SectionId>>(new Set(['cabin-card', 'outside-map', 'embarkation']))

  const toggleSection = (id: SectionId) => {
    setOpenSections(prev => {
      const next = new Set(prev)
      if (next.has(id)) next.delete(id)
      else next.add(id)
      return next
    })
  }

  const expandAll = () => setOpenSections(new Set(sections.map(s => s.id)))
  const collapseAll = () => setOpenSections(new Set())

  return (
    <div className="space-y-6 pb-4">
      {/* Hero */}
      <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}>
        <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-indigo-700 via-blue-800 to-slate-900 p-6">
          <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_30%_50%,rgba(14,165,233,0.4),transparent)]" />
          <div className="relative z-10">
            <div className="flex items-start justify-between flex-wrap gap-3 mb-4">
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <Navigation size={18} className="text-sky-300" />
                  <span className="text-sky-300 text-sm font-medium">Cabin Navigator</span>
                </div>
                <h1 className="text-2xl font-black text-white leading-tight">Find Cabin 12049</h1>
                <p className="text-sky-200 text-sm mt-1">MSC Musica · Deck 12 · 26 May 2026</p>
              </div>
              <Badge variant="green">Cruise Paid ✓</Badge>
            </div>

            <div className={cn(
              'inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium border',
              isOnline
                ? 'bg-sky-500/20 border-sky-500/40 text-sky-300'
                : 'bg-orange-500/20 border-orange-500/40 text-orange-300'
            )}>
              {isOnline ? <Wifi size={11} /> : <WifiOff size={11} />}
              {isOnline ? 'Online — maps available' : 'Offline — schematic mode'}
            </div>

            {/* Quick cabin pills */}
            <div className="flex flex-wrap gap-2 mt-4">
              {[
                { label: '🛏️ Cabin 12049', color: 'bg-white/15' },
                { label: '🏢 Deck 12', color: 'bg-white/15' },
                { label: '📍 Muster C', color: 'bg-red-500/30' },
                { label: '⏰ Check-in 14:00', color: 'bg-emerald-500/25' },
                { label: '🍽️ Primo Turno', color: 'bg-violet-500/25' },
              ].map(p => (
                <span key={p.label} className={`${p.color} text-white/90 text-xs px-3 py-1 rounded-full border border-white/20 font-medium`}>{p.label}</span>
              ))}
            </div>
          </div>
        </div>
      </motion.div>

      {/* Expand / Collapse controls */}
      <div className="flex items-center justify-between px-1">
        <p className="text-xs text-[hsl(var(--muted-foreground))]">{openSections.size} of {sections.length} sections open</p>
        <div className="flex gap-2">
          <button onClick={expandAll} className="text-xs text-sky-400 hover:text-sky-300 flex items-center gap-1">
            <ChevronDown size={12} /> Expand all
          </button>
          <span className="text-[hsl(var(--muted-foreground))]">·</span>
          <button onClick={collapseAll} className="text-xs text-[hsl(var(--muted-foreground))] hover:text-white flex items-center gap-1">
            <ChevronUp size={12} /> Collapse all
          </button>
        </div>
      </div>

      {/* Sections */}
      <motion.div variants={container} initial="hidden" animate="show" className="space-y-3">
        {sections.map(section => {
          const isOpen = openSections.has(section.id)
          return (
            <motion.div key={section.id} variants={item}>
              {/* Section toggle header */}
              <button
                onClick={() => toggleSection(section.id)}
                className={cn(
                  'w-full flex items-center gap-3 px-4 py-3 rounded-2xl border transition-all',
                  isOpen
                    ? 'bg-sky-500/10 border-sky-500/30 rounded-b-none border-b-0'
                    : 'bg-white/4 border-white/10 hover:bg-white/8'
                )}
              >
                <div className={cn('w-8 h-8 rounded-xl flex items-center justify-center shrink-0', isOpen ? 'bg-sky-500/30 text-sky-300' : 'bg-white/10 text-[hsl(var(--muted-foreground))]')}>
                  {section.icon}
                </div>
                <div className="flex-1 text-left">
                  <p className={cn('text-sm font-semibold', isOpen ? 'text-sky-300' : 'text-white')}>{section.label}</p>
                  <p className="text-[10px] text-[hsl(var(--muted-foreground))]">{section.desc}</p>
                </div>
                {isOpen ? <ChevronUp size={16} className="text-sky-400 shrink-0" /> : <ChevronDown size={16} className="text-[hsl(var(--muted-foreground))] shrink-0" />}
              </button>

              {/* Section content */}
              {isOpen && (
                <div className="border border-sky-500/30 border-t-0 rounded-b-2xl overflow-hidden">
                  {section.id === 'cabin-card' && <div className="p-0"><QuickCabinCard /></div>}
                  {section.id === 'outside-map' && <div className="p-0"><OutsideTerminalMap /></div>}
                  {section.id === 'embarkation' && <div className="p-0"><EmbarkationChecklist /></div>}
                  {section.id === 'indoor-guide' && <div className="p-0"><IndoorCabinGuide /></div>}
                  {section.id === 'deck-map' && <div className="p-0"><Deck12SchematicMap /></div>}
                  {section.id === 'cabin-finder' && <div className="p-0"><CabinFinder /></div>}
                  {section.id === 'ship-locations' && <div className="p-0"><CabinToShipLocations /></div>}
                  {section.id === 'safety' && <div className="p-0"><NavigationSafetyRules /></div>}
                  {section.id === 'budget-summary' && <div className="p-0"><BudgetSummaryCard /></div>}
                </div>
              )}
            </motion.div>
          )
        })}
      </motion.div>
    </div>
  )
}
