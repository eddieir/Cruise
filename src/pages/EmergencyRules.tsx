import { motion } from 'framer-motion'
import { ShieldAlert, CheckCircle2, Circle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { emergencyRules, dailyChecklistItems } from '@/data/emergencyRules'
import { useStore } from '@/store/useStore'
import { itinerary } from '@/data/itinerary'

const severityColor: Record<string, string> = {
  info: 'blue',
  warning: 'yellow',
  critical: 'red'
}

export function EmergencyRules() {
  const { dailyChecklist, toggleDailyItem } = useStore()

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <ShieldAlert size={24} className="text-slate-400" /> Emergency & Corner Cases
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">
          Rules for when things don't go to plan.
        </p>
      </motion.div>

      {/* Emergency rules */}
      <div className="space-y-3">
        {emergencyRules.map((rule, i) => (
          <motion.div
            key={rule.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.04 }}
          >
            <Card className={`border-l-4 ${
              rule.severity === 'critical' ? 'border-l-red-500' :
              rule.severity === 'warning' ? 'border-l-amber-500' : 'border-l-sky-500'
            }`}>
              <div className="flex items-start gap-3">
                <span className="text-2xl shrink-0">{rule.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between gap-2 flex-wrap">
                    <p className="text-sm font-semibold text-[hsl(var(--muted-foreground))]">{rule.trigger}</p>
                    <Badge variant={severityColor[rule.severity] as any}>{rule.severity}</Badge>
                  </div>
                  <p className="text-sm text-[hsl(var(--foreground))] mt-1">{rule.action}</p>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Daily checklists for each day */}
      <div>
        <h2 className="text-lg font-bold text-white mb-3">Daily Checklist (by Day)</h2>
        <div className="space-y-4">
          {itinerary.map(port => {
            const dayKey = `day-${port.day}`
            const dayChecked = dailyChecklist[dayKey] || {}
            const done = dailyChecklistItems.filter(i => dayChecked[i.id]).length
            return (
              <Card key={port.day}>
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-semibold text-white">
                    {port.emoji} Day {port.day} — {port.port}
                  </h3>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">
                    {done}/{dailyChecklistItems.length} done
                  </span>
                </div>
                <ul className="space-y-2">
                  {dailyChecklistItems.map(item => {
                    const checked = !!dayChecked[item.id]
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => toggleDailyItem(dayKey, item.id)}
                          className="w-full flex items-center gap-3 py-1.5 px-2 rounded-xl hover:bg-white/5 transition-colors text-left group"
                        >
                          {checked
                            ? <CheckCircle2 size={16} className="text-emerald-400 shrink-0" />
                            : <Circle size={16} className="text-white/25 shrink-0 group-hover:text-white/50" />
                          }
                          <span className={`text-sm ${checked ? 'line-through text-[hsl(var(--muted-foreground))]' : 'text-[hsl(var(--foreground))]'}`}>
                            {item.label}
                          </span>
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </Card>
            )
          })}
        </div>
      </div>
    </div>
  )
}
