"use client";

import { useState } from "react";
import { getAllExperience } from "@/lib/content";
import type { Experience } from "@/lib/schemas";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Building2, Calendar, MapPin, ArrowRight } from "lucide-react";

export function ExperienceSection() {
  const experiences = getAllExperience();
  const [filter, setFilter] = useState<"all" | "full-time" | "internship">("all");
  const [selectedExp, setSelectedExp] = useState<Experience | null>(null);

  const filtered = experiences.filter((e) => {
    if (filter === "all") return true;
    return e.kind === filter;
  });

  return (
    <section id="experience" className="section-padding bg-[var(--bg-1)] border-t border-[var(--line-subtle)]">
      <div className="container-main">
        {/* Section Header with Filter Tabs as rightAction */}
        <SectionHeader
          number="03"
          label="EXPERIENCE & INTERNSHIPS"
          heading="Production roles and architecture."
          emphasisWord="roles"
          description="Engineering scalable distributed systems, network blueprints, and high-availability edge nodes."
          rightAction={
            <div className="inline-flex p-1 rounded-full border border-[var(--line-subtle)] bg-[var(--surface-1)]">
              {(["all", "full-time", "internship"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setFilter(tab)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono capitalize transition-all cursor-pointer ${
                    filter === tab
                      ? "bg-[var(--surface-3)] text-[var(--text-1)] shadow-sm font-semibold"
                      : "text-[var(--text-3)] hover:text-[var(--text-1)]"
                  }`}
                >
                  {tab === "all" ? "All Entries" : tab === "full-time" ? "Full-Time" : "Internships"}
                </button>
              ))}
            </div>
          }
        />

        {/* Timeline Container with exact mathematical alignment */}
        <div className="relative mt-8">
          {/* Continuous vertical axis line */}
          <div
            className="absolute top-4 bottom-4 w-[2px] left-[15px] md:left-[118px] pointer-events-none"
            style={{
              background: "linear-gradient(180deg, var(--accent) 0%, var(--line-strong) 80%, transparent 100%)",
            }}
          />

          {/* Timeline Entries */}
          <div className="space-y-10">
            {filtered.map((item) => {
              const isCurrent = item.end === "present";
              const isFullTime = item.kind === "full-time";

              return (
                <div key={item.slug} className="relative flex items-start">
                  {/* Desktop Year Label (Left of axis) */}
                  <div className="hidden md:block w-[100px] shrink-0 text-right pr-6 pt-3 font-mono text-xs font-semibold text-[var(--text-3)] tabular-nums">
                    {item.start.split(" ")[1] ?? item.start}
                  </div>

                  {/* Node Dot (Centered on 2px axis line: 8px left on mobile, 111px left on desktop) */}
                  <div
                    className={`absolute top-3.5 z-10 w-4 h-4 rounded-full flex items-center justify-center transition-all left-[8px] md:left-[111px] ${
                      isFullTime
                        ? "bg-[var(--accent)] ring-4 ring-[var(--accent-subtle)]"
                        : "border-2 border-[var(--accent)] bg-[var(--surface-1)]"
                    }`}
                  >
                    {isCurrent && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--copper)] animate-pulse" />
                    )}
                  </div>

                  {/* Card Body (Offset from axis) */}
                  <div className="flex-1 ml-9 md:ml-10">
                    <Card className="!p-6 md:!p-8" interactive>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3 mb-4">
                        <div>
                          {/* Role Title */}
                          <div className="flex items-center gap-2 mb-1">
                            <Building2 className="w-4 h-4 text-[var(--copper)] shrink-0" />
                            <h3 className="text-xl font-semibold text-[var(--text-1)]">
                              {item.role}
                            </h3>
                          </div>
                          <p className="font-mono text-xs text-[var(--accent)] font-medium">
                            {item.company}
                          </p>
                        </div>

                        {/* Location & Dates */}
                        <div className="flex flex-wrap sm:flex-col items-start sm:items-end gap-1.5 text-xs font-mono text-[var(--text-3)]">
                          <span className="inline-flex items-center gap-1.5">
                            <Calendar className="w-3.5 h-3.5" />
                            {item.start} — {item.end === "present" ? "Present" : item.end}
                          </span>
                          <span className="inline-flex items-center gap-1.5">
                            <MapPin className="w-3.5 h-3.5" />
                            {item.location}
                          </span>
                        </div>
                      </div>

                      {/* Summary */}
                      <p className="text-sm text-[var(--text-2)] mb-5 leading-relaxed">
                        {item.summary}
                      </p>

                      {/* Impact Bullets */}
                      <div className="mb-6 space-y-2 border-l-2 border-[var(--line-subtle)] pl-4">
                        {item.impact.map((bullet, bi) => (
                          <p key={bi} className="text-xs md:text-sm text-[var(--text-2)] leading-relaxed">
                            • {bullet}
                          </p>
                        ))}
                      </div>

                      {/* Skills Used & Detail Trigger */}
                      <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-[var(--line-subtle)]">
                        <div className="flex flex-wrap gap-1.5">
                          {item.skills.map((s) => (
                            <Chip key={s} variant="skill">
                              {s}
                            </Chip>
                          ))}
                        </div>

                        <button
                          onClick={() => setSelectedExp(item)}
                          className="inline-flex items-center gap-1 font-mono text-xs text-[var(--accent)] hover:underline cursor-pointer"
                        >
                          Deep dive details <ArrowRight className="w-3.5 h-3.5" />
                        </button>
                      </div>
                    </Card>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Deep Dive Sheet */}
      <Sheet open={!!selectedExp} onOpenChange={(open) => !open && setSelectedExp(null)}>
        {selectedExp && (
          <SheetContent title={`${selectedExp.company} — ${selectedExp.role}`}>
            <div className="space-y-6 text-sm">
              <div className="space-y-2 font-mono text-xs text-[var(--text-3)] border-b border-[var(--line-subtle)] pb-4">
                <p>TIMELINE: {selectedExp.start} – {selectedExp.end}</p>
                <p>LOCATION: {selectedExp.location}</p>
                <p>TYPE: {selectedExp.kind.toUpperCase()}</p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-2">
                  System Overview
                </h4>
                <p className="text-[var(--text-2)] leading-relaxed">
                  {selectedExp.summary}
                </p>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-3">
                  Key Deliverables & Architectural Impact
                </h4>
                <ul className="space-y-3">
                  {selectedExp.impact.map((bullet, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-xs md:text-sm text-[var(--text-2)] leading-relaxed">
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] mt-1.5 shrink-0" />
                      <span>{bullet}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-3">
                  Technologies Applied
                </h4>
                <div className="flex flex-wrap gap-2">
                  {selectedExp.skills.map((sk) => (
                    <Chip key={sk} variant="skill">
                      {sk}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </SheetContent>
        )}
      </Sheet>
    </section>
  );
}
