import { recordActivity } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  contentItemId: z.string().uuid(),
  progressPercent: z.number().min(0).max(100).default(100),
  completed: z.boolean().default(true),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const { contentItemId, progressPercent, completed } = parsed.data;

  const { data: existing } = await supabase
    .from("reading_history")
    .select("id, completed")
    .eq("user_id", user.id)
    .eq("content_item_id", contentItemId)
    .maybeSingle();

  await supabase.from("reading_history").upsert(
    {
      user_id: user.id,
      content_item_id: contentItemId,
      progress_percent: progressPercent,
      completed,
      last_read_at: new Date().toISOString(),
    },
    { onConflict: "user_id,content_item_id" }
  );

  if (completed && !existing?.completed) {
    await recordActivity(user.id, "read_article", undefined, { contentItemId });
  }

  return NextResponse.json({ ok: true });
}
