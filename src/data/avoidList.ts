export interface AvoidItem {
  id: string
  label: string
  reason: string
  category: 'donotbring' | 'donotbuy' | 'donotdo'
  severity: 'critical' | 'high' | 'medium'
}

export const avoidItems: AvoidItem[] = [
  // DO NOT BRING
  {
    id: 'kettle',
    label: 'Electric water kettle / boiler',
    reason: 'Strictly prohibited on cruise ships — fire risk and heating element danger. Will be confiscated.',
    category: 'donotbring',
    severity: 'critical'
  },
  {
    id: 'aluminum-kettle',
    label: 'Aluminum stovetop kettle / moka pot',
    reason: 'Do not bring any boiling device. The issue is the heating element / fire risk — not the material. Leave it at home.',
    category: 'donotbring',
    severity: 'critical'
  },
  {
    id: 'iron',
    label: 'Travel iron',
    reason: 'Prohibited on most cruise ships. Ship laundry service available (at cost).',
    category: 'donotbring',
    severity: 'critical'
  },
  {
    id: 'candles',
    label: 'Candles or open-flame items',
    reason: 'Prohibited for fire safety.',
    category: 'donotbring',
    severity: 'critical'
  },
  {
    id: 'coffee-machine',
    label: 'Coffee machine / Nespresso',
    reason: 'Prohibited onboard. Use included café options.',
    category: 'donotbring',
    severity: 'high'
  },
  {
    id: 'extension-cord',
    label: 'Multi-socket extension cord',
    reason: 'Prohibited on most cruise ships.',
    category: 'donotbring',
    severity: 'high'
  },
  // DO NOT BUY
  {
    id: 'drink-package',
    label: 'Drink package',
    reason: 'Very expensive (~€250+ for both). We are targeting €0 onboard drinks.',
    category: 'donotbuy',
    severity: 'critical'
  },
  {
    id: 'wifi-package',
    label: 'MSC Wi-Fi package',
    reason: 'Adds €90–€220 to trip cost. Use WINDTRE/Iliad SIM in ports instead.',
    category: 'donotbuy',
    severity: 'critical'
  },
  {
    id: 'excursions',
    label: 'MSC organised excursions',
    reason: 'Very expensive. We explore independently using public transport and walking.',
    category: 'donotbuy',
    severity: 'critical'
  },
  {
    id: 'spa',
    label: 'Spa / massage / beauty treatments',
    reason: 'Not in budget. Enjoy free gym and pool instead.',
    category: 'donotbuy',
    severity: 'high'
  },
  {
    id: 'casino-chips',
    label: 'Casino chips or gambling',
    reason: 'House always wins. Avoid entirely.',
    category: 'donotbuy',
    severity: 'high'
  },
  {
    id: 'photos',
    label: 'Professional onboard photos',
    reason: 'Very expensive. Use your own phone for photos.',
    category: 'donotbuy',
    severity: 'medium'
  },
  {
    id: 'specialty-restaurants',
    label: 'Specialty restaurant dinners',
    reason: 'Extra charge. Included buffet and main restaurant are excellent.',
    category: 'donotbuy',
    severity: 'high'
  },
  {
    id: 'shopping-onboard',
    label: 'Onboard boutique shopping',
    reason: 'Overpriced. Not in budget.',
    category: 'donotbuy',
    severity: 'medium'
  },
  {
    id: 'rome-trip',
    label: 'Rome day trip from Civitavecchia',
    reason: 'Train €30+, food pressure €20+, time stress, risk of missing ship. Stay in Civitavecchia.',
    category: 'donotdo',
    severity: 'high'
  },
  {
    id: 'maritime-roaming',
    label: 'Use maritime / satellite data roaming',
    reason: 'Extremely expensive. €10+ per MB in some cases. Keep airplane mode ON at sea.',
    category: 'donotdo',
    severity: 'critical'
  },
  {
    id: 'beach-bars-ibiza',
    label: 'Beach bars and clubs in Ibiza',
    reason: 'Ibiza is one of the most expensive nightlife destinations in Europe. Avoid completely.',
    category: 'donotdo',
    severity: 'critical'
  }
]
