export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  image: string;
  description: string;
  badge?: string;
  rating: number;
  reviews: number;
  inStock: boolean;
}

export interface CartItem extends Product {
  quantity: number;
}

// Using Unsplash for high-quality agriculture/vet photos
export const products: Product[] = [
  // Animal Health
  {
    id: 1,
    name: 'Broad-Spectrum Livestock Drench',
    category: 'Animal Health',
    price: 289.99,
    originalPrice: 349.99,
    image: 'https://images.unsplash.com/photo-1605152276897-4f618f831968?w=600&q=80',
    description: 'Effective against internal parasites in cattle, sheep and goats. 5L concentrated formula.',
    badge: 'Best Seller',
    rating: 4.8,
    reviews: 142,
    inStock: true,
  },
  {
    id: 2,
    name: 'Foot-and-Mouth Vaccine Kit',
    category: 'Animal Health',
    price: 520.00,
    image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&q=80',
    description: 'Trivalent FMD vaccine for cattle and pigs. Includes 50-dose vial + syringes.',
    rating: 4.9,
    reviews: 87,
    inStock: true,
  },
  {
    id: 3,
    name: 'Wound Spray & Antiseptic 500ml',
    category: 'Animal Health',
    price: 149.00,
    image: 'https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=80',
    description: 'Purple wound spray for livestock and horses. Antimicrobial & fly-repellent formula.',
    badge: 'New',
    rating: 4.6,
    reviews: 64,
    inStock: true,
  },
  {
    id: 4,
    name: 'Vitamin & Mineral Lick Block',
    category: 'Animal Health',
    price: 185.00,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80',
    description: '20kg premium mineral lick block. Balanced micro-nutrients for optimal livestock health.',
    rating: 4.7,
    reviews: 210,
    inStock: true,
  },
  // Crop & Plant
  {
    id: 5,
    name: 'Glyphosate 360 Herbicide 5L',
    category: 'Crop & Plant',
    price: 399.00,
    originalPrice: 459.00,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    description: 'Non-selective systemic herbicide for pre-plant burndown and weed control.',
    badge: 'Sale',
    rating: 4.5,
    reviews: 98,
    inStock: true,
  },
  {
    id: 6,
    name: 'Organic Compost 30L Bag',
    category: 'Crop & Plant',
    price: 89.99,
    image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&q=80',
    description: 'Rich, fully composted kraal manure. Improves soil structure & microbial activity.',
    rating: 4.9,
    reviews: 315,
    inStock: true,
  },
  {
    id: 7,
    name: 'Foliar Fertilizer (NPK 3-1-5)',
    category: 'Crop & Plant',
    price: 245.00,
    image: 'https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=600&q=80',
    description: 'High-potassium foliar spray for improved fruit set, colour and shelf life.',
    rating: 4.4,
    reviews: 56,
    inStock: false,
  },
  {
    id: 8,
    name: 'Irrigation Drip Kit – 50m',
    category: 'Equipment',
    price: 699.00,
    image: 'https://images.unsplash.com/photo-1464226184884-fa280b87c399?w=600&q=80',
    description: 'Complete 50m drip irrigation kit. Includes timer, filter, emitters and fittings.',
    badge: 'Popular',
    rating: 4.7,
    reviews: 73,
    inStock: true,
  },
  // Equipment
  {
    id: 9,
    name: 'Knapsack Sprayer 16L',
    category: 'Equipment',
    price: 459.00,
    originalPrice: 520.00,
    image: 'https://images.unsplash.com/photo-1495107334309-fcf20504a5ab?w=600&q=80',
    description: 'Professional-grade HDPE knapsack sprayer with adjustable nozzle. Ergonomic design.',
    badge: 'Sale',
    rating: 4.6,
    reviews: 129,
    inStock: true,
  },
  {
    id: 10,
    name: 'Livestock Handling Gloves',
    category: 'Equipment',
    price: 79.00,
    image: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?w=600&q=80',
    description: 'Heavy-duty nitrile-coated gloves. Chemical & puncture resistant. Sold per pair.',
    rating: 4.3,
    reviews: 44,
    inStock: true,
  },
  // Feed & Nutrition
  {
    id: 11,
    name: 'Calf Starter Pellets 25kg',
    category: 'Feed & Nutrition',
    price: 329.00,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80',
    description: 'Medicated calf starter for early rumen development. High energy & palatability.',
    rating: 4.8,
    reviews: 188,
    inStock: true,
  },
  {
    id: 12,
    name: 'Premium Lucerne Bales x5',
    category: 'Feed & Nutrition',
    price: 420.00,
    image: 'https://images.unsplash.com/photo-1500595046743-cd271d694d30?w=600&q=80',
    description: 'First-cut sun-dried lucerne bales. High protein content. Ideal for dairy & horses.',
    badge: 'Best Seller',
    rating: 4.9,
    reviews: 267,
    inStock: true,
  },
];

export const categories = ['All', 'Animal Health', 'Crop & Plant', 'Equipment', 'Feed & Nutrition'];

export const testimonials = [
  {
    name: 'Kobus van der Merwe',
    farm: 'Van der Merwe Angus, Limpopo',
    text: 'Mooilande AgriVet has been my go-to supplier for three seasons now. Their animal health products are top quality and always in stock when I need them most.',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&q=80',
    rating: 5,
  },
  {
    name: 'Annelie Botha',
    farm: 'Botha Family Orchards, Mpumalanga',
    text: 'The online shop makes ordering so easy. I get my crop sprays and fertilizers delivered to the farm gate within 2 days. Uitstekende diens!',
    avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&q=80',
    rating: 5,
  },
  {
    name: 'Sipho Ndlovu',
    farm: 'Ndlovu Mixed Farming, KZN',
    text: 'I appreciate the expert advice along with every purchase. They really understand the challenges facing South African farmers today.',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80',
    rating: 5,
  },
];
