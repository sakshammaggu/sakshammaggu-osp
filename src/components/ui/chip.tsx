type ChipVariant = "skill" | "readout" | "status" | "highlighted";

interface ChipProps {
  variant?: ChipVariant;
  children: React.ReactNode;
  className?: string;
  icon?: React.ReactNode;
  pulsing?: boolean;
}

const variantStyles: Record<ChipVariant, string> = {
  skill:
    "h-7 px-3 rounded-full text-xs font-mono bg-[var(--surface-3)] border border-[var(--line-subtle)] text-[var(--text-2)] hover:border-[var(--accent-line)] hover:text-[var(--text-1)]",
  readout:
    "px-2 py-1 rounded-[var(--radius-xs)] text-[0.75rem] font-mono uppercase tracking-[0.08em] text-[var(--text-3)] border border-[var(--line)]",
  status:
    "h-7 px-3 rounded-full text-xs font-mono text-[var(--text-2)] bg-[var(--surface-1)] border border-[var(--line-subtle)] inline-flex items-center gap-2",
  highlighted:
    "h-7 px-3 rounded-full text-xs font-mono bg-[var(--accent-subtle)] border border-[var(--accent-line)] text-[var(--accent)]",
};

export function Chip({
  variant = "skill",
  children,
  className = "",
  icon,
  pulsing = false,
}: ChipProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 transition-colors ${variantStyles[variant]} ${className}`}
      style={{ transitionDuration: "var(--dur-base)" }}
    >
      {variant === "status" && (
        <span
          className={`w-1.5 h-1.5 rounded-full bg-[var(--accent)] ${pulsing ? "animate-pulse" : ""}`}
        />
      )}
      {icon && <span className="w-3.5 h-3.5 opacity-70">{icon}</span>}
      {children}
    </span>
  );
}
