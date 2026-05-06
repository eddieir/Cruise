export interface EmergencyRule {
  id: string
  trigger: string
  action: string
  icon: string
  severity: 'info' | 'warning' | 'critical'
}

export const emergencyRules: EmergencyRule[] = [
  {
    id: 'hungry',
    trigger: 'If hungry outside ship',
    action: 'Return to ship and eat onboard, or buy supermarket snack only (max €5). No restaurants.',
    icon: '🍽️',
    severity: 'warning'
  },
  {
    id: 'thirsty',
    trigger: 'If thirsty',
    action: 'Use your reusable water bottle. Refill from ship tap before going ashore.',
    icon: '💧',
    severity: 'info'
  },
  {
    id: 'tired',
    trigger: 'If tired in port',
    action: 'Return to ship early. The ship is your free hotel — use it.',
    icon: '😴',
    severity: 'info'
  },
  {
    id: 'lost',
    trigger: 'If lost ashore',
    action: 'Open offline map (downloaded before departure). No need for internet.',
    icon: '🗺️',
    severity: 'info'
  },
  {
    id: 'no-internet',
    trigger: 'If no mobile signal in port',
    action: 'Use downloaded offline maps and screenshots. All documents downloaded before trip.',
    icon: '📵',
    severity: 'info'
  },
  {
    id: 'tempted',
    trigger: 'If tempted to buy something',
    action: 'Wait 30 minutes. If you still want it after 30 minutes, evaluate if it is truly essential.',
    icon: '⏱️',
    severity: 'warning'
  },
  {
    id: 'free-activity',
    trigger: 'If unsure if activity is free',
    action: 'Ask staff directly: "Is this included in my fare, or will it be charged to my cabin?" Do not assume.',
    icon: '❓',
    severity: 'warning'
  },
  {
    id: 'cruise-card',
    trigger: 'If asked to scan cruise card',
    action: 'Assume it will cost money. Ask to confirm. Only scan for confirmed-free items.',
    icon: '💳',
    severity: 'critical'
  },
  {
    id: 'seasick',
    trigger: 'If feeling seasick',
    action: 'Take motion sickness tablet early — before symptoms worsen. Stay on lower decks, midship. Fresh air on deck.',
    icon: '🌊',
    severity: 'warning'
  },
  {
    id: 'battery-low',
    trigger: 'If phone battery low',
    action: 'Use power bank. Charge phones every night in cabin.',
    icon: '🔋',
    severity: 'info'
  },
  {
    id: 'budget-350',
    trigger: 'If total spending reaches €350',
    action: 'STOP all optional spending. Only essential transport and water/emergency food allowed.',
    icon: '⚠️',
    severity: 'warning'
  },
  {
    id: 'budget-450',
    trigger: 'If total spending reaches €450',
    action: 'EMERGENCY MODE. Zero non-essential spending. Onboard meals only. No port purchases.',
    icon: '🚨',
    severity: 'critical'
  },
  {
    id: 'missed-ship',
    trigger: 'If at risk of missing ship departure',
    action: 'Take a taxi immediately regardless of cost. Missing the ship is catastrophic. Always return 30 mins early.',
    icon: '🚢',
    severity: 'critical'
  },
  {
    id: 'medical',
    trigger: 'If medical emergency',
    action: 'Use ship medical centre. You have insurance — keep documents accessible. Do not delay treatment to save money.',
    icon: '🏥',
    severity: 'critical'
  }
]

export const dailyChecklistItems = [
  { id: 'breakfast', label: 'Eat onboard breakfast' },
  { id: 'cruise-card', label: 'Take cruise card' },
  { id: 'id', label: 'Take ID / passport (for port days)' },
  { id: 'phone', label: 'Take phone (charged)' },
  { id: 'power-bank', label: 'Take power bank (charged)' },
  { id: 'water-bottle', label: 'Fill reusable water bottle onboard' },
  { id: 'offline-map', label: 'Check offline map for today\'s port' },
  { id: 'return-time', label: 'Know today\'s ship departure time' },
  { id: 'no-restaurants', label: 'Avoid restaurants ashore' },
  { id: 'no-paid-onboard', label: 'Avoid paid onboard items' },
  { id: 'record-spending', label: 'Record any actual spending in budget tracker' },
  { id: 'airplane-mode', label: 'Airplane mode ON when ship is sailing' }
]
