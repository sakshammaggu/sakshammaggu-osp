"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Menu, X, Command } from "lucide-react";
import { ThemeToggle } from "./theme-toggle";

const navLinks = [
  { label: "Work", href: "/#work" },
  { label: "Projects", href: "/projects" },
  { label: "Open Source", href: "/open-source" },
  { label: "Experience", href: "/#experience" },
  { label: "Skills", href: "/#skills" },
  { label: "Writing", href: "/#writing" },
  { label: "About", href: "/#about" },
  { label: "Contact", href: "/#contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Track active section with IntersectionObserver
  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveSection(`#${entry.target.id}`);
          }
        }
      },
      { rootMargin: "-25% 0px -65% 0px" }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  const triggerCommandPalette = () => {
    document.dispatchEvent(
      new KeyboardEvent("keydown", { key: "k", metaKey: true, bubbles: true })
    );
  };

  return (
    <>
      <nav
        className="fixed top-3 sm:top-4 left-1/2 -translate-x-1/2 z-[var(--z-nav)] flex items-center justify-between gap-2 sm:gap-4 px-2.5 sm:px-4 py-1.5 rounded-full transition-all"
        style={{
          height: scrolled ? 48 : 54,
          backgroundColor: scrolled
            ? "color-mix(in srgb, var(--bg-0) 86%, transparent)"
            : "color-mix(in srgb, var(--bg-0) 74%, var(--surface-1) 26%)",
          backdropFilter: `blur(${scrolled ? 24 : 16}px) saturate(180%)`,
          WebkitBackdropFilter: `blur(${scrolled ? 24 : 16}px) saturate(180%)`,
          border: scrolled
            ? "1px solid color-mix(in srgb, var(--accent-line) 45%, var(--line) 55%)"
            : "1px solid color-mix(in srgb, var(--line) 75%, transparent)",
          boxShadow: scrolled
            ? "inset 0 1px 0 0 rgba(255, 255, 255, 0.08), 0 16px 40px -10px rgba(0, 0, 0, 0.6), 0 0 0 1px rgba(92, 196, 174, 0.12)"
            : "inset 0 1px 0 0 rgba(255, 255, 255, 0.05), 0 10px 30px -10px rgba(0, 0, 0, 0.45)",
          transitionDuration: "300ms",
          transitionTimingFunction: "cubic-bezier(0.16, 1, 0.3, 1)",
          width: "auto",
          maxWidth: "calc(100vw - 24px)",
        }}
      >
        {/* Monogram & Name Logo */}
        <Link
          href="/"
          className="group flex items-center gap-2.5 px-1.5 sm:px-2 py-1 rounded-full no-underline select-none transition-all duration-300 hover:bg-[var(--surface-3)]/40"
          aria-label="Saksham Maggu Home"
        >
          {/* Precision Engineering Monogram Emblem */}
          <div className="relative flex items-center justify-center w-7 h-7 sm:w-8 sm:h-8 rounded-[var(--radius-xs)] bg-gradient-to-br from-[var(--surface-3)] to-[var(--surface-1)] border border-[var(--accent-line)]/50 group-hover:border-[var(--accent)] shadow-[0_0_10px_rgba(92,196,174,0.15)] group-hover:shadow-[0_0_16px_rgba(92,196,174,0.35)] transition-all shrink-0">
            <span className="font-mono font-bold text-xs sm:text-[13px] tracking-tight text-[var(--accent)] group-hover:text-[var(--accent-hover)] transition-colors">
              SM
            </span>
            {/* Micro copper status dot accent */}
            <span className="absolute -top-[1px] -right-[1px] w-1.5 h-1.5 bg-[var(--copper)] rounded-full opacity-90 shadow-[0_0_4px_var(--copper)]" />
          </div>

          {/* Name with Dynamic Patina Gradient & Typography */}
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-sm sm:text-[15px] tracking-tight bg-gradient-to-r from-[var(--text-1)] via-[var(--accent-hover)] to-[var(--copper)] bg-clip-text text-transparent group-hover:brightness-110 transition-all font-sans">
              Saksham
            </span>
            <span className="font-medium text-sm sm:text-[15px] tracking-tight text-[var(--text-2)] group-hover:text-[var(--text-1)] transition-colors font-sans hidden min-[480px]:inline">
              Maggu
            </span>

            {/* Live Status Pulse Dot */}
            <span className="relative flex h-2 w-2 ml-0.5" title="Available for opportunities">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-[var(--accent)] opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-[var(--accent)]"></span>
            </span>
          </div>
        </Link>

        {/* Desktop Links: EXACT SAME COLOR for all section names from Work to Contact */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const anchor = link.href.replace("/", "");
            const isActive = activeSection === anchor;

            return (
              <a
                key={link.href}
                href={link.href}
                className={`relative px-2.5 xl:px-3 py-1.5 rounded-full text-xs xl:text-[13px] font-mono tracking-tight no-underline transition-all duration-200 inline-flex items-center justify-center border ${
                  isActive
                    ? "bg-[var(--surface-3)] border-[var(--accent-line)] font-semibold shadow-[0_0_12px_rgba(92,196,174,0.25)]"
                    : "border-transparent hover:bg-[var(--accent-subtle)] hover:border-[var(--accent-line)]/50"
                }`}
                style={{
                  color: isActive ? "var(--accent-hover)" : "var(--accent)",
                }}
              >
                {link.label}
                {isActive && (
                  <span
                    className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full"
                    style={{
                      backgroundColor: "var(--accent)",
                      boxShadow: "0 0 6px var(--accent)",
                    }}
                  />
                )}
              </a>
            );
          })}
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2 pl-1 sm:pl-2">
          {/* Cmd+K Palette Launcher */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={triggerCommandPalette}
            className="hidden md:inline-flex items-center gap-1.5 h-8 px-2.5 rounded-full text-[11px] font-mono transition-all cursor-pointer border border-[var(--accent-line)]/40 bg-[var(--surface-2)] text-[var(--accent)] hover:text-[var(--accent-hover)] hover:border-[var(--accent)] hover:bg-[var(--surface-3)] shadow-xs"
            title="Open Command Palette (⌘K)"
            aria-label="Open command palette"
          >
            <Command className="w-3.5 h-3.5 text-[var(--accent)]" />
            <span className="font-semibold text-[var(--accent)]">K</span>
          </button>

          <ThemeToggle />

          {/* Resume CTA button matching Accent */}
          <Link
            href="/resume"
            className="hidden sm:inline-flex items-center gap-1 h-8 px-3.5 rounded-full text-xs font-mono font-medium no-underline transition-all border border-[var(--accent-line)] bg-gradient-to-r from-[var(--surface-2)] to-[var(--surface-3)] text-[var(--accent)] hover:text-[var(--accent-hover)] hover:border-[var(--accent)] hover:shadow-[0_0_14px_rgba(92,196,174,0.25)]"
          >
            <span>Résumé</span>
            <span className="text-[var(--accent)] text-[10px]">↗</span>
          </Link>

          {/* Mobile menu toggle */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setMobileOpen(!mobileOpen)}
            className="lg:hidden w-8 h-8 rounded-full inline-flex items-center justify-center transition-colors cursor-pointer text-[var(--accent)] hover:text-[var(--accent-hover)] hover:bg-[var(--surface-3)] border border-[var(--accent-line)]/40 bg-[var(--surface-2)]/80"
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
          >
            {mobileOpen ? <X className="w-4 h-4 text-[var(--accent)]" /> : <Menu className="w-4 h-4 text-[var(--accent)]" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Fullscreen Drawer */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[var(--z-drawer)] lg:hidden flex flex-col pt-24 px-6 pb-8 bg-[var(--bg-0)]/98 backdrop-blur-2xl animate-in fade-in duration-200">
          {/* Drawer Top Bar */}
          <div className="flex items-center justify-between pb-6 border-b border-[var(--line-subtle)]">
            <div className="flex items-center gap-2">
              <div className="w-7 h-7 rounded-[var(--radius-xs)] bg-[var(--surface-2)] border border-[var(--accent-line)]/50 flex items-center justify-center font-mono font-bold text-xs text-[var(--accent)]">
                SM
              </div>
              <span className="font-semibold text-sm bg-gradient-to-r from-[var(--text-1)] via-[var(--accent)] to-[var(--copper)] bg-clip-text text-transparent">
                Saksham Maggu
              </span>
            </div>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setMobileOpen(false)}
              className="w-8 h-8 rounded-full border border-[var(--accent-line)]/40 bg-[var(--surface-2)] flex items-center justify-center text-[var(--accent)]"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Drawer Navigation Links: Same uniform color across every section */}
          <div className="flex flex-col gap-2 py-6 overflow-y-auto">
            {navLinks.map((link, idx) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="flex items-center justify-between text-xl font-semibold no-underline py-2.5 transition-colors border-b border-[var(--line-subtle)]/50 group hover:opacity-80"
                style={{ color: "var(--accent)" }}
              >
                <span className="flex items-center gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                  <span>{link.label}</span>
                </span>
                <span className="font-mono text-xs opacity-60 transition-colors">
                  0{idx + 1}
                </span>
              </a>
            ))}
            <Link
              href="/resume"
              onClick={() => setMobileOpen(false)}
              className="flex items-center justify-between text-lg font-semibold no-underline py-3 mt-2 hover:opacity-80"
              style={{ color: "var(--accent)" }}
            >
              <span className="flex items-center gap-2.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                <span>Curriculum Vitae</span>
              </span>
              <span className="font-mono text-xs opacity-80">PDF ↗</span>
            </Link>
          </div>

          {/* Drawer Footer */}
          <div className="mt-auto pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between font-mono text-xs text-[var(--text-3)]">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
              <span className="text-[var(--accent)]">BENGALURU · AVAILABLE</span>
            </div>
            <ThemeToggle />
          </div>
        </div>
      )}
    </>
  );
}
