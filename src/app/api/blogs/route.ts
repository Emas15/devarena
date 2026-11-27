import { recordActivity, unlockAchievement } from "@/lib/gamification";
import { createClient } from "@/lib/supabase/server";
import { estimateReadingTime, slugify } from "@/lib/utils";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  id: z.string().uuid().optional(),
  title: z.string().min(2).optional(),
  contentHtml: z.string().optional(),
  contentJson: z.unknown().optional(),
  tags: z.array(z.string()).optional(),
  coverImageUrl: z.string().nullable().optional(),
  status: z.enum(["draft", "published", "unpublished"]).optional(),
});

export async function POST(request: Request) {
  return upsert(request, false);
}

export async function PATCH(request: Request) {
  return upsert(request, true);
}

async function upsert(request: Request, isPatch: boolean) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const parsed = schema.safeParse(await request.json());
  if (!parsed.success) {
    return NextResponse.json({ error: parsed.error.message }, { status: 400 });
  }

  const data = parsed.data;
  if (isPatch && !data.id) {
    return NextResponse.json({ error: "id required" }, { status: 400 });
  }

  const title = data.title ?? "Untitled";
  const slugBase = slugify(title) || "post";
  const slug = `${slugBase}-${Date.now().toString(36).slice(-4)}`;
  const reading = estimateReadingTime(data.contentHtml || "");

  if (isPatch && data.id) {
    const patch: Record<string, unknown> = {
      updated_at: new Date().toISOString(),
    };
    if (data.title) {
      patch.title = data.title;
    }
    if (data.contentHtml !== undefined) {
      patch.content_html = data.contentHtml;
      patch.excerpt = data.contentHtml.replace(/<[^>]+>/g, " ").trim().slice(0, 220);
      patch.reading_time_minutes = reading;
    }
    if (data.contentJson !== undefined) patch.content_json = data.contentJson;
    if (data.tags) patch.tags = data.tags;
    if (data.coverImageUrl !== undefined) patch.cover_image_url = data.coverImageUrl;
    if (data.status) {
      patch.status = data.status;
      if (data.status === "published") patch.published_at = new Date().toISOString();
    }

    const { data: updated, error } = await supabase
      .from("blogs")
      .update(patch)
      .eq("id", data.id)
      .eq("author_id", user.id)
      .select("*")
      .single();

    if (error) return NextResponse.json({ error: error.message }, { status: 500 });

    if (data.status === "published") {
      await recordActivity(user.id, "publish_blog", undefined, { blogId: updated.id });
      await unlockAchievement(user.id, "first-blog-published");
    }

    return NextResponse.json(updated);
  }

  const { data: created, error } = await supabase
    .from("blogs")
    .insert({
      author_id: user.id,
      title,
      slug,
      excerpt: (data.contentHtml || "").replace(/<[^>]+>/g, " ").trim().slice(0, 220),
      content_html: data.contentHtml || "",
      content_json: data.contentJson ?? null,
      cover_image_url: data.coverImageUrl ?? null,
      tags: data.tags ?? [],
      status: data.status ?? "draft",
      published_at: data.status === "published" ? new Date().toISOString() : null,
      reading_time_minutes: reading,
    })
    .select("*")
    .single();

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });

  if (data.status === "published") {
    await recordActivity(user.id, "publish_blog", undefined, { blogId: created.id });
    await unlockAchievement(user.id, "first-blog-published");
  }

  return NextResponse.json(created);
}

export async function DELETE(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  if (!user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

  const { id } = await request.json();
  await supabase.from("blogs").delete().eq("id", id).eq("author_id", user.id);
  return NextResponse.json({ ok: true });
}
