import { BlogInteractions } from "@/components/blogs/blog-interactions";
import { Button } from "@/components/ui/button";
import { RelativeTime } from "@/components/ui/relative-time";
import { sanitizeHtml } from "@/lib/adapters/base";
import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function BlogViewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const { user } = await requireUser();
  const supabase = await createClient();

  const { data: blog } = await supabase
    .from("blogs")
    .select("*, profiles(id, full_name, username, avatar_url, bio)")
    .eq("slug", slug)
    .maybeSingle();

  if (!blog || (blog.status !== "published" && blog.author_id !== user.id)) notFound();

  const [{ data: comments }, { data: reaction }] = await Promise.all([
    supabase
      .from("blog_comments")
      .select("*, profiles(full_name, username, avatar_url)")
      .eq("blog_id", blog.id)
      .order("created_at", { ascending: true }),
    supabase
      .from("blog_reactions")
      .select("*")
      .eq("blog_id", blog.id)
      .eq("user_id", user.id)
      .maybeSingle(),
  ]);

  return (
    <article className="mx-auto max-w-3xl">
      <p className="text-xs uppercase tracking-wide text-[color:var(--accent)]">DevArena original</p>
      <h1 className="mt-2 text-4xl font-semibold tracking-tight">{blog.title}</h1>
      <div className="mt-4 flex items-center justify-between gap-3">
        <div className="text-sm text-[color:var(--muted-foreground)]">
          <Link
            href={`/u/${blog.profiles?.username || blog.author_id}`}
            className="hover:text-[color:var(--accent)]"
          >
            {blog.profiles?.full_name || blog.profiles?.username || "Author"}
          </Link>
          {blog.published_at ? (
            <>
              {" · "}
              <RelativeTime date={blog.published_at} />
            </>
          ) : null}
          {blog.reading_time_minutes ? ` · ${blog.reading_time_minutes} min` : ""}
        </div>
        {blog.author_id === user.id ? (
          <Link href={`/blogs/${blog.id}/edit`}>
            <Button variant="outline" size="sm">
              Edit
            </Button>
          </Link>
        ) : null}
      </div>

      <div
        className="prose-tech mt-8"
        dangerouslySetInnerHTML={{ __html: sanitizeHtml(blog.content_html) }}
      />

      <BlogInteractions
        blogId={blog.id}
        liked={Boolean(reaction)}
        likeCount={blog.like_count}
        comments={(comments ?? []).map((c) => ({
          id: c.id,
          body: c.body,
          createdAt: c.created_at,
          author: c.profiles?.full_name || c.profiles?.username || "User",
        }))}
      />
    </article>
  );
}
