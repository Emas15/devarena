import { BlogEditor } from "@/components/blogs/blog-editor";
import { requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import { notFound } from "next/navigation";

export default async function EditBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const { user } = await requireUser();
  const supabase = await createClient();
  const { data: blog } = await supabase
    .from("blogs")
    .select("*")
    .eq("id", id)
    .eq("author_id", user.id)
    .maybeSingle();

  if (!blog) notFound();

  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Edit post</h1>
      <BlogEditor
        initial={{
          id: blog.id,
          title: blog.title,
          contentHtml: blog.content_html,
          tags: blog.tags,
          coverImageUrl: blog.cover_image_url ?? undefined,
          status: blog.status,
        }}
      />
    </div>
  );
}
