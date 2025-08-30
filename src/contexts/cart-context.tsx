"use client";

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { Product, CartItem } from '@/types/product';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, chosenColor?: string) => void;
  updateQuantity: (id: string, quantity: number, chosenColor?: string) => void;
  removeFromCart: (id: string, chosenColor?: string) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartItemCount: () => number;
  isInCart: (id: string, chosenColor?: string) => boolean;
  isLoaded: boolean;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

const CART_STORAGE_KEY = 'craft-by-moonlight-cart';

export function CartProvider({ children }: { children: ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load cart items from localStorage on component mount
  useEffect(() => {
    const loadCart = () => {
      try {
        const savedCart = localStorage.getItem(CART_STORAGE_KEY);
        if (savedCart) {
          const parsedCart = JSON.parse(savedCart);
          if (Array.isArray(parsedCart)) {
            setCartItems(parsedCart);
          }
        }
      } catch (error) {
        console.error('Error loading cart from localStorage:', error);
      } finally {
        setIsLoaded(true);
      }
    };

    // Use setTimeout to ensure this runs after hydration
    const timeoutId = setTimeout(loadCart, 0);
    return () => clearTimeout(timeoutId);
  }, []);

  // Save cart items to localStorage whenever cartItems changes
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cartItems));
      } catch (error) {
        console.error('Error saving cart to localStorage:', error);
      }
    }
  }, [cartItems, isLoaded]);

  const addToCart = useCallback((product: Product, chosenColor?: string) => {
    setCartItems(prevItems => {
      // Use the chosen color or default to the first available color
      const colorToUse = chosenColor || (product.availableColors && product.availableColors.length > 0 ? product.availableColors[0].hex : '');
      
      // Check if item with same ID and color already exists
      const existingItem = prevItems.find(item => item.id === product.id && item.chosenColor === colorToUse);
      
      if (existingItem) {
        return prevItems.map(item =>
          item.id === product.id && item.chosenColor === colorToUse
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [...prevItems, { ...product, quantity: 1, chosenColor: colorToUse }];
      }
    });
  }, []);

  const updateQuantity = useCallback((id: string, quantity: number, chosenColor?: string) => {
    if (quantity <= 0) {
      if (chosenColor) {
        setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.chosenColor === chosenColor)));
      } else {
        setCartItems(prevItems => prevItems.filter(item => item.id !== id));
      }
      return;
    }

    setCartItems(prevItems =>
      prevItems.map(item =>
        chosenColor 
          ? (item.id === id && item.chosenColor === chosenColor ? { ...item, quantity } : item)
          : (item.id === id ? { ...item, quantity } : item)
      )
    );
  }, []);

  const removeFromCart = useCallback((id: string, chosenColor?: string) => {
    if (chosenColor) {
      setCartItems(prevItems => prevItems.filter(item => !(item.id === id && item.chosenColor === chosenColor)));
    } else {
      setCartItems(prevItems => prevItems.filter(item => item.id !== id));
    }
  }, []);

  const clearCart = useCallback(() => {
    console.log('Clearing cart');
    setCartItems([]);
  }, []);

  const getCartTotal = useCallback(() => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  }, [cartItems]);

  const getCartItemCount = useCallback(() => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  }, [cartItems]);

  const isInCart = useCallback((id: string, chosenColor?: string) => {
    if (chosenColor) {
      return cartItems.some(item => item.id === id && item.chosenColor === chosenColor);
    }
    return cartItems.some(item => item.id === id);
  }, [cartItems]);

  const value: CartContextType = {
    cartItems,
    addToCart,
    updateQuantity,
    removeFromCart,
    clearCart,
    getCartTotal,
    getCartItemCount,
    isInCart,
    isLoaded,
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
} 