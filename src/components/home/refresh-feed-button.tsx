"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function RefreshFeedButton() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function refresh() {
    setLoading(true);
    setMessage(null);
    try {
      const res = await fetch("/api/sync", { method: "POST" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Sync failed");
      const parts = (data.results as Array<{ source: string; upserted: number; error?: string }> | undefined)
        ?.filter((r) => r.upserted > 0 || r.error)
        .map((r) =>
          r.error && !r.upserted ? `${r.source}: ${r.error}` : `${r.source}+${r.upserted}`
        )
        .slice(0, 4);
      setMessage(
        data.message ||
          (parts?.length
            ? `Updated ${data.upserted ?? 0} · ${parts.join(" · ")}`
            : `Updated ${data.upserted ?? 0} items`)
      );
      router.refresh();
    } catch (e) {
      setMessage(e instanceof Error ? e.message : "Sync failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={refresh} disabled={loading}>
        <RefreshCw className={loading ? "h-4 w-4 animate-spin" : "h-4 w-4"} />
        {loading ? "Refreshing…" : "Refresh feed"}
      </Button>
      {message ? <span className="text-xs text-[color:var(--muted-foreground)]">{message}</span> : null}
    </div>
  );
}
