import { XP_REWARDS } from "@/lib/constants";
import { createClient } from "@/lib/supabase/server";

type ActivityType = keyof typeof XP_REWARDS | string;

function levelFromXp(xp: number) {
  return Math.max(1, Math.floor(xp / 200) + 1);
}

export async function recordActivity(
  userId: string,
  activityType: ActivityType,
  xpOverride?: number,
  metadata: Record<string, unknown> = {}
) {
  const supabase = await createClient();
  const xp =
    xpOverride ??
    (XP_REWARDS[activityType as keyof typeof XP_REWARDS] as number | undefined) ??
    0;

  await supabase.from("learning_activity").insert({
    user_id: userId,
    activity_type: activityType,
    xp_earned: xp,
    metadata,
  });

  const { data: stats } = await supabase
    .from("user_stats")
    .select("*")
    .eq("user_id", userId)
    .maybeSingle();

  const today = new Date().toISOString().slice(0, 10);
  let currentStreak = stats?.current_streak ?? 0;
  let longestStreak = stats?.longest_streak ?? 0;
  const last = stats?.last_active_date as string | null;

  if (last !== today) {
    const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
    currentStreak = last === yesterday ? currentStreak + 1 : 1;
    longestStreak = Math.max(longestStreak, currentStreak);
    if (currentStreak > 1) {
      await supabase.from("learning_activity").insert({
        user_id: userId,
        activity_type: "daily_streak",
        xp_earned: XP_REWARDS.daily_streak,
        metadata: { streak: currentStreak },
      });
    }
  }

  const newXp = (stats?.xp ?? 0) + xp + (last !== today && currentStreak > 1 ? XP_REWARDS.daily_streak : 0);
  const patch: Record<string, unknown> = {
    xp: newXp,
    level: levelFromXp(newXp),
    current_streak: currentStreak,
    longest_streak: longestStreak,
    last_active_date: today,
    updated_at: new Date().toISOString(),
  };

  if (activityType === "read_article") {
    patch.articles_read = (stats?.articles_read ?? 0) + 1;
  }
  if (activityType === "publish_blog") {
    patch.blogs_published = (stats?.blogs_published ?? 0) + 1;
  }
  if (activityType === "complete_topic") {
    patch.topics_completed = (stats?.topics_completed ?? 0) + 1;
  }
  if (activityType === "discover_video") {
    patch.videos_discovered = (stats?.videos_discovered ?? 0) + 1;
  }

  await supabase.from("user_stats").upsert({ user_id: userId, ...patch });
  await maybeUnlockAchievements(userId, {
    ...stats,
    ...patch,
    current_streak: currentStreak,
    xp: newXp,
  });

  return { xp: newXp, currentStreak };
}

async function maybeUnlockAchievements(
  userId: string,
  stats: Record<string, unknown>
) {
  const supabase = await createClient();
  const { data: achievements } = await supabase.from("achievements").select("*");
  if (!achievements?.length) return;

  const unlocks: string[] = [];
  for (const a of achievements) {
    if (a.slug === "first-article-read" && Number(stats.articles_read) >= 1) unlocks.push(a.id);
    if (a.slug === "first-blog-published" && Number(stats.blogs_published) >= 1) unlocks.push(a.id);
    if (a.slug === "streak-7" && Number(stats.current_streak) >= 7) unlocks.push(a.id);
    if (a.slug === "streak-30" && Number(stats.current_streak) >= 30) unlocks.push(a.id);
    if (a.slug === "roadmap-explorer" && Number(stats.topics_completed) >= 10) unlocks.push(a.id);
    if (a.slug === "knowledge-contributor" && Number(stats.blogs_published) >= 5) unlocks.push(a.id);
    if (a.slug === "consistent-learner" && Number(stats.xp) >= 500) unlocks.push(a.id);
  }

  if (unlocks.length) {
    await supabase.from("user_achievements").upsert(
      unlocks.map((achievement_id) => ({ user_id: userId, achievement_id })),
      { onConflict: "user_id,achievement_id", ignoreDuplicates: true }
    );
  }
}

export async function unlockAchievement(userId: string, slug: string) {
  const supabase = await createClient();
  const { data: achievement } = await supabase
    .from("achievements")
    .select("*")
    .eq("slug", slug)
    .maybeSingle();
  if (!achievement) return;
  await supabase.from("user_achievements").upsert(
    { user_id: userId, achievement_id: achievement.id },
    { onConflict: "user_id,achievement_id", ignoreDuplicates: true }
  );
  if (achievement.xp_reward) {
    await recordActivity(userId, `achievement_${slug}`, achievement.xp_reward, { slug });
  }
}
