import { ContentCard } from "@/components/content/content-card";
import { TopicChip } from "@/components/content/topic-chip";
import { RefreshFeedButton } from "@/components/home/refresh-feed-button";
import { EmptyState } from "@/components/ui/empty-state";
import {
  getProfile,
  getUserInterestSlugs,
  requireUser,
} from "@/lib/auth/session";
import { getPersonalizedFeed } from "@/lib/feed";
import { createClient } from "@/lib/supabase/server";
import { BookOpen, Inbox, Map, Video } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Home" };

export default async function HomePage() {
  const { user, supabase } = await requireUser();
  const profile = await getProfile(user.id);
  const interests = await getUserInterestSlugs(user.id);

  const [articles, reddit, videos, roadmaps, stats, sources] = await Promise.all([
    getPersonalizedFeed({ userId: user.id, contentType: "article", limit: 8 }),
    getPersonalizedFeed({ userId: user.id, contentType: "reddit", limit: 5 }),
    getPersonalizedFeed({ userId: user.id, contentType: "youtube", limit: 4 }),
    supabase.from("roadmaps").select("*").eq("is_published", true).limit(4),
    supabase.from("user_stats").select("*").eq("user_id", user.id).maybeSingle(),
    supabase.from("content_sources").select("key, last_synced_at, last_sync_status, last_sync_error"),
  ]);

  const firstName = profile?.full_name?.split(" ")[0] || "there";
  const failedSources = (sources.data ?? []).filter((s) => s.last_sync_status === "error");

  return (
    <div className="space-y-10">
      <section className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Good to see you, {firstName}</h1>
          <p className="mt-2 text-[color:var(--muted-foreground)]">
            Your feed is tuned to {interests.slice(0, 3).join(", ") || "your interests"}
            {interests.length > 3 ? ` and ${interests.length - 3} more` : ""}.
          </p>
        </div>
        <RefreshFeedButton />
      </section>

      {profile?.show_gamification !== false && stats.data ? (
        <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
          {[
            { label: "XP", value: stats.data.xp },
            { label: "Streak", value: `${stats.data.current_streak}d` },
            { label: "Articles read", value: stats.data.articles_read },
            { label: "Topics done", value: stats.data.topics_completed },
          ].map((stat) => (
            <div key={stat.label} className="card-surface px-4 py-3">
              <p className="text-xs uppercase tracking-wide text-[color:var(--muted-foreground)]">
                {stat.label}
              </p>
              <p className="mt-1 text-2xl font-semibold">{stat.value}</p>
            </div>
          ))}
        </section>
      ) : null}

      <section>
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-lg font-semibold">Your topics</h2>
          <Link href="/settings" className="text-sm text-[color:var(--accent)]">
            Edit interests
          </Link>
        </div>
        <div className="flex flex-wrap gap-2">
          {interests.map((slug) => (
            <TopicChip key={slug} label={slug.replace(/-/g, " ")} href={`/articles?topic=${slug}`} />
          ))}
        </div>
      </section>

      {failedSources.length ? (
        <div className="rounded-xl border border-[color:var(--warning)]/40 bg-amber-500/5 px-4 py-3 text-sm">
          Some sources could not be updated:{" "}
          {failedSources.map((s) => s.key).join(", ")}. Showing the latest available content.
        </div>
      ) : null}

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Blogs & articles for you</h2>
          <Link href="/articles" className="text-sm text-[color:var(--accent)]">
            View all
          </Link>
        </div>
        {articles.length ? (
          <div className="space-y-3">
            {articles.map((item) => (
              <ContentCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <EmptyState
            icon={BookOpen}
            title="No articles yet"
            description="Refresh the feed to pull the latest posts from DEV, Hashnode, Hacker News, and configured RSS sources."
          />
        )}
      </section>

      <div className="grid gap-8 lg:grid-cols-2">
        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Reddit discussions</h2>
            <Link href="/reddit" className="text-sm text-[color:var(--accent)]">
              View all
            </Link>
          </div>
          {reddit.length ? (
            <div className="space-y-3">
              {reddit.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Inbox}
              title="No Reddit posts yet"
              description="Refresh the feed to pull public Reddit posts matched to your interests."
            />
          )}
        </section>

        <section className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">YouTube picks</h2>
            <Link href="/youtube" className="text-sm text-[color:var(--accent)]">
              View all
            </Link>
          </div>
          {videos.length ? (
            <div className="space-y-3">
              {videos.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
            </div>
          ) : (
            <EmptyState
              icon={Video}
              title="No videos yet"
              description="Refresh the feed to pull interest-matched YouTube channel videos."
            />
          )}
        </section>
      </div>

      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Career roadmaps</h2>
          <Link href="/roadmaps" className="text-sm text-[color:var(--accent)]">
            Browse all
          </Link>
        </div>
        <div className="grid gap-3 sm:grid-cols-2">
          {(roadmaps.data ?? []).map((roadmap) => (
            <a
              key={roadmap.id}
              href={`/roadmaps/${encodeURIComponent(String(roadmap.slug))}`}
              className="card-surface block p-5 transition-colors hover:border-[color:var(--accent)]/40"
            >
              <div className="flex items-start gap-3">
                <Map className="mt-0.5 h-4 w-4 text-[color:var(--accent)]" />
                <div>
                  <h3 className="font-semibold">{roadmap.title}</h3>
                  <p className="mt-1 text-sm text-[color:var(--muted-foreground)] line-clamp-2">
                    {roadmap.summary}
                  </p>
                </div>
              </div>
            </a>
          ))}
          {!roadmaps.data?.length ? (
            <EmptyState
              icon={Map}
              title="Roadmaps not seeded"
              description="Run POST /api/admin/seed-roadmaps with your service role configured."
              className="sm:col-span-2"
            />
          ) : null}
        </div>
      </section>
    </div>
  );
}
