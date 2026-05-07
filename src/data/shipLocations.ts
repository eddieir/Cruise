export interface ShipLocation {
  id: string
  name: string
  deck: number | null
  deckItalian?: string
  type: 'cabin' | 'restaurant' | 'entertainment' | 'leisure' | 'service' | 'safety' | 'gangway' | 'other'
  icon: string
  note?: string
  directions: string
}

// Based on typical MSC Musica layout — verify with onboard signage
export const shipLocations: ShipLocation[] = [
  {
    id: 'cabin',
    name: 'Cabin 12049',
    deck: 12,
    deckItalian: 'Ponte 12',
    type: 'cabin',
    icon: '🛏️',
    directions: 'Elevator or stairs to Deck 12. Follow cabin number signs to 12049.'
  },
  {
    id: 'buffet',
    name: 'Buffet Restaurant (La Terrazza)',
    deck: 13,
    deckItalian: 'Ponte 13',
    type: 'restaurant',
    icon: '🍽️',
    note: 'Self-service buffet. Open all day. Included in fare.',
    directions: 'From Cabin 12049: Take elevator/stairs UP to Deck 13. Follow "Buffet / La Terrazza" signs.'
  },
  {
    id: 'main-restaurant',
    name: 'Main Restaurant (Il Tucano)',
    deck: 6,
    deckItalian: 'Ponte 6',
    type: 'restaurant',
    icon: '🍷',
    note: 'Sit-down dinner. Included. First sitting (Primo Turno) — your assigned time.',
    directions: 'From Cabin 12049: Take elevator/stairs DOWN to Deck 6. Follow "Il Tucano / Ristorante" signs.'
  },
  {
    id: 'theatre',
    name: 'Theatre (La Scala)',
    deck: 6,
    deckItalian: 'Ponte 6–7',
    type: 'entertainment',
    icon: '🎭',
    note: 'Evening shows, concerts, dance performances. Free and included.',
    directions: 'From Cabin 12049: Take elevator/stairs DOWN to Deck 6. Follow "Teatro / Theatre / La Scala" signs.'
  },
  {
    id: 'pool',
    name: 'Main Pool Deck',
    deck: 13,
    deckItalian: 'Ponte 13',
    type: 'leisure',
    icon: '🏊',
    note: 'Outdoor pool. Free. Deck chairs available. Often busy.',
    directions: 'From Cabin 12049: Take elevator/stairs UP to Deck 13. Go to the outdoor deck — pool is visible.'
  },
  {
    id: 'gym',
    name: 'Gym / Fitness Centre',
    deck: 14,
    deckItalian: 'Ponte 14',
    type: 'leisure',
    icon: '💪',
    note: 'Basic gym access is typically free. Verify at reception — some classes may be paid.',
    directions: 'From Cabin 12049: Take elevator/stairs UP to Deck 14. Follow "Palestra / Gym / Fitness" signs.'
  },
  {
    id: 'reception',
    name: 'Reception / Guest Services',
    deck: 5,
    deckItalian: 'Ponte 5',
    type: 'service',
    icon: '🛎️',
    note: 'Open 24 hours. For questions, complaints, lost items. Phone: press 0 from cabin phone.',
    directions: 'From Cabin 12049: Take elevator/stairs DOWN to Deck 5. Follow "Reception / Guest Services" signs in the atrium.'
  },
  {
    id: 'muster-c',
    name: 'Muster Point C',
    deck: null,
    type: 'safety',
    icon: '🆘',
    note: 'Your emergency assembly point. Learn its exact location during the mandatory safety drill on embarkation day.',
    directions: 'Check onboard safety card in your cabin + follow crew instructions during muster drill. Do NOT rely on this app for muster point — learn it during the drill.'
  },
  {
    id: 'gangway',
    name: 'Gangway / Ship Exit',
    deck: 4,
    deckItalian: 'Ponte 4–5',
    type: 'gangway',
    icon: '🚢',
    note: 'Gangway location varies by port. Follow crew and onboard announcements.',
    directions: 'From Cabin 12049: Take elevator/stairs DOWN to Deck 4 or 5 (follow onboard signs for "Gangway / Uscita"). Show Cruise Card when exiting and boarding.'
  },
  {
    id: 'bar-lounge',
    name: 'Main Bar / Lounge',
    deck: 7,
    deckItalian: 'Ponte 7',
    type: 'entertainment',
    icon: '🎵',
    note: 'Bar is paid. Lounge for free shows and live music is typically free to enter.',
    directions: 'From Cabin 12049: Take elevator/stairs DOWN to Deck 7. Follow lounge/bar signs.'
  },
  {
    id: 'medical',
    name: 'Medical Centre',
    deck: 4,
    deckItalian: 'Ponte 4',
    type: 'service',
    icon: '🏥',
    note: 'Emergency medical available 24/7. Consultations are PAID — expensive. Use only if truly necessary. Contact reception first.',
    directions: 'From Cabin 12049: Take elevator/stairs DOWN to Deck 4. Follow "Medical Centre / Infirmary" signs or call reception (press 0).'
  },
]
