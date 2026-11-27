import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { authorId, follow } = await request.json();
  if (follow) {
    await supabase.from("followed_authors").upsert({
      user_id: user.id,
      author_user_id: authorId,
    });
  } else {
    await supabase
      .from("followed_authors")
      .delete()
      .eq("user_id", user.id)
      .eq("author_user_id", authorId);
  }
  return NextResponse.json({ ok: true });
}
