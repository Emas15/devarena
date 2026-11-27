import { AppShell } from "@/components/layout/app-shell";
import { getProfile, requireUser } from "@/lib/auth/session";
import { isDemoMode } from "@/lib/demo/mode";

export default async function AppLayout({ children }: { children: React.ReactNode }) {
  const { user } = await requireUser();
  const profile = await getProfile(user.id);

  return (
    <AppShell
      userName={profile?.full_name || profile?.username}
      demoMode={isDemoMode()}
    >
      {children}
    </AppShell>
  );
}
