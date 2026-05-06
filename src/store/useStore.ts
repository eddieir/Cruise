import { create } from 'zustand'
import { persist } from 'zustand/middleware'
import { budgetCategories, BUDGET_TARGET, BUDGET_CEILING } from '@/data/budget'

interface SpendingEntry {
  categoryId: string
  amount: number
  note?: string
  timestamp: number
}

interface CheckedItems {
  [itemId: string]: boolean
}

interface DailyChecklist {
  [dayKey: string]: { [itemId: string]: boolean }
}

interface AppState {
  // Theme
  theme: 'dark' | 'light'
  toggleTheme: () => void

  // Budget
  spending: Record<string, number>
  spendingHistory: SpendingEntry[]
  wifiOption: 'none' | 'one-device' | 'two-devices'
  setSpending: (categoryId: string, amount: number) => void
  setWifiOption: (option: 'none' | 'one-device' | 'two-devices') => void
  getTotalSpent: () => number
  getBudgetStatus: () => 'safe' | 'caution' | 'danger'

  // Packing checklist
  packingChecked: CheckedItems
  togglePackingItem: (itemId: string) => void
  getPackingProgress: () => { done: number; total: number }

  // Daily checklist
  dailyChecklist: DailyChecklist
  toggleDailyItem: (dayKey: string, itemId: string) => void

  // Active page
  activePage: string
  setActivePage: (page: string) => void

  // PWA install
  deferredPrompt: Event | null
  setDeferredPrompt: (event: Event | null) => void
  isInstalled: boolean
  setIsInstalled: (val: boolean) => void

  // Online status
  isOnline: boolean
  setIsOnline: (val: boolean) => void
}

export const useStore = create<AppState>()(
  persist(
    (set, get) => ({
      // Theme
      theme: 'dark',
      toggleTheme: () => {
        const next = get().theme === 'dark' ? 'light' : 'dark'
        set({ theme: next })
        document.documentElement.classList.toggle('light', next === 'light')
      },

      // Budget
      spending: Object.fromEntries(budgetCategories.map(c => [c.id, 0])),
      spendingHistory: [],
      wifiOption: 'none',
      setSpending: (categoryId, amount) => {
        const prev = get().spending
        const history = get().spendingHistory
        set({
          spending: { ...prev, [categoryId]: Math.max(0, amount) },
          spendingHistory: [
            ...history,
            { categoryId, amount, timestamp: Date.now() }
          ]
        })
      },
      setWifiOption: (option) => set({ wifiOption: option }),
      getTotalSpent: () => {
        const s = get().spending
        return Object.values(s).reduce((sum, v) => sum + v, 0)
      },
      getBudgetStatus: () => {
        const total = get().getTotalSpent()
        if (total <= BUDGET_TARGET) return 'safe'
        if (total <= BUDGET_CEILING) return 'caution'
        return 'danger'
      },

      // Packing
      packingChecked: {},
      togglePackingItem: (itemId) => {
        const prev = get().packingChecked
        set({ packingChecked: { ...prev, [itemId]: !prev[itemId] } })
      },
      getPackingProgress: () => {
        const checked = get().packingChecked
        const done = Object.values(checked).filter(Boolean).length
        return { done, total: 0 }
      },

      // Daily checklist
      dailyChecklist: {},
      toggleDailyItem: (dayKey, itemId) => {
        const prev = get().dailyChecklist
        const dayItems = prev[dayKey] || {}
        set({
          dailyChecklist: {
            ...prev,
            [dayKey]: { ...dayItems, [itemId]: !dayItems[itemId] }
          }
        })
      },

      // Navigation
      activePage: 'dashboard',
      setActivePage: (page) => set({ activePage: page }),

      // PWA
      deferredPrompt: null,
      setDeferredPrompt: (event) => set({ deferredPrompt: event }),
      isInstalled: false,
      setIsInstalled: (val) => set({ isInstalled: val }),

      // Online
      isOnline: navigator.onLine,
      setIsOnline: (val) => set({ isOnline: val })
    }),
    {
      name: 'cruise-planner-store',
      partialize: (state) => ({
        theme: state.theme,
        spending: state.spending,
        wifiOption: state.wifiOption,
        packingChecked: state.packingChecked,
        dailyChecklist: state.dailyChecklist
      })
    }
  )
)
