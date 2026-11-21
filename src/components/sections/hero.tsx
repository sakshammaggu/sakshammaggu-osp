"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight, FileDown, Mail } from "lucide-react";
import siteConfig from "@/content/site";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/icons";

export function HeroSection() {
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

  return (
    <section
      id="hero"
      className="relative min-h-[min(100svh,880px)] flex flex-col justify-center overflow-hidden pt-28 pb-16"
    >
      {/* Background aura and dot-grid */}
      <div
        className="pointer-events-none absolute inset-0 hero-aura"
        aria-hidden="true"
      />
      <div
        className="pointer-events-none absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_40%,#000_60%,transparent_100%)]"
        aria-hidden="true"
      />

      <div className="container-main relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: 7 cols */}
          <div className="lg:col-span-7 flex flex-col items-start">
            {/* Status line */}
            <div className="flex flex-wrap items-center gap-2 mb-6 text-xs font-mono">
              <Chip variant="status" pulsing>
                {siteConfig.status}
              </Chip>
              <span className="text-[var(--text-4)]">·</span>
              <span className="text-[var(--text-3)] uppercase tracking-[0.08em] font-medium">
                {siteConfig.location} {timeStr || "14:32 IST"}
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-[clamp(2.25rem,5vw+1rem,4.75rem)] font-semibold tracking-[-0.03em] leading-[1.06] text-[var(--text-1)] mb-6">
              {siteConfig.name} <br />
              builds{" "}
              <span className="font-serif italic text-gradient inline-block" style={{ fontSize: "1.06em" }}>
                systems
              </span>{" "}
              that <br />
              hold under load.
            </h1>

            {/* Positioning text */}
            <p className="max-w-[560px] text-base md:text-lg text-[var(--text-2)] leading-relaxed mb-8">
              Software Engineer at Dell Technologies. Architecting high-availability
              infrastructure, distributed clusters, and edge networking systems.
            </p>

            {/* CTAs */}
            <div className="flex flex-wrap items-center gap-4 mb-8">
              <Button
                variant="primary"
                onClick={() => {
                  document.getElementById("work")?.scrollIntoView({ behavior: "smooth" });
                }}
              >
                <span className="flex items-center gap-2">
                  View selected work <ArrowRight className="w-4 h-4" />
                </span>
              </Button>
              <Button href="/resume" variant="secondary">
                <span className="flex items-center gap-2">
                  Résumé <FileDown className="w-4 h-4" />
                </span>
              </Button>
            </div>

            {/* Socials icon row */}
            <div className="flex items-center gap-3 pt-2">
              <a
                href="https://github.com/sakshammaggu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[10px] flex items-center justify-center border border-[var(--line-subtle)] bg-[var(--surface-1)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[var(--accent-line)] hover:bg-[var(--surface-3)] transition-all"
                title="GitHub"
                aria-label="GitHub Profile"
              >
                <GithubIcon className="w-4 h-4" />
              </a>
              <a
                href="https://linkedin.com/in/sakshammaggu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[10px] flex items-center justify-center border border-[var(--line-subtle)] bg-[var(--surface-1)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[var(--accent-line)] hover:bg-[var(--surface-3)] transition-all"
                title="LinkedIn"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-4 h-4" />
              </a>
              <a
                href="https://leetcode.com/sakshammaggu"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-[10px] flex items-center justify-center border border-[var(--line-subtle)] bg-[var(--surface-1)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[var(--accent-line)] hover:bg-[var(--surface-3)] transition-all"
                title="LeetCode"
                aria-label="LeetCode Profile"
              >
                <LeetcodeIcon className="w-4 h-4" />
              </a>
              <a
                href={`mailto:${siteConfig.email}`}
                className="w-10 h-10 rounded-[10px] flex items-center justify-center border border-[var(--line-subtle)] bg-[var(--surface-1)] text-[var(--text-2)] hover:text-[var(--text-1)] hover:border-[var(--accent-line)] hover:bg-[var(--surface-3)] transition-all"
                title="Email"
                aria-label="Send Email"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Right Column: 5 cols (Portrait Card) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <div className="relative w-full max-w-[340px] aspect-[4/5] rounded-[var(--radius-xl)] p-1 bg-gradient-to-br from-[var(--surface-3)] to-[var(--surface-1)] shadow-2xl transition-all duration-300 hover:scale-[1.01] group">
              {/* Bezel frame */}
              <div
                className="w-full h-full rounded-[22px] overflow-hidden relative border border-[var(--line-strong)] flex flex-col justify-end"
                style={{
                  background: "var(--surface-2)",
                  boxShadow: "var(--shadow-md)",
                }}
              >
                {/* Official Badge Photo */}
                <Image
                  src="/saksham-maggu-badge-photo.jpg"
                  alt="Saksham Maggu - Software Engineer"
                  fill
                  priority
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 340px"
                />

                {/* Subtle vignette/gradient overlay for bottom readability */}
                <div className="absolute inset-0 bg-gradient-to-t from-[var(--bg-0)] via-transparent to-transparent opacity-80 pointer-events-none" />

                {/* Top Badge: System Engineer */}
                <div className="absolute top-4 left-4 z-20 flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[var(--surface-1)]/85 backdrop-blur-md border border-[var(--accent-line)]/50 text-[var(--accent)] font-mono text-[10px] uppercase font-semibold shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]" />
                  <span>ENGINEER ID · DELL</span>
                </div>

                {/* Overlapping "currently" badge at bottom */}
                <div className="relative z-20 p-4">
                  <div className="rounded-[var(--radius-md)] border border-[var(--line-subtle)] bg-[var(--surface-1)]/95 backdrop-blur-md px-3.5 py-2.5 shadow-md flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-[var(--copper)] animate-pulse" />
                      <span className="font-mono text-xs text-[var(--text-2)]">
                        now: <strong className="text-[var(--text-1)] font-medium">AI Solutions @ Dell</strong>
                      </span>
                    </div>
                    <span className="font-mono text-[0.65rem] text-[var(--text-3)] uppercase">
                      17G / k8s
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Signal trace line across bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-6 overflow-hidden pointer-events-none">
        <svg
          className="w-full h-full"
          preserveAspectRatio="none"
          viewBox="0 0 1200 24"
          fill="none"
        >
          <path
            d="M0 12 L450 12 L470 4 L485 20 L500 8 L515 16 L530 12 L1200 12"
            stroke="var(--accent)"
            strokeOpacity="0.25"
            strokeWidth="1.2"
          />
          {/* Animated copper pulse circle */}
          <circle r="3" fill="var(--copper)">
            <animateMotion
              path="M0 12 L450 12 L470 4 L485 20 L500 8 L515 16 L530 12 L1200 12"
              dur="6s"
              repeatCount="indefinite"
            />
          </circle>
        </svg>
      </div>
    </section>
  );
}
