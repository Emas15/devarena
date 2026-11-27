"use client";

import { ContentCard } from "@/components/content/content-card";
import type { ContentItem } from "@/lib/types";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FeedList({
  items,
  bookmarkedIds = [],
}: {
  items: ContentItem[];
  bookmarkedIds?: string[];
}) {
  const router = useRouter();
  const [hidden, setHidden] = useState<Set<string>>(new Set());
  const [bookmarks, setBookmarks] = useState<Set<string>>(new Set(bookmarkedIds));

  async function toggleBookmark(id: string) {
    const removing = bookmarks.has(id);
    setBookmarks((prev) => {
      const next = new Set(prev);
      if (removing) next.delete(id);
      else next.add(id);
      return next;
    });
    await fetch("/api/bookmarks", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contentItemId: id,
        action: removing ? "remove" : "add",
      }),
    });
    router.refresh();
  }

  async function hideItem(item: ContentItem) {
    setHidden((prev) => new Set(prev).add(item.id));
    await fetch("/api/feedback", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contentItemId: item.id,
        feedbackType: "not_interested",
      }),
    });
  }

  return (
    <div className="space-y-3">
      {items
        .filter((item) => !hidden.has(item.id))
        .map((item) => (
          <ContentCard
            key={item.id}
            item={item}
            bookmarked={bookmarks.has(item.id)}
            onBookmark={() => toggleBookmark(item.id)}
            onHide={() => hideItem(item)}
          />
        ))}
    </div>
  );
}
