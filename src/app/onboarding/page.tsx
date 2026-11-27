import { OnboardingWizard } from "@/components/onboarding/onboarding-wizard";
import { requireUser, getProfile } from "@/lib/auth/session";
import { redirect } from "next/navigation";

export const metadata = { title: "Onboarding" };

export default async function OnboardingPage() {
  const { user } = await requireUser();
  const profile = await getProfile(user.id);
  if (profile?.onboarding_completed) redirect("/home");

  return (
    <div className="min-h-screen px-4 py-10 md:py-16">
      <OnboardingWizard initialName={profile?.full_name} />
    </div>
  );
}
