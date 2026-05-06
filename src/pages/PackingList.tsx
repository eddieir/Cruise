import { motion } from 'framer-motion'
import { ListChecks, CheckCircle2, Circle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { Badge } from '@/components/ui/Badge'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { useStore } from '@/store/useStore'
import { packingCategories } from '@/data/packingList'

export function PackingList() {
  const { packingChecked, togglePackingItem } = useStore()

  const allItems = packingCategories.flatMap(c => c.items)
  const totalItems = allItems.length
  const checkedCount = allItems.filter(item => packingChecked[item.id]).length
  const pct = totalItems > 0 ? (checkedCount / totalItems) * 100 : 0

  const essentialItems = allItems.filter(i => i.priority === 'essential')
  const essentialDone = essentialItems.filter(i => packingChecked[i.id]).length

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <ListChecks size={24} className="text-cyan-400" /> Packing Checklist
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">
          Tick items as you pack. Progress saved automatically.
        </p>
      </motion.div>

      {/* Progress summary */}
      <Card>
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="text-sm font-semibold text-white">{checkedCount} / {totalItems} items packed</p>
            <p className="text-xs text-[hsl(var(--muted-foreground))] mt-0.5">
              Essentials: {essentialDone} / {essentialItems.length}
            </p>
          </div>
          <Badge variant={pct === 100 ? 'green' : pct > 50 ? 'yellow' : 'default'}>
            {Math.round(pct)}%
          </Badge>
        </div>
        <ProgressBar value={checkedCount} max={totalItems} colorAuto={false} />
      </Card>

      {/* Priority legend */}
      <div className="flex gap-3 flex-wrap">
        <div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
          <span className="w-2 h-2 rounded-full bg-red-500" /> Essential
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
          <span className="w-2 h-2 rounded-full bg-amber-500" /> Recommended
        </div>
        <div className="flex items-center gap-1.5 text-xs text-[hsl(var(--muted-foreground))]">
          <span className="w-2 h-2 rounded-full bg-white/30" /> Optional
        </div>
      </div>

      {/* Categories */}
      <div className="space-y-4">
        {packingCategories.map((cat, ci) => {
          const catItems = cat.items
          const catDone = catItems.filter(i => packingChecked[i.id]).length

          return (
            <motion.div
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: ci * 0.07 }}
            >
              <Card>
                <div className="flex items-center justify-between mb-3">
                  <h2 className="font-semibold text-white flex items-center gap-2">
                    <span>{cat.icon}</span> {cat.label}
                  </h2>
                  <span className="text-xs text-[hsl(var(--muted-foreground))]">
                    {catDone}/{catItems.length}
                  </span>
                </div>
                <ProgressBar value={catDone} max={catItems.length} colorAuto={false} className="mb-3" />
                <ul className="space-y-2">
                  {catItems.map(item => {
                    const checked = !!packingChecked[item.id]
                    return (
                      <li key={item.id}>
                        <button
                          onClick={() => togglePackingItem(item.id)}
                          className="w-full flex items-center gap-3 py-2 px-2 rounded-xl hover:bg-white/5 transition-colors text-left group"
                        >
                          {checked
                            ? <CheckCircle2 size={18} className="text-emerald-400 shrink-0" />
                            : <Circle size={18} className="text-white/25 shrink-0 group-hover:text-white/50" />
                          }
                          <span className={`text-sm flex-1 ${checked ? 'line-through text-[hsl(var(--muted-foreground))]' : 'text-[hsl(var(--foreground))]'}`}>
                            {item.label}
                          </span>
                          <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${
                            item.priority === 'essential' ? 'bg-red-500' :
                            item.priority === 'recommended' ? 'bg-amber-500' : 'bg-white/20'
                          }`} />
                        </button>
                      </li>
                    )
                  })}
                </ul>
              </Card>
            </motion.div>
          )
        })}
      </div>

      {pct === 100 && (
        <motion.div
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          className="text-center py-6"
        >
          <div className="text-5xl mb-3">🎉</div>
          <p className="text-xl font-bold text-emerald-400">All packed!</p>
          <p className="text-sm text-[hsl(var(--muted-foreground))] mt-1">You're ready for the cruise. Bon voyage! ⚓</p>
        </motion.div>
      )}
    </div>
  )
}
