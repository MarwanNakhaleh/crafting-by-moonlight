"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Product } from "@/types/product";
import { useCart } from "@/contexts/cart-context";
import { ShoppingCart, Check, Zap, Loader2 } from "lucide-react";
import { useState, useEffect } from "react";

type ProductCardProps = Product;

export function ProductCard({ id, title, description, price, category, availableColors, ...product }: ProductCardProps) {
  const { addToCart, isInCart } = useCart();
  const [isAdding, setIsAdding] = useState(false);
  const [justAdded, setJustAdded] = useState(false);
  const [isBuyingNow, setIsBuyingNow] = useState(false);
  const [isMounted, setIsMounted] = useState(false);
  const [selectedColor, setSelectedColor] = useState<string | null>(null);
  
  // Get the first available color's image as the default
  const defaultImageUrl = availableColors && availableColors.length > 0 ? availableColors[0].imageUrl : '';
  const [currentImageUrl, setCurrentImageUrl] = useState(defaultImageUrl);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const handleColorSelect = (hexColor: string) => {
    const selectedColorObj = availableColors?.find(color => color.hex === hexColor);
    if (selectedColorObj) {
      setSelectedColor(hexColor);
      setCurrentImageUrl(selectedColorObj.imageUrl);
    }
  };

  // Get the selected color info for display
  const selectedColorObj = selectedColor ? availableColors?.find(color => color.hex === selectedColor) : null;
  const selectedColorName = selectedColorObj?.colorName;
  const selectedColorHoverText = selectedColorObj?.hoverText;

  const handleAddToCart = async () => {
    setIsAdding(true);
    const productToAdd: Product = { id, title, description, price, category, availableColors, ...product };
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
          buyNowItem: { id, title, description, price, category, availableColors, ...product }
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
    <div className="rounded-lg border border-gray-200 bg-white shadow hover:shadow-lg transition-all duration-300">
      <div className="relative">
        <Image
          src={currentImageUrl}
          alt={title}
          width={500}
          height={400}
          className="w-full h-80 object-contain rounded-t-lg bg-gray-50"
        />
      </div>
      <div className="p-6 flex flex-col gap-3">
        <div className="flex justify-between items-start">
          <h3 className="text-xl font-semibold text-gray-900 leading-tight">
            {title}
            {selectedColorName && <span className="text-gray-600"> ({selectedColorName})</span>}
          </h3>
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600 font-medium">{category}</span>
        </div>
        <p className="text-base text-gray-600 leading-relaxed">
          {description}
          {selectedColorHoverText && <span> ({selectedColorHoverText})</span>}
        </p>
        
        {/* Color Selection */}
        {availableColors && availableColors.length > 1 && (
          <div className="flex flex-col gap-3 py-2">
            <span className="text-sm font-medium text-gray-700">Available Colors:</span>
            <div className="flex gap-3 flex-wrap">
              {availableColors.map((color) => (
                <button
                  key={color.hex}
                  onClick={() => handleColorSelect(color.hex)}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 hover:scale-110 hover:shadow-lg ${
                    selectedColor === color.hex 
                      ? 'border-gray-800 shadow-lg ring-2 ring-gray-300' 
                      : 'border-gray-300 hover:border-gray-500'
                  }`}
                  style={{ backgroundColor: color.hex }}
                />
              ))}
            </div>
          </div>
        )}
        
        <div className="flex flex-col gap-3 mt-auto pt-3 border-t border-gray-100">
          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
          </div>
          
          {/* Buttons */}
          <div className="flex gap-3">
            <Button 
              onClick={handleAddToCart}
              disabled={isAdding || isBuyingNow}
              variant="outline"
              className={`flex-1 h-11 ${justAdded ? 'bg-green-50 border-green-200 text-green-700' : ''} transition-colors font-medium`}
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
              className="flex-1 h-11 font-medium"
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
