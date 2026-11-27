"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useState } from "react";

export function FollowAuthorButton({
  authorId,
  following,
}: {
  authorId: string;
  following: boolean;
}) {
  const router = useRouter();
  const [busy, setBusy] = useState(false);

  async function toggle() {
    setBusy(true);
    await fetch("/api/authors/follow", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ authorId, follow: !following }),
    });
    router.refresh();
    setBusy(false);
  }

  return (
    <Button variant={following ? "secondary" : "primary"} disabled={busy} onClick={toggle}>
      {following ? "Following" : "Follow"}
    </Button>
  );
}
