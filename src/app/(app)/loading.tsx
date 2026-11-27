export default function AppLoading() {
  return (
    <div className="space-y-8" aria-busy="true" aria-label="Loading">
      <div className="space-y-3">
        <div className="h-8 w-56 max-w-full rounded-lg bg-[color:var(--muted)] animate-pulse" />
        <div className="h-4 w-80 max-w-full rounded bg-[color:var(--muted)] animate-pulse" />
      </div>
      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-20 rounded-xl bg-[color:var(--muted)] animate-pulse" />
        ))}
      </div>
      <div className="space-y-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="h-28 rounded-xl bg-[color:var(--muted)] animate-pulse" />
        ))}
      </div>
    </div>
  );
}
