"use client";

import { useState } from "react";
import { getAllSkills, getSkillGraph } from "@/lib/content";
import type { Skill } from "@/lib/schemas";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import {
  Code2,
  Terminal,
  Layers,
  Database,
  Globe,
  Wrench,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import Link from "next/link";

const categories = [
  { id: "all", label: "All" },
  { id: "language", label: "Languages" },
  { id: "systems", label: "Systems" },
  { id: "data", label: "Data & AI" },
  { id: "web", label: "Web" },
  { id: "tool", label: "Tools" },
] as const;

const ITEMS_PER_PAGE = 5;

export function SkillsSection() {
  const allSkills = getAllSkills();
  const skillGraph = getSkillGraph();
  const [selectedCategory, setSelectedCategory] = useState<string>("all");
  const [activeSkill, setActiveSkill] = useState<Skill | null>(null);

  // Independent in-place pagination state per category section
  const [pageByCategory, setPageByCategory] = useState<Record<string, number>>({
    all: 1,
    language: 1,
    systems: 1,
    data: 1,
    web: 1,
    tool: 1,
  });

  const handlePageChange = (catId: string, newPage: number) => {
    setPageByCategory((prev) => ({
      ...prev,
      [catId]: newPage,
    }));
  };

  const filteredSkills = allSkills.filter((sk) => {
    if (selectedCategory === "all") return true;
    return sk.category === selectedCategory;
  });

  const totalSkills = filteredSkills.length;
  const totalPages = Math.max(1, Math.ceil(totalSkills / ITEMS_PER_PAGE));
  const currentPage = Math.min(pageByCategory[selectedCategory] ?? 1, totalPages);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedSkills = filteredSkills.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  const getLevelLabel = (level: Skill["level"]) => {
    switch (level) {
      case "daily":
        return "DAILY DRIVER";
      case "production":
        return "PRODUCTION";
      case "working":
        return "WORKING KNOWLEDGE";
      default:
        return "LEARNING";
    }
  };

  const getDots = (level: Skill["level"]) => {
    switch (level) {
      case "daily":
        return "●●●";
      case "production":
        return "●●○";
      case "working":
        return "●○○";
      default:
        return "○○○";
    }
  };

  const getCategoryIcon = (category: Skill["category"]) => {
    switch (category) {
      case "language":
        return <Code2 className="w-4 h-4 text-[var(--accent)]" />;
      case "systems":
        return <Layers className="w-4 h-4 text-[var(--copper)]" />;
      case "data":
        return <Database className="w-4 h-4 text-[var(--info)]" />;
      case "web":
        return <Globe className="w-4 h-4 text-[var(--accent-hover)]" />;
      case "tool":
        return <Wrench className="w-4 h-4 text-[var(--text-3)]" />;
      default:
        return <Terminal className="w-4 h-4" />;
    }
  };

  return (
    <section id="skills" className="section-padding bg-[var(--bg-0)]">
      <div className="container-main">
        {/* Section Header with Category Tabs on the right */}
        <SectionHeader
          number="04"
          label="SKILLS MATRIX"
          heading="Evidence-based capabilities."
          emphasisWord="capabilities"
          description="Every skill is anchored in actual production code, systems shipped, or repositories delivered."
          rightAction={
            <div className="flex flex-wrap gap-1.5 p-1 rounded-full border border-[var(--line-subtle)] bg-[var(--surface-1)]">
              {categories.map((cat) => {
                const count =
                  cat.id === "all"
                    ? allSkills.length
                    : allSkills.filter((s) => s.category === cat.id).length;
                return (
                  <button
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={`px-3 py-1 rounded-full text-xs font-mono transition-all cursor-pointer flex items-center gap-1.5 ${
                      selectedCategory === cat.id
                        ? "bg-[var(--surface-3)] text-[var(--text-1)] border border-[var(--accent-line)] font-medium shadow-sm"
                        : "text-[var(--text-3)] hover:text-[var(--text-1)]"
                    }`}
                  >
                    <span>{cat.label}</span>
                    <span
                      className={`text-[0.65rem] px-1.5 py-0.5 rounded-full font-mono ${
                        selectedCategory === cat.id
                          ? "bg-[var(--surface-1)] text-[var(--accent)] font-semibold"
                          : "bg-[var(--surface-2)] text-[var(--text-3)]"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                );
              })}
            </div>
          }
        />

        {/* Grid: 8 cols Skills List + 4 cols Side Panel */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mt-8">
          {/* Main 8 Cols: List */}
          <div className="lg:col-span-8">
            <Card className="!p-0 overflow-hidden divide-y divide-[var(--line-subtle)]">
              {paginatedSkills.map((sk) => {
                const usage = skillGraph[sk.slug] ?? { projects: [], experience: [] };
                const usageCount = usage.projects.length + usage.experience.length;

                return (
                  <div
                    key={sk.slug}
                    onClick={() => setActiveSkill(sk)}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 md:px-6 hover:bg-[var(--surface-3)]/60 transition-colors cursor-pointer group"
                  >
                    <div className="flex items-center gap-3.5 mb-2 sm:mb-0">
                      <div className="w-8 h-8 rounded-[var(--radius-xs)] bg-[var(--surface-2)] border border-[var(--line-subtle)] flex items-center justify-center shrink-0">
                        {getCategoryIcon(sk.category)}
                      </div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-sm text-[var(--text-1)] group-hover:text-[var(--accent)] transition-colors">
                            {sk.name}
                          </span>
                        </div>
                        <span className="font-mono text-[0.68rem] uppercase tracking-wider text-[var(--text-3)]">
                          {sk.category}
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between sm:justify-end gap-6 font-mono text-xs">
                      {/* Level and Dots with fixed column width for vertical alignment */}
                      <div className="flex items-center justify-end gap-2 text-right sm:min-w-[170px] shrink-0">
                        <span className="text-[0.68rem] uppercase tracking-wider text-[var(--text-3)]">
                          {getLevelLabel(sk.level)}
                        </span>
                        <span className="text-[var(--accent)] tracking-tighter font-semibold text-xs">
                          {getDots(sk.level)}
                        </span>
                      </div>

                      {/* Usage count */}
                      <div className="hidden sm:flex items-center justify-end gap-1.5 text-[0.7rem] text-[var(--text-3)] group-hover:text-[var(--text-2)] min-w-[210px] text-right">
                        <span>
                          {usageCount > 0
                            ? `used in: ${usage.experience.length} roles · ${usage.projects.length} projects`
                            : "verified proficiency"}
                        </span>
                        <ArrowUpRight className="w-3.5 h-3.5 opacity-0 group-hover:opacity-100 transition-opacity text-[var(--accent)] shrink-0" />
                      </div>
                    </div>
                  </div>
                );
              })}

              {/* Dynamic In-Place Pagination Footer for this specific section */}
              <div className="p-3.5 md:px-6 bg-[var(--surface-1)]/80 border-t border-[var(--line-subtle)] flex flex-col sm:flex-row items-center justify-between gap-3 font-mono text-xs">
                <div className="text-[var(--text-3)] text-xs flex items-center gap-2">
                  <span>
                    Showing <strong className="text-[var(--text-1)] font-medium">{totalSkills > 0 ? startIndex + 1 : 0}</strong>–
                    <strong className="text-[var(--text-1)] font-medium">
                      {Math.min(startIndex + ITEMS_PER_PAGE, totalSkills)}
                    </strong>{" "}
                    of <strong className="text-[var(--text-1)] font-medium">{totalSkills}</strong> skills
                  </span>
                  <span className="hidden sm:inline-block px-1.5 py-0.5 rounded text-[0.65rem] tracking-wider uppercase bg-[var(--surface-2)] text-[var(--text-3)] border border-[var(--line-subtle)]">
                    {categories.find((c) => c.id === selectedCategory)?.label}
                  </span>
                </div>

                <div className="flex items-center gap-1.5 ml-auto sm:ml-0">
                  <button
                    onClick={() => handlePageChange(selectedCategory, currentPage - 1)}
                    disabled={currentPage <= 1}
                    className="px-2.5 py-1 rounded border border-[var(--line-subtle)] bg-[var(--surface-2)] text-[var(--text-2)] hover:text-[var(--text-1)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--surface-3)] transition-colors cursor-pointer flex items-center gap-1 font-mono text-xs"
                    aria-label="Previous page"
                  >
                    <ChevronLeft className="w-3.5 h-3.5" />
                    <span className="hidden sm:inline">Prev</span>
                  </button>

                  <div className="flex items-center gap-1">
                    {Array.from({ length: totalPages }).map((_, idx) => {
                      const pageNum = idx + 1;
                      const isActive = currentPage === pageNum;
                      return (
                        <button
                          key={pageNum}
                          onClick={() => handlePageChange(selectedCategory, pageNum)}
                          className={`w-7 h-7 rounded font-mono text-xs transition-all cursor-pointer flex items-center justify-center ${
                            isActive
                              ? "bg-[var(--surface-3)] text-[var(--accent)] border border-[var(--accent-line)] font-semibold shadow-sm"
                              : "text-[var(--text-3)] hover:text-[var(--text-1)] border border-[var(--line-subtle)] bg-[var(--surface-2)]"
                          }`}
                          aria-label={`Go to page ${pageNum}`}
                          aria-current={isActive ? "page" : undefined}
                        >
                          {pageNum}
                        </button>
                      );
                    })}
                  </div>

                  <button
                    onClick={() => handlePageChange(selectedCategory, currentPage + 1)}
                    disabled={currentPage >= totalPages}
                    className="px-2.5 py-1 rounded border border-[var(--line-subtle)] bg-[var(--surface-2)] text-[var(--text-2)] hover:text-[var(--text-1)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--surface-3)] transition-colors cursor-pointer flex items-center gap-1 font-mono text-xs"
                    aria-label="Next page"
                  >
                    <span className="hidden sm:inline">Next</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>
            </Card>
          </div>

          {/* Side Panel 4 Cols */}
          <div className="lg:col-span-4 space-y-6">
            {/* Tooling Card */}
            <Card className="!p-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-4 flex items-center gap-2">
                <Terminal className="w-4 h-4 text-[var(--accent)]" /> Daily Engineering Tooling
              </h4>
              <ul className="space-y-3 font-mono text-xs text-[var(--text-2)] divide-y divide-[var(--line-subtle)]">
                <li className="pt-2 flex justify-between">
                  <span className="text-[var(--text-3)]">OS</span>
                  <span className="text-[var(--text-1)]">Ubuntu Linux / WSL2</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="text-[var(--text-3)]">Editor</span>
                  <span className="text-[var(--text-1)]">VS Code / Neovim</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="text-[var(--text-3)]">Shell</span>
                  <span className="text-[var(--text-1)]">zsh / bash</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="text-[var(--text-3)]">Containers</span>
                  <span className="text-[var(--text-1)]">Docker / k8s</span>
                </li>
                <li className="pt-2 flex justify-between">
                  <span className="text-[var(--text-3)]">CI/CD</span>
                  <span className="text-[var(--text-1)]">Jenkins / GitHub Actions</span>
                </li>
              </ul>
            </Card>

            {/* Core Competencies */}
            <Card className="!p-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-3">
                Core Paradigms
              </h4>
              <div className="flex flex-wrap gap-1.5">
                {[
                  "Spec-Driven Dev",
                  "Distributed HA",
                  "Redfish API",
                  "Microservices",
                  "Network Virtualization",
                  "LLM Integration",
                  "Vector Search",
                  "gRPC",
                ].map((item) => (
                  <Chip key={item} variant="readout">
                    {item}
                  </Chip>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>

      {/* Skill Graph Sheet */}
      <Sheet open={!!activeSkill} onOpenChange={(open) => !open && setActiveSkill(null)}>
        {activeSkill && (
          <SheetContent title={`${activeSkill.name} — Verification Graph`}>
            {(() => {
              const usage = skillGraph[activeSkill.slug] ?? { projects: [], experience: [] };
              return (
                <div className="space-y-6 text-sm">
                  <div className="font-mono text-xs text-[var(--text-3)] border-b border-[var(--line-subtle)] pb-4">
                    <p>PROFICIENCY LEVEL: {activeSkill.level.toUpperCase()}</p>
                    <p>DOMAIN: {activeSkill.category.toUpperCase()}</p>
                  </div>

                  {usage.experience.length > 0 && (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--copper)] mb-3">
                        Applied in Professional Roles ({usage.experience.length})
                      </h4>
                      <div className="space-y-3">
                        {usage.experience.map((exp) => (
                          <div
                            key={exp.slug}
                            className="rounded-[var(--radius-sm)] border border-[var(--line-subtle)] bg-[var(--surface-2)] p-3"
                          >
                            <div className="font-semibold text-xs text-[var(--text-1)]">
                              {exp.company}
                            </div>
                            <div className="text-xs text-[var(--text-2)] mb-1">
                              {exp.role}
                            </div>
                            <p className="text-[0.75rem] text-[var(--text-3)] line-clamp-2">
                              {exp.summary}
                            </p>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {usage.projects.length > 0 && (
                    <div>
                      <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)] mb-3">
                        Shipped in Projects ({usage.projects.length})
                      </h4>
                      <div className="space-y-3">
                        {usage.projects.map((proj) => (
                          <Link
                            key={proj.slug}
                            href={`/projects/${proj.slug}`}
                            className="block rounded-[var(--radius-sm)] border border-[var(--line-subtle)] bg-[var(--surface-2)] p-3 hover:border-[var(--accent-line)] transition-colors no-underline"
                          >
                            <div className="font-semibold text-xs text-[var(--text-1)] flex items-center justify-between">
                              <span>{proj.title}</span>
                              <span className="font-mono text-[0.65rem] text-[var(--text-3)]">
                                {proj.year} ↗
                              </span>
                            </div>
                            <p className="text-[0.75rem] text-[var(--text-3)] line-clamp-2 mt-1">
                              {proj.summary}
                            </p>
                          </Link>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              );
            })()}
          </SheetContent>
        )}
      </Sheet>
    </section>
  );
}
