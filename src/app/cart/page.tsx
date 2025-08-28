import { Header } from "@/components/header";
import { ShoppingCart } from "@/components/shopping-cart";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shopping Cart",
  description: "Review your selected items and proceed to checkout.",
};

export default function CartPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <ShoppingCart />
      </main>
    </div>
  );
} 