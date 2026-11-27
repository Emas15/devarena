"use client";

import { useEffect } from "react";

export function ReadingTracker({ contentItemId }: { contentItemId: string }) {
  useEffect(() => {
    const timer = setTimeout(() => {
      void fetch("/api/reading", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          contentItemId,
          progressPercent: 100,
          completed: true,
        }),
      });
    }, 4000);
    return () => clearTimeout(timer);
  }, [contentItemId]);

  return null;
}
