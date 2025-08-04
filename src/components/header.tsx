"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";
import { useEffect, useState } from "react";

function CartBadge() {
  const { getCartItemCount } = useCart();
  const itemCount = getCartItemCount();

  if (itemCount <= 0) return null;

  return (
    <span className="absolute -top-2 -right-2 bg-blue-600 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
      {itemCount}
    </span>
  );
}

export function Header() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <header className="fixed top-0 w-full bg-[#613003] z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xl font-semibold text-white">Crafting by Moonlight</div>
          <div className="text-md text-orange-200">Crafting magic under the moon</div>
        </Link>
        <nav className="flex items-center gap-2">
          {/* <Button variant="ghost" asChild>
            <Link href="/shop/login" className="flex items-center gap-1 text-white">
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/shop/signup" className="flex items-center gap-1 text-white">
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Link>
          </Button> */}
          <Button variant="outline" asChild>
            <Link href="/shop/cart" className="flex items-center gap-1 relative">
              <ShoppingCart className="w-4 h-4" />
              Cart
              {isMounted && <CartBadge />}
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
