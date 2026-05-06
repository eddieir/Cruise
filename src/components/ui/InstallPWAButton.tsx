import { useStore } from '@/store/useStore'
import { Download } from 'lucide-react'

export function InstallPWAButton() {
  const { deferredPrompt, setDeferredPrompt, setIsInstalled, isInstalled } = useStore()

  if (isInstalled || !deferredPrompt) return null

  const handleInstall = async () => {
    const prompt = deferredPrompt as BeforeInstallPromptEvent
    prompt.prompt()
    const { outcome } = await prompt.userChoice
    if (outcome === 'accepted') {
      setIsInstalled(true)
    }
    setDeferredPrompt(null)
  }

  return (
    <button
      onClick={handleInstall}
      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-sky-500/20 hover:bg-sky-500/30 text-sky-400 text-sm font-medium transition-colors border border-sky-500/30"
    >
      <Download size={15} />
      Install App
    </button>
  )
}

interface BeforeInstallPromptEvent extends Event {
  prompt: () => Promise<void>
  userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }>
}
