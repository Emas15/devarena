"use client";

import { Button } from "@/components/ui/button";
import type { AiCoachPlan } from "@/lib/roadmaps/ai-coach";
import { Sparkles, Lock } from "lucide-react";
import { useState } from "react";

export function AiCoachPanel({
  roadmapSlug,
  unlocked,
  stripeReady,
}: {
  roadmapSlug: string;
  unlocked: boolean;
  stripeReady: boolean;
}) {
  const [loading, setLoading] = useState(false);
  const [plan, setPlan] = useState<AiCoachPlan | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function unlock() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ roadmapSlug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Checkout failed");
      if (data.alreadyUnlocked) {
        window.location.reload();
        return;
      }
      if (data.url) {
        window.location.href = data.url;
        return;
      }
      throw new Error("No checkout URL returned");
    } catch (e) {
      setError(e instanceof Error ? e.message : "Checkout failed");
      setLoading(false);
    }
  }

  async function generate() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/roadmaps/ai-coach", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ slug: roadmapSlug }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Failed to generate plan");
      setPlan(data.plan as AiCoachPlan);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to generate plan");
    } finally {
      setLoading(false);
    }
  }

  return (
    <section className="card-surface space-y-4 p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <h2 className="flex items-center gap-2 text-lg font-semibold">
            <Sparkles className="h-5 w-5 text-[color:var(--accent)]" />
            AI Roadmap Coach
          </h2>
          <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
            Personalized weekly focus from your experience level, interests, and
            progress. Sandbox unlock via Stripe.
          </p>
        </div>
        {!unlocked ? (
          <span className="inline-flex items-center gap-1 rounded-full bg-[color:var(--muted)] px-2.5 py-1 text-xs">
            <Lock className="h-3 w-3" /> Locked
          </span>
        ) : (
          <span className="rounded-full bg-[color:var(--accent-soft)] px-2.5 py-1 text-xs text-[color:var(--accent)]">
            Unlocked
          </span>
        )}
      </div>

      {error ? (
        <p className="text-sm text-[color:var(--danger)]">{error}</p>
      ) : null}

      {!unlocked ? (
        <div className="space-y-3">
          <p className="text-sm text-[color:var(--muted-foreground)]">
            One-time sandbox payment ($4.99 test) unlocks AI coaching on all
            roadmaps for this account.
          </p>
          <Button disabled={loading || !stripeReady} onClick={unlock}>
            {loading
              ? "Redirecting…"
              : stripeReady
                ? "Unlock with Stripe (test)"
                : "Add STRIPE_SECRET_KEY to enable"}
          </Button>
          {!stripeReady ? (
            <p className="text-xs text-[color:var(--muted-foreground)]">
              Set <code>STRIPE_SECRET_KEY</code> (sk_test_…) and webhook secret
              in <code>.env.local</code>, then restart the server.
            </p>
          ) : null}
        </div>
      ) : (
        <div className="space-y-4">
          <Button disabled={loading} onClick={generate}>
            {loading ? "Building plan…" : plan ? "Regenerate plan" : "Generate my plan"}
          </Button>

          {plan ? (
            <div className="space-y-4 text-sm">
              <p className="font-medium">{plan.headline}</p>
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-[color:var(--muted-foreground)]">
                  Focus this week
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  {plan.focusThisWeek.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-[color:var(--muted-foreground)]">
                  Skip / skim
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  {plan.skipOrSkim.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <div>
                <p className="mb-1 text-xs uppercase tracking-wide text-[color:var(--muted-foreground)]">
                  Study routine
                </p>
                <ul className="list-disc space-y-1 pl-5">
                  {plan.studyRoutine.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </div>
              <p>
                <span className="font-medium">Next milestone: </span>
                {plan.nextMilestone}
              </p>
            </div>
          ) : null}
        </div>
      )}
    </section>
  );
}
