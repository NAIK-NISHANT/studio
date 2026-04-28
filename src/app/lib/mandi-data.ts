export interface ProduceItem {
  id: string;
  name: string;
  mandiPrice: number; // Price per KG in city Mandi
  unit: string;
  icon: string;
}

export const mandiPrices: ProduceItem[] = [
  { id: '1', name: 'Onion (Kanda)', mandiPrice: 24, unit: 'kg', icon: '🧅' },
  { id: '2', name: 'Tomato (Tamatar)', mandiPrice: 18, unit: 'kg', icon: '🍅' },
  { id: '3', name: 'Potato (Batata)', mandiPrice: 15, unit: 'kg', icon: '🥔' },
  { id: '4', name: 'Green Chili (Mirchi)', mandiPrice: 45, unit: 'kg', icon: '🌶️' },
  { id: '5', name: 'Ginger (Adrak)', mandiPrice: 120, unit: 'kg', icon: '🫚' },
  { id: '6', name: 'Garlic (Lasun)', mandiPrice: 180, unit: 'kg', icon: '🧄' },
  { id: '7', name: 'Okra (Bhindi)', mandiPrice: 35, unit: 'kg', icon: '🥦' },
  { id: '8', name: 'Carrot (Gajar)', mandiPrice: 28, unit: 'kg', icon: '🥕' },
];