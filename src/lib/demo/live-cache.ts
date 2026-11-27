import { getAdapter } from "@/lib/adapters/index";
import { toUpsertRow } from "@/lib/adapters/base";
import { DEMO_INTERESTS } from "@/lib/demo/mode";
import type { ContentItem, SyncResult } from "@/lib/types";
import { contentHash } from "@/lib/utils";
import { randomUUID } from "crypto";

type GlobalCache = {
  items: ContentItem[];
  sourceStatus: Record<
    string,
    { last_synced_at: string; last_sync_status: string; last_sync_error: string | null }
  >;
};

const globalForCache = globalThis as typeof globalThis & {
  __devarenaLiveCache?: GlobalCache;
};

function cache(): GlobalCache {
  if (!globalForCache.__devarenaLiveCache) {
    globalForCache.__devarenaLiveCache = {
      items: [],
      sourceStatus: {},
    };
  }
  return globalForCache.__devarenaLiveCache;
}

export function getLiveCacheItems(): ContentItem[] {
  return cache().items;
}

export function getLiveCacheItem(id: string): ContentItem | null {
  return cache().items.find((item) => item.id === id) ?? null;
}

export function getLiveSourceStatus() {
  return cache().sourceStatus;
}

function toContentItem(row: ReturnType<typeof toUpsertRow>, id?: string): ContentItem {
  const now = new Date().toISOString();
  return {
    id: id ?? randomUUID(),
    external_id: row.external_id,
    content_hash: row.content_hash,
    title: row.title,
    description: row.description,
    body_preview: row.body_preview,
    body_html: row.body_html,
    content_type: row.content_type as ContentItem["content_type"],
    source: row.source,
    author_name: row.author_name,
    author_url: row.author_url,
    author_avatar_url: row.author_avatar_url,
    original_url: row.original_url,
    thumbnail_url: row.thumbnail_url,
    published_at: row.published_at,
    retrieved_at: row.retrieved_at,
    access_status: row.access_status as ContentItem["access_status"],
    topics: row.topics,
    tags: row.tags,
    reading_time_minutes: row.reading_time_minutes,
    engagement: row.engagement as ContentItem["engagement"],
    is_active: true,
    created_at: now,
    updated_at: now,
  };
}

const PREVIEW_SOURCES = [
  "devto",
  "hackernews",
  "hashnode",
  "medium",
  "substack",
  "reddit",
  "youtube",
] as const;

export async function syncDemoContent(
  interestSlugs: string[] = DEMO_INTERESTS,
  sourceKey?: string
): Promise<{ results: SyncResult[]; upserted: number }> {
  const store = cache();
  const sources = sourceKey
    ? PREVIEW_SOURCES.filter((s) => s === sourceKey)
    : [...PREVIEW_SOURCES];

  const results: SyncResult[] = [];
  let upserted = 0;
  const byHash = new Map(store.items.map((item) => [`${item.source}:${item.content_hash}`, item]));

  for (const key of sources) {
    const adapter = getAdapter(key);
    if (!adapter) {
      results.push({ source: key, fetched: 0, upserted: 0, skipped: 0, error: "Unknown adapter" });
      continue;
    }

    try {
      const { items, error } = await adapter.fetch(interestSlugs);
      let sourceUpserted = 0;
      let skipped = 0;

      for (const item of items) {
        if (!item.title || !item.originalUrl) {
          skipped += 1;
          continue;
        }
        const row = toUpsertRow(item);
        const mapKey = `${row.source}:${row.content_hash}`;
        const existing = byHash.get(mapKey);
        const next = toContentItem(row, existing?.id);
        byHash.set(mapKey, next);
        sourceUpserted += 1;
      }

      store.sourceStatus[key] = {
        last_synced_at: new Date().toISOString(),
        last_sync_status: error && !items.length ? "error" : error ? "partial" : "ok",
        last_sync_error: error ?? null,
      };

      results.push({
        source: key,
        fetched: items.length,
        upserted: sourceUpserted,
        skipped,
        error,
      });
      upserted += sourceUpserted;
    } catch (e) {
      const message = e instanceof Error ? e.message : "sync failed";
      store.sourceStatus[key] = {
        last_synced_at: new Date().toISOString(),
        last_sync_status: "error",
        last_sync_error: message,
      };
      results.push({ source: key, fetched: 0, upserted: 0, skipped: 0, error: message });
    }
  }

  // Prefer fresher items first; keep a bounded cache
  store.items = [...byHash.values()]
    .sort((a, b) => {
      const at = a.published_at ? new Date(a.published_at).getTime() : 0;
      const bt = b.published_at ? new Date(b.published_at).getTime() : 0;
      return bt - at;
    })
    .slice(0, 300);

  // silence unused import if tree-shaken oddly
  void contentHash;
  return { results, upserted };
}
