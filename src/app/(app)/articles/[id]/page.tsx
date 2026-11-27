import { SourceBadge } from "@/components/content/source-badge";
import { ReadingTracker } from "@/components/content/reading-tracker";
import { Button } from "@/components/ui/button";
import { RelativeTime } from "@/components/ui/relative-time";
import { sanitizeHtml } from "@/lib/adapters/base";
import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const supabase = await createClient();
  const { data } = await supabase.from("content_items").select("title").eq("id", id).maybeSingle();
  return { title: data?.title ?? "Article" };
}

export default async function ArticleDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  await requireUser();
  const supabase = await createClient();
  const { data: item } = await supabase
    .from("content_items")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (!item) notFound();

  const canShowFull =
    item.access_status === "public" && Boolean(item.body_html || item.body_preview);
  const isPaywalled = item.access_status === "paywalled";
  const isExternalOnly = item.access_status === "external_only";

  return (
    <article className="mx-auto max-w-3xl">
      <ReadingTracker contentItemId={item.id} />
      <div className="mb-6 flex flex-wrap items-center gap-2">
        <SourceBadge source={item.source} />
        {item.published_at ? (
          <RelativeTime
            date={item.published_at}
            className="text-sm text-[color:var(--muted-foreground)]"
          />
        ) : null}
        {item.reading_time_minutes ? (
          <span className="text-sm text-[color:var(--muted-foreground)]">
            {item.reading_time_minutes} min read
          </span>
        ) : null}
      </div>

      <h1 className="text-3xl font-semibold tracking-tight md:text-4xl">{item.title}</h1>
      {item.author_name ? (
        <p className="mt-3 text-[color:var(--muted-foreground)]">By {item.author_name}</p>
      ) : null}

      {(isPaywalled || isExternalOnly || item.access_status === "preview") && (
        <div className="mt-6 rounded-xl border border-[color:var(--border)] bg-[color:var(--muted)]/50 p-4">
          <p className="text-sm text-[color:var(--muted-foreground)]">
            {isPaywalled
              ? "This article appears to require a subscription on the original platform. DevArena shows only the permitted preview and will not bypass paywalls."
              : isExternalOnly
                ? "Full content is available on the original site."
                : "Showing the publicly available preview. Open the original for the full article."}
          </p>
          <a href={item.original_url} target="_blank" rel="noopener noreferrer" className="mt-3 inline-block">
            <Button>
              Read full article on {item.source}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      )}

      <div className="prose-tech mt-8">
        {canShowFull && item.body_html ? (
          <div dangerouslySetInnerHTML={{ __html: sanitizeHtml(item.body_html) }} />
        ) : (
          <p className="whitespace-pre-wrap">{item.body_preview || item.description}</p>
        )}
      </div>

      <div className="mt-10 border-t border-[color:var(--border)] pt-6">
        <a href={item.original_url} target="_blank" rel="noopener noreferrer">
          <Button variant="outline">
            Open original
            <ExternalLink className="h-4 w-4" />
          </Button>
        </a>
      </div>
    </article>
  );
}
