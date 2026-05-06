export interface OutfitDay {
  day: number
  date: string
  port: string
  peyman: string
  mozhgan: string
  notes: string
}

export const outfitDays: OutfitDay[] = [
  { day: 1, date: '26 May', port: 'Genova (Travel + Embarkation)', peyman: 'Comfortable travel outfit — jeans or chinos, breathable T-shirt, light jacket', mozhgan: 'Comfortable travel outfit — easy trousers, comfortable top, light jacket', notes: 'Bring snack bag. Pack smart — you\'ll carry luggage to the ship.' },
  { day: 2, date: '27 May', port: 'Marseille (07:00–15:00)', peyman: 'Walking outfit — chinos, polo shirt, light jacket', mozhgan: 'Casual outfit for walking — comfortable trousers/skirt, top, jacket', notes: 'Morning can be cool. Bring jacket. Comfortable shoes essential.' },
  { day: 3, date: '28 May', port: 'Valencia (10:00–20:00)', peyman: 'City casual — shorts or light chinos, T-shirt', mozhgan: 'Summer dress or comfortable outfit — light and breathable', notes: 'Long warm port day. Sun hat and sunglasses. Comfortable shoes.' },
  { day: 4, date: '29 May', port: 'Ibiza', peyman: 'Beach/casual — shorts, T-shirt, sandals or sneakers', mozhgan: 'Beach casual — simple dress or comfortable outfit. No expensive accessories.', notes: 'Ibiza is expensive — no beach bar temptation. Simple is best.' },
  { day: 5, date: '30 May', port: 'Sea Day + Possible Gala Night', peyman: 'Daytime: swimwear + casual. Evening: elegant gala outfit (suit / smart shirt).', mozhgan: 'Daytime: swimwear + casual. Evening: elegant gala dress / outfit.', notes: 'White Party or Gala Night may be scheduled. Check ship programme.' },
  { day: 6, date: '31 May', port: 'Cagliari (08:00–17:00)', peyman: 'Comfortable walking outfit — light chinos, polo shirt', mozhgan: 'Comfortable city outfit — trousers or skirt, comfortable top', notes: 'Walkable city. Wear most comfortable shoes.' },
  { day: 7, date: '1 June', port: 'Civitavecchia (08:00–19:00)', peyman: 'Comfortable walking outfit. Smart shirt for final evening show.', mozhgan: 'Comfortable outfit. Smart/evening option for final show.', notes: 'Last port day and last evening entertainment. Comfortable but presentable.' },
  { day: 8, date: '2 June', port: 'Genova (Disembarkation + Train)', peyman: 'Simple travel outfit — easy to pack, comfortable for train journey home', mozhgan: 'Comfortable travel outfit — easy clothes for journey home', notes: 'Pack the night before. Wear most comfortable clothes for travel day.' }
]

export const generalRules = [
  'Daytime: casual, comfortable, breathable clothing',
  'Port days: comfortable walking shoes are essential',
  'Evenings: smart casual (nice shirt, dress trousers, dress)',
  'One elegant/gala outfit each (suit or blazer / evening dress)',
  'One white outfit/top each for possible White Party',
  'Light jacket or cardigan for evening sea breeze',
  'Swimwear for pool and sea days',
  'Sunglasses and sun hat for warm ports',
  'Do not overpack — cabin storage is limited'
]
