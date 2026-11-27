import { INTEREST_KEYWORDS } from "@/lib/constants";
import { emptyResult, toUpsertRow } from "@/lib/adapters/base";
import { adapters, getAdapter } from "@/lib/adapters/index";
import { createAdminClient } from "@/lib/supabase/admin";
import { createClient as createServerClient } from "@/lib/supabase/server";
import type { NormalizedContent, SyncResult } from "@/lib/types";

type DbClient = {
  from: (table: string) => {
    upsert: (
      row: Record<string, unknown>,
      opts?: Record<string, unknown>
    ) => PromiseLike<{ error: { message: string } | null }>;
    update: (row: Record<string, unknown>) => {
      eq: (
        column: string,
        value: string
      ) => PromiseLike<{ error: { message: string } | null }>;
    };
  };
};

function resolveInterestSlugs(interestSlugs?: string[]): string[] {
  if (interestSlugs && interestSlugs.length > 0) return interestSlugs;
  return Object.keys(INTEREST_KEYWORDS);
}

async function getSyncClient(): Promise<DbClient> {
  if (process.env.SUPABASE_SERVICE_ROLE_KEY) {
    return createAdminClient() as unknown as DbClient;
  }
  return (await createServerClient()) as unknown as DbClient;
}

async function upsertItems(
  db: DbClient,
  items: NormalizedContent[]
): Promise<{ upserted: number; skipped: number; error?: string }> {
  let upserted = 0;
  let skipped = 0;
  const errors: string[] = [];

  for (const item of items) {
    if (!item.title?.trim() || !item.originalUrl?.trim()) {
      skipped += 1;
      continue;
    }

    const row = toUpsertRow(item);
    const { error } = await db.from("content_items").upsert(row, {
      onConflict: "source,content_hash",
      ignoreDuplicates: false,
    });

    if (error) {
      skipped += 1;
      if (errors.length < 3) errors.push(error.message);
    } else {
      upserted += 1;
    }
  }

  return {
    upserted,
    skipped,
    error: errors.length ? errors.join("; ") : undefined,
  };
}

async function updateSourceStatus(
  db: DbClient,
  key: string,
  status: "ok" | "error" | "partial",
  errorMessage?: string
): Promise<void> {
  await db
    .from("content_sources")
    .update({
      last_synced_at: new Date().toISOString(),
      last_sync_status: status,
      last_sync_error: errorMessage ?? null,
    })
    .eq("key", key);
}

export async function syncContent(
  interestSlugs?: string[],
  sourceKey?: string
): Promise<SyncResult[]> {
  const slugs = resolveInterestSlugs(interestSlugs);
  const db = await getSyncClient();
  const results: SyncResult[] = [];

  const runOne = async (key: string): Promise<SyncResult> => {
    const adapter = getAdapter(key);
    if (!adapter) return emptyResult(key, "Unknown adapter");

    try {
      const fetched = await adapter.fetch(slugs);
      const write = await upsertItems(db, fetched.items);

      const combinedError = [fetched.error, write.error].filter(Boolean).join("; ");

      const status: "ok" | "error" | "partial" =
        combinedError && write.upserted === 0 && fetched.items.length === 0
          ? "error"
          : combinedError
            ? "partial"
            : "ok";

      await updateSourceStatus(db, key, status, combinedError || undefined);

      return {
        source: key,
        fetched: fetched.items.length,
        upserted: write.upserted,
        skipped: write.skipped,
        error: combinedError || undefined,
      };
    } catch (e) {
      const message = e instanceof Error ? e.message : "sync failed";
      try {
        await updateSourceStatus(db, key, "error", message);
      } catch {
        // ignore
      }
      return emptyResult(key, message);
    }
  };

  if (sourceKey) {
    results.push(await runOne(sourceKey));
    return results;
  }

  for (const adapter of adapters) {
    results.push(await runOne(adapter.key));
  }

  return results;
}
