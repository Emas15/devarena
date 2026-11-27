import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  interests: z.array(z.string()).min(1),
  careers: z.array(z.string()).min(1),
  experienceLevel: z.enum([
    "complete_beginner",
    "beginner",
    "intermediate",
    "advanced",
    "professional",
  ]),
  learningPreferences: z.array(z.string()).min(1),
  fullName: z.string().min(2),
  bio: z.string().optional(),
});

export async function POST(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const body = await request.json();
  const parsed = schema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const { interests, careers, experienceLevel, learningPreferences, fullName, bio } =
    parsed.data;

  await supabase
    .from("profiles")
    .update({
      full_name: fullName,
      bio: bio || null,
      experience_level: experienceLevel,
      onboarding_completed: true,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  const [{ data: interestRows }, { data: careerRows }, { data: prefRows }] = await Promise.all([
    supabase.from("interests").select("id, slug").in("slug", interests),
    supabase.from("career_roles").select("id, slug").in("slug", careers),
    supabase.from("learning_preferences").select("id, slug").in("slug", learningPreferences),
  ]);

  await supabase.from("user_interests").delete().eq("user_id", user.id);
  await supabase.from("user_career_preferences").delete().eq("user_id", user.id);
  await supabase.from("user_learning_preferences").delete().eq("user_id", user.id);

  if (interestRows?.length) {
    await supabase.from("user_interests").insert(
      interestRows.map((row) => ({ user_id: user.id, interest_id: row.id }))
    );
  }
  if (careerRows?.length) {
    await supabase.from("user_career_preferences").insert(
      careerRows.map((row) => ({ user_id: user.id, career_role_id: row.id }))
    );
  }
  if (prefRows?.length) {
    await supabase.from("user_learning_preferences").insert(
      prefRows.map((row) => ({ user_id: user.id, learning_preference_id: row.id }))
    );
  }

  // Trigger an interest-aware sync in the background (best effort)
  try {
    const origin = new URL(request.url).origin;
    const secret = process.env.CRON_SECRET;
    void fetch(`${origin}/api/cron/sync`, {
      method: "POST",
      headers: secret ? { Authorization: `Bearer ${secret}` } : {},
    });
  } catch {
    // Sync can be triggered manually later
  }

  const res = NextResponse.json({ ok: true });
  res.cookies.set("da_ob", "1", {
    path: "/",
    sameSite: "lax",
    httpOnly: true,
    maxAge: 60 * 60 * 24 * 365,
  });
  return res;
}
