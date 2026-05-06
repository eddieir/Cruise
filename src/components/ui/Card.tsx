import { cn } from '@/lib/utils'

interface CardProps {
  children: React.ReactNode
  className?: string
  glass?: boolean
  onClick?: () => void
}

export function Card({ children, className, glass, onClick }: CardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        'rounded-2xl border p-4 transition-all',
        glass
          ? 'bg-white/5 border-white/10 backdrop-blur-sm'
          : 'bg-[hsl(var(--card))] border-[hsl(var(--border))]',
        onClick && 'cursor-pointer hover:scale-[1.01] hover:border-sky-500/40',
        className
      )}
    >
      {children}
    </div>
  )
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mb-3', className)}>{children}</div>
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('font-semibold text-[hsl(var(--foreground))]', className)}>{children}</h3>
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-sm text-[hsl(var(--muted-foreground))]', className)}>{children}</p>
}
