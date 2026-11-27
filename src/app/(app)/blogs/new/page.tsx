import { BlogEditor } from "@/components/blogs/blog-editor";
import { requireUser } from "@/lib/auth/session";

export const metadata = { title: "New blog" };

export default async function NewBlogPage() {
  await requireUser();
  return (
    <div className="mx-auto max-w-3xl">
      <h1 className="mb-6 text-2xl font-semibold tracking-tight">Create a post</h1>
      <BlogEditor />
    </div>
  );
}
