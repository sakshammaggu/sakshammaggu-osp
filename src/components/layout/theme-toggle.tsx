"use client";

import { useTheme } from "next-themes";
import { Sun, Moon, Monitor } from "lucide-react";
import { useEffect, useState } from "react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <button
        className="w-10 h-10 rounded-[10px] inline-flex items-center justify-center"
        style={{ color: "var(--text-2)" }}
        aria-label="Toggle theme"
      >
        <Monitor className="w-4 h-4" />
      </button>
    );
  }

  const cycleTheme = () => {
    if (theme === "system") setTheme("light");
    else if (theme === "light") setTheme("dark");
    else setTheme("system");
  };

  const icon =
    theme === "light" ? (
      <Sun className="w-4 h-4" />
    ) : theme === "dark" ? (
      <Moon className="w-4 h-4" />
    ) : (
      <Monitor className="w-4 h-4" />
    );

  const label =
    theme === "light"
      ? "Switch to dark"
      : theme === "dark"
        ? "Switch to system"
        : "Switch to light";

  return (
    <button
      onClick={cycleTheme}
      className="w-10 h-10 rounded-[10px] inline-flex items-center justify-center transition-colors hover:bg-[var(--surface-3)] cursor-pointer"
      style={{
        color: "var(--text-2)",
        transitionDuration: "var(--dur-base)",
      }}
      aria-label={label}
      title={label}
    >
      {icon}
    </button>
  );
}
