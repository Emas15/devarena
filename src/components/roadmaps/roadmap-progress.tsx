"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FollowRoadmapButton({
  roadmapId,
  following,
}: {
  roadmapId: string;
  following: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    await fetch("/api/roadmaps/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ roadmapId, follow: !following }),
    });
    router.refresh();
    setBusy(false);
  }

  return (
    <Button onClick={toggle} disabled={busy} variant={following ? "secondary" : "primary"}>
      {following ? "Following" : "Follow roadmap"}
    </Button>
  );
}

export function TopicStatusControls({
  topicId,
  status,
}: {
  topicId: string;
  status: string;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function setStatus(next: string) {
    setBusy(true);
    await fetch("/api/roadmaps/progress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ topicId, status: next }),
    });
    router.refresh();
    setBusy(false);
  }

  return (
    <div className="flex flex-wrap gap-2">
      {[
        ["learning", "Learning"],
        ["completed", "Completed"],
        ["skipped", "Skip"],
      ].map(([value, label]) => (
        <Button
          key={value}
          size="sm"
          variant={status === value ? "primary" : "outline"}
          disabled={busy}
          onClick={() => setStatus(value)}
        >
          {label}
        </Button>
      ))}
    </div>
  );
}
