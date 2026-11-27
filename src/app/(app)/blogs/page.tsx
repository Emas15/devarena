import { Button } from "@/components/ui/button";
import { EmptyState } from "@/components/ui/empty-state";
import { requireUser } from "@/lib/auth/session";
import { RelativeTime } from "@/components/ui/relative-time";
import { createClient } from "@/lib/supabase/server";
import { PenSquare } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "My Blogs" };

export default async function MyBlogsPage() {
  const { user } = await requireUser();
  const supabase = await createClient();

  const [{ data: mine }, { data: discover }] = await Promise.all([
    supabase
      .from("blogs")
      .select("*")
      .eq("author_id", user.id)
      .order("updated_at", { ascending: false }),
    supabase
      .from("blogs")
      .select("*, profiles(full_name, username, avatar_url)")
      .eq("status", "published")
      .neq("author_id", user.id)
      .order("published_at", { ascending: false })
      .limit(12),
  ]);

  return (
    <div className="space-y-10">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold tracking-tight">My Blogs</h1>
          <p className="mt-2 text-[color:var(--muted-foreground)]">
            Draft, publish, and share your engineering experiences.
          </p>
        </div>
        <Link href="/blogs/new">
          <Button>
            <PenSquare className="h-4 w-4" />
            New post
          </Button>
        </Link>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Your posts</h2>
        {(mine ?? []).length ? (
          <div className="space-y-3">
            {(mine ?? []).map((blog) => (
              <div key={blog.id} className="card-surface flex items-center justify-between gap-4 p-4">
                <div>
                  <p className="font-medium">{blog.title}</p>
                  <p className="mt-1 text-xs text-[color:var(--muted-foreground)]">
                    {blog.status} · updated <RelativeTime date={blog.updated_at} />
                  </p>
                </div>
                <div className="flex gap-2">
                  {blog.status === "published" ? (
                    <Link href={`/blogs/view/${blog.slug}`}>
                      <Button variant="outline" size="sm">
                        View
                      </Button>
                    </Link>
                  ) : null}
                  <Link href={`/blogs/${blog.id}/edit`}>
                    <Button size="sm" variant="secondary">
                      Edit
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <EmptyState
            icon={PenSquare}
            title="No posts yet"
            description="Write your first article about something you learned or built."
            action={
              <Link href="/blogs/new">
                <Button>Start writing</Button>
              </Link>
            }
          />
        )}
      </section>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Discover writers</h2>
        <div className="grid gap-3 md:grid-cols-2">
          {(discover ?? []).map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/view/${blog.slug}`}
              className="card-surface p-4 transition-colors hover:border-[color:var(--accent)]/40"
            >
              <p className="text-xs text-[color:var(--muted-foreground)]">
                {blog.profiles?.full_name || blog.profiles?.username || "Author"} · DevArena
              </p>
              <h3 className="mt-1 font-semibold">{blog.title}</h3>
              <p className="mt-2 line-clamp-2 text-sm text-[color:var(--muted-foreground)]">
                {blog.excerpt}
              </p>
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
