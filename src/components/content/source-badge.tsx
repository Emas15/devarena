import { Badge } from "@/components/ui/badge";
import { SOURCE_LABELS } from "@/lib/constants";
import { cn } from "@/lib/utils";

const SOURCE_COLORS: Record<string, string> = {
  medium: "bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
  substack: "bg-orange-500/10 text-orange-700 dark:text-orange-300",
  devto: "bg-sky-500/10 text-sky-700 dark:text-sky-300",
  hashnode: "bg-blue-500/10 text-blue-700 dark:text-blue-300",
  hackernews: "bg-amber-500/10 text-amber-800 dark:text-amber-300",
  reddit: "bg-red-500/10 text-red-700 dark:text-red-300",
  youtube: "bg-rose-500/10 text-rose-700 dark:text-rose-300",
  devarena: "bg-[color:var(--accent-soft)] text-[color:var(--accent)]",
};

export function SourceBadge({ source, className }: { source: string; className?: string }) {
  return (
    <Badge className={cn(SOURCE_COLORS[source] ?? "", className)}>
      {SOURCE_LABELS[source] ?? source}
    </Badge>
  );
}
