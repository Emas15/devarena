import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";
import { z } from "zod";

const schema = z.object({
  fullName: z.string().min(1),
  bio: z.string().optional(),
  showGamification: z.boolean().optional(),
  githubUrl: z.string().optional(),
  linkedinUrl: z.string().optional(),
  websiteUrl: z.string().optional(),
});

export async function PATCH(request: Request) {
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
  const { error } = await supabase
    .from("profiles")
    .update({
      full_name: data.fullName,
      bio: data.bio || null,
      show_gamification: data.showGamification ?? true,
      github_url: data.githubUrl || null,
      linkedin_url: data.linkedinUrl || null,
      website_url: data.websiteUrl || null,
      updated_at: new Date().toISOString(),
    })
    .eq("id", user.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
