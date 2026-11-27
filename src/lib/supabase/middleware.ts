import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

const PROTECTED_PREFIXES = [
  "/home",
  "/articles",
  "/reddit",
  "/youtube",
  "/roadmaps",
  "/following",
  "/bookmarks",
  "/blogs",
  "/progress",
  "/profile",
  "/settings",
  "/onboarding",
  "/search",
];

const ONBOARDING_COOKIE = "da_ob";

function isProtectedPath(path: string) {
  return PROTECTED_PREFIXES.some((p) => path === p || path.startsWith(`${p}/`));
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });
  const path = request.nextUrl.pathname;

  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anon = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // Preview mode without Supabase: allow browsing the full UI with mock data
  if (!url || !anon || url.includes("your-project")) {
    if (path === "/" || path === "/login") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/home";
      return NextResponse.redirect(redirectUrl);
    }
    return supabaseResponse;
  }

  const supabase = createServerClient(url, anon, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        supabaseResponse = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) =>
          supabaseResponse.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isProtected = isProtectedPath(path);

  if (!user && isProtected) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("next", path);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && (path === "/login" || path === "/")) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("onboarding_completed")
      .eq("id", user.id)
      .maybeSingle();

    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = profile?.onboarding_completed ? "/home" : "/onboarding";
    const res = NextResponse.redirect(redirectUrl);
    if (profile?.onboarding_completed) {
      res.cookies.set(ONBOARDING_COOKIE, "1", {
        path: "/",
        sameSite: "lax",
        httpOnly: true,
        maxAge: 60 * 60 * 24 * 365,
      });
    }
    return res;
  }

  if (user && !path.startsWith("/onboarding") && isProtected) {
    const alreadyOnboarded = request.cookies.get(ONBOARDING_COOKIE)?.value === "1";
    if (!alreadyOnboarded) {
      const { data: profile } = await supabase
        .from("profiles")
        .select("onboarding_completed")
        .eq("id", user.id)
        .maybeSingle();

      if (profile && !profile.onboarding_completed) {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/onboarding";
        return NextResponse.redirect(redirectUrl);
      }

      if (profile?.onboarding_completed) {
        supabaseResponse.cookies.set(ONBOARDING_COOKIE, "1", {
          path: "/",
          sameSite: "lax",
          httpOnly: true,
          maxAge: 60 * 60 * 24 * 365,
        });
      }
    }
  }

  return supabaseResponse;
}
