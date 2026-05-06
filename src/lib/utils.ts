import { clsx, type ClassValue } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatEuro(amount: number): string {
  return `€${amount.toFixed(0)}`
}

export function getBudgetStatus(spent: number, target = 350, ceiling = 450): 'safe' | 'caution' | 'danger' {
  if (spent <= target * 0.7) return 'safe'
  if (spent <= target) return 'safe'
  if (spent <= ceiling) return 'caution'
  return 'danger'
}

export function getBudgetPercent(spent: number, ceiling = 450): number {
  return Math.min((spent / ceiling) * 100, 100)
}
