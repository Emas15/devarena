"use client";

import { AppSidebar } from "@/components/layout/app-sidebar";
import { GlobalSearch } from "@/components/layout/global-search";
import { Button } from "@/components/ui/button";
import { Menu } from "lucide-react";
import { ReactNode, useState } from "react";

export function AppShell({
  children,
  userName,
  demoMode = false,
}: {
  children: ReactNode;
  userName?: string | null;
  demoMode?: boolean;
}) {
  const [open, setOpen] = useState(false);

  return (
    <div className="flex min-h-screen">
      <AppSidebar open={open} onClose={() => setOpen(false)} userName={userName} />
      <div className="flex min-w-0 flex-1 flex-col">
        {demoMode ? (
          <div className="bg-[color:var(--accent)] px-4 py-2 text-center text-sm font-medium text-[color:var(--accent-foreground)]">
            Preview mode — no Supabase. Click Refresh feed to pull live DEV/HN/Medium (and Reddit/YouTube if keys are in .env.local).
          </div>
        ) : null}
        <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-[color:var(--border)] bg-[color:var(--background)]/80 px-4 backdrop-blur-md lg:px-8">
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setOpen(true)}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </Button>
          <GlobalSearch />
        </header>
        <main className="relative z-10 flex-1 px-4 py-6 lg:px-8 lg:py-8">{children}</main>
      </div>
    </div>
  );
}
