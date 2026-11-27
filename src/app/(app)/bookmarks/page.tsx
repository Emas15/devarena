import { ContentCard } from "@/components/content/content-card";
import { EmptyState } from "@/components/ui/empty-state";
import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import type { ContentItem } from "@/lib/types";
import { Bookmark } from "lucide-react";
import Link from "next/link";

export const metadata = { title: "Bookmarks" };

export default async function BookmarksPage() {
  const { user } = await requireUser();
  const supabase = await createClient();
  const { data } = await supabase
    .from("bookmarks")
    .select("*, content_items(*), blogs(id, title, slug, excerpt)")
    .eq("user_id", user.id)
    .order("created_at", { ascending: false });

  const contentItems = (data ?? [])
    .map((b) => b.content_items as ContentItem | null)
    .filter(Boolean) as ContentItem[];
  const blogs = (data ?? []).map((b) => b.blogs).filter(Boolean);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Bookmarks</h1>
        <p className="mt-2 text-[color:var(--muted-foreground)]">Saved for later.</p>
      </div>

      {contentItems.length ? (
        <div className="space-y-3">
          {contentItems.map((item) => (
            <ContentCard key={item.id} item={item} />
          ))}
        </div>
      ) : null}

      {blogs.length ? (
        <div className="space-y-3">
          {blogs.map((blog) => (
            <Link
              key={blog.id}
              href={`/blogs/view/${blog.slug}`}
              className="card-surface block p-4"
            >
              <p className="font-medium">{blog.title}</p>
              <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">{blog.excerpt}</p>
            </Link>
          ))}
        </div>
      ) : null}

      {!contentItems.length && !blogs.length ? (
        <EmptyState
          icon={Bookmark}
          title="No bookmarks yet"
          description="Save articles and discussions from your feed to find them here."
        />
      ) : null}
    </div>
  );
}
