export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  category: string;
  emoji: string;
}

export const categories = [
  "Classic Shakes",
  "Premium Indian Shakes",
  "Chocolate & Fusion Shakes",
  "Exotic Shakes",
] as const;

export const menuItems: MenuItem[] = [
  { id: "c1", name: "Mango Shake", description: "Fresh Alphonso mango blended creamy", price: 129, category: "Classic Shakes", emoji: "🥭" },
  { id: "c2", name: "Banana Shake", description: "Ripe banana with smooth vanilla", price: 99, category: "Classic Shakes", emoji: "🍌" },
  { id: "c3", name: "Strawberry Shake", description: "Lush strawberry with cream swirl", price: 139, category: "Classic Shakes", emoji: "🍓" },
  { id: "c4", name: "Chocolate Shake", description: "Rich dark cocoa indulgence", price: 149, category: "Classic Shakes", emoji: "🍫" },
  { id: "c5", name: "Vanilla Shake", description: "Classic Madagascan vanilla bean", price: 109, category: "Classic Shakes", emoji: "🍦" },

  { id: "p1", name: "Dry Fruit Shake", description: "Loaded with premium dry fruits", price: 199, category: "Premium Indian Shakes", emoji: "🥜" },
  { id: "p2", name: "Kesar Pista Shake", description: "Saffron-infused pistachio bliss", price: 219, category: "Premium Indian Shakes", emoji: "🌰" },
  { id: "p3", name: "Badam Shake", description: "Pure almond richness with cardamom", price: 189, category: "Premium Indian Shakes", emoji: "🫘" },
  { id: "p4", name: "Anjeer Shake", description: "Sweet fig shake with honey drizzle", price: 209, category: "Premium Indian Shakes", emoji: "🍯" },

  { id: "f1", name: "Oreo Shake", description: "Crushed Oreo cookies in cream", price: 169, category: "Chocolate & Fusion Shakes", emoji: "🍪" },
  { id: "f2", name: "KitKat Shake", description: "Crunchy KitKat wafer layers", price: 179, category: "Chocolate & Fusion Shakes", emoji: "🍫" },
  { id: "f3", name: "Brownie Shake", description: "Warm brownie chunks in chocolate", price: 189, category: "Chocolate & Fusion Shakes", emoji: "🧁" },
  { id: "f4", name: "Peanut Butter Shake", description: "Creamy PB with chocolate swirl", price: 179, category: "Chocolate & Fusion Shakes", emoji: "🥜" },

  { id: "e1", name: "Blueberry Shake", description: "Antioxidant-rich blueberry burst", price: 199, category: "Exotic Shakes", emoji: "🫐" },
  { id: "e2", name: "Black Currant Shake", description: "Tart and sweet currant melody", price: 189, category: "Exotic Shakes", emoji: "🍇" },
  { id: "e3", name: "Avocado Shake", description: "Creamy avocado superfood blend", price: 219, category: "Exotic Shakes", emoji: "🥑" },
];
