export interface Activity {
  label: string
  status: 'free' | 'paid' | 'verify'
  category: string
  note?: string
}

export const activities: Activity[] = [
  // Free
  { label: 'Main theatre shows', status: 'free', category: 'Entertainment', note: 'Check schedule on ship TV' },
  { label: 'Live music in lounges', status: 'free', category: 'Entertainment' },
  { label: 'Theme parties (White Party etc.)', status: 'free', category: 'Entertainment' },
  { label: 'Dance nights', status: 'free', category: 'Entertainment' },
  { label: 'Pool area & sun deck', status: 'free', category: 'Leisure' },
  { label: 'Gym / fitness centre', status: 'free', category: 'Leisure' },
  { label: 'Walking/jogging deck', status: 'free', category: 'Leisure' },
  { label: 'Quizzes & trivia games (if marked free)', status: 'free', category: 'Entertainment', note: 'Verify with daily programme' },
  { label: 'Dance classes (if marked free)', status: 'free', category: 'Entertainment', note: 'Some may have charge — verify' },
  { label: 'Library & quiet lounges', status: 'free', category: 'Leisure' },
  { label: 'Disco entrance (if free)', status: 'free', category: 'Entertainment', note: 'Entrance free; drinks are paid' },
  { label: 'Gala / Elegant evening attendance', status: 'free', category: 'Entertainment' },
  { label: 'Deck games & sports', status: 'free', category: 'Leisure' },
  { label: 'Kids\' club (if applicable)', status: 'free', category: 'Other' },
  // Paid / Avoid
  { label: 'Casino', status: 'paid', category: 'Avoid', note: 'Avoid entirely' },
  { label: 'Spa / massage / beauty treatments', status: 'paid', category: 'Avoid' },
  { label: 'Professional photography', status: 'paid', category: 'Avoid', note: 'They approach you — decline politely' },
  { label: 'Specialty restaurants', status: 'paid', category: 'Avoid' },
  { label: 'Bars & cocktails', status: 'paid', category: 'Avoid' },
  { label: 'Alcohol / beer / wine', status: 'paid', category: 'Avoid' },
  { label: 'Bottled water', status: 'paid', category: 'Avoid' },
  { label: 'Soft drinks', status: 'paid', category: 'Avoid' },
  { label: 'Specialty coffee (cappuccino)', status: 'paid', category: 'Avoid' },
  { label: 'Bingo', status: 'paid', category: 'Avoid' },
  { label: 'Arcade / Fun Pass machines', status: 'paid', category: 'Avoid' },
  { label: 'Shopping (onboard boutiques)', status: 'paid', category: 'Avoid' },
  { label: 'Internet / Wi-Fi package', status: 'paid', category: 'Avoid' },
  { label: 'Paid room-service items', status: 'paid', category: 'Avoid' },
  { label: 'Excursions (MSC organised)', status: 'paid', category: 'Avoid', note: 'Walk and explore independently for free' },
  // Verify
  { label: 'Cooking demonstrations', status: 'verify', category: 'Entertainment', note: 'Sometimes free, sometimes charged' },
  { label: 'Art auction', status: 'verify', category: 'Entertainment', note: 'Attend only if free — no purchases' },
  { label: 'Fitness classes (yoga, pilates)', status: 'verify', category: 'Leisure', note: 'Gym is free; classes may cost extra' }
]

export const eveningPlan = [
  { day: 1, label: 'Day 1 — Genova', plan: 'Explore ship, onboard dinner, welcome music & lounge evening' },
  { day: 2, label: 'Day 2 — After Marseille', plan: 'Theatre show + live music in lounge' },
  { day: 3, label: 'Day 3 — After Valencia', plan: 'Theme party / dance night if available' },
  { day: 4, label: 'Day 4 — After Ibiza', plan: 'Ibiza evening atmosphere — free disco/lounge only, no paid drinks' },
  { day: 5, label: 'Day 5 — Sea Day', plan: 'Sea day pool & activities. Gala/Elegant Night if scheduled. Theatre show.' },
  { day: 6, label: 'Day 6 — After Cagliari', plan: 'Theatre show + lounge music' },
  { day: 7, label: 'Day 7 — After Civitavecchia', plan: 'Final show / live music / dance night' },
  { day: 8, label: 'Day 8 — Genova', plan: 'Early disembarkation — no evening' }
]
