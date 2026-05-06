export interface DayFoodPlan {
  day: number
  date: string
  port: string
  breakfast: string
  lunch: string
  dinner: string
  target: string
  notes: string
}

export const includedFoods = [
  'Buffet restaurant (all meals)',
  'Main seated restaurant',
  'Breakfast in buffet',
  'Lunch in buffet',
  'Dinner in main restaurant',
  'Standard soups and salads',
  'Bread and desserts in included areas',
  'Basic non-bottled water in restaurant'
]

export const paidFoods = [
  'Specialty restaurants (Asian, Steakhouse, etc.)',
  'Paid café / patisserie snacks',
  'Premium desserts / ice cream shops',
  'Bar food / tapas',
  'Paid room-service menu items',
  'Bottled water',
  'Soft drinks (Coke, Fanta etc.)',
  'Alcohol / beer / wine',
  'Cocktails',
  'Specialty coffee (cappuccino, latte)',
  'Fresh juice',
  'Smoothies'
]

export const dayFoodPlan: DayFoodPlan[] = [
  {
    day: 1,
    date: '26 May',
    port: 'Genova (Embarkation)',
    breakfast: 'Eat at home before leaving Turin',
    lunch: 'Snack from home / supermarket on train',
    dinner: 'Onboard included restaurant or buffet',
    target: '€5–€13',
    notes: 'First meal onboard is dinner. Explore ship after boarding.'
  },
  {
    day: 2,
    date: '27 May',
    port: 'Marseille',
    breakfast: 'Big onboard breakfast (eat well — fuel for the day)',
    lunch: 'Return to ship if possible. Otherwise supermarket snack max €5.',
    dinner: 'Onboard included restaurant',
    target: '€5–€10',
    notes: 'Ship departs 15:00. Return by 14:30. Big breakfast is key.'
  },
  {
    day: 3,
    date: '28 May',
    port: 'Valencia',
    breakfast: 'Onboard buffet',
    lunch: 'Onboard OR supermarket snack (Mercadona nearby, ~€3)',
    dinner: 'Onboard included restaurant',
    target: '€0–€10',
    notes: 'Long port day (10:00–20:00). Good opportunity for afternoon return.'
  },
  {
    day: 4,
    date: '29 May',
    port: 'Ibiza',
    breakfast: 'Onboard buffet',
    lunch: 'Onboard — return to ship',
    dinner: 'Onboard included restaurant',
    target: '€0',
    notes: 'Ibiza is extremely expensive. Avoid every food outlet ashore.'
  },
  {
    day: 5,
    date: '30 May',
    port: 'Navigation (Sea Day)',
    breakfast: 'Onboard buffet',
    lunch: 'Onboard buffet',
    dinner: 'Onboard main restaurant (possibly Gala/Elegant Night)',
    target: '€0',
    notes: 'Perfect day. Zero spending. Enjoy all free onboard activities.'
  },
  {
    day: 6,
    date: '31 May',
    port: 'Cagliari',
    breakfast: 'Onboard buffet',
    lunch: 'Return onboard (ship 08:00–17:00, plenty of time)',
    dinner: 'Onboard included restaurant',
    target: '€0–€5',
    notes: 'Beautiful walkable city. Coffee if needed (€1.20–€1.50 at bar).'
  },
  {
    day: 7,
    date: '1 June',
    port: 'Civitavecchia',
    breakfast: 'Onboard buffet',
    lunch: 'Onboard OR cheap local snack if staying ashore late',
    dinner: 'Onboard included restaurant',
    target: '€0–€5',
    notes: 'Do NOT go to Rome. Stay in Civitavecchia. Final evening entertainment.'
  },
  {
    day: 8,
    date: '2 June',
    port: 'Genova (Disembarkation)',
    breakfast: 'Onboard before disembarkation (last included meal)',
    lunch: 'Cheap station snack or wait until home',
    dinner: 'Home in Turin',
    target: '€5–€10',
    notes: 'Pack night before. Eat full breakfast onboard. Train home.'
  }
]
