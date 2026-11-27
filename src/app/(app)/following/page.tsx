import { TopicChip } from "@/components/content/topic-chip";
import { CommunityFollowForm } from "@/components/reddit/community-follow-form";
import { EmptyState } from "@/components/ui/empty-state";
import { INTEREST_SUBREDDITS } from "@/lib/constants";
import { getUserInterestSlugs, requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { Users } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Following" };

export default async function FollowingPage() {
  const { user } = await requireUser();
  const interests = await getUserInterestSlugs(user.id);
  const supabase = await createClient();

  const [{ data: communities }, { data: authors }, { data: topics }] = await Promise.all([
    supabase.from("followed_communities").select("*").eq("user_id", user.id),
    supabase
      .from("followed_authors")
      .select("author_user_id, profiles:author_user_id(full_name, username)")
      .eq("user_id", user.id),
    supabase.from("followed_topics").select("*").eq("user_id", user.id),
  ]);

  const recommended = [
    ...new Set(interests.flatMap((slug) => INTEREST_SUBREDDITS[slug] ?? [])),
  ].slice(0, 16);

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Following</h1>
        <p className="mt-2 text-[color:var(--muted-foreground)]">
          Communities, topics, and authors you care about.
        </p>
      </div>

      <section className="card-surface space-y-4 p-5">
        <h2 className="font-semibold">Follow a Reddit community</h2>
        <CommunityFollowForm />
        <div className="flex flex-wrap gap-2">
          {recommended.map((sub) => (
            <TopicChip key={sub} label={`r/${sub}`} href={`/reddit?community=${sub}`} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Communities</h2>
        {(communities ?? []).length ? (
          <div className="flex flex-wrap gap-2">
            {(communities ?? []).map((c) => (
              <TopicChip
                key={c.community_key}
                label={c.community_name}
                href={`/reddit?community=${c.community_key.replace(/^r\//, "")}`}
              />
            ))}
          </div>
        ) : (
          <EmptyState icon={Users} title="No communities followed yet" />
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Topics</h2>
        <div className="flex flex-wrap gap-2">
          {interests.map((slug) => (
            <TopicChip key={slug} label={slug.replace(/-/g, " ")} href={`/articles?topic=${slug}`} />
          ))}
          {(topics ?? []).map((t) => (
            <TopicChip key={t.topic_slug} label={t.topic_slug} href={`/articles?topic=${t.topic_slug}`} />
          ))}
        </div>
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Authors</h2>
        {(authors ?? []).length ? (
          <div className="space-y-2">
            {(authors ?? []).map((a) => {
              const p = a.profiles as unknown as { full_name?: string; username?: string };
              return (
                <Link
                  key={a.author_user_id}
                  href={`/u/${p?.username || a.author_user_id}`}
                  className="card-surface block p-3 text-sm"
                >
                  {p?.full_name || p?.username || "Author"}
                </Link>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-[color:var(--muted-foreground)]">
            Follow authors from their public profiles.
          </p>
        )}
      </section>
    </div>
  );
}
