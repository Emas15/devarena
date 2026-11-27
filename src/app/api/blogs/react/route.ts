import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { blogId } = await request.json();
  const { data: existing } = await supabase
    .from("blog_reactions")
    .select("*")
    .eq("blog_id", blogId)
    .eq("user_id", user.id)
    .maybeSingle();

  const { data: blog } = await supabase.from("blogs").select("like_count").eq("id", blogId).single();

  if (existing) {
    await supabase.from("blog_reactions").delete().eq("blog_id", blogId).eq("user_id", user.id);
    await supabase
      .from("blogs")
      .update({ like_count: Math.max(0, (blog?.like_count ?? 1) - 1) })
      .eq("id", blogId);
  } else {
    await supabase.from("blog_reactions").insert({ blog_id: blogId, user_id: user.id });
    await supabase
      .from("blogs")
      .update({ like_count: (blog?.like_count ?? 0) + 1 })
      .eq("id", blogId);
  }

  return NextResponse.json({ ok: true });
}
