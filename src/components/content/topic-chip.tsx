import { cn } from "@/lib/utils";
import Link from "next/link";

export function TopicChip({
  label,
  href,
  active,
  onClick,
  className,
}: {
  label: string;
  href?: string;
  active?: boolean;
  onClick?: () => void;
  className?: string;
}) {
  const classes = cn(
    "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors focus-ring",
    active
      ? "border-[color:var(--accent)] bg-[color:var(--accent-soft)] text-[color:var(--accent)]"
      : "border-[color:var(--border)] bg-[color:var(--card)] text-[color:var(--muted-foreground)] hover:border-[color:var(--accent)]/40 hover:text-[color:var(--foreground)]",
    className
  );

  if (href) {
    return (
      <Link href={href} className={classes}>
        {label}
      </Link>
    );
  }

  return (
    <button type="button" onClick={onClick} className={classes}>
      {label}
    </button>
  );
}
