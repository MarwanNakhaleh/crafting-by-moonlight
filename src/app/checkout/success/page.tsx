"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { Header } from "@/components/header";
import { Button } from "@/components/ui/button";
import { CheckCircle, Package, Home, Loader2 } from "lucide-react";
import Link from "next/link";
import { useCart } from "@/contexts/cart-context";

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const sessionId = searchParams.get('session_id');
  const checkoutType = searchParams.get('type');
  const { clearCart } = useCart();

  useEffect(() => {
    if (checkoutType !== 'buynow') {  
      clearCart();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const isBuyNow = checkoutType === 'buynow';

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <CheckCircle className="h-16 w-16 text-green-600 mx-auto mb-4" />
        
        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Payment Successful!
        </h1>
        
        <p className="text-lg text-gray-600 mb-6">
          Thank you for your purchase! Your payment has been processed successfully.
        </p>
        
        <div className="bg-gray-50 rounded-lg p-6 mb-8">
          <div className="flex items-center justify-center mb-4">
            <Package className="h-6 w-6 text-blue-600 mr-2" />
            <span className="font-medium text-gray-900">Order Details</span>  
          </div>
          
          <p className="text-sm text-gray-600 mb-2">
            Your {isBuyNow ? 'item is' : 'order is'} being processed and you&apos;ll receive a confirmation email shortly.
          </p>
          
          {sessionId && (
            <p className="text-xs text-gray-500">
              Order ID: {sessionId}
            </p>
          )}
        </div>
        
        <div className="space-y-4">
          <Button asChild className="w-full" size="lg">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          
          {!isBuyNow && (
            <p className="text-sm text-blue-600">
              Your cart has been cleared
            </p>
          )}
          
          <p className="text-sm text-gray-500">
            Need help? Contact our support team at support@craftbymoonlight.com
          </p>
        </div>
      </div>
    </div>
  );
}

function LoadingFallback() {
  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="bg-white rounded-lg shadow-sm p-8 text-center">
        <Loader2 className="h-16 w-16 text-blue-600 mx-auto mb-4 animate-spin" />
        <h1 className="text-2xl font-semibold text-gray-900 mb-2">
          Processing your order...
        </h1>
        <p className="text-gray-600">
          Please wait while we confirm your payment.
        </p>
      </div>
    </div>
  );
}

export default function CheckoutSuccess() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="pt-24 pb-12">
        <Suspense fallback={<LoadingFallback />}>
          <CheckoutSuccessContent />
        </Suspense>
      </main>
    </div>
  );
} 