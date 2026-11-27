import { unlockAchievement } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { roadmapId, follow } = await request.json();
  if (follow) {
    await supabase.from("user_roadmap_follows").upsert({
      user_id: user.id,
      roadmap_id: roadmapId,
      last_active_at: new Date().toISOString(),
    });
    await unlockAchievement(user.id, "roadmap-beginner");
  } else {
    await supabase
      .from("user_roadmap_follows")
      .delete()
      .eq("user_id", user.id)
      .eq("roadmap_id", roadmapId);
  }
  return NextResponse.json({ ok: true });
}
