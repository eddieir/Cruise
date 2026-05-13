export interface EmbarkationStep {
  id: string
  step: number
  title: string
  detail: string
  icon: string
  type: 'arrival' | 'document' | 'luggage' | 'security' | 'boarding' | 'cabin' | 'safety'
}

export interface RouteStep {
  id: string
  instruction: string
  detail?: string
  type: 'walk' | 'elevator' | 'stairs' | 'landmark' | 'warning' | 'arrive' | 'info'
}

export interface RouteMode {
  id: string
  label: string
  icon: string
  description: string
  steps: RouteStep[]
}

export const CABIN_INFO = {
  number: '10142',
  deck: 10,
  deckItalian: 'Ponte 10',
  ship: 'MSC Musica',
  musterPoint: 'F',
  checkInOpens: '14:00',
  departure: '18:00',
  disembarkation: '02/06/2026',
  type: 'BA — Cabina esterna con balcone (Balcony)',
  experience: 'Fantastica',
  dinner: 'Primo Turno (First Sitting)',
  passengers: ['Peyman Iravani', 'Mozhgan Nami Seghinsara'],
  bookingNumber: '66399145',
}

export const TERMINAL_COORDS = {
  station: { lat: 44.4176, lng: 8.9204, name: 'Genova Piazza Principe Station' },
  terminal: { lat: 44.4068, lng: 8.9117, name: 'MSC Cruise Terminal Genova' },
}

export const stationToTerminalSteps = [
  { id: 's1', icon: '🚂', title: 'Exit Genova Piazza Principe Station', detail: 'Follow signs to the main exit on the station square (Piazza Acquaverde).' },
  { id: 's2', icon: '🧭', title: 'Head south toward the port', detail: 'Walk downhill toward the waterfront. The port is clearly visible from the station area.' },
  { id: 's3', icon: '🚶', title: 'Walk along Via Antonio Gramsci / waterfront road', detail: 'Follow the main coastal road heading west/southwest. Distance: ~1 km. Time: 12–15 min walking.' },
  { id: 's4', icon: '⚓', title: 'Enter Porto di Genova / Ponte dei Mille area', detail: 'You will see large cruise ships and signs for "Crociere". Follow MSC Cruise Terminal signs.' },
  { id: 's5', icon: '🛂', title: 'Arrive at Terminal Crociere MSC Genova', detail: 'Enter the terminal building. Security screening before check-in area. Have documents ready.' },
  { id: 's6', icon: '✅', title: 'You have arrived!', detail: 'You are at the MSC Cruise Terminal. Check-in opens at 14:00. If early, there may be a waiting area.' },
]

export const embarkationSteps: EmbarkationStep[] = [
  {
    id: 'arrive-terminal',
    step: 1,
    title: 'Arrive at Genova cruise terminal',
    detail: 'Terminal Crociere MSC Genova — Ponte dei Mille / Ponte Andrea Doria. About 1 km south of Piazza Principe station.',
    icon: '🚢',
    type: 'arrival'
  },
  {
    id: 'documents-ready',
    step: 2,
    title: 'Keep passport/ID and boarding form ready',
    detail: 'Have both passports, printed boarding confirmations, and MSC tickets accessible in your hand luggage.',
    icon: '📄',
    type: 'document'
  },
  {
    id: 'checkin-time',
    step: 3,
    title: 'Check-in opens at 14:00',
    detail: 'If you arrive before 14:00, wait in the designated area. Do not try to rush the process. Departure is at 18:00.',
    icon: '⏰',
    type: 'arrival'
  },
  {
    id: 'luggage-labels',
    step: 4,
    title: 'Hand over checked luggage with labels',
    detail: 'Attach printed luggage labels (Ponte 10 / Cabina 10142) before handing bags to porters. Bags will be delivered to your cabin.',
    icon: '🧳',
    type: 'luggage'
  },
  {
    id: 'hand-luggage',
    step: 5,
    title: 'Keep valuables in hand luggage',
    detail: 'Never put in checked bags: passports, money/cards, medicines, electronics, phone chargers, expensive items.',
    icon: '💼',
    type: 'luggage'
  },
  {
    id: 'security',
    step: 6,
    title: 'Complete security screening and boarding',
    detail: 'Go through airport-style security. Then proceed to the boarding area. Have cruise card or booking confirmation ready.',
    icon: '🔒',
    type: 'security'
  },
  {
    id: 'board-ship',
    step: 7,
    title: 'Board MSC Musica via gangway',
    detail: 'Follow crew directions across the gangway. Welcome aboard! The gangway typically connects around Deck 4–5.',
    icon: '⚓',
    type: 'boarding'
  },
  {
    id: 'find-cabin',
    step: 8,
    title: 'Go to Cabin 10142 if cabins are ready',
    detail: 'Cabins are usually ready from 14:30–15:00 onward. Head to Deck 10 / Ponte 10. If not ready, explore the ship.',
    icon: '🛏️',
    type: 'cabin'
  },
  {
    id: 'cruise-card',
    step: 9,
    title: 'Find Cruise Card on cabin door',
    detail: 'Your Cruise Card (room key + onboard payment card) will be in an envelope on your cabin door. Collect it immediately.',
    icon: '💳',
    type: 'cabin'
  },
  {
    id: 'muster-drill',
    step: 10,
    title: 'Attend mandatory safety drill',
    detail: 'A mandatory emergency/muster drill takes place before departure. All passengers must attend. It is a legal requirement.',
    icon: '🦺',
    type: 'safety'
  },
  {
    id: 'muster-point',
    step: 11,
    title: 'Remember Muster Point F',
    detail: 'Your assigned muster station is Point F. Learn its location during the drill. In an emergency, go directly to Muster Point F.',
    icon: '📍',
    type: 'safety'
  },
]

export const routeModes: RouteMode[] = [
  {
    id: 'elevator',
    label: 'Elevator Route',
    icon: '🛗',
    description: 'Best for most people. Easiest with luggage.',
    steps: [
      { id: 'e1', instruction: 'Board ship via gangway (approx. Deck 4–5)', detail: 'Follow crew directions. You will enter a reception/atrium area.', type: 'landmark' },
      { id: 'e2', instruction: 'Follow signs to elevator lobby', detail: 'Look for "Ascensori / Elevators" signs with up/down arrows on the walls.', type: 'walk' },
      { id: 'e3', instruction: 'Take elevator to Deck 10 / Ponte 10', detail: 'Press button 10. Multiple elevators available. May be busy at embarkation — wait patiently.', type: 'elevator' },
      { id: 'e4', instruction: 'Exit elevator and check corridor signs', detail: 'Signs on the wall will show cabin number ranges: e.g. "10101–10150 →" or "← 10101–10150".', type: 'landmark' },
      { id: 'e5', instruction: 'Follow signs toward 10142', detail: 'Cabin 10142 is even-numbered — check which side of the corridor even numbers are on (starboard side). Follow arrows.', type: 'walk' },
      { id: 'e6', instruction: 'Stop at Cabin 10142', detail: 'Verify the number on the door matches 10142. Double-check!', type: 'arrive' },
      { id: 'e7', instruction: 'Collect Cruise Card from door envelope', detail: 'Your Cruise Card should be in an envelope attached to the door. Take it immediately — it is your key.', type: 'info' },
    ]
  },
  {
    id: 'stairs',
    label: 'Stairs Route',
    icon: '🪜',
    description: 'Faster when elevators are busy at embarkation.',
    steps: [
      { id: 's1', instruction: 'Board ship via gangway (approx. Deck 4–5)', detail: 'Follow crew directions to the ship entrance.', type: 'landmark' },
      { id: 's2', instruction: 'Locate staircase (Scale / Stairs)', detail: 'Look for staircase signs near the elevator area. Central stairs span all decks.', type: 'walk' },
      { id: 's3', instruction: 'Climb stairs to Deck 10', detail: 'If boarding at Deck 4, you need 6 flights. At Deck 5, you need 5 flights. Each flight = 1 deck.', type: 'stairs' },
      { id: 's4', instruction: 'Exit staircase onto Deck 10 corridor', detail: 'Deck number is marked at each staircase landing. Confirm you are on Deck 10.', type: 'landmark' },
      { id: 's5', instruction: 'Follow corridor signs to cabin 10142', detail: 'Look for cabin number range signs and follow arrows.', type: 'walk' },
      { id: 's6', instruction: 'Arrive at Cabin 10142', detail: 'Check the door number. Collect Cruise Card from envelope on door.', type: 'arrive' },
    ]
  },
  {
    id: 'heavy-luggage',
    label: 'With Heavy Luggage',
    icon: '🧳',
    description: 'Luggage delivered separately — you travel light.',
    steps: [
      { id: 'h1', instruction: 'Hand checked bags to porters at terminal', detail: 'Ensure luggage labels are attached showing: MSC Musica / Ponte 10 / Cabina 10142. Bags delivered to your cabin.', type: 'info' },
      { id: 'h2', instruction: 'Board with hand luggage only', detail: 'Only carry your hand bag with documents, medicines, and valuables.', type: 'landmark' },
      { id: 'h3', instruction: 'Use elevator to Deck 10', detail: 'With only hand luggage, elevator is comfortable. No need to rush.', type: 'elevator' },
      { id: 'h4', instruction: 'Navigate to Cabin 10142 and wait for bags', detail: 'Bags typically arrive within 2–4 hours after embarkation. Do not worry if they are not there immediately.', type: 'arrive' },
      { id: 'h5', instruction: 'If bags not arrived by dinner, contact Reception (Deck 5)', detail: 'Go to Guest Services if bags have not arrived by early evening.', type: 'warning' },
    ]
  },
  {
    id: 'fast',
    label: 'Fast Route',
    icon: '⚡',
    description: 'For when you want to reach the cabin quickly.',
    steps: [
      { id: 'f1', instruction: 'Board and immediately turn toward mid-ship elevator', detail: 'Do not stop to explore. Go straight to the nearest elevator.', type: 'walk' },
      { id: 'f2', instruction: 'Press 10 in elevator — go directly to Deck 10', detail: 'Skip any intermediate stops if possible.', type: 'elevator' },
      { id: 'f3', instruction: 'Check sign at Deck 10 exit — turn toward 10142', detail: 'Signs will indicate which direction for the 10101–10150 range (even/starboard side).', type: 'landmark' },
      { id: 'f4', instruction: 'Walk to Cabin 10142 — collect Cruise Card', detail: 'Job done. You can explore the ship after.', type: 'arrive' },
    ]
  },
  {
    id: 'accessible',
    label: 'Accessible / Easy Route',
    icon: '♿',
    description: 'For mobility needs or those who need a relaxed pace.',
    steps: [
      { id: 'a1', instruction: 'Request crew assistance at gangway if needed', detail: 'MSC crew can assist with wheelchair, mobility aids, or if you need extra time.', type: 'info' },
      { id: 'a2', instruction: 'Use elevator only — avoid stairs', detail: 'Accessible elevators are available. Take your time — no rush.', type: 'elevator' },
      { id: 'a3', instruction: 'Ask crew if unsure of direction on Deck 10', detail: 'Crew are stationed throughout the ship during embarkation and will help you.', type: 'walk' },
      { id: 'a4', instruction: 'Arrive at Cabin 10142 at your own pace', detail: 'Collect Cruise Card. If you need anything, call Reception: press 0 on cabin phone.', type: 'arrive' },
    ]
  },
]

export const gpsWarning = 'GPS works well outside the ship (station → terminal). Inside MSC Musica, GPS is not reliable — steel structure blocks satellite signal across decks. Use this offline deck guide instead.'

export const onboardSnacksRule = 'Important: MSC does not allow homemade food or drinks onboard. Only dry packaged products (crackers, protein bars, sealed snacks) are permitted.'
