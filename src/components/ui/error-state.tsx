import { Button } from "@/components/ui/button";
import { AlertTriangle } from "lucide-react";

export function ErrorState({
  title = "Something went wrong",
  description,
  onRetry,
}: {
  title?: string;
  description?: string;
  onRetry?: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center rounded-xl border border-[color:var(--danger)]/30 bg-[color:var(--card)] px-6 py-12 text-center">
      <AlertTriangle className="mb-3 h-8 w-8 text-[color:var(--danger)]" />
      <h3 className="font-semibold">{title}</h3>
      {description ? (
        <p className="mt-2 max-w-md text-sm text-[color:var(--muted-foreground)]">{description}</p>
      ) : null}
      {onRetry ? (
        <Button variant="outline" className="mt-4" onClick={onRetry}>
          Try again
        </Button>
      ) : null}
    </div>
  );
}
