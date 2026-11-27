import { getProfile, getSessionUser, getUserInterestSlugs } from "@/lib/auth/session";
import { buildAiCoachPlan } from "@/lib/roadmaps/ai-coach";
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const { user } = await getSessionUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const profile = await getProfile(user.id);

  if (!profile?.ai_coach_unlocked) {
    return NextResponse.json(
      { error: "AI Coach is locked. Unlock with Stripe (sandbox) checkout." },
      { status: 402 },
    );
  }

  const body = await request.json().catch(() => ({}));
  const slug = typeof body.slug === "string" ? body.slug : null;
  if (!slug) {
    return NextResponse.json({ error: "Missing roadmap slug" }, { status: 400 });
  }

  const supabase = await createClient();
  const { data: roadmap } = await supabase
    .from("roadmaps")
    .select("id, title, slug")
    .eq("slug", slug)
    .maybeSingle();
  if (!roadmap) {
    return NextResponse.json({ error: "Roadmap not found" }, { status: 404 });
  }

  const { data: stages } = await supabase
    .from("roadmap_stages")
    .select("id, title, description, stage_order")
    .eq("roadmap_id", roadmap.id)
    .order("stage_order");

  const stageIds = (stages ?? []).map((s) => s.id);
  const { data: topics } = stageIds.length
    ? await supabase
        .from("roadmap_topics")
        .select("id, stage_id, title, description, why_it_matters, topic_order")
        .in("stage_id", stageIds)
        .order("topic_order")
    : { data: [] as Array<Record<string, unknown>> };

  const topicIds = (topics ?? []).map((t) => t.id as string);
  const { data: progress } = topicIds.length
    ? await supabase
        .from("user_topic_progress")
        .select("topic_id, status")
        .eq("user_id", user.id)
        .in("topic_id", topicIds)
    : { data: [] as Array<{ topic_id: string; status: string }> };

  const completedIds = new Set(
    (progress ?? [])
      .filter((p) => p.status === "completed" || p.status === "skipped")
      .map((p) => p.topic_id),
  );

  const completedTitles = (topics ?? [])
    .filter((t) => completedIds.has(t.id as string))
    .map((t) => t.title as string);

  const stagePayload = (stages ?? []).map((s) => ({
    title: s.title as string,
    description: (s.description as string) || null,
    topics: (topics ?? [])
      .filter((t) => t.stage_id === s.id)
      .map((t) => ({
        title: t.title as string,
        description: (t.description as string) || null,
        why_it_matters: (t.why_it_matters as string) || null,
      })),
  }));

  const interests = await getUserInterestSlugs(user.id);
  const plan = buildAiCoachPlan({
    roadmapTitle: roadmap.title,
    experience: profile.experience_level,
    interests,
    stages: stagePayload,
    completedTopicTitles: completedTitles,
  });

  return NextResponse.json({ plan });
}
