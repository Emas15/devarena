"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function SettingsForm({
  profile,
}: {
  profile: {
    fullName: string;
    bio: string;
    showGamification: boolean;
    githubUrl: string;
    linkedinUrl: string;
    websiteUrl: string;
  };
}) {
  const router = useRouter();
  const [form, setForm] = useState(profile);
  const [message, setMessage] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setBusy(true);
    setMessage(null);
    const res = await fetch("/api/profile", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });
    setBusy(false);
    if (!res.ok) {
      setMessage("Failed to save");
      return;
    }
    setMessage("Saved");
    router.refresh();
  }

  return (
    <form onSubmit={onSubmit} className="card-surface space-y-4 p-5">
      <h2 className="font-semibold">Profile</h2>
      <Input
        value={form.fullName}
        onChange={(e) => setForm({ ...form, fullName: e.target.value })}
        placeholder="Display name"
      />
      <textarea
        value={form.bio}
        onChange={(e) => setForm({ ...form, bio: e.target.value })}
        rows={3}
        className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm focus-ring"
        placeholder="Bio"
      />
      <Input
        value={form.websiteUrl}
        onChange={(e) => setForm({ ...form, websiteUrl: e.target.value })}
        placeholder="Website"
      />
      <Input
        value={form.githubUrl}
        onChange={(e) => setForm({ ...form, githubUrl: e.target.value })}
        placeholder="GitHub URL"
      />
      <Input
        value={form.linkedinUrl}
        onChange={(e) => setForm({ ...form, linkedinUrl: e.target.value })}
        placeholder="LinkedIn URL"
      />
      <label className="flex items-center gap-2 text-sm">
        <input
          type="checkbox"
          checked={form.showGamification}
          onChange={(e) => setForm({ ...form, showGamification: e.target.checked })}
        />
        Show XP, streaks, and achievements
      </label>
      <Button type="submit" disabled={busy}>
        {busy ? "Saving…" : "Save changes"}
      </Button>
      {message ? <p className="text-sm text-[color:var(--muted-foreground)]">{message}</p> : null}
    </form>
  );
}
