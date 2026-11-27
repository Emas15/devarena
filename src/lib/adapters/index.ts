import type { ContentAdapter } from "@/lib/adapters/base";
import { dedupeNormalized } from "@/lib/adapters/base";
import { devtoAdapter } from "@/lib/adapters/devto";
import { hackernewsAdapter } from "@/lib/adapters/hackernews";
import { hashnodeAdapter } from "@/lib/adapters/hashnode";
import { mediumAdapter } from "@/lib/adapters/medium";
import { redditAdapter } from "@/lib/adapters/reddit";
import { substackAdapter } from "@/lib/adapters/substack";
import { youtubeAdapter } from "@/lib/adapters/youtube";
import type { NormalizedContent } from "@/lib/types";

export type {
  AdapterFetchResult,
  ContentAdapter,
} from "@/lib/adapters/base";
export {
  dedupeNormalized,
  emptyResult,
  expandInterestKeywords,
  inferTopics,
  normalizedToDbRow,
  tagsFromInterestKeywords,
  toUpsertRow,
  withDefaults,
} from "@/lib/adapters/base";

export { devtoAdapter } from "@/lib/adapters/devto";
export { hashnodeAdapter } from "@/lib/adapters/hashnode";
export { hackernewsAdapter } from "@/lib/adapters/hackernews";
export { mediumAdapter } from "@/lib/adapters/medium";
export { substackAdapter } from "@/lib/adapters/substack";
export { redditAdapter } from "@/lib/adapters/reddit";
export { youtubeAdapter } from "@/lib/adapters/youtube";

export const adapters: ContentAdapter[] = [
  redditAdapter,
  youtubeAdapter,
  hackernewsAdapter,
  mediumAdapter,
  devtoAdapter,
  hashnodeAdapter,
  substackAdapter,
];

export const ALL_ADAPTERS = adapters;

export function getAdapter(key: string): ContentAdapter | undefined {
  return adapters.find((a) => a.key === key);
}

/**
 * Run every content adapter for the given interest slugs.
 * Returns live NormalizedContent only (never fabricated).
 */
export async function runAllAdapters(
  interestSlugs: string[],
): Promise<NormalizedContent[]> {
  const chunks = await Promise.all(
    adapters.map(async (adapter) => {
      try {
        const result = await adapter.fetch(interestSlugs);
        return result.items;
      } catch {
        return [] as NormalizedContent[];
      }
    }),
  );

  return dedupeNormalized(chunks.flat());
}

/** Same as runAllAdapters but also returns per-source error messages */
export async function runAllAdaptersDetailed(interestSlugs: string[]): Promise<{
  items: NormalizedContent[];
  errors: Record<string, string>;
}> {
  const errors: Record<string, string> = {};
  const chunks = await Promise.all(
    adapters.map(async (adapter) => {
      try {
        const result = await adapter.fetch(interestSlugs);
        if (result.error) errors[adapter.key] = result.error;
        return result.items;
      } catch (e) {
        errors[adapter.key] = e instanceof Error ? e.message : "adapter failed";
        return [] as NormalizedContent[];
      }
    }),
  );

  return { items: dedupeNormalized(chunks.flat()), errors };
}
