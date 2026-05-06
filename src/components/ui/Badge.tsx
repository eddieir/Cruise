import { cn } from '@/lib/utils'
import { cva, type VariantProps } from 'class-variance-authority'

const badgeVariants = cva(
  'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold transition-colors',
  {
    variants: {
      variant: {
        green: 'bg-emerald-500/15 text-emerald-400 border border-emerald-500/30',
        yellow: 'bg-amber-500/15 text-amber-400 border border-amber-500/30',
        red: 'bg-red-500/15 text-red-400 border border-red-500/30',
        blue: 'bg-sky-500/15 text-sky-400 border border-sky-500/30',
        purple: 'bg-purple-500/15 text-purple-400 border border-purple-500/30',
        default: 'bg-white/10 text-white/70 border border-white/20'
      }
    },
    defaultVariants: { variant: 'default' }
  }
)

interface BadgeProps extends VariantProps<typeof badgeVariants> {
  children: React.ReactNode
  className?: string
}

export function Badge({ children, variant, className }: BadgeProps) {
  return (
    <span className={cn(badgeVariants({ variant }), className)}>
      {children}
    </span>
  )
}
