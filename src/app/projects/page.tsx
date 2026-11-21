"use client";

import { Suspense, useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import {
  ArrowRight,
  ExternalLink,
  Search,
  ChevronLeft,
  ChevronRight,
  GitFork,
  FolderGit2,
} from "lucide-react";
import { getAllProjects } from "@/lib/content";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { GithubIcon } from "@/components/ui/icons";

function ProjectsContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");

  const projects = getAllProjects();

  const [activeTab, setActiveTab] = useState<"all" | "personal" | "open-source">(
    tabParam === "open-source" ? "open-source" : "all"
  );
  const [selectedType, setSelectedType] = useState<string>("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState<"featured" | "newest">("featured");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 2; // 2 items per page for real, functional pagination

  useEffect(() => {
    if (tabParam === "open-source") {
      setActiveTab("open-source");
    }
  }, [tabParam]);

  // Reset page when filters change
  const handleTabChange = (tab: "all" | "personal" | "open-source") => {
    setActiveTab(tab);
    setCurrentPage(1);
  };

  const handleSearchChange = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
    setCurrentPage(1);
  };

  // Filter projects (currently all 3 in database are personal projects; open source is 0)
  const filtered = (activeTab === "open-source" ? [] : projects)
    .filter((p) => {
      if (selectedType !== "all" && !p.type.includes(selectedType as any)) {
        return false;
      }
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const matchesTitle = p.title.toLowerCase().includes(query);
        const matchesSummary = p.summary.toLowerCase().includes(query);
        const matchesSkill = p.skills.some((s) => s.toLowerCase().includes(query));
        if (!matchesTitle && !matchesSummary && !matchesSkill) return false;
      }
      return true;
    })
    .sort((a, b) => {
      if (sortBy === "newest") return b.year - a.year;
      return (a.order ?? 99) - (b.order ?? 99);
    });

  const totalPages = Math.max(1, Math.ceil(filtered.length / itemsPerPage));
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedItems = filtered.slice(startIndex, startIndex + itemsPerPage);

  return (
    <div className="section-padding pt-32 bg-[var(--bg-0)] min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="mb-12">
          <SectionHeader
            number="CATALOG"
            label="PROJECT & REPOSITORY INDEX"
            heading="Engineering catalog and public systems."
            emphasisWord="systems"
            description="Explore the architecture, algorithmic design, and full-stack implementations across personal projects and open-source tooling."
          />
        </div>

        {/* Primary Tabs (All / Personal Projects / Open Source) */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--line-subtle)] font-mono text-xs">
          <div className="inline-flex p-1 rounded-full border border-[var(--line-subtle)] bg-[var(--surface-1)]">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => handleTabChange("all")}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === "all"
                  ? "bg-[var(--surface-3)] text-[var(--text-1)] border border-[var(--accent-line)] font-medium shadow-sm"
                  : "text-[var(--text-3)] hover:text-[var(--text-1)]"
              }`}
            >
              All Work ({projects.length})
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => handleTabChange("personal")}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === "personal"
                  ? "bg-[var(--surface-3)] text-[var(--text-1)] border border-[var(--accent-line)] font-medium shadow-sm"
                  : "text-[var(--text-3)] hover:text-[var(--text-1)]"
              }`}
            >
              Personal Projects ({projects.length})
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => handleTabChange("open-source")}
              className={`px-4 py-1.5 rounded-full transition-all cursor-pointer ${
                activeTab === "open-source"
                  ? "bg-[var(--surface-3)] text-[var(--copper)] border border-[var(--copper-line)] font-semibold shadow-sm"
                  : "text-[var(--text-3)] hover:text-[var(--copper)]"
              }`}
            >
              Open Source (0)
            </button>
          </div>

          <div className="flex items-center gap-2 text-[var(--text-3)]">
            <span>Sort:</span>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setSortBy(sortBy === "featured" ? "newest" : "featured")}
              className="text-[var(--accent)] hover:underline cursor-pointer"
            >
              {sortBy === "featured" ? "Featured" : "Newest"}
            </button>
          </div>
        </div>

        {/* Filter & Search Bar (only for All / Personal tabs) */}
        {activeTab !== "open-source" && (
          <div className="mb-8 p-4 rounded-[var(--radius-lg)] border border-[var(--line-subtle)] bg-[var(--surface-1)] shadow-sm space-y-4">
            <div className="flex flex-col md:flex-row items-stretch md:items-center justify-between gap-4">
              {/* Search Input */}
              <div className="relative flex-1">
                <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-[var(--text-3)]" />
                <input
                  type="text"
                  suppressHydrationWarning
                  placeholder="Search by title, domain, or technology..."
                  value={searchQuery}
                  onChange={(e) => handleSearchChange(e.target.value)}
                  className="w-full rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-2)] pl-9 pr-4 py-2 text-xs font-mono text-[var(--text-1)] placeholder:text-[var(--text-4)] outline-none focus:border-[var(--accent)]"
                />
              </div>

              {/* Type Filter Buttons */}
              <div className="inline-flex flex-wrap gap-1">
                {["all", "web", "systems", "research"].map((type) => (
                  <button
                    key={type}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => handleTypeChange(type)}
                    className={`px-3 py-1.5 rounded-full text-xs font-mono uppercase tracking-wider transition-colors cursor-pointer ${
                      selectedType === type
                        ? "bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-line)] font-medium"
                        : "text-[var(--text-3)] hover:text-[var(--text-1)]"
                    }`}
                  >
                    {type}
                  </button>
                ))}
              </div>
            </div>

            {/* Readout */}
            <div className="flex items-center justify-between text-[0.7rem] font-mono text-[var(--text-3)] pt-2 border-t border-[var(--line-subtle)]">
              <span>
                MATCHING ITEMS:{" "}
                <strong className="text-[var(--text-1)]">{filtered.length}</strong> OF{" "}
                {projects.length}
              </span>
              {(selectedType !== "all" || searchQuery) && (
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => {
                    setSelectedType("all");
                    setSearchQuery("");
                    setCurrentPage(1);
                  }}
                  className="text-[var(--accent)] hover:underline cursor-pointer"
                >
                  Reset filters
                </button>
              )}
            </div>
          </div>
        )}

        {/* Open Source View (Empty state with card structure) */}
        {activeTab === "open-source" ? (
          <div className="space-y-8 mb-12">
            {/* Empty State Banner Card */}
            <Card className="!p-8 text-center border-dashed border-[var(--line-strong)]">
              <div className="w-14 h-14 rounded-full mx-auto mb-4 bg-[var(--copper-subtle)] border border-[var(--copper-line)] flex items-center justify-center text-[var(--copper)]">
                <GitFork className="w-7 h-7" />
              </div>
              <span className="font-mono text-xs uppercase tracking-widest text-[var(--copper)] font-semibold block mb-2">
                OPEN SOURCE REPOSITORY LEDGER · 0 PUBLIC PACKAGES
              </span>
              <h3 className="text-2xl font-bold text-[var(--text-1)] mb-6">
                No Public Open-Source Repositories Yet
              </h3>
              <div className="inline-flex items-center gap-3">
                <a
                  href="https://github.com/sakshammaggu"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 px-5 py-2.5 rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--surface-2)] text-xs font-mono text-[var(--text-1)] hover:border-[var(--accent-line)] hover:bg-[var(--surface-3)] transition-all no-underline"
                >
                  <GithubIcon className="w-4 h-4" />
                  <span>Follow @sakshammaggu on GitHub ↗</span>
                </a>
              </div>
            </Card>
          </div>
        ) : (
          /* Personal / All Projects Card Grid with Real Pagination */
          <div className="space-y-8 mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {paginatedItems.map((proj) => (
                <Card
                  key={proj.slug}
                  className="!p-6 md:!p-8 flex flex-col justify-between"
                  interactive
                  href={`/projects/${proj.slug}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono text-[0.68rem] text-[var(--text-3)] mb-3">
                      <span className="uppercase text-[var(--accent)] font-semibold tracking-wider">
                        PERSONAL PROJECT · {proj.type.join(" · ")}
                      </span>
                      <span className="text-[var(--copper)]">{proj.year}</span>
                    </div>

                    <h3 className="text-2xl font-semibold text-[var(--text-1)] mb-3">
                      {proj.title}
                    </h3>

                    <p className="text-sm text-[var(--text-2)] leading-relaxed mb-6 line-clamp-3">
                      {proj.summary}
                    </p>

                    {proj.metrics && proj.metrics.length > 0 && (
                      <div className="mb-6 p-3 rounded-[var(--radius-sm)] border border-[var(--line-subtle)] bg-[var(--surface-2)]">
                        <span className="font-mono text-[0.65rem] text-[var(--text-3)] block uppercase">
                          {proj.metrics[0]?.label}
                        </span>
                        <span className="font-mono text-sm font-semibold text-[var(--text-1)]">
                          {proj.metrics[0]?.value} {proj.metrics[0]?.unit}
                        </span>
                      </div>
                    )}

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {proj.skills.map((s) => (
                        <Chip key={s} variant="skill">
                          {s}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between font-mono text-xs">
                    <span className="inline-flex items-center gap-1.5 font-medium text-[var(--accent)]">
                      Read Case Study <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[var(--text-3)]">{proj.timeline}</span>
                  </div>
                </Card>
              ))}
            </div>

            {/* Zero State if search returns nothing */}
            {filtered.length === 0 && (
              <Card className="!p-12 text-center">
                <p className="font-mono text-xs text-[var(--text-3)] mb-3">
                  No matching projects found for query &ldquo;{searchQuery}&rdquo;.
                </p>
                <button
                  type="button"
                  suppressHydrationWarning
                  onClick={() => {
                    setSearchQuery("");
                    setSelectedType("all");
                    setCurrentPage(1);
                  }}
                  className="text-xs font-mono text-[var(--accent)] underline cursor-pointer"
                >
                  Clear all filters
                </button>
              </Card>
            )}
          </div>
        )}

        {/* Pagination Controls */}
        <div className="pt-6 border-t border-[var(--line-subtle)] flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs">
          <div className="text-[var(--text-3)]">
            {activeTab === "open-source" ? (
              <span>Showing 0 of 0 repositories</span>
            ) : (
              <span>
                Showing <strong className="text-[var(--text-1)]">{filtered.length > 0 ? startIndex + 1 : 0}</strong>–
                <strong className="text-[var(--text-1)]">
                  {Math.min(startIndex + itemsPerPage, filtered.length)}
                </strong>{" "}
                of <strong className="text-[var(--text-1)]">{filtered.length}</strong> items
              </span>
            )}
          </div>

          {activeTab !== "open-source" && totalPages > 1 && (
            <div className="flex items-center gap-2">
              {/* Prev Button */}
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1.5 rounded border border-[var(--line)] bg-[var(--surface-1)] text-[var(--text-1)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--surface-3)] transition-colors cursor-pointer flex items-center gap-1"
              >
                <ChevronLeft className="w-3.5 h-3.5" /> Prev
              </button>

              {/* Page Number Buttons */}
              {Array.from({ length: totalPages }).map((_, idx) => {
                const pageNum = idx + 1;
                const isActive = currentPage === pageNum;
                return (
                  <button
                    key={pageNum}
                    type="button"
                    suppressHydrationWarning
                    onClick={() => setCurrentPage(pageNum)}
                    className={`w-8 h-8 rounded font-mono text-xs transition-colors cursor-pointer flex items-center justify-center ${
                      isActive
                        ? "bg-[var(--surface-3)] text-[var(--accent)] border border-[var(--accent-line)] font-semibold shadow-sm"
                        : "text-[var(--text-3)] hover:text-[var(--text-1)] border border-[var(--line-subtle)] bg-[var(--surface-1)]"
                    }`}
                  >
                    {pageNum}
                  </button>
                );
              })}

              {/* Next Button */}
              <button
                type="button"
                suppressHydrationWarning
                onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1.5 rounded border border-[var(--line)] bg-[var(--surface-1)] text-[var(--text-1)] disabled:opacity-30 disabled:cursor-not-allowed hover:bg-[var(--surface-3)] transition-colors cursor-pointer flex items-center gap-1"
              >
                Next <ChevronRight className="w-3.5 h-3.5" />
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function ProjectsPage() {
  return (
    <Suspense
      fallback={
        <div className="section-padding pt-32 bg-[var(--bg-0)] min-h-screen">
          <div className="container-main font-mono text-xs text-[var(--text-3)]">
            Loading project catalog...
          </div>
        </div>
      }
    >
      <ProjectsContent />
    </Suspense>
  );
}
