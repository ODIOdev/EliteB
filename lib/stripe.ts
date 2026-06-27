import Stripe from "stripe";

let _stripe: Stripe | null = null;

export function getStripe() {
  if (!_stripe && process.env.STRIPE_SECRET_KEY) {
    _stripe = new Stripe(process.env.STRIPE_SECRET_KEY, {
      apiVersion: "2026-06-24.dahlia",
      typescript: true,
    });
  }
  return _stripe;
}

// Legacy export for backwards compatibility
export const stripe = {
  get checkout() {
    const s = getStripe();
    if (!s) throw new Error("Stripe not configured");
    return s.checkout;
  },
  get webhooks() {
    const s = getStripe();
    if (!s) throw new Error("Stripe not configured");
    return s.webhooks;
  },
};

export const STRIPE_PLANS = {
  basic: {
    name: "Basic Agent",
    priceId: process.env.STRIPE_BASIC_PRICE_ID,
    price: 99,
  },
  pro: {
    name: "Pro Broker",
    priceId: process.env.STRIPE_PRO_PRICE_ID,
    price: 249,
  },
  enterprise: {
    name: "Enterprise Team",
    priceId: process.env.STRIPE_ENTERPRISE_PRICE_ID,
    price: 499,
  },
} as const;
