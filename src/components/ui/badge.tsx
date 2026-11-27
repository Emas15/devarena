import { cn } from "@/lib/utils";
import { HTMLAttributes } from "react";

export function Badge({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-md px-2 py-0.5 text-xs font-medium bg-[color:var(--muted)] text-[color:var(--muted-foreground)]",
        className
      )}
      {...props}
    />
  );
}
