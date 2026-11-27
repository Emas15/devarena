import { LoginForm } from "@/components/auth/login-form";
import { APP_NAME } from "@/lib/constants";
import Link from "next/link";

export const metadata = { title: "Sign in" };

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>;
}) {
  const params = await searchParams;

  return (
    <div className="flex min-h-screen items-center justify-center px-4">
      <div className="w-full max-w-md card-surface p-8 animate-fade-up">
        <Link href="/" className="mb-8 flex items-center gap-2 font-semibold">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--accent)] text-[color:var(--accent-foreground)] text-sm">
            DA
          </span>
          {APP_NAME}
        </Link>
        <h1 className="text-2xl font-semibold tracking-tight">Welcome back</h1>
        <p className="mt-2 text-sm text-[color:var(--muted-foreground)]">
          Use email/password now, or Google once OAuth is enabled.
        </p>
        {params.error ? (
          <p className="mt-4 rounded-lg bg-red-500/10 px-3 py-2 text-sm text-[color:var(--danger)]">
            {params.error === "config"
              ? "Supabase is not configured. Add credentials to .env.local."
              : "Authentication failed. Please try again."}
          </p>
        ) : null}
        <div className="mt-8">
          <LoginForm nextPath={params.next || "/home"} />
        </div>
      </div>
    </div>
  );
}
