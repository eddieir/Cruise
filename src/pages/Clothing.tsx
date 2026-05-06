import { motion } from 'framer-motion'
import { Shirt } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { outfitDays, generalRules } from '@/data/clothing'

export function Clothing() {
  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Shirt size={24} className="text-pink-400" /> Clothing Planner
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">
          Pack smart — 8 days, two people, one goal: travel light.
        </p>
      </motion.div>

      {/* General rules */}
      <Card>
        <h2 className="font-semibold text-white mb-3">General Packing Rules</h2>
        <ul className="space-y-2">
          {generalRules.map(rule => (
            <li key={rule} className="flex items-start gap-2 text-sm text-[hsl(var(--foreground))]">
              <span className="w-1.5 h-1.5 rounded-full bg-pink-500 shrink-0 mt-1.5" />
              {rule}
            </li>
          ))}
        </ul>
      </Card>

      {/* Packing list per person */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card>
          <h2 className="font-semibold text-sky-400 mb-3">👔 Peyman's Wardrobe</h2>
          <ul className="space-y-2">
            {[
              '4–5 T-shirts / polo shirts',
              '2 casual trousers / jeans / chinos',
              '1 shorts',
              '1 smart shirt (evenings)',
              '1 elegant gala night outfit',
              '1 white shirt/T-shirt (White Party)',
              '1 light jacket',
              'Comfortable walking shoes',
              'Optional sandals',
              'Swimwear',
              'Underwear & socks for 8 days'
            ].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                <span className="w-1.5 h-1.5 rounded-full bg-sky-500 shrink-0" />{item}
              </li>
            ))}
          </ul>
        </Card>
        <Card>
          <h2 className="font-semibold text-rose-400 mb-3">👗 Mozhgan's Wardrobe</h2>
          <ul className="space-y-2">
            {[
              '4–5 comfortable tops',
              '2 trousers / skirts / comfortable outfits',
              '1–2 dresses / smart outfits for evenings',
              '1 elegant gala night outfit',
              '1 white outfit / top (White Party)',
              '1 light jacket / cardigan',
              'Comfortable walking shoes',
              'Optional sandals / flat shoes',
              'Swimwear',
              'Simple accessories (no expensive jewellery)',
              'Underwear & socks for 8 days'
            ].map(item => (
              <li key={item} className="flex items-center gap-2 text-sm text-[hsl(var(--foreground))]">
                <span className="w-1.5 h-1.5 rounded-full bg-rose-500 shrink-0" />{item}
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Day-by-day outfit plan */}
      <div>
        <h2 className="text-lg font-bold text-white mb-3">Day-by-Day Outfit Plan</h2>
        <div className="space-y-3">
          {outfitDays.map((day, i) => (
            <motion.div
              key={day.day}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.06 }}
            >
              <Card>
                <div className="mb-3">
                  <h3 className="font-bold text-white">Day {day.day} — {day.date}</h3>
                  <p className="text-xs text-pink-400">{day.port}</p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div className="bg-sky-500/8 rounded-xl p-3 border border-sky-500/15">
                    <p className="text-[11px] font-semibold text-sky-400 mb-1">👔 Peyman</p>
                    <p className="text-xs text-[hsl(var(--foreground))]">{day.peyman}</p>
                  </div>
                  <div className="bg-rose-500/8 rounded-xl p-3 border border-rose-500/15">
                    <p className="text-[11px] font-semibold text-rose-400 mb-1">👗 Mozhgan</p>
                    <p className="text-xs text-[hsl(var(--foreground))]">{day.mozhgan}</p>
                  </div>
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
