"use client";

import { Button } from "@/components/ui/button";
import { ShoppingCart, LogIn, UserPlus } from "lucide-react";
import Link from "next/link";

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-white/90 backdrop-blur border-b border-gray-200 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <div className="text-xl font-semibold text-gray-900">Crafting by Moonlight</div>
          <div className="text-md text-gray-500">Crafting magic under the moon</div>
        </Link>
        <nav className="flex items-center gap-2">
          <Button variant="ghost" asChild>
            <Link href="/login" className="flex items-center gap-1">
              <LogIn className="w-4 h-4" />
              Login
            </Link>
          </Button>
          <Button variant="ghost" asChild>
            <Link href="/signup" className="flex items-center gap-1">
              <UserPlus className="w-4 h-4" />
              Sign Up
            </Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/cart" className="flex items-center gap-1">
              <ShoppingCart className="w-4 h-4" />
              Cart
            </Link>
          </Button>
        </nav>
      </div>
    </header>
  );
}
