export function Skeleton({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse rounded-[var(--radius-md)] ${className}`}
      style={{ backgroundColor: "var(--surface-3)" }}
    />
  );
}
