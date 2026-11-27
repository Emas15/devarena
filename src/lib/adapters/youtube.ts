import Parser from "rss-parser";
import {
  INTEREST_KEYWORDS,
  INTEREST_YOUTUBE_CHANNELS,
  INTEREST_YOUTUBE_QUERIES,
} from "@/lib/constants";
import type { NormalizedContent } from "@/lib/types";
import {
  type ContentAdapter,
  inferTopics,
  withDefaults,
} from "@/lib/adapters/base";

interface YouTubeSearchItem {
  id?: { videoId?: string };
  snippet?: {
    publishedAt?: string;
    channelId?: string;
    title?: string;
    description?: string;
    channelTitle?: string;
    thumbnails?: {
      high?: { url?: string };
      medium?: { url?: string };
      default?: { url?: string };
    };
  };
}

interface YouTubeSearchResponse {
  items?: YouTubeSearchItem[];
  error?: { message?: string };
}

type YtRssItem = {
  id?: string;
  title?: string;
  link?: string;
  pubDate?: string;
  author?: string;
  contentSnippet?: string;
  media?: { thumbnail?: { $?: { url?: string } }[] };
};

const parser = new Parser({
  customFields: {
    item: [["media:group", "media", { keepArray: false }]],
  },
});

function resolveSlugs(interestSlugs: string[]): string[] {
  return interestSlugs.length > 0
    ? interestSlugs
    : Object.keys(INTEREST_YOUTUBE_QUERIES);
}

function collectQueries(slugs: string[]): string[] {
  const queries: string[] = [];
  const seen = new Set<string>();

  for (const slug of slugs) {
    for (const q of INTEREST_YOUTUBE_QUERIES[slug] ?? []) {
      const key = q.toLowerCase().trim();
      if (!key || seen.has(key)) continue;
      seen.add(key);
      queries.push(q);
    }
  }

  if (queries.length === 0) {
    for (const slug of slugs) {
      const q = `${slug.replace(/-/g, " ")} programming tutorial`;
      if (!seen.has(q)) {
        seen.add(q);
        queries.push(q);
      }
    }
  }

  return queries.slice(0, 12);
}

function collectChannelIds(slugs: string[]): string[] {
  const set = new Set<string>();
  for (const slug of slugs) {
    for (const id of INTEREST_YOUTUBE_CHANNELS[slug] ?? []) {
      set.add(id);
    }
  }
  // Always include freeCodeCamp as a broad tech fallback
  set.add("UC8butISFwT-Wl7EV0hUK0BQ");
  set.add("UCsBjURrPoezykLs9EqgamOA"); // Fireship
  return [...set].slice(0, 10);
}

function mapVideo(
  item: YouTubeSearchItem,
  slugs: string[],
  query: string,
): NormalizedContent | null {
  const videoId = item.id?.videoId;
  const snippet = item.snippet;
  if (!videoId || !snippet?.title) return null;

  const mapped = withDefaults({
    externalId: videoId,
    title: snippet.title,
    description: snippet.description || undefined,
    bodyPreview: snippet.description || undefined,
    contentType: "youtube",
    source: "youtube",
    authorName: snippet.channelTitle || undefined,
    authorUrl: snippet.channelId
      ? `https://www.youtube.com/channel/${snippet.channelId}`
      : undefined,
    originalUrl: `https://www.youtube.com/watch?v=${videoId}`,
    thumbnailUrl:
      snippet.thumbnails?.high?.url ||
      snippet.thumbnails?.medium?.url ||
      snippet.thumbnails?.default?.url,
    publishedAt: snippet.publishedAt
      ? new Date(snippet.publishedAt).toISOString()
      : undefined,
    accessStatus: "public",
    topics: inferTopics(
      [snippet.title, snippet.description, snippet.channelTitle],
      slugs.length ? slugs : Object.keys(INTEREST_KEYWORDS),
    ),
    tags: [query],
  });
  mapped.readingTimeMinutes = undefined;
  return mapped;
}

function videoIdFromRss(item: YtRssItem): string | null {
  if (item.id?.includes("yt:video:")) {
    return item.id.split("yt:video:")[1] || null;
  }
  const link = item.link || "";
  const m = link.match(/[?&]v=([^&]+)/);
  return m?.[1] || null;
}

function mapRssItem(
  item: YtRssItem,
  slugs: string[],
  channelId: string,
): NormalizedContent | null {
  const videoId = videoIdFromRss(item);
  if (!videoId || !item.title) return null;

  const thumb =
    item.media?.thumbnail?.[0]?.$?.url ||
    `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;

  const mapped = withDefaults({
    externalId: videoId,
    title: item.title,
    description: item.contentSnippet || undefined,
    bodyPreview: item.contentSnippet || undefined,
    contentType: "youtube",
    source: "youtube",
    authorName: item.author || undefined,
    authorUrl: `https://www.youtube.com/channel/${channelId}`,
    originalUrl: item.link || `https://www.youtube.com/watch?v=${videoId}`,
    thumbnailUrl: thumb,
    publishedAt: item.pubDate ? new Date(item.pubDate).toISOString() : undefined,
    accessStatus: "public",
    topics: inferTopics(
      [item.title, item.contentSnippet, item.author],
      slugs.length ? slugs : Object.keys(INTEREST_KEYWORDS),
    ),
    tags: ["channel-rss"],
  });
  mapped.readingTimeMinutes = undefined;
  return mapped;
}

async function searchYouTube(
  apiKey: string,
  query: string,
): Promise<YouTubeSearchItem[]> {
  const params = new URLSearchParams({
    part: "snippet",
    type: "video",
    maxResults: "15",
    q: query,
    key: apiKey,
    relevanceLanguage: "en",
    safeSearch: "moderate",
  });

  const res = await fetch(
    `https://www.googleapis.com/youtube/v3/search?${params.toString()}`,
    { headers: { Accept: "application/json" }, next: { revalidate: 0 } },
  );

  const json = (await res.json()) as YouTubeSearchResponse;
  if (!res.ok || json.error) {
    throw new Error(
      json.error?.message || `YouTube search failed: HTTP ${res.status}`,
    );
  }
  return json.items ?? [];
}

async function fetchChannelRss(
  channelId: string,
  slugs: string[],
): Promise<NormalizedContent[]> {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${encodeURIComponent(channelId)}`;
  const feed = await parser.parseURL(url);
  const out: NormalizedContent[] = [];
  for (const raw of feed.items.slice(0, 12)) {
    const mapped = mapRssItem(raw as YtRssItem, slugs, channelId);
    if (mapped) out.push(mapped);
  }
  return out;
}

export const youtubeAdapter: ContentAdapter = {
  key: "youtube",

  async fetch(interestSlugs) {
    const apiKey = process.env.YOUTUBE_API_KEY?.trim();
    const slugs = resolveSlugs(interestSlugs);
    const items: NormalizedContent[] = [];
    const errors: string[] = [];
    const seen = new Set<string>();

    if (apiKey) {
      const queries = collectQueries(slugs);
      for (const query of queries) {
        try {
          const results = await searchYouTube(apiKey, query);
          for (const item of results) {
            const mapped = mapVideo(item, slugs, query);
            if (!mapped?.externalId) continue;
            if (seen.has(mapped.externalId)) continue;
            seen.add(mapped.externalId);
            items.push(mapped);
          }
        } catch (e) {
          errors.push(
            `"${query}": ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      }
    } else {
      const channels = collectChannelIds(slugs);
      for (const channelId of channels) {
        try {
          const videos = await fetchChannelRss(channelId, slugs);
          for (const mapped of videos) {
            if (!mapped.externalId || seen.has(mapped.externalId)) continue;
            seen.add(mapped.externalId);
            items.push(mapped);
          }
        } catch (e) {
          errors.push(
            `channel ${channelId}: ${e instanceof Error ? e.message : String(e)}`,
          );
        }
      }
    }

    return {
      items,
      error:
        items.length === 0 && errors.length
          ? errors.slice(0, 3).join("; ")
          : errors.length
            ? errors.slice(0, 2).join("; ")
            : undefined,
    };
  },
};
