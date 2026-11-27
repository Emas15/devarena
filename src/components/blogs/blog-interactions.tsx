"use client";

import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import { useRouter } from "next/navigation";
import { FormEvent, useState } from "react";

export function BlogInteractions({
  blogId,
  liked,
  likeCount,
  comments,
}: {
  blogId: string;
  liked: boolean;
  likeCount: number;
  comments: Array<{ id: string; body: string; createdAt: string; author: string }>;
}) {
  const router = useRouter();
  const [body, setBody] = useState("");
  const [busy, setBusy] = useState(false);

  async function toggleLike() {
    setBusy(true);
    await fetch("/api/blogs/react", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId }),
    });
    router.refresh();
    setBusy(false);
  }

  async function submitComment(e: FormEvent) {
    e.preventDefault();
    if (!body.trim()) return;
    setBusy(true);
    await fetch("/api/blogs/comments", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ blogId, body }),
    });
    setBody("");
    router.refresh();
    setBusy(false);
  }

  return (
    <section className="mt-10 space-y-6 border-t border-[color:var(--border)] pt-8">
      <Button variant={liked ? "primary" : "outline"} onClick={toggleLike} disabled={busy}>
        <Heart className={`h-4 w-4 ${liked ? "fill-current" : ""}`} />
        {likeCount} {likeCount === 1 ? "like" : "likes"}
      </Button>

      <div>
        <h2 className="text-lg font-semibold">Comments</h2>
        <form onSubmit={submitComment} className="mt-3 space-y-3">
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={3}
            className="w-full rounded-lg border border-[color:var(--border)] bg-[color:var(--card)] px-3 py-2 text-sm focus-ring"
            placeholder="Share a thoughtful comment…"
          />
          <Button type="submit" disabled={busy || !body.trim()}>
            Comment
          </Button>
        </form>
        <div className="mt-6 space-y-4">
          {comments.map((c) => (
            <div key={c.id} className="rounded-lg bg-[color:var(--muted)]/50 p-3">
              <p className="text-xs font-medium">{c.author}</p>
              <p className="mt-1 text-sm whitespace-pre-wrap">{c.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
