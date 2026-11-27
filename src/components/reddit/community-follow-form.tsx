"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function CommunityFollowForm() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    const cleaned = name.replace(/^r\//, "").trim();
    if (!cleaned) return;
    setBusy(true);
    await fetch("/api/communities", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ communityKey: cleaned, communityName: `r/${cleaned}` }),
    });
    setName("");
    setBusy(false);
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="flex gap-2">
      <Input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="e.g. dataengineering"
      />
      <Button type="submit" disabled={busy}>
        Follow
      </Button>
    </form>
  );
}
