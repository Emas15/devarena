import { getUserInterestSlugs } from "@/lib/auth/session";
import { syncContent } from "@/lib/adapters/orchestrator";
import { syncDemoContent } from "@/lib/demo/live-cache";
import { DEMO_INTERESTS, isDemoMode } from "@/lib/demo/mode";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export const maxDuration = 60;

export async function POST(request: Request) {
  try {
    const body = await request.json().catch(() => ({}));
    const source = typeof body.source === "string" ? body.source : undefined;

    if (isDemoMode()) {
      const { results, upserted } = await syncDemoContent(DEMO_INTERESTS, source);
      return NextResponse.json({
        ok: true,
        upserted,
        results,
        message: "Preview sync (in-memory).",
      });
    }

    const supabase = await createClient();
    const {
      data: { user },
    } = await supabase.auth.getUser();
    if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

    const interests = await getUserInterestSlugs(user.id);
    const results = await syncContent(interests.length ? interests : undefined, source);
    const upserted = results.reduce((sum, r) => sum + r.upserted, 0);

    return NextResponse.json({ ok: true, upserted, results });
  } catch (e) {
    return NextResponse.json(
      { error: e instanceof Error ? e.message : "Sync failed" },
      { status: 500 }
    );
  }
}
