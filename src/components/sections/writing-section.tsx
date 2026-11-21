"use client";

import Link from "next/link";
import { ArrowRight, BookOpen, Clock } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";

interface SampleArticle {
  slug: string;
  series: string;
  title: string;
  excerpt: string;
  readingTime: number;
  date: string;
  tags: string[];
}

const featuredArticle: SampleArticle = {
  slug: "low-latency-cluster-communication",
  series: "Distributed Systems",
  title: "Scaling East-West HA Communication from 3 to 64 Nodes in Edge Clusters",
  excerpt:
    "An architectural deep-dive into dynamic ipTable, NAT, and ipRules orchestration logic across multi-tier host networks.",
  readingTime: 12,
  date: "Nov 2026",
  tags: ["Golang", "Kubernetes", "Networking", "Distributed HA"],
};

const latestArticles: SampleArticle[] = [
  {
    slug: "spec-driven-api-development",
    series: "Software Craft",
    title: "Spec-Driven Development: Decoupling Gateway APIs with OpenAPI & Redfish",
    excerpt: "Why rigorous specification first eliminates 90% of edge regression bugs.",
    readingTime: 8,
    date: "Oct 2026",
    tags: ["SDD", "REST API", "Redfish"],
  },
  {
    slug: "ai-solutions-infrastructure",
    series: "AI Infrastructure",
    title: "Bare-Metal Server Prerequisite Checks via Redfish API for K8s Stacks",
    excerpt: "Automating RAID controller health, virtual disk state, and strict UEFI boot validations.",
    readingTime: 10,
    date: "Sep 2026",
    tags: ["Dell 17G", "Python", "K8s"],
  },
  {
    slug: "vector-search-in-production",
    series: "Data & AI",
    title: "Lessons from Embedding Chroma VectorDB & Gemini in Analytic Visualizers",
    excerpt: "Implementing conversational assistants over multidimensional statistical plots.",
    readingTime: 6,
    date: "Aug 2026",
    tags: ["LangChain", "Gemini", "FastAPI"],
  },
];

export function WritingSection() {
  return (
    <section id="writing" className="section-padding bg-[var(--bg-1)] border-t border-[var(--line-subtle)]">
      <div className="container-main">
        {/* Section Header with integrated rightAction */}
        <SectionHeader
          number="05"
          label="WRITING & SYSTEMS NOTES"
          heading="Technical essays and architecture."
          emphasisWord="architecture"
          description="Deep-dives into systems engineering, distributed consensus, low-latency networking, and hardware automation."
          rightAction={
            <Link
              href="/writing"
              className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
            >
              Browse library tree <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          }
        />

        {/* 7 / 5 Grid Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-12">
          {/* Featured Article: 7 cols */}
          <div className="lg:col-span-7">
            <Card className="h-full flex flex-col justify-between !p-6 md:!p-8" interactive href={`/writing/${featuredArticle.slug}`}>
              <div>
                <div className="flex items-center justify-between gap-4 mb-4 font-mono text-xs text-[var(--text-3)]">
                  <span className="uppercase text-[var(--copper)] font-semibold tracking-wider">
                    FEATURED ESSAY · {featuredArticle.series}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5" /> {featuredArticle.readingTime} min read
                  </span>
                </div>

                <h3 className="text-2xl md:text-3xl font-semibold tracking-tight text-[var(--text-1)] mb-4">
                  {featuredArticle.title}
                </h3>

                <p className="text-sm md:text-base text-[var(--text-2)] leading-relaxed mb-6">
                  {featuredArticle.excerpt}
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {featuredArticle.tags.map((tag) => (
                    <Chip key={tag} variant="skill">
                      {tag}
                    </Chip>
                  ))}
                </div>
              </div>

              <div className="pt-4 border-t border-[var(--line-subtle)] flex items-center justify-between text-xs font-mono text-[var(--accent)]">
                <span className="inline-flex items-center gap-1 font-medium">
                  Read complete paper <ArrowRight className="w-3.5 h-3.5" />
                </span>
                <span className="text-[var(--text-3)]">{featuredArticle.date}</span>
              </div>
            </Card>
          </div>

          {/* Latest Articles: 5 cols */}
          <div className="lg:col-span-5 flex flex-col justify-between space-y-4">
            {latestArticles.map((art, idx) => (
              <Card
                key={art.slug}
                className="!p-5 flex-1 flex flex-col justify-between"
                interactive
                href={`/writing/${art.slug}`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 font-mono text-[0.68rem] text-[var(--text-3)] mb-1">
                    <span className="font-semibold text-[var(--text-2)]">0{idx + 1} · {art.series}</span>
                    <span>{art.readingTime}m read</span>
                  </div>
                  <h4 className="text-base font-semibold text-[var(--text-1)] mb-1.5 line-clamp-2">
                    {art.title}
                  </h4>
                  <p className="text-xs text-[var(--text-2)] line-clamp-2">
                    {art.excerpt}
                  </p>
                </div>
                <div className="pt-3 border-t border-[var(--line-subtle)] flex items-center justify-between text-[0.7rem] font-mono text-[var(--text-3)]">
                  <span>{art.date}</span>
                  <span className="text-[var(--accent)] flex items-center gap-1">
                    Read ↗
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* Bottom library link */}
        <div className="text-center pt-2">
          <Link
            href="/writing"
            className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-wider text-[var(--text-2)] hover:text-[var(--text-1)] transition-colors"
          >
            <BookOpen className="w-4 h-4 text-[var(--accent)]" /> Explore full engineering notes library
          </Link>
        </div>
      </div>
    </section>
  );
}
