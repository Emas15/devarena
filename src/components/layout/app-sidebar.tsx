"use client";

import { ThemeToggle } from "@/components/layout/theme-toggle";
import { NAV_ITEMS, APP_NAME } from "@/lib/constants";
import { cn } from "@/lib/utils";
import {
  Bookmark,
  BookOpen,
  Home,
  Map,
  MessageSquare,
  PenSquare,
  Settings,
  Trophy,
  User,
  Users,
  Video,
  X,
} from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const ICONS = {
  Home,
  BookOpen,
  MessageSquare,
  Video,
  Map,
  Users,
  Bookmark,
  PenSquare,
  Trophy,
  User,
  Settings,
} as const;

export function AppSidebar({
  open,
  onClose,
  userName,
}: {
  open?: boolean;
  onClose?: () => void;
  userName?: string | null;
}) {
  const pathname = usePathname();

  return (
    <>
      {open ? (
        <button
          type="button"
          aria-label="Close menu"
          className="fixed inset-0 z-40 bg-black/40 lg:hidden"
          onClick={onClose}
        />
      ) : null}

      <aside
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-[color:var(--border)] bg-[color:var(--sidebar)] text-[color:var(--sidebar-foreground)] transition-transform lg:static lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="flex h-16 items-center justify-between px-5">
          <Link href="/home" className="flex items-center gap-2 font-semibold tracking-tight">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[color:var(--accent)] text-[color:var(--accent-foreground)] text-sm">
              DA
            </span>
            {APP_NAME}
          </Link>
          <button
            type="button"
            className="lg:hidden rounded-lg p-2 hover:bg-[color:var(--muted)]"
            onClick={onClose}
            aria-label="Close sidebar"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
          {NAV_ITEMS.map((item) => {
            const Icon = ICONS[item.icon as keyof typeof ICONS];
            const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={onClose}
                className={cn(
                  "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                  active
                    ? "bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
                    : "text-[color:var(--muted-foreground)] hover:bg-[color:var(--muted)] hover:text-[color:var(--foreground)]"
                )}
              >
                {Icon ? <Icon className="h-4 w-4 shrink-0" /> : null}
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-[color:var(--border)] p-4 flex items-center justify-between gap-2">
          <div className="min-w-0">
            <p className="truncate text-sm font-medium">{userName || "Learner"}</p>
            <p className="text-xs text-[color:var(--muted-foreground)]">Keep building</p>
          </div>
          <ThemeToggle />
        </div>
      </aside>
    </>
  );
}
