import { DEMO_INTERESTS, DEMO_PROFILE, isDemoMode } from "@/lib/demo/mode";
import { createClient } from "@/lib/supabase/server";
import type { Profile } from "@/lib/types";
import { redirect } from "next/navigation";
import { cache } from "react";

export const getSessionUser = cache(async () => {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();
  return { supabase, user };
});

export async function requireUser() {
  const { supabase, user } = await getSessionUser();
  if (!user) redirect("/login");
  return { supabase, user };
}

export const getProfile = cache(async (userId: string): Promise<Profile | null> => {
  if (isDemoMode()) return DEMO_PROFILE as Profile;
  const supabase = await createClient();
  const { data } = await supabase.from("profiles").select("*").eq("id", userId).maybeSingle();
  return data as Profile | null;
});

export const getUserInterestSlugs = cache(async (userId: string): Promise<string[]> => {
  if (isDemoMode()) return DEMO_INTERESTS;
  const supabase = await createClient();
  const { data } = await supabase
    .from("user_interests")
    .select("interest_id, interests(slug)")
    .eq("user_id", userId);

  return (data ?? [])
    .map((row) => {
      const interest = row.interests as unknown as { slug: string } | { slug: string }[] | null;
      if (Array.isArray(interest)) return interest[0]?.slug;
      return interest?.slug;
    })
    .filter(Boolean) as string[];
});

export const getUserLearningPreferenceSlugs = cache(
  async (userId: string): Promise<string[]> => {
    if (isDemoMode()) return ["technical-tutorials", "engineering-case-studies"];
    const supabase = await createClient();
    const { data } = await supabase
      .from("user_learning_preferences")
      .select("learning_preference_id, learning_preferences(slug)")
      .eq("user_id", userId);

    return (data ?? [])
      .map((row) => {
        const pref = row.learning_preferences as unknown as
          | { slug: string }
          | { slug: string }[]
          | null;
        if (Array.isArray(pref)) return pref[0]?.slug;
        return pref?.slug;
      })
      .filter(Boolean) as string[];
  }
);
