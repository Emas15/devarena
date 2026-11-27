import { recordActivity } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  blogId: z.string().uuid(),
  body: z.string().min(1).max(5000),
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

  const { blogId, body } = parsed.data;
  const { error } = await supabase.from("blog_comments").insert({
    blog_id: blogId,
    user_id: user.id,
    body,
  });
  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  const { data: blog } = await supabase.from("blogs").select("comment_count").eq("id", blogId).single();
  await supabase
    .from("blogs")
    .update({ comment_count: (blog?.comment_count ?? 0) + 1 })
    .eq("id", blogId);

  await recordActivity(user.id, "comment");
  return NextResponse.json({ ok: true });
}
