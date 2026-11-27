import { TopicChip } from "@/components/content/topic-chip";
import { FeedList } from "@/components/content/feed-actions";
import { RefreshFeedButton } from "@/components/home/refresh-feed-button";
import { EmptyState } from "@/components/ui/empty-state";
import { getUserInterestSlugs, requireUser } from "@/lib/auth/session";
import { getPersonalizedFeed } from "@/lib/feed";
import { createClient } from "@/lib/supabase/server";
import { BookOpen } from "lucide-react";

export const metadata = { title: "Blogs & Articles" };

export default async function ArticlesPage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string; sort?: string }>;
}) {
  const params = await searchParams;
  const { user } = await requireUser();
  const interests = await getUserInterestSlugs(user.id);
  const sort = (params.sort as "relevant" | "latest" | "trending") || "relevant";

  const items = await getPersonalizedFeed({
    userId: user.id,
    contentType: ["article", "newsletter", "blog"],
    topic: params.topic,
    sort,
    limit: 40,
  });

  const supabase = await createClient();
  const { data: bookmarks } = await supabase
    .from("bookmarks")
    .select("content_item_id")
    .eq("user_id", user.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Blogs & Articles</h1>
          <p className="mt-2 text-[color:var(--muted-foreground)]">
            Personalized from DEV, Hashnode, Hacker News, Medium, Substack, and DevArena writers.
          </p>
        </div>
        <RefreshFeedButton />
      </div>

      <div className="flex flex-wrap gap-2">
        <TopicChip label="All" href="/articles" active={!params.topic} />
        {interests.map((slug) => (
          <TopicChip
            key={slug}
            label={slug.replace(/-/g, " ")}
            href={`/articles?topic=${slug}`}
            active={params.topic === slug}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2 text-sm">
        {[
          { key: "relevant", label: "Most relevant" },
          { key: "latest", label: "Latest" },
          { key: "trending", label: "Trending" },
        ].map((s) => (
          <a
            key={s.key}
            href={`/articles?sort=${s.key}${params.topic ? `&topic=${params.topic}` : ""}`}
            className={
              sort === s.key
                ? "font-medium text-[color:var(--accent)]"
                : "text-[color:var(--muted-foreground)] hover:text-[color:var(--foreground)]"
            }
          >
            {s.label}
          </a>
        ))}
      </div>

      {items.length ? (
        <FeedList
          items={items}
          bookmarkedIds={(bookmarks ?? []).map((b) => b.content_item_id).filter(Boolean) as string[]}
        />
      ) : (
        <EmptyState
          icon={BookOpen}
          title="No articles matched"
          description="Refresh the feed or broaden your interests in Settings."
        />
      )}
    </div>
  );
}
