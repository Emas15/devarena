import { Button } from "@/components/ui/button";
import { FollowAuthorButton } from "@/components/profile/follow-author-button";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";
import { notFound } from "next/navigation";

export default async function PublicAuthorPage({
  params,
}: {
  params: Promise<{ username: string }>;
}) {
  const { username } = await params;
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { data: profile } = await supabase
    .from("profiles")
    .select("*")
    .eq("username", username)
    .maybeSingle();

  if (!profile) notFound();

  const [{ data: blogs }, { data: interests }, { data: following }] = await Promise.all([
    supabase
      .from("blogs")
      .select("*")
      .eq("author_id", profile.id)
      .eq("status", "published")
      .order("published_at", { ascending: false }),
    supabase
      .from("user_interests")
      .select("interests(name)")
      .eq("user_id", profile.id),
    user
      ? supabase
          .from("followed_authors")
          .select("*")
          .eq("user_id", user.id)
          .eq("author_user_id", profile.id)
          .maybeSingle()
      : Promise.resolve({ data: null }),
  ]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 space-y-8">
      <div className="card-surface p-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-semibold">{profile.full_name || profile.username}</h1>
            <p className="mt-2 text-[color:var(--muted-foreground)]">{profile.bio}</p>
            <p className="mt-3 text-sm text-[color:var(--muted-foreground)]">
              Joined {new Date(profile.created_at).toLocaleDateString()} · {(blogs ?? []).length}{" "}
              articles
            </p>
          </div>
          {user && user.id !== profile.id ? (
            <FollowAuthorButton authorId={profile.id} following={Boolean(following)} />
          ) : null}
          {!user ? (
            <Link href="/login">
              <Button variant="outline">Sign in to follow</Button>
            </Link>
          ) : null}
        </div>
        <div className="mt-4 flex flex-wrap gap-2">
          {(interests ?? []).map((row, i) => {
            const name = (row.interests as unknown as { name: string } | null)?.name;
            return name ? (
              <span key={`${name}-${i}`} className="rounded-full bg-[color:var(--muted)] px-3 py-1 text-xs">
                {name}
              </span>
            ) : null;
          })}
        </div>
      </div>

      <section className="space-y-3">
        <h2 className="text-lg font-semibold">Published on DevArena</h2>
        {(blogs ?? []).map((blog) => (
          <Link key={blog.id} href={`/blogs/view/${blog.slug}`} className="card-surface block p-4">
            <p className="font-medium">{blog.title}</p>
            <p className="mt-1 text-sm text-[color:var(--muted-foreground)]">{blog.excerpt}</p>
          </Link>
        ))}
      </section>
    </div>
  );
}
