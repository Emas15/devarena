"use client";

import { SourceBadge } from "@/components/content/source-badge";
import { TopicChip } from "@/components/content/topic-chip";
import { Button } from "@/components/ui/button";
import { RelativeTime } from "@/components/ui/relative-time";
import type { ContentItem } from "@/lib/types";
import { cn, truncate } from "@/lib/utils";
import {
  Bookmark,
  ExternalLink,
  EyeOff,
  MessageCircle,
  ThumbsUp,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";

function CardLink({
  href,
  external,
  className,
  children,
}: {
  href: string;
  external?: boolean;
  className?: string;
  children: ReactNode;
}) {
  if (external) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className={className}>
        {children}
      </a>
    );
  }
  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}

export function ContentCard({
  item,
  href,
  onBookmark,
  onHide,
  bookmarked,
  className,
}: {
  item: ContentItem;
  href?: string;
  onBookmark?: () => void;
  onHide?: () => void;
  bookmarked?: boolean;
  className?: string;
}) {
  const target =
    href ??
    (item.content_type === "youtube"
      ? item.original_url
      : item.content_type === "reddit"
        ? `/reddit/${item.id}`
        : `/articles/${item.id}`);

  const isExternal = item.content_type === "youtube";
  const upvotes = item.engagement?.score ?? item.engagement?.ups;
  const comments = item.engagement?.num_comments ?? item.engagement?.comments;
  const duration = item.engagement?.duration;

  return (
    <article
      className={cn(
        "card-surface group overflow-hidden transition-all hover:border-[color:var(--accent)]/30",
        className
      )}
    >
      <div className="flex flex-col sm:flex-row gap-0">
        {item.thumbnail_url ? (
          <CardLink
            href={target}
            external={isExternal}
            className="relative sm:w-44 h-40 sm:h-auto shrink-0 overflow-hidden bg-[color:var(--muted)] block"
          >
            <Image
              src={item.thumbnail_url}
              alt=""
              fill
              className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
              sizes="176px"
              unoptimized
            />
          </CardLink>
        ) : null}

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <div className="flex items-center gap-2 flex-wrap">
            <SourceBadge source={item.source} />
            {item.access_status === "paywalled" ? (
              <span className="text-xs text-[color:var(--warning)]">Subscription required</span>
            ) : null}
            {item.published_at ? (
              <RelativeTime
                date={item.published_at}
                className="text-xs text-[color:var(--muted-foreground)]"
              />
            ) : null}
            {item.reading_time_minutes ? (
              <span className="text-xs text-[color:var(--muted-foreground)]">
                {item.reading_time_minutes} min read
              </span>
            ) : null}
            {duration ? (
              <span className="text-xs text-[color:var(--muted-foreground)]">{String(duration)}</span>
            ) : null}
          </div>

          <CardLink href={target} external={isExternal} className="mt-2">
            <h3 className="text-base sm:text-lg font-semibold leading-snug tracking-tight group-hover:text-[color:var(--accent)] transition-colors">
              {item.title}
            </h3>
          </CardLink>

          {item.description ? (
            <p className="mt-2 text-sm text-[color:var(--muted-foreground)] line-clamp-2">
              {truncate(item.description, 180)}
            </p>
          ) : null}

          <div className="mt-3 flex items-center justify-between gap-3 flex-wrap">
            <div className="flex items-center gap-3 text-xs text-[color:var(--muted-foreground)]">
              {item.author_name ? <span>{item.author_name}</span> : null}
              {typeof upvotes === "number" ? (
                <span className="inline-flex items-center gap-1">
                  <ThumbsUp className="h-3.5 w-3.5" />
                  {upvotes}
                </span>
              ) : null}
              {typeof comments === "number" ? (
                <span className="inline-flex items-center gap-1">
                  <MessageCircle className="h-3.5 w-3.5" />
                  {comments}
                </span>
              ) : null}
            </div>

            <div className="flex items-center gap-1">
              {item.topics?.slice(0, 2).map((t) => (
                <TopicChip key={t} label={t} className="pointer-events-none" />
              ))}
              {onBookmark ? (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label={bookmarked ? "Remove bookmark" : "Bookmark"}
                  onClick={(e) => {
                    e.preventDefault();
                    onBookmark();
                  }}
                >
                  <Bookmark
                    className={cn("h-4 w-4", bookmarked && "fill-current text-[color:var(--accent)]")}
                  />
                </Button>
              ) : null}
              {onHide ? (
                <Button
                  variant="ghost"
                  size="icon"
                  aria-label="Not interested"
                  onClick={(e) => {
                    e.preventDefault();
                    onHide();
                  }}
                >
                  <EyeOff className="h-4 w-4" />
                </Button>
              ) : null}
              <a
                href={item.original_url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-10 w-10 items-center justify-center rounded-lg hover:bg-[color:var(--muted)]"
                aria-label="Open original"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
