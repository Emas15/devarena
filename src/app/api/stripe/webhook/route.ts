import { getStripe } from "@/lib/stripe";
import { createAdminClient } from "@/lib/supabase/admin";
import { NextResponse } from "next/server";
import type Stripe from "stripe";

export const runtime = "nodejs";

async function unlockAiCoach(userId: string, customerId?: string | null) {
  const admin = createAdminClient();
  const patch: Record<string, unknown> = {
    ai_coach_unlocked: true,
    updated_at: new Date().toISOString(),
  };
  if (customerId) patch.stripe_customer_id = customerId;
  await admin.from("profiles").update(patch).eq("id", userId);
}

export async function POST(request: Request) {
  const stripe = getStripe();
  const secret = process.env.STRIPE_WEBHOOK_SECRET?.trim();
  if (!stripe || !secret) {
    return NextResponse.json({ error: "Stripe webhook not configured" }, { status: 503 });
  }

  const signature = request.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  const rawBody = await request.text();
  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(rawBody, signature, secret);
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Invalid signature" },
      { status: 400 },
    );
  }

  if (
    event.type === "checkout.session.completed" ||
    event.type === "checkout.session.async_payment_succeeded"
  ) {
    const session = event.data.object as Stripe.Checkout.Session;
    if (session.payment_status === "unpaid") {
      return NextResponse.json({ received: true, skipped: "unpaid" });
    }
    const userId =
      session.metadata?.supabase_user_id || session.client_reference_id;
    if (userId && session.metadata?.product === "ai_coach") {
      await unlockAiCoach(
        userId,
        typeof session.customer === "string" ? session.customer : null,
      );
    }
  }

  return NextResponse.json({ received: true });
}
