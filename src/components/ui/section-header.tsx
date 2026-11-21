import React from "react";

interface SectionHeaderProps {
  number: string;
  label: string;
  heading: string;
  emphasisWord: string;
  description?: string;
  rightAction?: React.ReactNode;
}

export function SectionHeader({
  number,
  label,
  heading,
  emphasisWord,
  description,
  rightAction,
}: SectionHeaderProps) {
  // Split heading around emphasis word
  const parts = heading.split(emphasisWord);
  const before = parts[0] ?? "";
  const after = parts.slice(1).join(emphasisWord);

  return (
    <div className="w-full mb-12 md:mb-16">
      {/* Numeral + Hairline Divider across full container width */}
      <div className="flex items-center gap-4 mb-3">
        <span
          className="text-gradient font-mono text-xs md:text-sm font-semibold tabular-nums tracking-wider"
          style={{ fontFeatureSettings: '"tnum"' }}
        >
          {number}
        </span>
        <div
          className="flex-1 h-[1px]"
          style={{
            background: "var(--divider)",
          }}
        />
      </div>

      {/* Micro label badge */}
      <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[var(--surface-2)] border border-[var(--accent-line)]/50 text-[var(--accent)] font-mono text-[0.7rem] uppercase tracking-[0.12em] font-semibold mb-3 shadow-xs">
        <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]" />
        <span>{label}</span>
      </div>

      {/* Heading row with optional right action */}
      <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
        <div>
          <h2 className="text-[clamp(1.75rem,2.5vw+1rem,2.75rem)] font-semibold leading-[1.1] tracking-[-0.02em] text-[var(--text-1)]">
            {before}
            <span
              className="font-serif italic text-gradient"
              style={{ fontSize: "1.08em" }}
            >
              {emphasisWord}
            </span>
            {after}
          </h2>

          {/* Description */}
          {description && (
            <p className="mt-3 max-w-[56ch] text-sm md:text-base text-[var(--text-2)] leading-relaxed">
              {description}
            </p>
          )}
        </div>

        {rightAction && <div className="shrink-0 mb-1">{rightAction}</div>}
      </div>
    </div>
  );
}
