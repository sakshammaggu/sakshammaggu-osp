"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowUp, Mail } from "lucide-react";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/icons";
import siteConfig from "@/content/site";
import { ThemeToggle } from "./theme-toggle";

export function Footer() {
  const [timeStr, setTimeStr] = useState("");

  useEffect(() => {
    const updateTime = () => {
      try {
        const now = new Date();
        const ist = new Intl.DateTimeFormat("en-GB", {
          timeZone: "Asia/Kolkata",
          hour: "2-digit",
          minute: "2-digit",
          hour12: false,
        }).format(now);
        setTimeStr(`${ist} IST`);
      } catch {
        setTimeStr("IST");
      }
    };
    updateTime();
    const interval = setInterval(updateTime, 10000);
    return () => clearInterval(interval);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className="w-full border-t border-[var(--line-subtle)] bg-[var(--bg-0)] pt-20 pb-12 transition-colors">
      <div className="container-main">
        {/* Large closing statement */}
        <div className="mb-16 pb-12 border-b border-[var(--line-subtle)]">
          <p className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-3">
            09 · SIGN OFF
          </p>
          <h2 className="text-[clamp(2rem,4vw+1rem,3.5rem)] font-semibold tracking-[-0.03em] leading-tight text-[var(--text-1)]">
            Let&apos;s build something{" "}
            <span className="font-serif italic text-gradient" style={{ fontSize: "1.08em" }}>
              precise
            </span>
            .
          </h2>
        </div>

        {/* 3 columns */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-16 text-sm">
          {/* Col 1: Site */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-4">
              Site Navigation
            </h4>
            <ul className="space-y-2.5">
              <li>
                <Link href="#work" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="#experience" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
                  Experience & Roles
                </Link>
              </li>
              <li>
                <Link href="#skills" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
                  Skill Matrix
                </Link>
              </li>
              <li>
                <Link href="#writing" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
                  Engineering Notes
                </Link>
              </li>
              <li>
                <Link href="/projects" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
                  Personal Projects
                </Link>
              </li>
              <li>
                <Link href="/open-source" className="text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors">
                  Open Source Repositories
                </Link>
              </li>
              <li>
                <Link href="/resume" className="text-[var(--accent)] hover:underline transition-colors">
                  View Résumé ↗
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 2: Elsewhere */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-4">
              Elsewhere
            </h4>
            <ul className="space-y-2.5 font-mono text-xs">
              <li>
                <a
                  href="https://github.com/sakshammaggu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
                >
                  <GithubIcon className="w-3.5 h-3.5" /> github.com/sakshammaggu
                </a>
              </li>
              <li>
                <a
                  href="https://linkedin.com/in/sakshammaggu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
                >
                  <LinkedinIcon className="w-3.5 h-3.5" /> linkedin.com/in/sakshammaggu
                </a>
              </li>
              <li>
                <a
                  href="https://leetcode.com/sakshammaggu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
                >
                  <LeetcodeIcon className="w-3.5 h-3.5" /> leetcode.com/sakshammaggu
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="inline-flex items-center gap-2 text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
                >
                  <Mail className="w-3.5 h-3.5" /> {siteConfig.email}
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Meta */}
          <div>
            <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-4">
              Instrument Details
            </h4>
            <div className="space-y-2.5 text-xs text-[var(--text-2)]">
              <p>Designed under the Patina Instrument specification.</p>
              <p className="font-mono text-[var(--text-3)]">
                Next.js 16 App Router · Tailwind CSS v4 · Shiki · Geist
              </p>
              <div className="pt-2 flex items-center gap-3">
                <button
                  onClick={scrollToTop}
                  className="inline-flex items-center gap-1.5 font-mono text-xs text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors cursor-pointer"
                >
                  <ArrowUp className="w-3.5 h-3.5" /> Back to top
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom hairline row */}
        <div className="pt-8 border-t border-[var(--line-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono text-[var(--text-3)]">
          <div>
            © 2026 {siteConfig.name}. All rights reserved.
          </div>
          <div className="flex items-center gap-4">
            <span>Bengaluru · {timeStr || "14:30 IST"}</span>
            <span className="text-[var(--line-strong)]">|</span>
            <ThemeToggle />
          </div>
        </div>
      </div>
    </footer>
  );
}
