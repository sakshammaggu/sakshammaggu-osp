"use client";

import { useState } from "react";
import { getAllExperience, getAllSkills } from "@/lib/content";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Building2, Calendar, MapPin, Check } from "lucide-react";

export default function ExperiencePage() {
  const experiences = getAllExperience();
  const allSkills = getAllSkills();
  const [viewMode, setViewMode] = useState<"timeline" | "matrix">("timeline");

  return (
    <div className="section-padding pt-32 bg-[var(--bg-0)] min-h-screen">
      <div className="container-main">
        {/* Header & View Mode Switcher */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeader
            number="EXP"
            label="CAREER & ROLES"
            heading="Engineering timeline & skill matrix."
            emphasisWord="timeline"
            description="Detailed breakdown of professional responsibilities, distributed architectural impact, and technology mapping across roles."
          />

          <div className="inline-flex p-1 rounded-full border border-[var(--line-subtle)] bg-[var(--surface-1)] mb-12 self-start md:self-end">
            <button
              onClick={() => setViewMode("timeline")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                viewMode === "timeline"
                  ? "bg-[var(--surface-3)] text-[var(--text-1)] font-semibold shadow-sm"
                  : "text-[var(--text-3)] hover:text-[var(--text-1)]"
              }`}
            >
              Timeline View
            </button>
            <button
              onClick={() => setViewMode("matrix")}
              className={`px-4 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                viewMode === "matrix"
                  ? "bg-[var(--surface-3)] text-[var(--text-1)] font-semibold shadow-sm"
                  : "text-[var(--text-3)] hover:text-[var(--text-1)]"
              }`}
            >
              Skills Matrix
            </button>
          </div>
        </div>

        {/* View Mode 1: Timeline */}
        {viewMode === "timeline" ? (
          <div className="space-y-12">
            {experiences.map((exp) => (
              <Card key={exp.slug} className="!p-6 md:!p-8" interactive>
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <Building2 className="w-5 h-5 text-[var(--copper)]" />
                      <h3 className="text-2xl font-semibold text-[var(--text-1)]">
                        {exp.role}
                      </h3>
                    </div>
                    <p className="font-mono text-sm text-[var(--accent)] font-medium">
                      {exp.company} · {exp.kind.toUpperCase()}
                    </p>
                  </div>

                  <div className="flex flex-wrap md:flex-col items-start md:items-end gap-2 text-xs font-mono text-[var(--text-3)]">
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5" /> {exp.start} — {exp.end === "present" ? "Present" : exp.end}
                    </span>
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5" /> {exp.location}
                    </span>
                  </div>
                </div>

                <p className="text-sm md:text-base text-[var(--text-2)] mb-6 leading-relaxed">
                  {exp.summary}
                </p>

                <div className="mb-6 space-y-2.5 border-l-2 border-[var(--line-subtle)] pl-4">
                  {exp.impact.map((bullet, idx) => (
                    <p key={idx} className="text-xs md:text-sm text-[var(--text-2)] leading-relaxed">
                      • {bullet}
                    </p>
                  ))}
                </div>

                <div className="pt-4 border-t border-[var(--line-subtle)] flex flex-wrap gap-2">
                  {exp.skills.map((s) => (
                    <Chip key={s} variant="skill">
                      {s}
                    </Chip>
                  ))}
                </div>
              </Card>
            ))}
          </div>
        ) : (
          /* View Mode 2: Skills-by-Role Matrix */
          <Card className="!p-0 overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs font-mono">
              <thead>
                <tr className="border-b border-[var(--line-subtle)] bg-[var(--surface-2)]">
                  <th className="p-4 text-[var(--text-3)] uppercase tracking-wider font-semibold min-w-[180px]">
                    Skill / Technology
                  </th>
                  {experiences.map((exp) => (
                    <th key={exp.slug} className="p-4 text-[var(--text-1)] font-semibold min-w-[150px]">
                      <div>{exp.company}</div>
                      <div className="text-[0.65rem] text-[var(--text-3)] font-normal">{exp.start}</div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-[var(--line-subtle)]">
                {allSkills.map((sk) => (
                  <tr key={sk.slug} className="hover:bg-[var(--surface-3)]/40 transition-colors">
                    <td className="p-4 font-medium text-[var(--text-1)]">
                      {sk.name}
                    </td>
                    {experiences.map((exp) => {
                      const used = exp.skills.includes(sk.slug);
                      return (
                        <td key={exp.slug} className="p-4 text-center">
                          {used ? (
                            <span className="inline-flex items-center justify-center w-5 h-5 rounded-full bg-[var(--accent-subtle)] text-[var(--accent)]">
                              <Check className="w-3.5 h-3.5" />
                            </span>
                          ) : (
                            <span className="text-[var(--text-4)] opacity-40">—</span>
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        )}
      </div>
    </div>
  );
}
