"use client";

import { useState } from "react";
import Link from "next/link";
import { Folder, FolderOpen, FileText, ChevronRight, Search, Clock, ArrowRight } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";

interface ArticleItem {
  slug: string;
  seriesSlug: string;
  series: string;
  title: string;
  excerpt: string;
  date: string;
  readingTime: number;
  tags: string[];
  subArticles?: { slug: string; title: string }[];
}

const libraryArticles: ArticleItem[] = [
  {
    slug: "low-latency-cluster-communication",
    seriesSlug: "distributed-systems",
    series: "Distributed Systems",
    title: "Scaling East-West HA Communication from 3 to 64 Nodes in Edge Clusters",
    excerpt: "Algorithmic design of dynamic iptables, NAT translation, and multi-network arbitration across primary, secondary, and tertiary bridges.",
    date: "Nov 2026",
    readingTime: 12,
    tags: ["Distributed HA", "Golang", "Kubernetes", "Linux Networking"],
    subArticles: [
      { slug: "iptables-orchestration", title: "Dynamic iptable & NAT Filtering Logic" },
      { slug: "virtual-endpoint-onboarding", title: "Onboarding ECE Endpoints via Jenkins" },
    ],
  },
  {
    slug: "spec-driven-api-development",
    seriesSlug: "software-craft",
    series: "Software Craft",
    title: "Spec-Driven Development: Decoupling Gateway APIs with OpenAPI & Redfish",
    excerpt: "Why rigorous specification first eliminates 90% of edge regression bugs in hardware-interfacing microservices.",
    date: "Oct 2026",
    readingTime: 8,
    tags: ["SDD", "REST API", "Microservices", "Redfish"],
  },
  {
    slug: "ai-solutions-infrastructure",
    seriesSlug: "ai-infrastructure",
    series: "AI Infrastructure",
    title: "Bare-Metal Server Prerequisite Checks via Redfish API for K8s Stacks",
    excerpt: "Automating Dell iDRAC10 (17G) prerequisite checks: virtual disk state, RAID controller health, and strict UEFI boot validations.",
    date: "Sep 2026",
    readingTime: 10,
    tags: ["Dell 17G", "Python", "K8s", "Redfish API"],
  },
];

export default function WritingLibraryPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedTag, setSelectedTag] = useState<string>("all");
  const [openSeries, setOpenSeries] = useState<Record<string, boolean>>({
    "distributed-systems": true,
    "software-craft": true,
    "ai-infrastructure": true,
  });

  const toggleSeries = (slug: string) => {
    setOpenSeries((prev) => ({ ...prev, [slug]: !prev[slug] }));
  };

  const allTags = Array.from(new Set(libraryArticles.flatMap((a) => a.tags)));

  const filtered = libraryArticles.filter((art) => {
    if (selectedTag !== "all" && !art.tags.includes(selectedTag)) return false;
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      const matchTitle = art.title.toLowerCase().includes(q);
      const matchExcerpt = art.excerpt.toLowerCase().includes(q);
      const matchTag = art.tags.some((t) => t.toLowerCase().includes(q));
      if (!matchTitle && !matchExcerpt && !matchTag) return false;
    }
    return true;
  });

  return (
    <div className="section-padding pt-32 bg-[var(--bg-0)] min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="mb-12">
          <SectionHeader
            number="DOC"
            label="ENGINEERING LIBRARY"
            heading="Technical essays and architecture notes."
            emphasisWord="architecture"
            description="Deep-dives into distributed consensus, firmware orchestration, and high-availability edge networking."
          />
        </div>

        {/* 3 cols Tree / 9 cols Articles Listing */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* File Explorer Tree: 3 cols (desktop sticky) */}
          <div className="lg:col-span-3 sticky top-28 space-y-4">
            <Card className="!p-4">
              <div className="flex items-center gap-2 pb-3 mb-3 border-b border-[var(--line-subtle)] font-mono text-xs font-semibold text-[var(--text-3)] uppercase">
                <Folder className="w-4 h-4 text-[var(--accent)]" /> Directory Tree
              </div>

              <div className="space-y-2 font-mono text-xs">
                {/* Series folders */}
                {[
                  { slug: "distributed-systems", name: "Distributed Systems", count: 2 },
                  { slug: "software-craft", name: "Software Craft", count: 1 },
                  { slug: "ai-infrastructure", name: "AI Infrastructure", count: 1 },
                ].map((s) => {
                  const isOpen = !!openSeries[s.slug];
                  const seriesArticles = libraryArticles.filter((a) => a.seriesSlug === s.slug);

                  return (
                    <div key={s.slug} className="space-y-1">
                      <button
                        onClick={() => toggleSeries(s.slug)}
                        className="w-full flex items-center justify-between p-1.5 rounded hover:bg-[var(--surface-3)] text-left cursor-pointer transition-colors text-[var(--text-2)] hover:text-[var(--text-1)]"
                      >
                        <span className="flex items-center gap-1.5 truncate">
                          <ChevronRight
                            className={`w-3.5 h-3.5 text-[var(--text-4)] transition-transform duration-200 ${
                              isOpen ? "rotate-90 text-[var(--accent)]" : ""
                            }`}
                          />
                          {isOpen ? (
                            <FolderOpen className="w-3.5 h-3.5 text-[var(--copper)]" />
                          ) : (
                            <Folder className="w-3.5 h-3.5 text-[var(--copper)]" />
                          )}
                          <span className="truncate">{s.name}</span>
                        </span>
                        <span className="text-[0.65rem] text-[var(--text-4)]">({s.count})</span>
                      </button>

                      {/* Sub-items in tree */}
                      {isOpen && (
                        <div className="pl-6 border-l border-[var(--line-subtle)] ml-3 space-y-1">
                          {seriesArticles.map((art) => (
                            <div key={art.slug} className="space-y-1">
                              <Link
                                href={`/writing/${art.slug}`}
                                className="flex items-center gap-1.5 p-1 text-[0.7rem] text-[var(--text-3)] hover:text-[var(--accent)] transition-colors no-underline truncate"
                              >
                                <FileText className="w-3 h-3 text-[var(--accent)] shrink-0" />
                                <span className="truncate">{art.title}</span>
                              </Link>
                              {/* Sub articles */}
                              {art.subArticles &&
                                art.subArticles.map((sub) => (
                                  <Link
                                    key={sub.slug}
                                    href={`/writing/${art.slug}#${sub.slug}`}
                                    className="block pl-4 py-0.5 text-[0.65rem] text-[var(--text-4)] hover:text-[var(--text-2)] transition-colors no-underline truncate"
                                  >
                                    ↳ {sub.title}
                                  </Link>
                                ))}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Listing: 9 cols */}
          <div className="lg:col-span-9 space-y-6">
            {/* Search and Tag bar */}
            <div className="p-4 rounded-[var(--radius-md)] border border-[var(--line-subtle)] bg-[var(--surface-1)] space-y-3">
              <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[var(--text-3)]" />
                <input
                  type="text"
                  placeholder="Filter articles by title or keyword..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-full rounded-[var(--radius-sm)] border border-[var(--line)] bg-[var(--surface-2)] pl-9 pr-4 py-2 text-xs font-mono text-[var(--text-1)] placeholder:text-[var(--text-4)] outline-none focus:border-[var(--accent)]"
                />
              </div>

              {/* Tag filters */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <button
                  onClick={() => setSelectedTag("all")}
                  className={`px-2.5 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                    selectedTag === "all"
                      ? "bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-line)]"
                      : "text-[var(--text-3)] hover:text-[var(--text-1)]"
                  }`}
                >
                  All Topics
                </button>
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setSelectedTag(tag)}
                    className={`px-2.5 py-1 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                      selectedTag === tag
                        ? "bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-line)]"
                        : "text-[var(--text-3)] hover:text-[var(--text-1)]"
                    }`}
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            {/* Articles List */}
            <div className="space-y-6">
              {filtered.map((art) => (
                <Card
                  key={art.slug}
                  className="!p-6 md:!p-8 flex flex-col justify-between"
                  interactive
                  href={`/writing/${art.slug}`}
                >
                  <div>
                    <div className="flex items-center justify-between gap-2 font-mono text-xs text-[var(--text-3)] mb-3">
                      <span className="uppercase text-[var(--copper)] font-semibold">
                        {art.series}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="w-3.5 h-3.5" /> {art.readingTime} min read
                      </span>
                    </div>

                    <h3 className="text-xl md:text-2xl font-semibold text-[var(--text-1)] mb-3 leading-snug">
                      {art.title}
                    </h3>

                    <p className="text-sm text-[var(--text-2)] leading-relaxed mb-6">
                      {art.excerpt}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {art.tags.map((t) => (
                        <Chip key={t} variant="skill">
                          {t}
                        </Chip>
                      ))}
                    </div>
                  </div>

                  <div className="pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between font-mono text-xs text-[var(--accent)]">
                    <span className="inline-flex items-center gap-1.5 font-medium">
                      Read Complete Note <ArrowRight className="w-3.5 h-3.5" />
                    </span>
                    <span className="text-[var(--text-3)]">{art.date}</span>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
