import { getProfile, getUserInterestSlugs, requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata = { title: "Profile" };

export default async function ProfilePage() {
  const { user } = await requireUser();
  const profile = await getProfile(user.id);
  const interests = await getUserInterestSlugs(user.id);
  const supabase = await createClient();

  const [{ data: blogs }, { data: stats }, { data: achievements }] = await Promise.all([
    supabase
      .from("blogs")
      .select("*")
      .eq("author_id", user.id)
      .eq("status", "published")
      .order("published_at", { ascending: false }),
    supabase.from("user_stats").select("*").eq("user_id", user.id).maybeSingle(),
    supabase
      .from("user_achievements")
      .select("unlocked_at, achievements(name, description, slug)")
      .eq("user_id", user.id),
  ]);

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <section className="card-surface p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold tracking-tight">
              {profile?.full_name || profile?.username || "Your profile"}
            </h1>
            <p className="mt-2 text-[color:var(--muted-foreground)]">{profile?.bio || "No bio yet."}</p>
            <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
              Joined {profile?.created_at ? new Date(profile.created_at).toLocaleDateString() : "—"}
              {profile?.experience_level ? ` · ${profile.experience_level.replace(/_/g, " ")}` : ""}
            </p>
          </div>
          <Link href="/settings" className="text-sm text-[color:var(--accent)]">
            Edit
          </Link>
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {interests.map((i) => (
            <span key={i} className="rounded-full bg-[color:var(--muted)] px-3 py-1 text-xs">
              {i.replace(/-/g, " ")}
            </span>
          ))}
        </div>
      </section>

      {profile?.show_gamification !== false && stats.data ? (
        <section className="grid gap-3 sm:grid-cols-4">
          {[
            ["XP", stats.data.xp],
            ["Level", stats.data.level],
            ["Streak", `${stats.data.current_streak}d`],
            ["Published", stats.data.blogs_published],
          ].map(([label, value]) => (
            <div key={String(label)} className="card-surface p-4">
              <p className="text-xs text-[color:var(--muted-foreground)]">{label}</p>
              <p className="mt-1 text-xl font-semibold">{value}</p>
            </div>
          ))}
        </section>
      ) : null}

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Published blogs</h2>
        {(blogs ?? []).map((blog) => (
          <Link
            key={blog.id}
            href={`/blogs/view/${blog.slug}`}
            className="card-surface block p-4 hover:border-[color:var(--accent)]/40"
          >
            <p className="font-medium">{blog.title}</p>
            <p className="mt-1 text-sm text-[color:var(--muted-foreground)] line-clamp-2">
              {blog.excerpt}
            </p>
          </Link>
        ))}
        {!blogs?.length ? (
          <p className="text-sm text-[color:var(--muted-foreground)]">No published posts yet.</p>
        ) : null}
      </section>

      {profile?.show_gamification !== false ? (
        <section className="space-y-3">
          <h2 className="text-lg font-semibold">Achievements</h2>
          <div className="grid gap-3 sm:grid-cols-2">
            {(achievements ?? []).map((row) => {
              const a = row.achievements as unknown as {
                name: string;
                description: string;
              } | null;
              return (
                <div key={a?.name} className="card-surface p-4">
                  <p className="font-medium">{a?.name}</p>
                  <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                    {a?.description}
                  </p>
                </div>
              );
            })}
            {!achievements?.length ? (
              <p className="text-sm text-[color:var(--muted-foreground)]">
                Complete learning activities to unlock achievements.
              </p>
            ) : null}
          </div>
        </section>
      ) : null}
    </div>
  );
}
