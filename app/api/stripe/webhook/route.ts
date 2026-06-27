import { NextRequest, NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const sig = request.headers.get("stripe-signature");

  if (!process.env.STRIPE_WEBHOOK_SECRET || !sig) {
    return NextResponse.json({ received: true, mock: true });
  }

  try {
    const stripe = getStripe();
    if (!stripe) {
      return NextResponse.json({ error: "Stripe not configured" }, { status: 500 });
    }

    const event = stripe.webhooks.constructEvent(body, sig, process.env.STRIPE_WEBHOOK_SECRET);

    switch (event.type) {
      case "checkout.session.completed":
        // TODO: Activate subscription in Supabase
        console.log("Checkout completed:", event.data.object);
        break;
      case "customer.subscription.updated":
      case "customer.subscription.deleted":
        // TODO: Update subscription status
        console.log("Subscription event:", event.type);
        break;
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error("Webhook error:", error);
    return NextResponse.json({ error: "Webhook handler failed" }, { status: 400 });
  }
}
