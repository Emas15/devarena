import { INTEREST_KEYWORDS } from "@/lib/constants";
import type { NormalizedContent } from "@/lib/types";
import {
  type ContentAdapter,
  inferTopics,
  tagsFromInterestKeywords,
  withDefaults,
} from "@/lib/adapters/base";

interface DevToArticle {
  id: number;
  title: string;
  description: string;
  url: string;
  canonical_url?: string;
  published_at: string;
  tag_list?: string[] | string;
  cover_image: string | null;
  social_image?: string | null;
  reading_time_minutes?: number;
  public_reactions_count?: number;
  comments_count?: number;
  user?: {
    name?: string;
    username?: string;
    profile_image?: string;
    website_url?: string | null;
  };
}

function resolveSlugs(interestSlugs: string[]): string[] {
  return interestSlugs.length > 0 ? interestSlugs : Object.keys(INTEREST_KEYWORDS);
}

function parseTags(article: DevToArticle): string[] {
  if (Array.isArray(article.tag_list)) return article.tag_list.map(String);
  if (typeof article.tag_list === "string" && article.tag_list.trim()) {
    return article.tag_list.split(",").map((t) => t.trim()).filter(Boolean);
  }
  return [];
}

function mapArticle(article: DevToArticle, slugs: string[]): NormalizedContent {
  const tags = parseTags(article);
  return withDefaults({
    externalId: String(article.id),
    title: article.title,
    description: article.description || undefined,
    bodyPreview: article.description || undefined,
    contentType: "article",
    source: "devto",
    authorName: article.user?.name || article.user?.username,
    authorUrl: article.user?.username
      ? `https://dev.to/${article.user.username}`
      : article.user?.website_url || undefined,
    authorAvatarUrl: article.user?.profile_image,
    originalUrl: article.url || article.canonical_url || "",
    thumbnailUrl: article.cover_image || article.social_image || undefined,
    publishedAt: article.published_at
      ? new Date(article.published_at).toISOString()
      : undefined,
    accessStatus: "public",
    topics: inferTopics(
      [article.title, article.description, tags.join(" ")],
      slugs,
    ),
    tags,
    readingTimeMinutes: article.reading_time_minutes,
    engagement: {
      reactions: article.public_reactions_count ?? 0,
      comments: article.comments_count ?? 0,
    },
  });
}

export const devtoAdapter: ContentAdapter = {
  key: "devto",

  async fetch(interestSlugs) {
    const slugs = resolveSlugs(interestSlugs);
    const tags = tagsFromInterestKeywords(slugs).slice(0, 10);
    const items: NormalizedContent[] = [];
    const errors: string[] = [];
    const seen = new Set<number>();

    for (const tag of tags) {
      try {
        const res = await fetch(
          `https://dev.to/api/articles?per_page=30&tag=${encodeURIComponent(tag)}`,
          { headers: { Accept: "application/json" }, next: { revalidate: 0 } },
        );
        if (!res.ok) {
          errors.push(`devto:${tag} HTTP ${res.status}`);
          continue;
        }
        const articles = (await res.json()) as DevToArticle[];
        if (!Array.isArray(articles)) continue;
        for (const article of articles) {
          if (!article?.id || !article.title || !(article.url || article.canonical_url)) {
            continue;
          }
          if (seen.has(article.id)) continue;
          seen.add(article.id);
          items.push(mapArticle(article, slugs));
        }
      } catch (e) {
        errors.push(e instanceof Error ? e.message : "devto fetch failed");
      }
    }

    return {
      items,
      error: errors.length ? errors.slice(0, 3).join("; ") : undefined,
    };
  },
};
