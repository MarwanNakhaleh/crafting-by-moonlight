"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/cart-context";
import { ShoppingCart, Check, Zap, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

type ProductCardProps = Product;

export function ProductCard({ id, title, description, imageUrl, price, category, ...product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleAddToCart = async () => {
    setIsAdding(true);
    const productToAdd: Product = { id, title, description, imageUrl, price, category, ...product };
    addToCart(productToAdd);
    
    setJustAdded(true);
    setIsAdding(false);
    
    setTimeout(() => {
      setJustAdded(false);
    }, 2000);
  };

  const handleBuyNow = async () => {
    setIsBuyingNow(true);
    
    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          buyNowItem: { id, title, description, imageUrl, price, category, ...product }
        }),
      });

      const data = await response.json();

      if (response.ok && data.url) {
        // Redirect to Stripe checkout
        window.location.href = data.url;
      } else {
        console.error('Buy now checkout error:', data.error);
        alert('Failed to start checkout. Please try again.');
      }
    } catch (error) {
      console.error('Network error:', error);
      alert('Network error. Please check your connection and try again.');
    }
  };

  const inCart = isMounted && isInCart(id);

  return (
    <div className="rounded-lg border border-gray-200 bg-white shadow hover:shadow-md transition">
      <Image
        src={imageUrl}
        alt={title}
        width={400}
        height={300}
        className="w-full h-60 object-cover rounded-t-lg"
      />
      <div className="p-4 flex flex-col gap-2">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-medium text-gray-900">{title}</h3>
          <span className="text-sm bg-gray-100 px-2 py-1 rounded text-gray-600">{category}</span>
        </div>
        <p className="text-sm text-gray-600">{description}</p>
        <div className="flex flex-col gap-2 mt-auto pt-2">
          <div className="flex justify-between items-center">
            <span className="text-xl font-semibold text-gray-900">${price.toFixed(2)}</span>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-2">
            <Button 
              onClick={handleAddToCart}
              disabled={isAdding || isBuyingNow}
              variant="outline"
              className={`flex-1 ${justAdded ? 'bg-green-50 border-green-200 text-green-700' : ''} transition-colors`}
            >
              {isAdding ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Adding...
                </>
              ) : justAdded ? (
                <>
                  <Check className="w-4 h-4 mr-1" />
                  Added!
                </>
              ) : (isMounted && inCart) ? (
                <>
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add More
                </>
              ) : (
                <>
                  <ShoppingCart className="w-4 h-4 mr-1" />
                  Add to Cart
                </>
              )}
            </Button>
            
            <Button 
              onClick={handleBuyNow}
              disabled={isAdding || isBuyingNow}
              className="flex-1"
            >
              {isBuyingNow ? (
                <>
                  <Loader2 className="w-4 h-4 mr-1 animate-spin" />
                  Taking you to checkout...
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 mr-1" />
                  Buy Now
                </>
              )}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
