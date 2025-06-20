export interface Product {
  id: string;
  title: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  image: string;
  category: string;
  quantity?: number; // Optional for cart items
}

// Utility type for cart items (products with required quantity)
export interface CartItem extends Product {
  quantity: number;
} 