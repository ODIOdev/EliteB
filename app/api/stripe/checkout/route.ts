import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { priceId, customerEmail } = body;

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({
        success: true,
        mock: true,
        message: "Configure STRIPE_SECRET_KEY to enable payments",
      });
    }

    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "subscription",
      payment_method_types: ["card"],
      line_items: [{ price: priceId, quantity: 1 }],
      customer_email: customerEmail,
      success_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard?payment=success`,
      cancel_url: `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/settings?payment=cancelled`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Stripe checkout error:", error);
    return NextResponse.json({ error: "Failed to create checkout session" }, { status: 500 });
  }
}
