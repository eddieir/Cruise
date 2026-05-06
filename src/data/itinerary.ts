export interface Port {
  day: number
  date: string
  dayLabel: string
  port: string
  country: string
  arrival: string
  departure: string
  type: 'embarkation' | 'port' | 'sea' | 'disembarkation'
  emoji: string
  highlights: string[]
  tips: string[]
  transportTip: string
  foodTip: string
  budgetTarget: string
  color: string
}

export const itinerary: Port[] = [
  {
    day: 1,
    date: '26 May 2026',
    dayLabel: 'Tuesday',
    port: 'Genova',
    country: 'Italy',
    arrival: '—',
    departure: '18:00',
    type: 'embarkation',
    emoji: '⚓',
    highlights: ['Board MSC Musica', 'Explore the ship', 'Welcome dinner onboard'],
    tips: ['Eat at home before leaving Turin', 'Take normal train Turin → Genova', 'Bring snack for the train', 'Avoid station restaurants'],
    transportTip: 'Train from Turin Porta Nuova to Genova Piazza Principe, then walk or bus to port',
    foodTip: 'Eat at home. Dinner onboard included restaurant/buffet.',
    budgetTarget: '€5–€13 (train snack only)',
    color: 'ocean'
  },
  {
    day: 2,
    date: '27 May 2026',
    dayLabel: 'Wednesday',
    port: 'Marseille',
    country: 'France',
    arrival: '07:00',
    departure: '15:00',
    type: 'port',
    emoji: '🇫🇷',
    highlights: ['Old Port (Vieux-Port)', 'Notre-Dame de la Garde', 'Le Panier district'],
    tips: ['Return to ship for lunch if possible', 'Coffee/water/snack only if necessary', 'Use public transport or walk'],
    transportTip: 'Ferry or walk from cruise terminal to Old Port. Metro/bus available.',
    foodTip: 'Big onboard breakfast. Aim to return for lunch. Dinner onboard.',
    budgetTarget: '€5–€10',
    color: 'blue'
  },
  {
    day: 3,
    date: '28 May 2026',
    dayLabel: 'Thursday',
    port: 'Valencia',
    country: 'Spain',
    arrival: '10:00',
    departure: '20:00',
    type: 'port',
    emoji: '🇪🇸',
    highlights: ['City of Arts & Sciences', 'Old Town', 'Central Market'],
    tips: ['Onboard breakfast', 'Return for lunch or cheap supermarket snack', 'Dinner onboard', 'Avoid tourist restaurants'],
    transportTip: 'Bus or walk from port to city centre. Tourist bus also available.',
    foodTip: 'Breakfast and dinner onboard. Lunch onboard or cheap supermarket €2–€5.',
    budgetTarget: '€0–€10',
    color: 'orange'
  },
  {
    day: 4,
    date: '29 May 2026',
    dayLabel: 'Friday',
    port: 'Ibiza',
    country: 'Spain',
    arrival: '—',
    departure: '—',
    type: 'port',
    emoji: '🏝️',
    highlights: ['Dalt Vila (Old Town)', 'Beach walk', 'Sunset views'],
    tips: ['Avoid beach bars and clubs completely', 'No cocktails, no restaurant', 'Ibiza is very expensive — be strict', 'Walk and enjoy views for free'],
    transportTip: 'Ship berths close to town. Walk to Dalt Vila and beaches.',
    foodTip: 'All meals onboard. Zero spending target for food.',
    budgetTarget: '€0–€5 (water only)',
    color: 'purple'
  },
  {
    day: 5,
    date: '30 May 2026',
    dayLabel: 'Saturday',
    port: 'At Sea',
    country: '—',
    arrival: '—',
    departure: '—',
    type: 'sea',
    emoji: '🌊',
    highlights: ['Pool & sun deck', 'Free shows & quiz', 'Gala/Elegant evening', 'Dance class if free'],
    tips: ['Spend €0', 'Stay in airplane mode all day', 'Enjoy all free onboard entertainment', 'Pool, gym, live music, shows'],
    transportTip: 'Sea day — enjoy the ship',
    foodTip: 'All meals onboard. Target: €0.',
    budgetTarget: '€0',
    color: 'cyan'
  },
  {
    day: 6,
    date: '31 May 2026',
    dayLabel: 'Sunday',
    port: 'Cagliari',
    country: 'Italy',
    arrival: '08:00',
    departure: '17:00',
    type: 'port',
    emoji: '🇮🇹',
    highlights: ['Castello district', 'Bastione di Saint Remy', 'Roman Amphitheatre'],
    tips: ['Walk the historic centre', 'Return onboard for lunch', 'Coffee only if needed', 'Beautiful city — free to explore'],
    transportTip: 'Walk from port to city centre (15–20 min). No transport needed.',
    foodTip: 'Breakfast and dinner onboard. Return for lunch if possible.',
    budgetTarget: '€0–€5 (coffee only)',
    color: 'green'
  },
  {
    day: 7,
    date: '1 June 2026',
    dayLabel: 'Monday',
    port: 'Civitavecchia',
    country: 'Italy',
    arrival: '08:00',
    departure: '19:00',
    type: 'port',
    emoji: '🏛️',
    highlights: ['Forte Michelangelo', 'Port promenade', 'Civitavecchia historic centre'],
    tips: ['Stay in Civitavecchia — do NOT go to Rome', 'Rome adds €30+ train + food pressure', 'Walk the port and old town for free', 'Last evening show onboard'],
    transportTip: 'Walk from port. Civitavecchia has a pleasant historic centre.',
    foodTip: 'All meals onboard. Cheap snack only if starving.',
    budgetTarget: '€0–€5',
    color: 'red'
  },
  {
    day: 8,
    date: '2 June 2026',
    dayLabel: 'Tuesday',
    port: 'Genova',
    country: 'Italy',
    arrival: '08:00',
    departure: '—',
    type: 'disembarkation',
    emoji: '🏠',
    highlights: ['Disembarkation', 'Train to Turin', 'Home!'],
    tips: ['Eat onboard breakfast before leaving', 'Pack the night before', 'Normal train Genova → Turin', 'Avoid station restaurants'],
    transportTip: 'Train from Genova Piazza Principe back to Turin Porta Nuova.',
    foodTip: 'Breakfast onboard. Cheap station snack or wait until home.',
    budgetTarget: '€5–€10 (train only)',
    color: 'ocean'
  }
]
