import { SourceBadge } from "@/components/content/source-badge";
import { Button } from "@/components/ui/button";
import { RelativeTime } from "@/components/ui/relative-time";
import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { ExternalLink } from "lucide-react";
import { notFound } from "next/navigation";

export default async function RedditDetailPage({
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
    .eq("content_type", "reddit")
    .maybeSingle();

  if (!item) notFound();

  return (
    <article className="mx-auto max-w-3xl space-y-6">
      <div className="flex flex-wrap items-center gap-2">
        <SourceBadge source="reddit" />
        {item.tags?.[0] ? <span className="text-sm text-[color:var(--muted-foreground)]">{item.tags[0]}</span> : null}
        <RelativeTime
          date={item.published_at}
          className="text-sm text-[color:var(--muted-foreground)]"
        />
      </div>
      <h1 className="text-3xl font-semibold tracking-tight">{item.title}</h1>
      <p className="text-sm text-[color:var(--muted-foreground)]">
        {item.author_name}
        {item.engagement?.ups != null ? ` · ${item.engagement.ups} upvotes` : ""}
        {item.engagement?.num_comments != null
          ? ` · ${item.engagement.num_comments} comments`
          : ""}
      </p>
      <div className="prose-tech whitespace-pre-wrap">
        {item.body_preview || item.description || "No text preview available for this post."}
      </div>
      <a href={item.original_url} target="_blank" rel="noopener noreferrer">
        <Button>
          Open on Reddit
          <ExternalLink className="h-4 w-4" />
        </Button>
      </a>
    </article>
  );
}
