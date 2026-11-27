import { EmptyState } from "@/components/ui/empty-state";
import { Input } from "@/components/ui/input";
import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { Map } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Career Roadmaps" };

export default async function RoadmapsPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; category?: string }>;
}) {
  const params = await searchParams;
  await requireUser();
  const supabase = await createClient();

  let query = supabase
    .from("roadmaps")
    .select("*")
    .eq("is_published", true)
    .order("role_name");

  if (params.category) query = query.eq("category", params.category);
  if (params.q) {
    query = query.or(
      `title.ilike.%${params.q}%,role_name.ilike.%${params.q}%,summary.ilike.%${params.q}%`
    );
  }

  const { data: roadmaps } = await query;
  const categories = [...new Set((roadmaps ?? []).map((r) => r.category))];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Career Roadmaps</h1>
        <p className="mt-2 text-[color:var(--muted-foreground)]">
          Structured learning paths with real resources, projects, and progress tracking.
        </p>
      </div>

      <form className="max-w-md">
        <Input name="q" defaultValue={params.q} placeholder="Search roles…" />
      </form>

      <div className="flex flex-wrap gap-2">
        <Link
          href="/roadmaps"
          className={`rounded-full border px-3 py-1 text-xs ${!params.category ? "border-[color:var(--accent)] text-[color:var(--accent)]" : ""}`}
        >
          All
        </Link>
        {categories.map((c) => (
          <Link
            key={c}
            href={`/roadmaps?category=${encodeURIComponent(c)}`}
            className={`rounded-full border px-3 py-1 text-xs ${
              params.category === c ? "border-[color:var(--accent)] text-[color:var(--accent)]" : ""
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      {(roadmaps ?? []).length ? (
        <div className="grid gap-4 md:grid-cols-2">
          {(roadmaps ?? []).map((roadmap) => (
            <Link
              key={roadmap.id}
              href={`/roadmaps/${roadmap.slug}`}
              className="card-surface p-5 transition-colors hover:border-[color:var(--accent)]/40"
            >
              <p className="text-xs uppercase tracking-wide text-[color:var(--muted-foreground)]">
                {roadmap.category}
              </p>
              <h2 className="mt-2 text-lg font-semibold">{roadmap.title}</h2>
              <p className="mt-2 text-sm text-[color:var(--muted-foreground)] line-clamp-3">
                {roadmap.summary}
              </p>
              <p className="mt-4 text-xs text-[color:var(--muted-foreground)]">
                {roadmap.estimated_months ? `~${roadmap.estimated_months} months · ` : ""}
                {roadmap.difficulty}
              </p>
            </Link>
          ))}
        </div>
      ) : (
        <EmptyState
          icon={Map}
          title="No roadmaps found"
          description="Seed roadmaps via POST /api/admin/seed-roadmaps with Authorization: Bearer $CRON_SECRET"
        />
      )}
    </div>
  );
}
