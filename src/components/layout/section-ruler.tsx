"use client";

import React, { useEffect, useState } from "react";

interface Section {
  id: string;
  num: string;
  label: string;
}

const sections: Section[] = [
  { id: "hero", num: "00", label: "HERO" },
  { id: "readout", num: "01", label: "READOUT" },
  { id: "work", num: "02", label: "WORK" },
  { id: "experience", num: "03", label: "EXPERIENCE" },
  { id: "skills", num: "04", label: "SKILLS" },
  { id: "writing", num: "05", label: "WRITING" },
  { id: "achievements", num: "06", label: "ACHIEVEMENTS" },
  { id: "about", num: "07", label: "ABOUT" },
  { id: "contact", num: "08", label: "CONTACT" },
];

export function SectionRuler() {
  const [activeId, setActiveId] = useState<string>("hero");
  const [isHome, setIsHome] = useState(true);

  useEffect(() => {
    setIsHome(window.location.pathname === "/");

    const handleScroll = () => {
      const scrollPos = window.scrollY + window.innerHeight * 0.35;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPos >= top && scrollPos < top + height) {
            setActiveId(section.id);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isHome) return null;

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <aside
      className="hidden min-[1380px]:flex fixed top-1/2 -translate-y-1/2 z-[var(--z-sticky)] flex-col items-start select-none pointer-events-auto"
      style={{
        left: "max(16px, calc((100vw - 1240px) / 2 - 56px))",
        width: "48px",
      }}
      aria-label="Section ruler"
    >
      <div className="relative flex flex-col items-start gap-3">
        {/* Continuous hairline track */}
        <div
          className="absolute left-0 top-2 bottom-2 w-[1px]"
          style={{ background: "var(--line-subtle)" }}
        />

        {sections.map((section, idx) => {
          const isActive = activeId === section.id;
          return (
            <React.Fragment key={section.id}>
              <button
                onClick={() => scrollTo(section.id)}
                className="group relative flex items-center gap-2 py-0.5 text-left cursor-pointer outline-none"
                title={`${section.num} · ${section.label}`}
              >
                {/* Major Tick line */}
                <span
                  className="relative z-10 block transition-all"
                  style={{
                    height: "1px",
                    width: isActive ? "16px" : "8px",
                    backgroundColor: isActive
                      ? "var(--copper)"
                      : "var(--text-4)",
                    transitionDuration: "var(--dur-base)",
                  }}
                />

                {/* Number indicator */}
                <span
                  className="font-mono text-[0.65rem] tabular-nums transition-colors"
                  style={{
                    color: isActive ? "var(--copper)" : "transparent",
                    fontWeight: isActive ? 600 : 400,
                    transitionDuration: "var(--dur-base)",
                  }}
                >
                  {section.num}
                </span>
              </button>

              {/* Minor Tick Mark between sections */}
              {idx < sections.length - 1 && (
                <div
                  className="w-1.5 h-[1px] bg-[var(--line-subtle)] my-0.5"
                  aria-hidden="true"
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    </aside>
  );
}
