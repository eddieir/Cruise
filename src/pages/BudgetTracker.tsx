import { motion } from 'framer-motion'
import { useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { Wallet, TrendingUp, AlertCircle, CheckCircle2, AlertTriangle } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useStore } from '@/store/useStore'
import { budgetCategories, wifiOptions, BUDGET_TARGET, BUDGET_CEILING, type BudgetCategory } from '@/data/budget'
import { formatEuro } from '@/lib/utils'

const BAR_COLORS = ['#22c55e', '#f97316', '#ef4444', '#0ea5e9', '#a855f7', '#f59e0b', '#06b6d4']

function CategoryCard({ cat, spent, onChange }: {
  cat: BudgetCategory; spent: number; onChange: (v: number) => void
}) {
  const [editing, setEditing] = useState(false)
  const [input, setInput] = useState(String(spent))
  const status = spent === 0 ? 'green'
    : spent <= cat.recommended ? 'green'
    : spent <= cat.max ? 'yellow' : 'red'

  const handleSave = () => {
    const v = parseFloat(input)
    if (!isNaN(v)) onChange(Math.max(0, v))
    setEditing(false)
  }

  return (
    <Card className="space-y-3">
      <div className="flex items-start justify-between gap-2">
        <div className="flex items-start gap-3 flex-1 min-w-0">
          <span className="text-2xl shrink-0">{cat.icon}</span>
          <div className="flex-1 min-w-0">
            <p className="font-semibold text-sm text-[hsl(var(--foreground))] truncate">{cat.label}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{cat.description}</p>
            <p className="text-[10px] text-[hsl(var(--muted-foreground))] mt-1">
              Range: {formatEuro(cat.min)}–{formatEuro(cat.max)} · Recommended: {formatEuro(cat.recommended)}
            </p>
          </div>
        </div>
        <Badge variant={status}>{status === 'green' ? 'On Track' : status === 'yellow' ? 'Caution' : 'Over'}</Badge>
      </div>

      <ProgressBar value={spent} max={cat.max} colorAuto />

      <div className="flex items-center gap-2">
        <span className="text-xs text-[hsl(var(--muted-foreground))]">Actual spent:</span>
        {editing ? (
          <div className="flex items-center gap-2 flex-1">
            <input
              type="number"
              min={0}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSave()}
              className="flex-1 bg-white/10 border border-white/20 rounded-lg px-2 py-1 text-sm text-white focus:outline-none focus:border-sky-500"
              autoFocus
            />
            <button onClick={handleSave} className="text-xs text-sky-400 hover:text-sky-300 font-medium">Save</button>
            <button onClick={() => setEditing(false)} className="text-xs text-[hsl(var(--muted-foreground))] hover:text-white">Cancel</button>
          </div>
        ) : (
          <button
            onClick={() => { setInput(String(spent)); setEditing(true) }}
            className="text-sm font-bold text-white hover:text-sky-400 transition-colors"
          >
            {formatEuro(spent)} <span className="text-xs font-normal text-sky-500">✏️</span>
          </button>
        )}
      </div>

      {cat.notes && (
        <p className="text-[10px] text-[hsl(var(--muted-foreground))] bg-white/5 rounded-lg px-2 py-1.5">{cat.notes}</p>
      )}
    </Card>
  )
}

export function BudgetTracker() {
  const { spending, setSpending, wifiOption, setWifiOption, getTotalSpent } = useStore()
  const totalSpent = getTotalSpent()
  const remaining = BUDGET_TARGET - totalSpent
  const wifiCost = wifiOptions.find(o => o.id === wifiOption)?.cost ?? 0
  const totalWithWifi = totalSpent + wifiCost
  const status = totalWithWifi <= BUDGET_TARGET ? 'safe'
    : totalWithWifi <= BUDGET_CEILING ? 'caution' : 'danger'

  const chartData = budgetCategories.map((cat) => ({
    name: cat.icon,
    label: cat.label,
    budget: cat.recommended,
    spent: spending[cat.id] || 0
  }))

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Wallet size={24} className="text-sky-400" /> Budget Tracker
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">
          Track actual spending against your €350 target.
        </p>
      </motion.div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-3">
        {[
          { label: 'Spent', value: formatEuro(totalWithWifi), color: 'text-white', icon: TrendingUp },
          { label: 'Remaining', value: remaining >= 0 ? formatEuro(remaining) : `-${formatEuro(-remaining)}`, color: remaining >= 0 ? 'text-emerald-400' : 'text-red-400', icon: CheckCircle2 },
          { label: 'Ceiling', value: formatEuro(BUDGET_CEILING), color: 'text-amber-400', icon: AlertTriangle }
        ].map(({ label, value, color, icon: Icon }) => (
          <Card key={label} glass className="text-center py-4">
            <Icon size={18} className={`${color} mx-auto mb-1.5`} />
            <p className={`text-xl font-bold ${color}`}>{value}</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">{label}</p>
          </Card>
        ))}
      </div>

      {/* Status alert */}
      {status !== 'safe' && (
        <div className={`flex items-start gap-3 rounded-2xl p-4 border ${
          status === 'caution'
            ? 'bg-amber-500/10 border-amber-500/30'
            : 'bg-red-500/10 border-red-500/30'
        }`}>
          <AlertCircle size={20} className={status === 'caution' ? 'text-amber-400' : 'text-red-400'} />
          <div>
            <p className={`text-sm font-semibold ${status === 'caution' ? 'text-amber-300' : 'text-red-300'}`}>
              {status === 'caution' ? 'Over Target — Reduce Optional Spending' : 'Over Ceiling — Emergency Mode!'}
            </p>
            <p className={`text-xs mt-0.5 ${status === 'caution' ? 'text-amber-200/70' : 'text-red-200/70'}`}>
              {status === 'caution'
                ? 'You have exceeded €350. Stop all optional purchases. Onboard meals and essential transport only.'
                : 'You have exceeded €450. Zero non-essential spending. Onboard meals only.'}
            </p>
          </div>
        </div>
      )}

      {/* Progress bar */}
      <Card>
        <div className="flex items-center justify-between mb-2">
          <p className="text-sm font-semibold text-white">Overall Budget Progress</p>
          <Badge variant={status === 'safe' ? 'green' : status === 'caution' ? 'yellow' : 'red'}>
            {Math.round(Math.min((totalWithWifi / BUDGET_CEILING) * 100, 100))}%
          </Badge>
        </div>
        <ProgressBar value={totalWithWifi} max={BUDGET_CEILING} colorAuto />
        <div className="flex justify-between text-xs text-[hsl(var(--muted-foreground))] mt-2">
          <span>€0</span>
          <span className="text-sky-400">Target: {formatEuro(BUDGET_TARGET)}</span>
          <span className="text-amber-400">Ceiling: {formatEuro(BUDGET_CEILING)}</span>
        </div>
      </Card>

      {/* Chart */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Spending by Category</CardTitle>
          <CardDescription>Budget vs actual spending</CardDescription>
        </CardHeader>
        <ResponsiveContainer width="100%" height={200}>
          <BarChart data={chartData} margin={{ top: 5, right: 5, bottom: 5, left: -20 }}>
            <XAxis dataKey="name" tick={{ fill: '#94a3b8', fontSize: 16 }} />
            <YAxis tick={{ fill: '#64748b', fontSize: 11 }} />
            <Tooltip
              contentStyle={{ background: '#1e293b', border: '1px solid #334155', borderRadius: '12px', fontSize: 12 }}
              formatter={(value, name) => [formatEuro(Number(value)), name === 'spent' ? 'Actual' : 'Budget']}
              labelFormatter={(_, payload) => payload?.[0]?.payload?.label ?? ''}
            />
            <Bar dataKey="budget" fill="#334155" radius={[4, 4, 0, 0]} name="budget" />
            <Bar dataKey="spent" radius={[4, 4, 0, 0]} name="spent">
              {chartData.map((_entry, i) => (
                <Cell key={i} fill={BAR_COLORS[i % BAR_COLORS.length]} />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </Card>

      {/* Wi-Fi selector */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">📡 MSC Wi-Fi Option</CardTitle>
          <CardDescription>Select to see impact on total budget</CardDescription>
        </CardHeader>
        <div className="space-y-2">
          {wifiOptions.map(opt => (
            <button
              key={opt.id}
              onClick={() => setWifiOption(opt.id as typeof wifiOption)}
              className={`w-full flex items-center justify-between p-3 rounded-xl border transition-all text-left ${
                wifiOption === opt.id
                  ? 'border-sky-500 bg-sky-500/15'
                  : 'border-white/10 bg-white/5 hover:border-white/20'
              }`}
            >
              <div>
                <p className="text-sm font-semibold text-white">{opt.label}</p>
                <p className="text-xs text-[hsl(var(--muted-foreground))]">{opt.description}</p>
              </div>
              <div className="text-right shrink-0 ml-3">
                <Badge variant={opt.badgeColor}>{opt.badge}</Badge>
                <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">Total ≈ {formatEuro(opt.tripTotal)}</p>
              </div>
            </button>
          ))}
        </div>
      </Card>

      {/* Category breakdown */}
      <div>
        <h2 className="text-lg font-bold text-white mb-3">Categories</h2>
        <div className="space-y-3">
          {budgetCategories.map(cat => (
            <motion.div key={cat.id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}>
              <CategoryCard
                cat={cat}
                spent={spending[cat.id] || 0}
                onChange={v => setSpending(cat.id, v)}
              />
            </motion.div>
          ))}
        </div>
      </div>

      {/* Summary */}
      <Card className="bg-gradient-to-br from-sky-900/50 to-blue-900/50 border-sky-500/30">
        <h3 className="font-semibold text-white mb-3">Expected Total Range</h3>
        <div className="grid grid-cols-3 gap-2 text-center">
          <div>
            <p className="text-lg font-bold text-emerald-400">€250</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Minimum</p>
          </div>
          <div>
            <p className="text-lg font-bold text-sky-400">€350</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Target</p>
          </div>
          <div>
            <p className="text-lg font-bold text-amber-400">€450</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))]">Ceiling</p>
          </div>
        </div>
      </Card>
    </div>
  )
}
