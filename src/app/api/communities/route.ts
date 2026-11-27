import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { communityKey, communityName, unfollow } = await request.json();
  if (unfollow) {
    await supabase
      .from("followed_communities")
      .delete()
      .eq("user_id", user.id)
      .eq("community_key", communityKey);
  } else {
    await supabase.from("followed_communities").upsert({
      user_id: user.id,
      community_key: communityKey,
      community_name: communityName || `r/${communityKey}`,
      platform: "reddit",
    });
  }
  return NextResponse.json({ ok: true });
}
