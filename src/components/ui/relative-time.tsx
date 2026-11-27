"use client";

import { formatRelativeDate } from "@/lib/utils";

/** Relative labels use Date.now(); suppress hydration mismatch across the SSR→client gap. */
export function RelativeTime({
  date,
  className,
}: {
  date: string | Date | null | undefined;
  className?: string;
}) {
  if (!date) return null;
  return (
    <span className={className} suppressHydrationWarning>
      {formatRelativeDate(date)}
    </span>
  );
}
