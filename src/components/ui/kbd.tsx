export function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd
      className="inline-flex items-center gap-0.5 rounded-[var(--radius-xs)] border px-1.5 py-0.5 font-mono text-[0.75rem] font-medium"
      style={{
        backgroundColor: "var(--surface-3)",
        borderColor: "var(--line)",
        color: "var(--text-3)",
      }}
    >
      {children}
    </kbd>
  );
}
