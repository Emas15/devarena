import { ContentCard } from "@/components/content/content-card";
import { EmptyState } from "@/components/ui/empty-state";
import { requireUser } from "@/lib/auth/session";
import { searchAll } from "@/lib/feed";
import { Search } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Search" };

export default async function SearchPage({
  searchParams,
}: {
  searchParams: Promise<{ q?: string; type?: string }>;
}) {
  const params = await searchParams;
  const { user } = await requireUser();
  const q = params.q?.trim() || "";
  const results = q ? await searchAll(q, user.id) : { content: [], blogs: [], roadmaps: [] };

  const type = params.type || "all";
  const showContent = type === "all" || type === "content";
  const showBlogs = type === "all" || type === "blogs";
  const showRoadmaps = type === "all" || type === "roadmaps";

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Search</h1>
        <p className="mt-2 text-[color:var(--muted-foreground)]">
          {q ? `Results for “${q}”` : "Search articles, blogs, and roadmaps"}
        </p>
      </div>

      <div className="flex flex-wrap gap-3 text-sm">
        {[
          ["all", "All"],
          ["content", "External content"],
          ["blogs", "DevArena blogs"],
          ["roadmaps", "Roadmaps"],
        ].map(([key, label]) => (
          <Link
            key={key}
            href={`/search?q=${encodeURIComponent(q)}&type=${key}`}
            className={type === key ? "text-[color:var(--accent)] font-medium" : "text-[color:var(--muted-foreground)]"}
          >
            {label}
          </Link>
        ))}
      </div>

      {!q ? (
        <EmptyState icon={Search} title="Type a query in the search bar" />
      ) : (
        <>
          {showContent ? (
            <section className="space-y-3">
              <h2 className="font-semibold">Articles & discussions</h2>
              {results.content.map((item) => (
                <ContentCard key={item.id} item={item} />
              ))}
              {!results.content.length ? (
                <p className="text-sm text-[color:var(--muted-foreground)]">No content matches.</p>
              ) : null}
            </section>
          ) : null}

          {showBlogs ? (
            <section className="space-y-3">
              <h2 className="font-semibold">Platform blogs</h2>
              {results.blogs.map((blog) => (
                <Link
                  key={blog.id}
                  href={`/blogs/view/${blog.slug}`}
                  className="card-surface block p-4"
                >
                  <p className="font-medium">{blog.title}</p>
                  <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">{blog.excerpt}</p>
                </Link>
              ))}
            </section>
          ) : null}

          {showRoadmaps ? (
            <section className="space-y-3">
              <h2 className="font-semibold">Roadmaps</h2>
              {results.roadmaps.map((roadmap) => (
                <Link
                  key={roadmap.id}
                  href={`/roadmaps/${roadmap.slug}`}
                  className="card-surface block p-4"
                >
                  <p className="font-medium">{roadmap.title}</p>
                  <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">
                    {roadmap.summary}
                  </p>
                </Link>
              ))}
            </section>
          ) : null}
        </>
      )}
    </div>
  );
}
