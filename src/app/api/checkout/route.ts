import { NextResponse } from "next/server";
import Stripe from "stripe";
import { CartItem, Product } from "@/types/product";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
  apiVersion: "2025-05-28.basil",
});

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { cartItems, buyNowItem }: { cartItems?: CartItem[], buyNowItem?: Product } = body;

    let itemsToCheckout: CartItem[] = [];

    if (buyNowItem) {
      // Single item "Buy Now" checkout
      itemsToCheckout = [{ ...buyNowItem, quantity: 1 }];
    } else if (cartItems && cartItems.length > 0) {
      // Regular cart checkout
      itemsToCheckout = cartItems;
    } else {
      return NextResponse.json(
        { error: "No items to checkout" },
        { status: 400 }
      );
    }

    const lineItems: Stripe.Checkout.SessionCreateParams.LineItem[] = itemsToCheckout.map((item) => {
      // Get the first available color's image as the default
      const imageUrl = item.availableColors && item.availableColors.length > 0 ? item.availableColors[0].imageUrl : '';
      
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: item.title,
            description: item.description,
            images: imageUrl ? [imageUrl] : [],
            metadata: {
              category: item.category,
            },
          },
          unit_amount: Math.round(item.price * 100), // Convert to cents
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "payment",
      line_items: lineItems,
      success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/checkout/success?session_id={CHECKOUT_SESSION_ID}${buyNowItem ? '&type=buynow' : ''}`,
      cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}${buyNowItem ? '/' : '/cart'}`,
      metadata: {
        orderType: buyNowItem ? 'buy-now' : 'cart-checkout',
        itemCount: itemsToCheckout.length.toString(),
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error('Stripe checkout error:', error);
    return NextResponse.json(
      { error: "Failed to create checkout session" },
      { status: 500 }
    );
  }
}
