import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata = { title: "Learning Progress" };

export default async function ProgressPage() {
  const { user } = await requireUser();
  const supabase = await createClient();

  const [{ data: stats }, { data: follows }, { data: activity }, { data: achievements }] =
    await Promise.all([
      supabase.from("user_stats").select("*").eq("user_id", user.id).maybeSingle(),
      supabase
        .from("user_roadmap_follows")
        .select("*, roadmaps(slug, title, role_name)")
        .eq("user_id", user.id),
      supabase
        .from("learning_activity")
        .select("*")
        .eq("user_id", user.id)
        .order("created_at", { ascending: false })
        .limit(20),
      supabase
        .from("user_achievements")
        .select("unlocked_at, achievements(name, description)")
        .eq("user_id", user.id),
    ]);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Learning Progress</h1>
        <p className="mt-2 text-[color:var(--muted-foreground)]">
          XP, streaks, roadmap progress, and recent learning activity.
        </p>
      </div>

      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {[
          ["XP", stats?.xp ?? 0],
          ["Level", stats?.level ?? 1],
          ["Current streak", `${stats?.current_streak ?? 0} days`],
          ["Longest streak", `${stats?.longest_streak ?? 0} days`],
          ["Articles read", stats?.articles_read ?? 0],
          ["Videos discovered", stats?.videos_discovered ?? 0],
          ["Blogs published", stats?.blogs_published ?? 0],
          ["Topics completed", stats?.topics_completed ?? 0],
        ].map(([label, value]) => (
          <div key={String(label)} className="card-surface p-4">
            <p className="text-xs uppercase tracking-wide text-[color:var(--muted-foreground)]">
              {label}
            </p>
            <p className="mt-1 text-2xl font-semibold">{value}</p>
          </div>
        ))}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Followed roadmaps</h2>
        {(follows ?? []).map((f) => {
          const r = f.roadmaps as unknown as { slug: string; title: string; role_name: string };
          return (
            <Link
              key={f.roadmap_id}
              href={`/roadmaps/${r.slug}`}
              className="card-surface block p-4 hover:border-[color:var(--accent)]/40"
            >
              <p className="font-medium">{r.title}</p>
              <p className="text-sm text-[color:var(--muted-foreground)]">{r.role_name}</p>
            </Link>
          );
        })}
        {!follows?.length ? (
          <p className="text-sm text-[color:var(--muted-foreground)]">
            Follow a roadmap to track progress here.
          </p>
        ) : null}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Achievements</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {(achievements ?? []).map((row, idx) => {
            const a = row.achievements as unknown as { name: string; description: string };
            return (
              <div key={`${a.name}-${idx}`} className="card-surface p-4">
                <p className="font-medium">{a.name}</p>
                <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">{a.description}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Recent activity</h2>
        <div className="space-y-2">
          {(activity ?? []).map((a) => (
            <div key={a.id} className="flex items-center justify-between rounded-lg border border-[color:var(--border)] px-3 py-2 text-sm">
              <span>{a.activity_type.replace(/_/g, " ")}</span>
              <span className="text-[color:var(--muted-foreground)]">+{a.xp_earned} XP</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
