export interface AvailableColor {
  hex: string;
  imageUrl: string;
  hoverText?: string;
}

export interface Product {
  id: string;
  title: string;
  name: string;
  description: string;
  price: number;
  category: string;
  quantity?: number;
  availableColors: AvailableColor[];
}

export interface CartItem extends Product {
  quantity: number;
  chosenColor: string;
} 