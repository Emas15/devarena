"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Image from "@tiptap/extension-image";
import Link from "@tiptap/extension-link";
import Placeholder from "@tiptap/extension-placeholder";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { common, createLowlight } from "lowlight";
import { useRouter } from "next/navigation";
import { useState } from "react";

const lowlight = createLowlight(common);

export function BlogEditor({
  initial,
}: {
  initial?: {
    id?: string;
    title?: string;
    contentHtml?: string;
    tags?: string[];
    coverImageUrl?: string;
    status?: string;
  };
}) {
  const router = useRouter();
  const [title, setTitle] = useState(initial?.title ?? "");
  const [tags, setTags] = useState((initial?.tags ?? []).join(", "));
  const [cover, setCover] = useState(initial?.coverImageUrl ?? "");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      Link.configure({ openOnClick: false }),
      Image,
      Placeholder.configure({ placeholder: "Write your engineering story…" }),
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: initial?.contentHtml || "<p></p>",
    editorProps: {
      attributes: {
        class:
          "prose-tech min-h-[360px] focus:outline-none px-1 py-2",
      },
    },
    immediatelyRender: false,
  });

  async function save(status: "draft" | "published") {
    if (!editor) return;
    setSaving(true);
    setError(null);
    try {
      const res = await fetch("/api/blogs", {
        method: initial?.id ? "PATCH" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: initial?.id,
          title,
          contentHtml: editor.getHTML(),
          contentJson: editor.getJSON(),
          tags: tags
            .split(",")
            .map((t) => t.trim())
            .filter(Boolean),
          coverImageUrl: cover || null,
          status,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Save failed");
      router.push(status === "published" ? `/blogs/view/${data.slug}` : `/blogs/${data.id}/edit`);
      router.refresh();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Save failed");
      setSaving(false);
    }
  }

  return (
    <div className="space-y-4">
      <Input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Post title"
        className="h-14 border-0 bg-transparent px-0 text-3xl font-semibold shadow-none focus-visible:ring-0"
      />
      <div className="grid gap-3 md:grid-cols-2">
        <Input
          value={tags}
          onChange={(e) => setTags(e.target.value)}
          placeholder="Tags (comma separated)"
        />
        <Input
          value={cover}
          onChange={(e) => setCover(e.target.value)}
          placeholder="Cover image URL (optional)"
        />
      </div>

      <div className="flex flex-wrap gap-2 border-b border-[color:var(--border)] pb-3">
        {[
          ["bold", () => editor?.chain().focus().toggleBold().run()],
          ["italic", () => editor?.chain().focus().toggleItalic().run()],
          ["H2", () => editor?.chain().focus().toggleHeading({ level: 2 }).run()],
          ["H3", () => editor?.chain().focus().toggleHeading({ level: 3 }).run()],
          ["List", () => editor?.chain().focus().toggleBulletList().run()],
          ["Code", () => editor?.chain().focus().toggleCodeBlock().run()],
          ["Quote", () => editor?.chain().focus().toggleBlockquote().run()],
        ].map(([label, action]) => (
          <Button key={String(label)} type="button" variant="secondary" size="sm" onClick={action as () => void}>
            {label as string}
          </Button>
        ))}
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => {
            const url = window.prompt("Image URL");
            if (url) editor?.chain().focus().setImage({ src: url }).run();
          }}
        >
          Image
        </Button>
        <Button
          type="button"
          variant="secondary"
          size="sm"
          onClick={() => {
            const url = window.prompt("Link URL");
            if (url) editor?.chain().focus().setLink({ href: url }).run();
          }}
        >
          Link
        </Button>
      </div>

      <div className="card-surface p-4 md:p-6">
        <EditorContent editor={editor} />
      </div>

      {error ? <p className="text-sm text-[color:var(--danger)]">{error}</p> : null}

      <div className="flex flex-wrap gap-3">
        <Button variant="secondary" disabled={saving || !title.trim()} onClick={() => save("draft")}>
          Save draft
        </Button>
        <Button disabled={saving || !title.trim()} onClick={() => save("published")}>
          {saving ? "Saving…" : "Publish"}
        </Button>
        {initial?.status === "published" ? (
          <Button
            variant="outline"
            disabled={saving}
            onClick={async () => {
              setSaving(true);
              await fetch("/api/blogs", {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ id: initial.id, status: "unpublished" }),
              });
              router.refresh();
              setSaving(false);
            }}
          >
            Unpublish
          </Button>
        ) : null}
      </div>
    </div>
  );
}
