"use client";

import { createBrowserClient } from "@supabase/ssr";
import { createMockSupabase } from "@/lib/demo/mock-supabase";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export { isSupabaseConfigured };

export function createClient() {
  if (!isSupabaseConfigured()) {
    return createMockSupabase() as ReturnType<typeof createBrowserClient>;
  }

  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
