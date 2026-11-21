import React from "react";
import { Info, CheckCircle2, AlertTriangle, AlertOctagon, Lightbulb } from "lucide-react";

type CalloutVariant = "note" | "tip" | "warning" | "danger" | "insight";

interface CalloutProps {
  variant?: CalloutVariant;
  title?: string;
  children: React.ReactNode;
}

const config: Record<
  CalloutVariant,
  { border: string; bg: string; icon: React.ReactNode; text: string; title: string }
> = {
  note: {
    border: "var(--accent)",
    bg: "var(--accent-subtle)",
    icon: <Info className="w-4 h-4 text-[var(--accent)]" />,
    text: "text-[var(--text-1)]",
    title: "NOTE",
  },
  tip: {
    border: "var(--success)",
    bg: "rgba(123, 196, 127, 0.10)",
    icon: <CheckCircle2 className="w-4 h-4 text-[var(--success)]" />,
    text: "text-[var(--text-1)]",
    title: "RECOMMENDATION",
  },
  warning: {
    border: "var(--warning)",
    bg: "rgba(229, 180, 84, 0.10)",
    icon: <AlertTriangle className="w-4 h-4 text-[var(--warning)]" />,
    text: "text-[var(--text-1)]",
    title: "CAUTION",
  },
  danger: {
    border: "var(--danger)",
    bg: "rgba(229, 115, 106, 0.10)",
    icon: <AlertOctagon className="w-4 h-4 text-[var(--danger)]" />,
    text: "text-[var(--text-1)]",
    title: "CRITICAL",
  },
  insight: {
    border: "var(--copper)",
    bg: "var(--copper-subtle)",
    icon: <Lightbulb className="w-4 h-4 text-[var(--copper)]" />,
    text: "text-[var(--text-1)]",
    title: "ARCHITECTURAL INSIGHT",
  },
};

export function Callout({ variant = "note", title, children }: CalloutProps) {
  const current = config[variant];

  return (
    <div
      className="my-6 rounded-[var(--radius-md)] p-4 md:p-5 relative overflow-hidden"
      style={{
        backgroundColor: current.bg,
        borderLeft: `3px solid ${current.border}`,
        borderTop: "1px solid var(--line-subtle)",
        borderRight: "1px solid var(--line-subtle)",
        borderBottom: "1px solid var(--line-subtle)",
      }}
    >
      <div className="flex items-center gap-2 mb-2 font-mono text-[0.68rem] uppercase tracking-wider font-semibold">
        {current.icon}
        <span style={{ color: current.border }}>{title || current.title}</span>
      </div>
      <div className={`text-xs md:text-sm leading-relaxed text-[var(--text-2)] ${current.text}`}>
        {children}
      </div>
    </div>
  );
}
