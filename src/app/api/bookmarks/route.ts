import { createClient } from "@/lib/supabase/server";
import { recordActivity } from "@/lib/gamification";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  contentItemId: z.string().uuid().optional(),
  blogId: z.string().uuid().optional(),
  action: z.enum(["add", "remove"]).default("add"),
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

  const { contentItemId, blogId, action } = parsed.data;
  if (!contentItemId && !blogId) {
    return NextResponse.json({ error: "contentItemId or blogId required" }, { status: 400 });
  }

  if (action === "remove") {
    let q = supabase.from("bookmarks").delete().eq("user_id", user.id);
    if (contentItemId) q = q.eq("content_item_id", contentItemId);
    if (blogId) q = q.eq("blog_id", blogId);
    await q;
    return NextResponse.json({ ok: true });
  }

  await supabase.from("bookmarks").upsert(
    {
      user_id: user.id,
      content_item_id: contentItemId ?? null,
      blog_id: blogId ?? null,
    },
    { onConflict: contentItemId ? "user_id,content_item_id" : "user_id,blog_id" }
  );
  await recordActivity(user.id, "bookmark");
  return NextResponse.json({ ok: true });
}
