import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { createMockSupabase } from "@/lib/demo/mock-supabase";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { cache } from "react";

export const createClient = cache(async () => {
  if (!isSupabaseConfigured()) {
    return createMockSupabase() as Awaited<ReturnType<typeof createServerClient>>;
  }

  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {
            // Called from a Server Component — middleware will refresh sessions.
          }
        },
      },
    }
  );
});
