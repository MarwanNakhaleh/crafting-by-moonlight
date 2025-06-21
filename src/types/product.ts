export interface Product {
  id: string;
  title: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  image: string;
  category: string;
  quantity?: number; 
}

export interface CartItem extends Product {
  quantity: number;
} 