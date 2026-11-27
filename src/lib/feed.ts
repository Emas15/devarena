import {
  getUserInterestSlugs,
  getUserLearningPreferenceSlugs,
} from "@/lib/auth/session";
import { rankContent } from "@/lib/recommendations/rank";
import { createClient } from "@/lib/supabase/server";
import type { ContentItem, ContentType } from "@/lib/types";

export async function getPersonalizedFeed(options: {
  userId: string;
  contentType?: ContentType | ContentType[];
  topic?: string;
  limit?: number;
  sort?: "relevant" | "latest" | "trending" | "upvoted" | "discussed";
}) {
  const supabase = await createClient();
  const limit = options.limit ?? 40;
  const interests = await getUserInterestSlugs(options.userId);
  const prefs = await getUserLearningPreferenceSlugs(options.userId);

  let query = supabase
    .from("content_items")
    .select("*")
    .eq("is_active", true)
    .order("published_at", { ascending: false, nullsFirst: false })
    .limit(120);

  if (options.contentType) {
    const types = Array.isArray(options.contentType)
      ? options.contentType
      : [options.contentType];
    query = query.in("content_type", types);
  }

  if (options.topic) {
    query = query.contains("topics", [options.topic]);
  }

  const { data, error } = await query;
  if (error) throw error;

  const items = (data ?? []) as ContentItem[];

  const [{ data: history }, { data: feedback }, { data: sources }] = await Promise.all([
    supabase
      .from("reading_history")
      .select("content_item_id")
      .eq("user_id", options.userId)
      .order("last_read_at", { ascending: false })
      .limit(50),
    supabase
      .from("content_feedback")
      .select("feedback_type, source_key, content_item_id")
      .eq("user_id", options.userId),
    supabase.from("content_sources").select("key, quality_score"),
  ]);

  const recentIds = new Set((history ?? []).map((h) => h.content_item_id).filter(Boolean));
  const hiddenSources = new Set(
    (feedback ?? [])
      .filter((f) => f.feedback_type === "hide_source" && f.source_key)
      .map((f) => f.source_key as string)
  );
  const notInterested = new Set(
    (feedback ?? [])
      .filter((f) => f.feedback_type === "not_interested")
      .map((f) => f.content_item_id)
      .filter(Boolean)
  );
  const showMoreIds = new Set(
    (feedback ?? [])
      .filter((f) => f.feedback_type === "show_more")
      .map((f) => f.content_item_id)
      .filter(Boolean)
  );
  const showFewerIds = new Set(
    (feedback ?? [])
      .filter((f) => f.feedback_type === "show_fewer")
      .map((f) => f.content_item_id)
      .filter(Boolean)
  );

  const quality = Object.fromEntries(
    (sources ?? []).map((s) => [s.key, Number(s.quality_score) || 0.7])
  );

  let filtered = items.filter(
    (item) => !hiddenSources.has(item.source) && !notInterested.has(item.id)
  );

  if (options.sort === "latest") {
    return filtered.slice(0, limit);
  }

  if (options.sort === "upvoted") {
    return [...filtered]
      .sort(
        (a, b) =>
          Number(b.engagement?.score ?? b.engagement?.ups ?? 0) -
          Number(a.engagement?.score ?? a.engagement?.ups ?? 0)
      )
      .slice(0, limit);
  }

  if (options.sort === "discussed") {
    return [...filtered]
      .sort(
        (a, b) =>
          Number(b.engagement?.num_comments ?? b.engagement?.comments ?? 0) -
          Number(a.engagement?.num_comments ?? a.engagement?.comments ?? 0)
      )
      .slice(0, limit);
  }

  if (options.sort === "trending") {
    return [...filtered]
      .sort((a, b) => {
        const scoreA =
          Number(a.engagement?.score ?? a.engagement?.ups ?? 0) +
          Number(a.engagement?.num_comments ?? 0) * 2;
        const scoreB =
          Number(b.engagement?.score ?? b.engagement?.ups ?? 0) +
          Number(b.engagement?.num_comments ?? 0) * 2;
        return scoreB - scoreA;
      })
      .slice(0, limit);
  }

  return rankContent(filtered, {
    interestSlugs: interests,
    learningPreferenceSlugs: prefs,
    recentIds,
    sourceQuality: quality,
    showMoreIds,
    showFewerIds,
  }).slice(0, limit);
}

export async function searchAll(query: string, userId?: string) {
  const supabase = await createClient();
  const q = query.trim();
  if (!q) return { content: [], blogs: [], roadmaps: [] };

  const [contentRes, blogsRes, roadmapsRes] = await Promise.all([
    supabase
      .from("content_items")
      .select("*")
      .eq("is_active", true)
      .or(`title.ilike.%${q}%,description.ilike.%${q}%,author_name.ilike.%${q}%`)
      .order("published_at", { ascending: false })
      .limit(30),
    supabase
      .from("blogs")
      .select("*, profiles(id, full_name, username, avatar_url)")
      .eq("status", "published")
      .or(`title.ilike.%${q}%,excerpt.ilike.%${q}%`)
      .limit(20),
    supabase
      .from("roadmaps")
      .select("*")
      .eq("is_published", true)
      .or(`title.ilike.%${q}%,role_name.ilike.%${q}%,summary.ilike.%${q}%`)
      .limit(20),
  ]);

  let content = (contentRes.data ?? []) as ContentItem[];
  if (userId && content.length) {
    try {
      content = await getPersonalizedFeed({
        userId,
        limit: 30,
      }).then((ranked) => {
        const ids = new Set(content.map((c) => c.id));
        return ranked.filter((c) => ids.has(c.id));
      });
    } catch {
      // fall through with unranked
    }
  }

  return {
    content,
    blogs: blogsRes.data ?? [],
    roadmaps: roadmapsRes.data ?? [],
  };
}
