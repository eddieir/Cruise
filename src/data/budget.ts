export interface BudgetCategory {
  id: string
  label: string
  description: string
  min: number
  max: number
  recommended: number
  icon: string
  color: 'green' | 'yellow' | 'red' | 'blue'
  notes: string
}

export const BUDGET_TARGET = 350
export const BUDGET_CEILING = 450

export const budgetCategories: BudgetCategory[] = [
  {
    id: 'train',
    label: 'Train Turin ↔ Genova',
    description: 'Normal train both ways for 2 people',
    min: 40,
    max: 70,
    recommended: 55,
    icon: '🚂',
    color: 'blue',
    notes: 'Book in advance for cheaper fares. Trenitalia or Italo.'
  },
  {
    id: 'genova-transport',
    label: 'Genova Local Transport',
    description: 'Getting to/from cruise port in Genova',
    min: 0,
    max: 12,
    recommended: 6,
    icon: '🚌',
    color: 'green',
    notes: 'Bus or walk from Genova station to port. Short distance.'
  },
  {
    id: 'supermarket',
    label: 'Supermarket Snacks (Pre-trip)',
    description: 'Snacks and supplies bought before departure',
    min: 20,
    max: 30,
    recommended: 25,
    icon: '🛒',
    color: 'green',
    notes: 'Crackers, protein bars, taralli, fruit. Fill reusable bottles.'
  },
  {
    id: 'port-snacks',
    label: 'Port Coffee / Water / Snacks',
    description: 'Small purchases in ports over all 7 port days',
    min: 45,
    max: 70,
    recommended: 55,
    icon: '☕',
    color: 'yellow',
    notes: 'Budget €5–€10 per port day maximum. Mostly coffee or water.'
  },
  {
    id: 'port-transport',
    label: 'Port Public Transport',
    description: 'Buses, metro, ferry in Marseille, Valencia etc.',
    min: 50,
    max: 80,
    recommended: 60,
    icon: '🚇',
    color: 'yellow',
    notes: 'Walk when possible. Use bus/metro only when needed.'
  },
  {
    id: 'onboard-drinks',
    label: 'Onboard Paid Drinks',
    description: 'Any paid drinks onboard (ideally €0)',
    min: 0,
    max: 30,
    recommended: 0,
    icon: '🥤',
    color: 'red',
    notes: 'Target €0. Stick to tap water. Avoid scanning card at bars.'
  },
  {
    id: 'emergency',
    label: 'Emergency Buffer',
    description: 'Unplanned expenses, medical, lost item',
    min: 80,
    max: 100,
    recommended: 80,
    icon: '🆘',
    color: 'yellow',
    notes: 'Keep this in reserve. Only spend if truly necessary.'
  }
]

export const wifiOptions = [
  {
    id: 'none',
    label: 'No MSC Wi-Fi',
    description: 'Use WINDTRE/Iliad SIM in ports only',
    cost: 0,
    tripTotal: 350,
    badge: 'Recommended',
    badgeColor: 'green' as const
  },
  {
    id: 'one-device',
    label: '1 Device Wi-Fi',
    description: 'MSC Wi-Fi package for one phone',
    cost: 110,
    tripTotal: 460,
    badge: 'Exceeds Target',
    badgeColor: 'yellow' as const
  },
  {
    id: 'two-devices',
    label: '2 Devices Wi-Fi',
    description: 'MSC Wi-Fi package for both phones',
    cost: 185,
    tripTotal: 535,
    badge: 'Avoid',
    badgeColor: 'red' as const
  }
]
