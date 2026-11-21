"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Award, GraduationCap, Server, ShieldCheck } from "lucide-react";

interface LedgerEntry {
  year: string;
  title: string;
  issuer: string;
  category: "academic" | "award" | "certification" | "competition";
  tag: string;
  highlight?: boolean;
}

const ledgerItems: LedgerEntry[] = [
  {
    year: "2026",
    title: "Software Engineer 1 Appointment — AI Infrastructure",
    issuer: "Dell Technologies",
    category: "award",
    tag: "ROLE",
    highlight: true,
  },
  {
    year: "2026",
    title: "B.Tech Computer Science & Engineering (Full Stack AI) — 8.55 CGPA",
    issuer: "UPES Dehradun",
    category: "academic",
    tag: "DEGREE",
    highlight: true,
  },
  {
    year: "2026",
    title: "Dell Edge Solutions WiFi-PSK & Spec-Driven API Architecture",
    issuer: "Dell Technologies (Winter)",
    category: "award",
    tag: "ENG",
    highlight: true,
  },
  {
    year: "2025",
    title: "NativeEdge High-Availability 64-Node Scaling Algorithm",
    issuer: "Dell NativeEdge Team",
    category: "award",
    tag: "SYS",
  },
  {
    year: "2024",
    title: "Production Verification Platform Architecture for 30+ Active Users",
    issuer: "Dehix Freelancer Network",
    category: "certification",
    tag: "WEB",
  },
  {
    year: "2024",
    title: "CpuVis — Process Scheduling Architecture Visualizer",
    issuer: "Open Source / Systems",
    category: "competition",
    tag: "OSS",
  },
];

export function AchievementsSection() {
  const [activeFilter, setActiveFilter] = useState<string>("all");

  const filtered = ledgerItems.filter((item) => {
    if (activeFilter === "all") return true;
    return item.category === activeFilter;
  });

  return (
    <section id="achievements" className="section-padding bg-[var(--bg-0)]">
      <div className="container-main">
        {/* Section Header */}
        <SectionHeader
          number="06"
          label="ACHIEVEMENTS & LEDGER"
          heading="Milestones and verified record."
          emphasisWord="verified"
          description="Academic honors, engineering appointments, and production architectural deliverables."
        />

        {/* 3 Highlight Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          <Card className="!p-6 flex flex-col justify-between" interactive>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--copper-subtle)] border border-[var(--copper-line)] flex items-center justify-center shrink-0">
                <Server className="w-6 h-6 text-[var(--copper)]" />
              </div>
              <div>
                <span className="font-mono text-[0.65rem] uppercase text-[var(--text-3)] block">
                  APPOINTMENT · 2026
                </span>
                <h4 className="text-base font-semibold text-[var(--text-1)]">
                  Software Engineer 1
                </h4>
              </div>
            </div>
            <p className="text-xs text-[var(--text-2)] leading-relaxed">
              Dell Technologies AI Solutions Infrastructure stack for iDRAC10 (17G) servers and K8s.
            </p>
          </Card>

          <Card className="!p-6 flex flex-col justify-between" interactive>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--accent-subtle)] border border-[var(--accent-line)] flex items-center justify-center shrink-0">
                <GraduationCap className="w-6 h-6 text-[var(--accent)]" />
              </div>
              <div>
                <span className="font-mono text-[0.65rem] uppercase text-[var(--text-3)] block">
                  ACADEMIC · 2022–2026
                </span>
                <h4 className="text-base font-semibold text-[var(--text-1)]">
                  8.55 / 10 CGPA
                </h4>
              </div>
            </div>
            <p className="text-xs text-[var(--text-2)] leading-relaxed">
              UPES Dehradun B.Tech in Computer Science and Engineering with Full Stack AI specialization.
            </p>
          </Card>

          <Card className="!p-6 flex flex-col justify-between" interactive>
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-[var(--radius-md)] bg-[var(--surface-3)] border border-[var(--line-strong)] flex items-center justify-center shrink-0">
                <ShieldCheck className="w-6 h-6 text-[var(--accent-hover)]" />
              </div>
              <div>
                <span className="font-mono text-[0.65rem] uppercase text-[var(--text-3)] block">
                  ALGORITHM · 2025
                </span>
                <h4 className="text-base font-semibold text-[var(--text-1)]">
                  64-Node HA Engine
                </h4>
              </div>
            </div>
            <p className="text-xs text-[var(--text-2)] leading-relaxed">
              NativeEdge cluster scaling algorithm from 3-4 nodes to 8+ nodes up to 64 nodes.
            </p>
          </Card>
        </div>

        {/* Ledger Filter Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-6 pt-4 border-t border-[var(--line-subtle)]">
          <span className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] font-medium">
            Chronological Ledger
          </span>

          <div className="inline-flex gap-1.5 flex-wrap">
            {[
              { id: "all", label: "All" },
              { id: "academic", label: "Academic" },
              { id: "award", label: "Roles & Honors" },
              { id: "certification", label: "Platform" },
              { id: "competition", label: "Open Source" },
            ].map((f) => (
              <button
                key={f.id}
                type="button"
                suppressHydrationWarning
                onClick={() => setActiveFilter(f.id)}
                className={`px-3 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                  activeFilter === f.id
                    ? "bg-[var(--surface-3)] text-[var(--text-1)] border border-[var(--accent-line)]"
                    : "text-[var(--text-3)] hover:text-[var(--text-1)]"
                }`}
              >
                {f.label}
              </button>
            ))}
          </div>
        </div>

        {/* Ledger Table / Rows */}
        <Card className="!p-0 overflow-hidden divide-y divide-[var(--line-subtle)]">
          {filtered.map((item, idx) => (
            <div
              key={idx}
              className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:px-6 hover:bg-[var(--surface-3)]/60 transition-colors gap-2 sm:gap-4 font-mono text-xs"
            >
              <div className="flex items-center gap-3 sm:max-w-[60%]">
                <span className="text-[var(--copper)] font-semibold w-12 shrink-0 tabular-nums">
                  {item.year}
                </span>
                <span className="font-medium text-[var(--text-1)]">
                  {item.title}
                </span>
              </div>

              {/* Editorial Dotted Leader Line */}
              <div className="hidden sm:block flex-1 border-b border-dotted border-[var(--line-strong)] mx-4 mt-1 opacity-40 min-w-[24px]" />

              <div className="flex items-center justify-between sm:justify-end gap-4 text-[var(--text-3)] shrink-0">
                <span className="text-[0.72rem]">{item.issuer}</span>
                <Chip variant="readout">
                  {item.tag}
                </Chip>
              </div>
            </div>
          ))}
        </Card>

        <div className="mt-4 text-center">
          <span className="font-mono text-[0.68rem] text-[var(--text-4)]">
            // TODO(achievements): Additional hackathons, talks, or certifications can be appended via content/achievements.ts
          </span>
        </div>
      </div>
    </section>
  );
}
