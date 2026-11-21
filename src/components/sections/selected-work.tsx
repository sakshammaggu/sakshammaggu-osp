"use client";

import Link from "next/link";
import { ArrowRight, ExternalLink, FolderGit2, GitFork, Sparkles } from "lucide-react";
import { getAllProjects } from "@/lib/content";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { GithubIcon } from "@/components/ui/icons";

export function SelectedWorkSection() {
  const allProjects = getAllProjects();
  // Keep 1st project only on the main page to prevent clutter
  const flagshipProject = allProjects[0];

  return (
    <section id="work" className="section-padding bg-[var(--bg-0)]">
      <div className="container-main">
        {/* Section Header with integrated right action */}
        <SectionHeader
          number="02"
          label="SELECTED WORK & SYSTEMS"
          heading="Things I've built and shipped."
          emphasisWord="built"
          description="Flagship production infrastructure, intelligence systems, and open engineering repositories."
          rightAction={
            <div className="flex items-center gap-3">
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
              >
                Projects ({allProjects.length}) <ArrowRight className="w-3.5 h-3.5" />
              </Link>
              <span className="text-[var(--line-strong)]">·</span>
              <Link
                href="/open-source"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] text-[var(--copper)] hover:text-[var(--copper-hover)] transition-colors"
              >
                Open Source (0) <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          }
        />

        {/* 1st Project Only (Flagship Card) */}
        {flagshipProject && (
          <div className="mb-10">
            <Card className="!p-0 overflow-hidden" interactive>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center p-6 md:p-8">
                {/* Media Plate: 5 cols */}
                <div className="lg:col-span-5 aspect-[16/10] rounded-[var(--radius-md)] border border-[var(--line-subtle)] bg-[var(--surface-3)] relative overflow-hidden flex flex-col items-center justify-center p-6 text-center transition-transform">
                  <div className="dot-grid absolute inset-0 opacity-20" />
                  <div className="relative z-10">
                    <span className="font-mono text-[0.65rem] text-[var(--accent)] uppercase tracking-wider block mb-2 font-semibold">
                      01 · FLAGSHIP SYSTEM
                    </span>
                    <h4 className="text-2xl font-semibold text-[var(--text-1)] mb-1">
                      {flagshipProject.title}
                    </h4>
                    <p className="font-mono text-[0.7rem] text-[var(--text-3)]">
                      {flagshipProject.timeline} · {flagshipProject.team ?? "Solo"}
                    </p>
                  </div>
                </div>

                {/* Content Info: 7 cols */}
                <div className="lg:col-span-7 flex flex-col justify-between">
                  <div>
                    {/* Micro index and year */}
                    <div className="flex items-center gap-3 mb-2 font-mono text-xs text-[var(--text-3)] uppercase tracking-[0.08em]">
                      <span className="text-[var(--copper)] font-semibold">PRIMARY SHOWCASE</span>
                      <span>·</span>
                      <span>{flagshipProject.year}</span>
                      <span>·</span>
                      <span className="text-[var(--text-4)]">{flagshipProject.role}</span>
                    </div>

                    {/* Title */}
                    <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--text-1)] mb-3">
                      {flagshipProject.title}
                    </h3>

                    {/* Summary */}
                    <p className="text-sm md:text-base text-[var(--text-2)] leading-relaxed mb-6">
                      {flagshipProject.summary}
                    </p>

                    {/* Metrics Readouts */}
                    {flagshipProject.metrics && flagshipProject.metrics.length > 0 && (
                      <div className="flex flex-wrap gap-4 mb-6">
                        {flagshipProject.metrics.map((m, mi) => (
                          <div
                            key={mi}
                            className="rounded-[var(--radius-sm)] border border-[var(--line-subtle)] bg-[var(--surface-2)] px-3.5 py-2"
                          >
                            <span className="font-mono text-[0.65rem] text-[var(--text-3)] uppercase block">
                              {m.label}
                            </span>
                            <span className="font-mono text-sm font-semibold text-[var(--text-1)]">
                              {m.value} {m.unit}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* Skill chips */}
                    <div className="flex flex-wrap gap-2 mb-6">
                      {flagshipProject.skills.map((skillSlug) => (
                        <Chip key={skillSlug} variant="skill">
                          {skillSlug}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  {/* Actions and Links */}
                  <div className="flex items-center gap-4 pt-4 border-t border-[var(--line-subtle)] text-xs font-mono">
                    <Link
                      href={`/projects/${flagshipProject.slug}`}
                      className="inline-flex items-center gap-1.5 font-medium text-[var(--accent)] hover:underline"
                    >
                      Case study <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    {flagshipProject.links.github &&
                      flagshipProject.links.github !== "TODO(link)" && (
                        <a
                          href={flagshipProject.links.github}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[var(--text-2)] hover:text-[var(--text-1)]"
                        >
                          <GithubIcon className="w-3.5 h-3.5" /> Code ↗
                        </a>
                      )}

                    {flagshipProject.links.live &&
                      flagshipProject.links.live !== "TODO(link)" && (
                        <a
                          href={flagshipProject.links.live}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1.5 text-[var(--text-2)] hover:text-[var(--text-1)]"
                        >
                          <ExternalLink className="w-3.5 h-3.5" /> Live ↗
                        </a>
                      )}
                  </div>
                </div>
              </div>
            </Card>
          </div>
        )}

        {/* Dual Redirect Gateways: Personal Projects & Open Source */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Card A: Personal Projects Gateway */}
          <Card className="!p-6 flex flex-col justify-between group" interactive href="/projects">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--accent-subtle)] border border-[var(--accent-line)] flex items-center justify-center shrink-0">
                  <FolderGit2 className="w-5 h-5 text-[var(--accent)]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.65rem] text-[var(--text-3)] uppercase tracking-wider">
                    CATALOG
                  </span>
                  <Chip variant="readout">3 PROJECTS</Chip>
                </div>
              </div>

              <h4 className="text-xl font-semibold text-[var(--text-1)] mb-2 group-hover:text-[var(--accent)] transition-colors">
                Personal Projects & Systems
              </h4>

              <p className="text-xs md:text-sm text-[var(--text-2)] leading-relaxed mb-6">
                Explore the complete repository catalog featuring full-stack intelligence applications,
                multidimensional data correlation engines, and modular CPU scheduling visualizers.
              </p>

              {/* Sample list */}
              <div className="space-y-2 mb-6 font-mono text-xs text-[var(--text-3)]">
                <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-2)] border border-[var(--line-subtle)]">
                  <span className="text-[var(--text-1)] font-medium">CorrViz</span>
                  <span className="text-[0.68rem] text-[var(--copper)]">Analytics / Next.js</span>
                </div>
                <div className="flex items-center justify-between p-2 rounded bg-[var(--surface-2)] border border-[var(--line-subtle)]">
                  <span className="text-[var(--text-1)] font-medium">CpuVis</span>
                  <span className="text-[0.68rem] text-[var(--info)]">Systems / C++ SDL2</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between font-mono text-xs">
              <span className="inline-flex items-center gap-1.5 font-medium text-[var(--accent)]">
                Browse all personal projects{" "}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[var(--text-4)]">/projects</span>
            </div>
          </Card>

          {/* Card B: Open Source Gateway (Empty state) */}
          <Card className="!p-6 flex flex-col justify-between group" interactive href="/open-source">
            <div>
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="w-10 h-10 rounded-[var(--radius-md)] bg-[var(--copper-subtle)] border border-[var(--copper-line)] flex items-center justify-center shrink-0">
                  <GitFork className="w-5 h-5 text-[var(--copper)]" />
                </div>
                <div className="flex items-center gap-2">
                  <span className="font-mono text-[0.65rem] text-[var(--text-3)] uppercase tracking-wider">
                    PUBLIC REPOSITORIES
                  </span>
                  <Chip variant="readout">0 REPOSITORIES</Chip>
                </div>
              </div>

              <h4 className="text-xl font-semibold text-[var(--text-1)] mb-2 group-hover:text-[var(--copper)] transition-colors">
                Open Source & Contributions
              </h4>

              <p className="text-xs md:text-sm text-[var(--text-2)] leading-relaxed mb-6">
                Public tooling, developer utilities, and infrastructure modules.
                Open-source packages are currently being staged and documented for public release.
              </p>

              {/* Empty state notice card */}
              <div className="p-4 rounded-[var(--radius-md)] border border-dashed border-[var(--line-strong)] bg-[var(--surface-2)] mb-6 text-center">
                <span className="font-mono text-xs text-[var(--copper)] block font-semibold mb-1">
                  // No Public Repositories Yet
                </span>
                <p className="font-mono text-[0.7rem] text-[var(--text-3)]">
                  Repositories are being curated and will be published directly to GitHub.
                </p>
              </div>
            </div>

            <div className="pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between font-mono text-xs">
              <span className="inline-flex items-center gap-1.5 font-medium text-[var(--copper)]">
                Explore open source ledger{" "}
                <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
              </span>
              <span className="text-[var(--text-4)]">/open-source</span>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
}
