import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { SignOutButton } from "@/components/auth/sign-out-button";
import { SettingsForm } from "@/components/settings/settings-form";
import { Button } from "@/components/ui/button";
import { getProfile, getUserInterestSlugs, requireUser } from "@/lib/auth/session";
import { createClient } from "@/lib/supabase/server";
import Link from "next/link";

export const metadata = { title: "Settings" };

export default async function SettingsPage({
  searchParams,
}: {
  searchParams: Promise<{ edit?: string }>;
}) {
  const params = await searchParams;
  const { user } = await requireUser();
  const profile = await getProfile(user.id);
  const interests = await getUserInterestSlugs(user.id);
  const supabase = await createClient();
  const { data: sources } = await supabase
    .from("content_sources")
    .select("key, name, last_synced_at, last_sync_status, last_sync_error")
    .order("name");

  if (params.edit === "onboarding") {
    return (
      <div className="space-y-4">
        <h1 className="text-2xl font-semibold">Update preferences</h1>
        <OnboardingWizard initialName={profile?.full_name} />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl space-y-8">
      <div>
        <h1 className="text-3xl font-semibold tracking-tight">Settings</h1>
        <p className="mt-2 text-[color:var(--muted-foreground)]">
          Manage your profile, recommendations, and account.
        </p>
      </div>

      <SettingsForm
        profile={{
          fullName: profile?.full_name ?? "",
          bio: profile?.bio ?? "",
          showGamification: profile?.show_gamification ?? true,
          githubUrl: profile?.github_url ?? "",
          linkedinUrl: profile?.linkedin_url ?? "",
          websiteUrl: profile?.website_url ?? "",
        }}
      />

      <section className="card-surface space-y-3 p-5">
        <h2 className="font-semibold">Interests</h2>
        <p className="text-sm text-[color:var(--muted-foreground)]">
          Current: {interests.join(", ") || "None selected"}
        </p>
        <Link href="/settings?edit=onboarding">
          <Button variant="outline">Change interests & preferences</Button>
        </Link>
      </section>

      <section className="card-surface space-y-3 p-5">
        <h2 className="font-semibold">Content source status</h2>
        <div className="space-y-2 text-sm">
          {(sources ?? []).map((s) => (
            <div key={s.key} className="flex items-start justify-between gap-3 border-b border-[color:var(--border)] py-2 last:border-0">
              <div>
                <p className="font-medium">{s.name}</p>
                <p className="text-[color:var(--muted-foreground)]">
                  {s.last_sync_status || "never synced"}
                  {s.last_sync_error ? ` · ${s.last_sync_error}` : ""}
                </p>
              </div>
              <p className="text-xs text-[color:var(--muted-foreground)]">
                {s.last_synced_at ? new Date(s.last_synced_at).toLocaleString() : "—"}
              </p>
            </div>
          ))}
        </div>
      </section>

      <SignOutButton />
    </div>
  );
}
