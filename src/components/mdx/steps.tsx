import React from "react";

interface StepItem {
  title: string;
  description: React.ReactNode;
}

export function Steps({ items }: { items: StepItem[] }) {
  return (
    <div className="my-8 relative pl-8 space-y-8">
      {/* Connecting hairline */}
      <div
        className="absolute left-[11px] top-3 bottom-3 w-[1px]"
        style={{ background: "var(--line-strong)" }}
      />

      {items.map((item, idx) => (
        <div key={idx} className="relative group">
          {/* Number node */}
          <div className="absolute -left-8 top-0 w-6 h-6 rounded-full border border-[var(--accent)] bg-[var(--surface-2)] flex items-center justify-center font-mono text-[0.65rem] font-bold text-[var(--accent)] select-none">
            {idx + 1}
          </div>

          <div>
            <h4 className="text-base font-semibold text-[var(--text-1)] mb-1.5">
              {item.title}
            </h4>
            <div className="text-xs md:text-sm text-[var(--text-2)] leading-relaxed">
              {item.description}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
