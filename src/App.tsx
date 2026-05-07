import { BrowserRouter, Routes, Route } from 'react-router-dom'
import { useEffect } from 'react'
import { AppLayout } from '@/components/layout/AppLayout'
import { Dashboard } from '@/pages/Dashboard'
import { BudgetTracker } from '@/pages/BudgetTracker'
import { FoodPlan } from '@/pages/FoodPlan'
import { InternetStrategy } from '@/pages/InternetStrategy'
import { Activities } from '@/pages/Activities'
import { PortPlans } from '@/pages/PortPlans'
import { Clothing } from '@/pages/Clothing'
import { PackingList } from '@/pages/PackingList'
import { AvoidList } from '@/pages/AvoidList'
import { EmergencyRules } from '@/pages/EmergencyRules'
import { CabinNavigatorPage } from '@/pages/CabinNavigatorPage'
import { useStore } from '@/store/useStore'

export default function App() {
  const { theme, setIsOnline, setDeferredPrompt, setIsInstalled } = useStore()

  useEffect(() => {
    // Apply theme
    document.documentElement.classList.toggle('light', theme === 'light')

    // Online/offline tracking
    const handleOnline = () => setIsOnline(true)
    const handleOffline = () => setIsOnline(false)
    window.addEventListener('online', handleOnline)
    window.addEventListener('offline', handleOffline)

    // PWA install prompt
    const handleInstall = (e: Event) => {
      e.preventDefault()
      setDeferredPrompt(e)
    }
    window.addEventListener('beforeinstallprompt', handleInstall)

    // Already installed
    const handleAppInstalled = () => setIsInstalled(true)
    window.addEventListener('appinstalled', handleAppInstalled)

    return () => {
      window.removeEventListener('online', handleOnline)
      window.removeEventListener('offline', handleOffline)
      window.removeEventListener('beforeinstallprompt', handleInstall)
      window.removeEventListener('appinstalled', handleAppInstalled)
    }
  }, [theme, setIsOnline, setDeferredPrompt, setIsInstalled])

  return (
    <BrowserRouter>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/" element={<Dashboard />} />
          <Route path="/budget" element={<BudgetTracker />} />
          <Route path="/food" element={<FoodPlan />} />
          <Route path="/internet" element={<InternetStrategy />} />
          <Route path="/activities" element={<Activities />} />
          <Route path="/ports" element={<PortPlans />} />
          <Route path="/clothing" element={<Clothing />} />
          <Route path="/packing" element={<PackingList />} />
          <Route path="/avoid" element={<AvoidList />} />
          <Route path="/emergency" element={<EmergencyRules />} />
          <Route path="/navigation" element={<CabinNavigatorPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}
