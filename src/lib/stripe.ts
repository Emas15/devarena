import Stripe from "stripe";

export function getStripe(): Stripe | null {
  const key = process.env.STRIPE_SECRET_KEY?.trim();
  if (!key) return null;
  return new Stripe(key, {
    apiVersion: "2026-11-18.endive",
  });
}

export function isStripeConfigured(): boolean {
  return Boolean(process.env.STRIPE_SECRET_KEY?.trim());
}

/** Sandbox price in USD cents for AI Coach unlock */
export const AI_COACH_PRICE_CENTS = 499;
export const AI_COACH_PRODUCT_NAME = "DevArena AI Roadmap Coach";
