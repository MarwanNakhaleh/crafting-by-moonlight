"use client";

import { useState } from "react";
import { CartSummary } from "@/components/cart-summary";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart as ShoppingCartIcon } from "lucide-react";
import Link from "next/link";
import { Product } from "@/types/product";
import { CartProductCard } from "./cart-product-card";


export function ShoppingCart() {
  const [cartItems, setCartItems] = useState<Product[]>([]);

  const updateQuantity = (id: string, quantity: number) => {
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
  };

  const handleCheckout = () => {
    // In a real app, this would navigate to checkout or integrate with payment processing
    alert("Proceeding to checkout... (This would integrate with a payment system)");
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * (item.quantity || 0)), 0);
  const tax = subtotal * 0.08; // 8% tax
  const shipping = subtotal > 50 ? 0 : 5.99; // Free shipping over $50
  const total = subtotal + tax + shipping;
  const itemCount = cartItems.reduce((sum, item) => sum + (item.quantity || 0), 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/" className="inline-flex items-center text-blue-600 hover:text-blue-800 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Continue Shopping
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        <p className="text-gray-600 mt-2">
          {itemCount} {itemCount === 1 ? 'item' : 'items'} in your cart
        </p>
      </div>

      {cartItems.length === 0 ? (
        /* Empty Cart State */
        <div className="text-center py-16">
          <ShoppingCartIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h2 className="text-2xl font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-gray-600 mb-6">Add some awesome 3D printed items to get started!</p>
          <Button asChild>
            <Link href="/">
              Start Shopping
            </Link>
          </Button>
        </div>
      ) : (
        /* Cart with Items */
        <div className="lg:grid lg:grid-cols-12 lg:gap-12">
          {/* Cart Items */}
          <div className="lg:col-span-8">
            <div className="bg-white rounded-lg shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-6">Cart Items</h2>
              {cartItems.map((item) => (
                <CartProductCard
                  key={item.id}
                  {...item}
                  onUpdateQuantity={updateQuantity}
                  onRemove={removeItem}
                />
              ))}
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-4 mt-8 lg:mt-0">
            <CartSummary
              subtotal={subtotal}
              tax={tax}
              shipping={shipping}
              total={total}
              itemCount={itemCount}
              onCheckout={handleCheckout}
            />
          </div>
        </div>
      )}
    </div>
  );
} 