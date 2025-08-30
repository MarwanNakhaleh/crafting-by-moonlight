import { Product } from "@/types/product";

export const sampleProducts: Product[] = [
  {
    id: "1",
    title: "Glow-in-the-dark reading ghost decoration",
    name: "Glow-in-the-dark reading ghost decoration",
    description: "Ghost reading print, perfect for home decoration. Glows in the dark. Comes with a Command strip for easy hanging.",
    price: 12.00,
    category: "Decorations",
    availableColors: [
      { hex: "#83AFBE", imageUrl: "/items/ghost-decor/gid_blue.jpg", hoverText: "" },
      { hex: "#DDD336", imageUrl: "/items/ghost-decor/gid_plain.jpg", hoverText: "" },
      { hex: "#91C079", imageUrl: "/items/ghost-decor/luminous_rainbow.jpg", hoverText: "may come out pink or green depending on the stage of the filament" }
    ]
  },
  {
    id: "2",
    title: "Reading ghost decoration",
    name: "Reading ghost decoration",
    description: "Ghost reading print, perfect for home decoration. Solid color outline. Comes with a Command strip for easy hanging.",
    price: 10.00,
    category: "Decorations",
    availableColors: [
      { hex: "#604387", imageUrl: "/items/ghost-decor/purple.jpg", hoverText: "" }
    ]
  },
  {
    id: "3",
    title: "Reading ghost bookmark",
    name: "The bookmark with your friendly bookworm ghost",
    description: "Ghost reading bookmark. Solid color outline. Comes with a Command strip for easy hanging.",
    price: 5.00,
    category: "Decorations",
    availableColors: [
      { hex: "#83AFBE", imageUrl: "/items/reading-ghost-bookmark/gid_blue.png", hoverText: "Coral" },
      { hex: "#91C079", imageUrl: "/items/reading-ghost-bookmark/luminous_rainbow.png", hoverText: "Teal" },
    ]
  },
  {
    id: "4",
    title: "Reading ghost bookmark",
    name: "The bookmark with your friendly bookworm ghost",
    description: "Ghost reading bookmark. Solid color outline. Comes with a Command strip for easy hanging.",
    price: 10.00,
    category: "Decorations",
    availableColors: [
      { hex: "#FF6B6B", imageUrl: "/ghost_coming_soon.png", hoverText: "Coral" },
      { hex: "#4ECDC4", imageUrl: "/ghost_coming_soon.png", hoverText: "Teal" },
      { hex: "#45B7D1", imageUrl: "/ghost_coming_soon.png", hoverText: "Sky Blue" },
      { hex: "#96CEB4", imageUrl: "/ghost_coming_soon.png", hoverText: "Mint Green" }
    ]
  },
  {
    id: "5",
    title: "Coming soon",
    name: "Coming soon",
    description: "Coming soon",
    price: 0.00,
    category: "Coming soon",
    availableColors: []
  }
];
