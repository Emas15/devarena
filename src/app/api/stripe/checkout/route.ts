import { getProfile, getSessionUser } from "@/lib/auth/session";
import {
  AI_COACH_PRICE_CENTS,
  AI_COACH_PRODUCT_NAME,
  getStripe,
  isStripeConfigured,
} from "@/lib/stripe";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  if (!isStripeConfigured()) {
    return NextResponse.json(
      {
        error:
          "Stripe is not configured. Add STRIPE_SECRET_KEY (test mode) to .env.local.",
      },
      { status: 503 },
    );
  }

  const { user } = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const stripe = getStripe()!;
  const profile = await getProfile(user.id);

  if (profile?.ai_coach_unlocked) {
    return NextResponse.json({ alreadyUnlocked: true });
  }

  const body = await request.json().catch(() => ({}));
  const roadmapSlug =
    typeof body.roadmapSlug === "string" ? body.roadmapSlug : "roadmaps";

  const origin = new URL(request.url).origin;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || origin;

  let customerId = profile?.stripe_customer_id || undefined;
  if (!customerId) {
    const customer = await stripe.customers.create({
      email: user.email || undefined,
      metadata: { supabase_user_id: user.id },
    });
    customerId = customer.id;
    const supabase = await createClient();
    await supabase
      .from("profiles")
      .update({ stripe_customer_id: customerId })
      .eq("id", user.id);
  }

  const session = await stripe.checkout.sessions.create({
    mode: "payment",
    customer: customerId,
    client_reference_id: user.id,
    line_items: [
      {
        quantity: 1,
        price_data: {
          currency: "usd",
          unit_amount: AI_COACH_PRICE_CENTS,
          product_data: {
            name: AI_COACH_PRODUCT_NAME,
            description:
              "Unlock personalized AI study plans on every career roadmap (sandbox).",
          },
        },
      },
    ],
    success_url: `${appUrl}/roadmaps/${encodeURIComponent(roadmapSlug)}?ai=unlocked`,
    cancel_url: `${appUrl}/roadmaps/${encodeURIComponent(roadmapSlug)}?ai=cancel`,
    metadata: {
      supabase_user_id: user.id,
      product: "ai_coach",
    },
  });

  return NextResponse.json({ url: session.url });
}
