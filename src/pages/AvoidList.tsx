import { motion } from 'framer-motion'
import { AlertTriangle, XCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { avoidItems } from '@/data/avoidList'

const catLabel: Record<string, string> = {
  donotbring: "Do NOT Bring on Ship",
  donotbuy: "Do NOT Buy During Trip",
  donotdo: "Do NOT Do"
}

const catIcon: Record<string, string> = {
  donotbring: '🧳',
  donotbuy: '💳',
  donotdo: '🚫'
}

const catColor: Record<string, string> = {
  donotbring: 'bg-red-500/10 border-red-500/30',
  donotbuy: 'bg-orange-500/10 border-orange-500/30',
  donotdo: 'bg-rose-500/10 border-rose-500/30'
}

export function AvoidList() {
  const categories = ['donotbring', 'donotbuy', 'donotdo'] as const

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <AlertTriangle size={24} className="text-red-400" /> Avoid List
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">
          What not to bring, buy, or do — to protect your budget and safety.
        </p>
      </motion.div>

      {/* Critical warning */}
      <div className="rounded-2xl bg-red-500/10 border-2 border-red-500/40 p-4">
        <div className="flex items-start gap-3">
          <XCircle size={20} className="text-red-400 shrink-0 mt-0.5" />
          <div>
            <p className="text-sm font-bold text-red-300">⚠️ Critical: Water Boiler / Kettle</p>
            <p className="text-sm text-red-200/80 mt-1">
              Do NOT bring any electric kettle, water boiler, or heating device onboard.
              This includes aluminum stovetop kettles or moka pots. The issue is the
              heating element — a fire risk on a ship. It will be confiscated at embarkation.
              <strong className="text-red-200"> Leave it at home.</strong>
            </p>
          </div>
        </div>
      </div>

      {categories.map((cat, ci) => {
        const items = avoidItems.filter(i => i.category === cat)
        return (
          <motion.div
            key={cat}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: ci * 0.1 }}
          >
            <Card>
              <h2 className="font-bold text-white flex items-center gap-2 mb-4">
                <span>{catIcon[cat]}</span> {catLabel[cat]}
              </h2>
              <div className="space-y-3">
                {items.map(item => (
                  <div
                    key={item.id}
                    className={`rounded-xl p-3 border ${catColor[cat]} flex items-start gap-3`}
                  >
                    <XCircle size={16} className="text-red-400 shrink-0 mt-0.5" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2 flex-wrap">
                        <p className="text-sm font-semibold text-white">{item.label}</p>
                        <Badge variant={item.severity === 'critical' ? 'red' : item.severity === 'high' ? 'yellow' : 'default'}>
                          {item.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-[hsl(var(--muted-foreground))] mt-1">{item.reason}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        )
      })}
    </div>
  )
}
