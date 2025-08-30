"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tooltip } from "@/components/ui/tooltip";
import { Minus, Plus, Trash2, Info } from "lucide-react";
import { Product } from "@/types/product";

interface CartProductCardProps extends Product {
  onUpdateQuantity: (id: string, quantity: number, chosenColor?: string) => void;
  onRemove: (id: string, chosenColor?: string) => void;
  chosenColor: string; // Track which color variant is in cart
}

export function CartProductCard({
  id,
  title,
  price,
  quantity = 0,
  availableColors,
  category,
  onUpdateQuantity,
  onRemove,
  chosenColor,
}: CartProductCardProps) {
  
  // Get the chosen color object
  const selectedColorObj = availableColors?.find(color => color.hex === chosenColor) || availableColors?.[0];
  
  const imageUrl = selectedColorObj?.imageUrl || null;
  const hoverText = selectedColorObj?.hoverText;
  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      onRemove(id, chosenColor);
    } else {
      onUpdateQuantity(id, newQuantity, chosenColor);
    }
  };

  return (
    <div className="flex items-center space-x-4 p-4 border rounded-lg mb-4">
      <div className="relative w-16 h-16 flex-shrink-0">
        {imageUrl ? (
          <Image
            src={imageUrl}
            alt={title}
            fill
            className="object-contain rounded-md bg-gray-50"
          />
        ) : (
          <div className="w-full h-full bg-gray-200 rounded-md flex items-center justify-center">
            <span className="text-gray-400 text-xs">No Image</span>
          </div>
        )}
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900 truncate">
            {title}
          </h3>
          {hoverText && (
            <Tooltip content={hoverText}>
              <Info className="w-8 h-8 text-gray-400 hover:text-gray-600 transition-colors" />
            </Tooltip>
          )}
        </div>
        <div className="flex items-center gap-2 mt-1">
          <Badge variant="secondary">
            {category}
          </Badge>
          {selectedColorObj && (
            <div className="flex items-center gap-1">
              <div 
                className="w-4 h-4 rounded-full border border-gray-300"
                style={{ backgroundColor: selectedColorObj.hex }}
              />
              <span className="text-sm text-gray-600">
                {selectedColorObj.hoverText || 'Color'}
              </span>
            </div>
          )}
        </div>
        <p className="text-lg font-semibold text-gray-900 mt-2">
          ${price.toFixed(2)}
        </p>
      </div>

      <div className="flex items-center space-x-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(quantity - 1)}
          className="h-8 w-8 p-0"
        >
          <Minus className="h-4 w-4" />
        </Button>
        
        <span className="w-8 text-center font-medium">{quantity}</span>
        
        <Button
          variant="outline"
          size="sm"
          onClick={() => handleQuantityChange(quantity + 1)}
          className="h-8 w-8 p-0"
        >
          <Plus className="h-4 w-4" />
        </Button>
      </div>

      <div className="text-right">
        <p className="font-semibold text-lg">
          ${(price * quantity).toFixed(2)}
        </p>
        <Button
          variant="ghost"
          size="sm"
          onClick={() => onRemove(id, chosenColor)}
          className="text-red-600 hover:text-red-800 mt-1"
        >
          <Trash2 className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
} 