import { INTEREST_KEYWORDS } from "@/lib/constants";
import type {
  AccessStatus,
  ContentSourceKey,
  NormalizedContent,
  SyncResult,
} from "@/lib/types";
import { contentHash, estimateReadingTime, truncate } from "@/lib/utils";

export interface AdapterFetchResult {
  items: NormalizedContent[];
  error?: string;
}

export interface ContentAdapter {
  key: ContentSourceKey;
  fetch(interestSlugs: string[]): Promise<AdapterFetchResult>;
}

/** Keep markup for article rendering but drop executable / remote code. */
export function sanitizeHtml(html: string | null | undefined): string {
  if (!html) return "";
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<iframe[\s\S]*?<\/iframe>/gi, "")
    .replace(/<object[\s\S]*?<\/object>/gi, "")
    .replace(/<embed[\s\S]*?>/gi, "")
    .replace(/\son\w+\s*=\s*("[^"]*"|'[^']*'|[^\s>]+)/gi, "")
    .replace(/javascript:/gi, "");
}

export function stripHtml(html: string | null | undefined): string {
  if (!html) return "";
  return sanitizeHtml(html)
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/\s+/g, " ")
    .trim();
}

export function parseFeedList(raw: string | undefined): string[] {
  if (!raw?.trim()) return [];
  return raw
    .split(",")
    .map((s) => s.trim())
    .filter((s) => /^https?:\/\//i.test(s));
}

/** Interest slugs → unique keywords for search / relevance filtering */
export function expandInterestKeywords(interestSlugs: string[]): string[] {
  const out = new Set<string>();
  for (const slug of interestSlugs) {
    out.add(slug.replace(/-/g, " "));
    for (const kw of INTEREST_KEYWORDS[slug] ?? []) {
      out.add(kw.toLowerCase());
    }
  }
  return [...out];
}

/**
 * Infer topic interest slugs from title/tags/description via INTEREST_KEYWORDS.
 */
export function inferTopics(
  textParts: Array<string | null | undefined>,
  preferredSlugs?: string[],
): string[] {
  const haystack = textParts
    .filter(Boolean)
    .join(" ")
    .toLowerCase();

  const candidates =
    preferredSlugs && preferredSlugs.length > 0
      ? preferredSlugs
      : Object.keys(INTEREST_KEYWORDS);

  const matched: Array<{ slug: string; score: number }> = [];

  for (const slug of candidates) {
    const keywords = INTEREST_KEYWORDS[slug] ?? [slug.replace(/-/g, " ")];
    let score = 0;
    for (const kw of keywords) {
      if (haystack.includes(kw.toLowerCase())) score += 1;
    }
    if (haystack.includes(slug.replace(/-/g, " "))) score += 2;
    if (score > 0) matched.push({ slug, score });
  }

  matched.sort((a, b) => b.score - a.score);
  return matched.slice(0, 5).map((m) => m.slug);
}

/** Dev.to / search-style tags derived from INTEREST_KEYWORDS */
export function tagsFromInterestKeywords(interestSlugs: string[]): string[] {
  const tags = new Set<string>();

  for (const slug of interestSlugs) {
    const keywords = INTEREST_KEYWORDS[slug] ?? [];
    for (const kw of keywords) {
      const compact = kw.toLowerCase().replace(/[^a-z0-9]+/g, "");
      const hyphen = kw
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "");
      if (compact.length >= 2 && compact.length <= 32) tags.add(compact);
      if (hyphen.length >= 2 && hyphen.length <= 32) tags.add(hyphen);
    }
    tags.add(slug.replace(/-/g, ""));
    tags.add(slug);
  }

  return [...tags];
}

export function textMatchesInterests(
  text: string,
  interestSlugs: string[],
): boolean {
  if (interestSlugs.length === 0) return true;
  const haystack = text.toLowerCase();
  return expandInterestKeywords(interestSlugs).some((kw) =>
    haystack.includes(kw.toLowerCase()),
  );
}

export function withDefaults(partial: NormalizedContent): NormalizedContent {
  const merged: NormalizedContent = {
    accessStatus: "public" as AccessStatus,
    topics: [],
    tags: [],
    engagement: {},
    ...partial,
  };

  if (merged.readingTimeMinutes == null && merged.contentType !== "youtube") {
    merged.readingTimeMinutes = estimateReadingTime(
      merged.bodyPreview || merged.description || merged.title || "",
    );
  }

  if (merged.description) {
    merged.description = truncate(stripHtml(merged.description), 400);
  }
  if (merged.bodyPreview) {
    merged.bodyPreview = truncate(stripHtml(merged.bodyPreview), 800);
  }

  return merged;
}

/** Map NormalizedContent → content_items upsert row (includes content_hash) */
export function toUpsertRow(item: NormalizedContent) {
  return {
    external_id: item.externalId ?? null,
    content_hash: contentHash(item.originalUrl, item.title),
    title: item.title.trim(),
    description: item.description?.trim() || null,
    body_preview: item.bodyPreview?.trim() || item.description?.trim() || null,
    body_html: item.bodyHtml ?? null,
    content_type: item.contentType,
    source: item.source,
    author_name: item.authorName?.trim() || null,
    author_url: item.authorUrl ?? null,
    author_avatar_url: item.authorAvatarUrl ?? null,
    original_url: item.originalUrl.trim(),
    thumbnail_url: item.thumbnailUrl ?? null,
    published_at: item.publishedAt ?? null,
    retrieved_at: new Date().toISOString(),
    access_status: item.accessStatus ?? "public",
    topics: item.topics ?? [],
    tags: item.tags ?? [],
    reading_time_minutes:
      item.readingTimeMinutes ??
      (item.contentType === "youtube"
        ? null
        : estimateReadingTime(
            item.bodyPreview || item.description || item.title,
          )),
    engagement: item.engagement ?? {},
    is_active: true,
  };
}

/** @deprecated Prefer toUpsertRow — alias for callers expecting normalizedToDbRow */
export const normalizedToDbRow = toUpsertRow;

export function emptyResult(source: string, error?: string): SyncResult {
  return { source, fetched: 0, upserted: 0, skipped: 0, error };
}

export function dedupeNormalized(items: NormalizedContent[]): NormalizedContent[] {
  const seen = new Set<string>();
  const out: NormalizedContent[] = [];
  for (const item of items) {
    if (!item.title?.trim() || !item.originalUrl?.trim()) continue;
    const key = `${item.source}:${contentHash(item.originalUrl, item.title)}`;
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(item);
  }
  return out;
}

export async function mapLimited<T, R>(
  items: T[],
  limit: number,
  fn: (item: T) => Promise<R>,
): Promise<R[]> {
  const results: R[] = [];
  for (let i = 0; i < items.length; i += limit) {
    const chunk = items.slice(i, i + limit);
    results.push(...(await Promise.all(chunk.map(fn))));
  }
  return results;
}
