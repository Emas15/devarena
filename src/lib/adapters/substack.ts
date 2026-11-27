import Parser from "rss-parser";
import { INTEREST_KEYWORDS } from "@/lib/constants";
import type { NormalizedContent } from "@/lib/types";
import {
  type ContentAdapter,
  inferTopics,
  parseFeedList,
  stripHtml,
  withDefaults,
} from "@/lib/adapters/base";

type SubstackItem = {
  title?: string;
  link?: string;
  guid?: string;
  creator?: string;
  "dc:creator"?: string;
  pubDate?: string;
  isoDate?: string;
  content?: string;
  "content:encoded"?: string;
  contentSnippet?: string;
  summary?: string;
  categories?: string[];
  enclosure?: { url?: string };
};

const parser = new Parser<Record<string, unknown>, SubstackItem>({
  timeout: 15_000,
  headers: {
    "User-Agent": "DevArena/1.0 (+https://devarena.app)",
    Accept: "application/rss+xml, application/xml, text/xml, */*",
  },
  customFields: {
    item: [["content:encoded", "content:encoded"]],
  },
});

function resolveSlugs(interestSlugs: string[]): string[] {
  return interestSlugs.length > 0 ? interestSlugs : Object.keys(INTEREST_KEYWORDS);
}

function mapItem(item: SubstackItem, slugs: string[]): NormalizedContent | null {
  const title = item.title?.trim();
  const originalUrl = item.link?.trim();
  if (!title || !originalUrl) return null;

  const html = item["content:encoded"] || item.content || item.summary || "";
  const rawPreview =
    item.contentSnippet || stripHtml(html) || item.summary || "";
  const tags = (item.categories ?? []).map(String).filter(Boolean);
  const published = item.isoDate || item.pubDate;

  return withDefaults({
    externalId: item.guid || originalUrl,
    title,
    description: rawPreview || undefined,
    bodyPreview: rawPreview || undefined,
    contentType: "newsletter",
    source: "substack",
    authorName: item.creator || item["dc:creator"] || undefined,
    originalUrl,
    thumbnailUrl: item.enclosure?.url,
    publishedAt: published ? new Date(published).toISOString() : undefined,
    accessStatus: "public",
    topics: inferTopics([title, rawPreview, tags.join(" ")], slugs),
    tags,
  });
}

export const substackAdapter: ContentAdapter = {
  key: "substack",

  async fetch(interestSlugs) {
    const slugs = resolveSlugs(interestSlugs);
    const feeds = parseFeedList(process.env.SUBSTACK_FEEDS);

    if (feeds.length === 0) {
      return {
        items: [],
        error:
          "SUBSTACK_FEEDS is not configured. Set comma-separated Substack RSS URLs.",
      };
    }

    const items: NormalizedContent[] = [];
    const errors: string[] = [];
    const seen = new Set<string>();

    for (const feedUrl of feeds) {
      try {
        const feed = await parser.parseURL(feedUrl);
        for (const entry of feed.items ?? []) {
          const mapped = mapItem(entry, slugs);
          if (!mapped) continue;
          if (seen.has(mapped.originalUrl)) continue;
          seen.add(mapped.originalUrl);
          items.push(mapped);
        }
      } catch (e) {
        errors.push(
          `${feedUrl}: ${e instanceof Error ? e.message : String(e)}`,
        );
      }
    }

    return {
      items,
      error: errors.length ? errors.slice(0, 3).join("; ") : undefined,
    };
  },
};
