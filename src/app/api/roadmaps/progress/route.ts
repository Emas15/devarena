import { recordActivity } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  topicId: z.string().uuid(),
  status: z.enum(["not_started", "learning", "completed", "skipped"]),
  notes: z.string().optional(),
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

  const { topicId, status, notes } = parsed.data;
  const { data: existing } = await supabase
    .from("user_topic_progress")
    .select("status")
    .eq("user_id", user.id)
    .eq("topic_id", topicId)
    .maybeSingle();

  await supabase.from("user_topic_progress").upsert({
    user_id: user.id,
    topic_id: topicId,
    status,
    notes: notes ?? null,
    completed_at: status === "completed" ? new Date().toISOString() : null,
    updated_at: new Date().toISOString(),
  });

  if (status === "completed" && existing?.status !== "completed") {
    await recordActivity(user.id, "complete_topic", undefined, { topicId });
  }

  return NextResponse.json({ ok: true });
}
