"use client";

import Link from "next/link";
import { ArrowRight, GitFork, FolderGit2 } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { GithubIcon } from "@/components/ui/icons";

export default function OpenSourcePage() {
  return (
    <div className="section-padding pt-32 bg-[var(--bg-0)] min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="mb-12">
          <SectionHeader
            number="OSS"
            label="OPEN SOURCE REPOSITORIES"
            heading="Public tooling and open engineering."
            emphasisWord="open"
            description="Public infrastructure packages, high-availability daemons, and developer utility SDKs."
            rightAction={
              <Link
                href="/projects"
                className="inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.08em] text-[var(--accent)] hover:text-[var(--accent-hover)] transition-colors"
              >
                View Personal Projects (3) <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          />
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-4 border-b border-[var(--line-subtle)] font-mono text-xs">
          <div className="inline-flex p-1 rounded-full border border-[var(--line-subtle)] bg-[var(--surface-1)]">
            <Link
              href="/projects"
              className="px-4 py-1.5 rounded-full text-[var(--text-3)] hover:text-[var(--text-1)] transition-colors no-underline"
            >
              Personal Projects (3)
            </Link>
            <span className="px-4 py-1.5 rounded-full bg-[var(--surface-3)] text-[var(--copper)] border border-[var(--copper-line)] font-semibold shadow-sm">
              Open Source (0)
            </span>
          </div>

          <div className="text-[0.72rem] text-[var(--text-3)] font-mono">
            STATUS: <strong className="text-[var(--copper)]">STAGING IN PROGRESS</strong>
          </div>
        </div>

        {/* Empty State Banner Card */}
        <div className="space-y-8 mb-12">
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

        {/* Pagination bar */}
        <div className="pt-6 border-t border-[var(--line-subtle)] flex items-center justify-between font-mono text-xs text-[var(--text-3)]">
          <span>Showing 0 of 0 repositories</span>
          <div className="flex items-center gap-3">
            <Link
              href="/projects"
              className="text-[var(--accent)] hover:underline flex items-center gap-1"
            >
              <FolderGit2 className="w-3.5 h-3.5" /> Browse Personal Projects Catalog →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
