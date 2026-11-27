import { isSupabaseConfigured } from "@/lib/supabase/config";

export const DEMO_USER_ID = "00000000-0000-4000-8000-000000000001";

export function isDemoMode() {
  return !isSupabaseConfigured();
}

export const DEMO_PROFILE = {
  id: DEMO_USER_ID,
  email: "preview@devarena.local",
  full_name: "Preview User",
  username: "preview",
  avatar_url: null as string | null,
  bio: "Local preview mode — connect Supabase to enable auth and live data.",
  experience_level: "intermediate" as const,
  onboarding_completed: true,
  theme_preference: "system",
  show_gamification: true,
  website_url: null as string | null,
  github_url: null as string | null,
  linkedin_url: null as string | null,
  created_at: new Date().toISOString(),
  updated_at: new Date().toISOString(),
};

export const DEMO_INTERESTS = [
  "data-engineering",
  "machine-learning",
  "devops",
  "backend-development",
];

export const DEMO_STATS = {
  user_id: DEMO_USER_ID,
  xp: 120,
  level: 1,
  current_streak: 2,
  longest_streak: 2,
  last_active_date: new Date().toISOString().slice(0, 10),
  articles_read: 3,
  videos_discovered: 1,
  blogs_published: 0,
  topics_completed: 1,
  updated_at: new Date().toISOString(),
};
