import { INTEREST_KEYWORDS } from "@/lib/constants";
import type { NormalizedContent } from "@/lib/types";
import {
  type ContentAdapter,
  inferTopics,
  mapLimited,
  textMatchesInterests,
  withDefaults,
} from "@/lib/adapters/base";

const HN_BASE = "https://hacker-news.firebaseio.com/v0";

interface HnItem {
  id: number;
  type?: string;
  title?: string;
  url?: string;
  text?: string;
  by?: string;
  time?: number;
  score?: number;
  descendants?: number;
  dead?: boolean;
  deleted?: boolean;
}

function resolveSlugs(interestSlugs: string[]): string[] {
  return interestSlugs.length > 0 ? interestSlugs : Object.keys(INTEREST_KEYWORDS);
}

async function fetchJson<T>(path: string): Promise<T> {
  const res = await fetch(`${HN_BASE}${path}`, {
    headers: { Accept: "application/json" },
    next: { revalidate: 0 },
  });
  if (!res.ok) throw new Error(`HN ${path} HTTP ${res.status}`);
  return res.json() as Promise<T>;
}

function mapStory(item: HnItem, slugs: string[]): NormalizedContent | null {
  if (!item.title || item.dead || item.deleted || item.type !== "story") {
    return null;
  }

  const originalUrl =
    item.url || `https://news.ycombinator.com/item?id=${item.id}`;
  const haystack = `${item.title} ${item.text ?? ""}`;

  // When interests are set, keep tech-relevant stories; allow some general top hits
  if (slugs.length > 0 && !textMatchesInterests(haystack, slugs)) {
    return null;
  }

  return withDefaults({
    externalId: String(item.id),
    title: item.title,
    description: item.text
      ? item.text.replace(/<[^>]+>/g, " ").slice(0, 400)
      : undefined,
    bodyPreview: item.text
      ? item.text.replace(/<[^>]+>/g, " ").slice(0, 600)
      : undefined,
    contentType: "article",
    source: "hackernews",
    authorName: item.by,
    authorUrl: item.by
      ? `https://news.ycombinator.com/user?id=${encodeURIComponent(item.by)}`
      : undefined,
    originalUrl,
    publishedAt: item.time
      ? new Date(item.time * 1000).toISOString()
      : undefined,
    accessStatus: item.url ? "external_only" : "public",
    topics: inferTopics([item.title, item.text], slugs),
    tags: ["hackernews"],
    engagement: {
      score: item.score ?? 0,
      comments: item.descendants ?? 0,
    },
  });
}

export const hackernewsAdapter: ContentAdapter = {
  key: "hackernews",

  async fetch(interestSlugs) {
    const slugs = resolveSlugs(interestSlugs);

    try {
      const [topIds, newIds] = await Promise.all([
        fetchJson<number[]>("/topstories.json"),
        fetchJson<number[]>("/newstories.json"),
      ]);

      const idSet = new Set<number>();
      const ids: number[] = [];
      for (const id of [...topIds.slice(0, 60), ...newIds.slice(0, 40)]) {
        if (idSet.has(id)) continue;
        idSet.add(id);
        ids.push(id);
      }

      const stories = await mapLimited(ids, 20, async (id) => {
        try {
          return await fetchJson<HnItem>(`/item/${id}.json`);
        } catch {
          return null;
        }
      });

      const items: NormalizedContent[] = [];
      for (const story of stories) {
        if (!story) continue;
        const mapped = mapStory(story, slugs);
        if (mapped) items.push(mapped);
      }

      // If interest filter was too strict, fall back to unfiltered top stories
      if (items.length < 8 && slugs.length > 0) {
        for (const story of stories) {
          if (!story?.title || story.type !== "story") continue;
          if (items.some((i) => i.externalId === String(story.id))) continue;
          const mapped = mapStory(story, []);
          if (mapped) {
            mapped.topics = inferTopics([story.title, story.text], slugs);
            items.push(mapped);
          }
          if (items.length >= 30) break;
        }
      }

      return { items };
    } catch (e) {
      return {
        items: [],
        error: e instanceof Error ? e.message : "HN fetch failed",
      };
    }
  },
};
