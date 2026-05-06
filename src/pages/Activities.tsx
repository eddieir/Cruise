import { motion } from 'framer-motion'
import { Activity, CheckCircle2, XCircle, HelpCircle } from 'lucide-react'
import { Card } from '@/components/ui/Card'
import { activities, eveningPlan } from '@/data/activities'

export function Activities() {
  const free = activities.filter(a => a.status === 'free')
  const paid = activities.filter(a => a.status === 'paid')
  const verify = activities.filter(a => a.status === 'verify')

  return (
    <div className="space-y-6">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
        <h1 className="text-2xl font-bold text-white flex items-center gap-2">
          <Activity size={24} className="text-violet-400" /> Onboard Activities
        </h1>
        <p className="text-[hsl(var(--muted-foreground))] text-sm mt-1">
          Know what's free before you join anything.
        </p>
      </motion.div>

      {/* Golden question */}
      <div className="rounded-2xl bg-violet-500/10 border border-violet-500/30 p-4">
        <p className="text-sm font-semibold text-violet-300">Before joining any activity, ask:</p>
        <p className="text-lg font-bold text-white mt-1">
          "Is this included in my fare, or will it be charged to my cabin?"
        </p>
        <p className="text-xs text-violet-200/70 mt-1">Never assume. Always confirm with staff.</p>
      </div>

      {/* Activity matrix */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Free */}
        <Card>
          <h2 className="font-semibold text-emerald-400 flex items-center gap-2 mb-3">
            <CheckCircle2 size={18} /> Free / Included
          </h2>
          <ul className="space-y-2">
            {free.map(a => (
              <li key={a.label} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 shrink-0 mt-1.5" />
                <div>
                  <p className="text-sm text-[hsl(var(--foreground))]">{a.label}</p>
                  {a.note && <p className="text-xs text-[hsl(var(--muted-foreground))]">{a.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </Card>

        {/* Paid */}
        <Card>
          <h2 className="font-semibold text-red-400 flex items-center gap-2 mb-3">
            <XCircle size={18} /> Paid / Avoid
          </h2>
          <ul className="space-y-2">
            {paid.map(a => (
              <li key={a.label} className="flex items-start gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-red-500 shrink-0 mt-1.5" />
                <div>
                  <p className="text-sm text-[hsl(var(--foreground))]">{a.label}</p>
                  {a.note && <p className="text-xs text-[hsl(var(--muted-foreground))]">{a.note}</p>}
                </div>
              </li>
            ))}
          </ul>
        </Card>
      </div>

      {/* Verify */}
      <Card>
        <h2 className="font-semibold text-amber-400 flex items-center gap-2 mb-3">
          <HelpCircle size={18} /> Verify Before Joining
        </h2>
        <ul className="space-y-2">
          {verify.map(a => (
            <li key={a.label} className="flex items-start gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500 shrink-0 mt-1.5" />
              <div>
                <p className="text-sm text-[hsl(var(--foreground))]">{a.label}</p>
                {a.note && <p className="text-xs text-amber-200/70">{a.note}</p>}
              </div>
            </li>
          ))}
        </ul>
      </Card>

      {/* Evening plan */}
      <div>
        <h2 className="text-lg font-bold text-white mb-3">Evening Plan by Day</h2>
        <div className="space-y-2">
          {eveningPlan.map((ep, i) => (
            <motion.div
              key={ep.day}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
            >
              <Card glass className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-xl bg-violet-500/20 border border-violet-500/30 flex items-center justify-center text-xs font-bold text-violet-300 shrink-0">
                  {ep.day}
                </div>
                <div>
                  <p className="text-xs font-semibold text-[hsl(var(--muted-foreground))]">{ep.label}</p>
                  <p className="text-sm text-[hsl(var(--foreground))] mt-0.5">{ep.plan}</p>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  )
}
