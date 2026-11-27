import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  contentItemId: z.string().uuid().optional(),
  feedbackType: z.enum(["not_interested", "show_more", "show_fewer", "hide_source"]),
  sourceKey: z.string().optional(),
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

  const { contentItemId, feedbackType, sourceKey } = parsed.data;
  await supabase.from("content_feedback").insert({
    user_id: user.id,
    content_item_id: contentItemId ?? null,
    feedback_type: feedbackType,
    source_key: sourceKey ?? null,
  });

  return NextResponse.json({ ok: true });
}
