export interface PackingItem {
  id: string
  label: string
  category: string
  priority: 'essential' | 'recommended' | 'optional'
  person?: 'both' | 'peyman' | 'mozhgan'
}

export interface PackingCategory {
  id: string
  label: string
  icon: string
  items: PackingItem[]
}

export const packingCategories: PackingCategory[] = [
  {
    id: 'documents',
    label: 'Documents & Money',
    icon: '📄',
    items: [
      { id: 'passport', label: 'Passport / ID cards (both)', category: 'documents', priority: 'essential', person: 'both' },
      { id: 'cruise-ticket', label: 'Cruise ticket / booking confirmation', category: 'documents', priority: 'essential', person: 'both' },
      { id: 'insurance', label: 'Travel insurance documents', category: 'documents', priority: 'essential', person: 'both' },
      { id: 'health-card', label: 'European Health Insurance Card (EHIC)', category: 'documents', priority: 'essential', person: 'both' },
      { id: 'train-tickets', label: 'Train tickets (Turin ↔ Genova)', category: 'documents', priority: 'essential', person: 'both' },
      { id: 'doc-copies', label: 'Copies / screenshots of all documents', category: 'documents', priority: 'essential', person: 'both' },
      { id: 'bank-card', label: 'Credit / debit card', category: 'documents', priority: 'essential', person: 'both' },
      { id: 'cash', label: 'Small cash (€50–€80)', category: 'documents', priority: 'essential', person: 'both' }
    ]
  },
  {
    id: 'tech',
    label: 'Technology',
    icon: '📱',
    items: [
      { id: 'phones', label: 'Smartphones (both)', category: 'tech', priority: 'essential', person: 'both' },
      { id: 'chargers', label: 'Phone chargers', category: 'tech', priority: 'essential', person: 'both' },
      { id: 'power-bank', label: 'Power bank (charged)', category: 'tech', priority: 'essential', person: 'both' },
      { id: 'earphones', label: 'Earphones / headphones', category: 'tech', priority: 'recommended', person: 'both' },
      { id: 'offline-maps', label: 'Offline maps downloaded (Maps.me / Google)', category: 'tech', priority: 'essential', person: 'both' },
      { id: 'offline-translate', label: 'Offline translation downloaded', category: 'tech', priority: 'recommended', person: 'both' },
      { id: 'pwa-installed', label: 'This cruise planner installed as PWA', category: 'tech', priority: 'essential', person: 'both' },
      { id: 'windtre-sim', label: 'WINDTRE SIM — checked and active', category: 'tech', priority: 'essential', person: 'peyman' },
      { id: 'iliad-sim', label: 'Iliad SIM — checked and active', category: 'tech', priority: 'essential', person: 'mozhgan' },
      { id: 'adapter', label: 'Universal travel adapter (if needed)', category: 'tech', priority: 'optional', person: 'both' }
    ]
  },
  {
    id: 'health',
    label: 'Health & Medicines',
    icon: '💊',
    items: [
      { id: 'prescription', label: 'Prescription medicines (full supply + extra)', category: 'health', priority: 'essential', person: 'both' },
      { id: 'painkiller', label: 'Painkiller (ibuprofen / paracetamol)', category: 'health', priority: 'essential', person: 'both' },
      { id: 'stomach', label: 'Stomach medicine (antacid)', category: 'health', priority: 'essential', person: 'both' },
      { id: 'diarrhea', label: 'Diarrhea medicine (Imodium)', category: 'health', priority: 'essential', person: 'both' },
      { id: 'seasick', label: 'Motion sickness tablets (Stugeron / Dramamine)', category: 'health', priority: 'essential', person: 'both' },
      { id: 'plasters', label: 'Plasters / blister pads', category: 'health', priority: 'recommended', person: 'both' },
      { id: 'sunscreen', label: 'Sunscreen (SPF 30+)', category: 'health', priority: 'essential', person: 'both' },
      { id: 'allergy', label: 'Allergy medicine if needed', category: 'health', priority: 'recommended', person: 'both' },
      { id: 'original-packaging', label: 'Medicines in original packaging', category: 'health', priority: 'essential', person: 'both' },
      { id: 'hand-sanitizer', label: 'Hand sanitizer', category: 'health', priority: 'recommended', person: 'both' }
    ]
  },
  {
    id: 'clothing-peyman',
    label: 'Clothing — Peyman',
    icon: '👔',
    items: [
      { id: 'p-tshirts', label: '4–5 T-shirts / polo shirts', category: 'clothing-peyman', priority: 'essential', person: 'peyman' },
      { id: 'p-trousers', label: '2 casual trousers / jeans / chinos', category: 'clothing-peyman', priority: 'essential', person: 'peyman' },
      { id: 'p-shorts', label: '1 shorts', category: 'clothing-peyman', priority: 'recommended', person: 'peyman' },
      { id: 'p-smart-shirt', label: '1 smart shirt (evenings)', category: 'clothing-peyman', priority: 'essential', person: 'peyman' },
      { id: 'p-gala', label: '1 elegant / gala night outfit', category: 'clothing-peyman', priority: 'essential', person: 'peyman' },
      { id: 'p-white', label: '1 white shirt/T-shirt (White Party)', category: 'clothing-peyman', priority: 'recommended', person: 'peyman' },
      { id: 'p-jacket', label: '1 light jacket / cardigan', category: 'clothing-peyman', priority: 'essential', person: 'peyman' },
      { id: 'p-shoes', label: 'Comfortable walking shoes', category: 'clothing-peyman', priority: 'essential', person: 'peyman' },
      { id: 'p-sandals', label: 'Sandals / flip-flops', category: 'clothing-peyman', priority: 'optional', person: 'peyman' },
      { id: 'p-swim', label: 'Swimwear', category: 'clothing-peyman', priority: 'essential', person: 'peyman' },
      { id: 'p-underwear', label: 'Underwear & socks for 8 days', category: 'clothing-peyman', priority: 'essential', person: 'peyman' }
    ]
  },
  {
    id: 'clothing-mozhgan',
    label: 'Clothing — Mozhgan',
    icon: '👗',
    items: [
      { id: 'm-tops', label: '4–5 comfortable tops', category: 'clothing-mozhgan', priority: 'essential', person: 'mozhgan' },
      { id: 'm-trousers', label: '2 trousers / skirts / comfortable outfits', category: 'clothing-mozhgan', priority: 'essential', person: 'mozhgan' },
      { id: 'm-dresses', label: '1–2 dresses / smart outfits for evenings', category: 'clothing-mozhgan', priority: 'essential', person: 'mozhgan' },
      { id: 'm-gala', label: '1 elegant / gala night outfit', category: 'clothing-mozhgan', priority: 'essential', person: 'mozhgan' },
      { id: 'm-white', label: '1 white outfit / top (White Party)', category: 'clothing-mozhgan', priority: 'recommended', person: 'mozhgan' },
      { id: 'm-jacket', label: '1 light jacket / cardigan', category: 'clothing-mozhgan', priority: 'essential', person: 'mozhgan' },
      { id: 'm-shoes', label: 'Comfortable walking shoes', category: 'clothing-mozhgan', priority: 'essential', person: 'mozhgan' },
      { id: 'm-sandals', label: 'Sandals / flat shoes', category: 'clothing-mozhgan', priority: 'optional', person: 'mozhgan' },
      { id: 'm-swim', label: 'Swimwear', category: 'clothing-mozhgan', priority: 'essential', person: 'mozhgan' },
      { id: 'm-accessories', label: 'Simple accessories (no expensive jewellery)', category: 'clothing-mozhgan', priority: 'optional', person: 'mozhgan' },
      { id: 'm-underwear', label: 'Underwear & socks for 8 days', category: 'clothing-mozhgan', priority: 'essential', person: 'mozhgan' }
    ]
  },
  {
    id: 'economy',
    label: 'Economy Essentials',
    icon: '💰',
    items: [
      { id: 'water-bottles', label: 'Reusable water bottles (2)', category: 'economy', priority: 'essential', person: 'both' },
      { id: 'snacks', label: 'Snacks for trip (crackers, protein bars, taralli)', category: 'economy', priority: 'essential', person: 'both' },
      { id: 'backpack', label: 'Small daypack / backpack for port days', category: 'economy', priority: 'essential', person: 'both' },
      { id: 'sun-hat', label: 'Sun hat / sunglasses', category: 'economy', priority: 'recommended', person: 'both' },
      { id: 'lip-balm', label: 'Lip balm / moisturiser', category: 'economy', priority: 'optional', person: 'both' }
    ]
  }
]
