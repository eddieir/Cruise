import { motion } from 'framer-motion'
import { UtensilsCrossed, CheckCircle2, XCircle, Info } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { dayFoodPlan, includedFoods, paidFoods } from '@/data/foodPlan'

export function FoodPlan() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <UtensilsCrossed size={24} className="text-emerald-400" /> Food Plan
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">
          All included meals are in the buffet and main restaurant — zero extra cost.
        </p>
      </motion.div>

      {/* Key message */}
      <div className="flex items-start gap-3 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 p-4">
        <Info size={20} className="text-emerald-400 shrink-0 mt-0.5" />
        <div>
          <p className="text-sm font-semibold text-emerald-300">Eating onboard = €0 extra</p>
          <p className="text-sm text-emerald-200/80 mt-0.5">
            Meals in the included buffet and main restaurant are already paid for in your cruise fare.
            This does NOT mean everything onboard is free — bars, specialty restaurants, and bottled drinks are all paid.
          </p>
        </div>
      </div>

      {/* Free vs Paid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-semibold text-emerald-400 flex items-center gap-2 mb-3">
            <CheckCircle2 size={18} /> Included / Free
          </h2>
          <ul className="space-y-2">
            {includedFoods.map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>

        <Card>
          <h2 className="font-semibold text-red-400 flex items-center gap-2 mb-3">
            <XCircle size={18} /> Paid / Avoid
          </h2>
          <ul className="space-y-2">
            {paidFoods.map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Day by day */}
      <div>
        <h2 className="text-lg font-bold text-white mb-3">Day-by-Day Food Plan</h2>
        <div className="space-y-3">
          {dayFoodPlan.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -15 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div>
                    <h3 className="font-bold text-white">Day {day.day} — {day.date}</h3>
                    <p className="text-xs text-sky-400">{day.port}</p>
                  </div>
                  <Badge variant="green">{day.target}</Badge>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                  {[
                    { label: '🌅 Breakfast', value: day.breakfast },
                    { label: '☀️ Lunch', value: day.lunch },
                    { label: '🌙 Dinner', value: day.dinner }
                  ].map(({ label, value }) => (
                    <div key={label} className="bg-white/5 rounded-xl p-2.5">
                      <p className="text-[11px] font-semibold text-[hsl(var(--muted-foreground))] mb-1">{label}</p>
                      <p className="text-xs text-[hsl(var(--foreground))]">{value}</p>
                    </div>
                  ))}
                </div>
                {day.notes && (
                  <p className="mt-2 text-xs text-[hsl(var(--muted-foreground))] bg-white/5 rounded-lg px-2 py-1.5">
                    💡 {day.notes}
                  </p>
                )}
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
