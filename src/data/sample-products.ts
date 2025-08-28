import { Product } from "@/types/product";

export const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Reading ghost decoration",
    name: "Reading ghost decoration",
    description: "Ghost reading print, perfect for home decoration",
    price: 12.00,
    category: "Figurines",
    availableColors: [
      { hex: "#83AFBE", imageUrl: "/items/ghost-decor/gid_blue.jpg", hoverText: "", colorName: "Blue glow in the dark" },
      { hex: "#DDD336", imageUrl: "/items/ghost-decor/gid_plain.jpg", hoverText: "" },
      { hex: "#91C079", imageUrl: "/items/ghost-decor/luminous_rainbow.jpg", hoverText: "may come out pink or green depending on the stage of the filament" },
      { hex: "#604387", imageUrl: "/items/ghost-decor/purple.jpg", hoverText: "" }
    ]
  },
  {
    id: "2",
    title: "Decorative Vase",
    name: "Decorative Vase",
    description: "Modern geometric vase design, perfect for home decoration",
    price: 18.50,
    category: "Home Decor",
    availableColors: [
      { hex: "#FFFFFF", imageUrl: "/ghost_coming_soon.png", hoverText: "White" },
      { hex: "#000000", imageUrl: "/ghost_coming_soon.png", hoverText: "Black" },
      { hex: "#8B4513", imageUrl: "/ghost_coming_soon.png", hoverText: "Brown" }
    ]
  },
  {
    id: "3",
    title: "Phone Stand",
    name: "Phone Stand",
    description: "Adjustable phone stand for desk or nightstand use",
    price: 12.99,
    category: "Accessories",
    availableColors: [
      { hex: "#FF6B6B", imageUrl: "/ghost_coming_soon.png", hoverText: "Coral" },
      { hex: "#4ECDC4", imageUrl: "/ghost_coming_soon.png", hoverText: "Teal" },
      { hex: "#45B7D1", imageUrl: "/ghost_coming_soon.png", hoverText: "Sky Blue" },
      { hex: "#96CEB4", imageUrl: "/ghost_coming_soon.png", hoverText: "Mint Green" }
    ]
  },
  {
    id: "4",
    title: "Key Organizer",
    name: "Key Organizer",
    description: "Compact key holder that keeps your keys organized and quiet",
    price: 15.75,
    category: "Accessories",
    availableColors: [
      { hex: "#2C3E50", imageUrl: "/ghost_coming_soon.png", hoverText: "Dark Blue" },
      { hex: "#E74C3C", imageUrl: "/ghost_coming_soon.png", hoverText: "Red" },
      { hex: "#27AE60", imageUrl: "/ghost_coming_soon.png", hoverText: "Green" }
    ]
  },
  {
    id: "5",
    title: "Miniature House",
    name: "Miniature House",
    description: "Detailed architectural model house for display or educational purposes",
    price: 32.00,
    category: "Models",
    availableColors: [
      { hex: "#8B4513", imageUrl: "/ghost_coming_soon.png", hoverText: "Wood Style Brown" },
      { hex: "#DC143C", imageUrl: "/ghost_coming_soon.png", hoverText: "Crimson Red" },
      { hex: "#4682B4", imageUrl: "/ghost_coming_soon.png", hoverText: "Steel Blue" },
      { hex: "#DAA520", imageUrl: "/ghost_coming_soon.png", hoverText: "Goldenrod" },
      { hex: "#708090", imageUrl: "/ghost_coming_soon.png", hoverText: "Slate Gray" }
    ]
  }
];
