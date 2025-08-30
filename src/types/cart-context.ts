import { CartItem, Product } from "./product";

export interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, chosenColor?: string) => void;
  updateQuantity: (id: string, quantity: number, chosenColor?: string) => void;
  removeFromCart: (id: string, chosenColor?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isInCart: (id: string, chosenColor?: string) => boolean;
}