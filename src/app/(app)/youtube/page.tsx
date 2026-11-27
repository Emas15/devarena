import { FeedList } from "@/components/content/feed-actions";
import { TopicChip } from "@/components/content/topic-chip";
import { RefreshFeedButton } from "@/components/home/refresh-feed-button";
import { EmptyState } from "@/components/ui/empty-state";
import { getUserInterestSlugs, requireUser } from "@/lib/auth/session";
import { getPersonalizedFeed } from "@/lib/feed";
import { recordActivity } from "@/lib/gamification";
import { Video } from "lucide-react";

export const metadata = { title: "YouTube" };

export default async function YouTubePage({
  searchParams,
}: {
  searchParams: Promise<{ topic?: string }>;
}) {
  const params = await searchParams;
  const { user } = await requireUser();
  const interests = await getUserInterestSlugs(user.id);

  const items = await getPersonalizedFeed({
    userId: user.id,
    contentType: "youtube",
    topic: params.topic,
    sort: "latest",
    limit: 24,
  });

  if (items.length) {
    await recordActivity(user.id, "discover_video", 2, { count: items.length });
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">YouTube</h1>
          <p className="mt-2 text-[color:var(--muted-foreground)]">
            Educational videos matched to your interests. Clicking opens YouTube.
          </p>
        </div>
        <RefreshFeedButton />
      </div>

      <div className="flex flex-wrap gap-2">
        <TopicChip label="All" href="/youtube" active={!params.topic} />
        {interests.map((slug) => (
          <TopicChip
            key={slug}
            label={slug.replace(/-/g, " ")}
            href={`/youtube?topic=${slug}`}
            active={params.topic === slug}
          />
        ))}
      </div>

      {items.length ? (
        <FeedList items={items} />
      ) : (
        <EmptyState
          icon={Video}
          title="No videos yet"
          description="Add YOUTUBE_API_KEY to .env.local and refresh the feed."
        />
      )}
    </div>
  );
}
