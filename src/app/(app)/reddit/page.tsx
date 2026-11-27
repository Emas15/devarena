import { FeedList } from "@/components/content/feed-actions";
import { TopicChip } from "@/components/content/topic-chip";
import { RefreshFeedButton } from "@/components/home/refresh-feed-button";
import { EmptyState } from "@/components/ui/empty-state";
import { INTEREST_SUBREDDITS } from "@/lib/constants";
import { getUserInterestSlugs, requireUser } from "@/lib/auth/session";
import { getPersonalizedFeed } from "@/lib/feed";
import { createClient } from "@/lib/supabase/server";
import { MessageSquare } from "lucide-react";

export const metadata = { title: "Reddit" };

export default async function RedditPage({
  searchParams,
}: {
  searchParams: Promise<{ sort?: string; community?: string }>;
}) {
  const params = await searchParams;
  const { user } = await requireUser();
  const interests = await getUserInterestSlugs(user.id);
  const sort =
    (params.sort as "relevant" | "latest" | "trending" | "upvoted" | "discussed") || "relevant";

  let items = await getPersonalizedFeed({
    userId: user.id,
    contentType: "reddit",
    sort,
    limit: 40,
  });

  if (params.community) {
    items = items.filter(
      (i) =>
        String(i.engagement?.subreddit ?? "").toLowerCase() === params.community?.toLowerCase() ||
        i.tags?.some((t) => t.toLowerCase().includes(params.community!.toLowerCase()))
    );
  }

  const recommended = [
    ...new Set(interests.flatMap((slug) => INTEREST_SUBREDDITS[slug] ?? []).slice(0, 12)),
  ];

  const supabase = await createClient();
  const { data: followed } = await supabase
    .from("followed_communities")
    .select("*")
    .eq("user_id", user.id);

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">Reddit discussions</h1>
          <p className="mt-2 text-[color:var(--muted-foreground)]">
            Communities matched to your interests. Engagement stats come from the Reddit API.
          </p>
        </div>
        <RefreshFeedButton />
      </div>

      <section className="card-surface p-5">
        <h2 className="font-semibold">Recommended communities</h2>
        <div className="mt-3 flex flex-wrap gap-2">
          {recommended.map((sub) => (
            <TopicChip
              key={sub}
              label={`r/${sub}`}
              href={`/reddit?community=${sub}`}
              active={params.community === sub}
            />
          ))}
        </div>
        {(followed ?? []).length ? (
          <p className="mt-3 text-xs text-[color:var(--muted-foreground)]">
            Following: {(followed ?? []).map((f) => f.community_name).join(", ")}
          </p>
        ) : null}
      </section>

      <div className="flex flex-wrap gap-3 text-sm">
        {[
          ["relevant", "Most relevant"],
          ["latest", "Latest"],
          ["trending", "Trending"],
          ["upvoted", "Most upvoted"],
          ["discussed", "Most discussed"],
        ].map(([key, label]) => (
          <a
            key={key}
            href={`/reddit?sort=${key}${params.community ? `&community=${params.community}` : ""}`}
            className={
              sort === key
                ? "font-medium text-[color:var(--accent)]"
                : "text-[color:var(--muted-foreground)]"
            }
          >
            {label}
          </a>
        ))}
      </div>

      {items.length ? (
        <FeedList items={items} />
      ) : (
        <EmptyState
          icon={MessageSquare}
          title="No Reddit discussions yet"
          description="Configure Reddit API credentials in .env.local, then refresh the feed."
        />
      )}
    </div>
  );
}
