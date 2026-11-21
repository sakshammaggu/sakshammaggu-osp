"use client";

import Image from "next/image";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { GraduationCap, Sparkles, Compass } from "lucide-react";
import siteConfig from "@/content/site";

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-[var(--bg-1)] border-t border-[var(--line-subtle)]">
      <div className="container-main">
        {/* Section Header */}
        <SectionHeader
          number="07"
          label="ABOUT & BACKGROUND"
          heading="Architecture, discipline, and execution."
          emphasisWord="discipline"
          description="Bridging the gap between low-level hardware constraints and high-scale distributed systems."
        />

        {/* 5 / 7 Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Left: 5 Cols (Polaroid-style Badge Card with 2 deg subtle rotation) */}
          <div className="lg:col-span-5 flex justify-center">
            <div className="relative w-full max-w-[320px] rounded-[var(--radius-lg)] p-4 bg-[var(--surface-1)] shadow-xl border border-[var(--line-strong)] rotate-1 hover:rotate-0 transition-transform duration-300">
              <div className="w-full rounded-[var(--radius-md)] border border-[var(--line-subtle)] bg-[var(--surface-2)] flex flex-col items-center p-4 text-center overflow-hidden relative shadow-sm">
                <div className="dot-grid absolute inset-0 opacity-15" />

                {/* Photo container with proper aspect ratio */}
                <div className="relative w-full aspect-[4/3] rounded-[var(--radius-sm)] overflow-hidden border border-[var(--line-subtle)] mb-4 bg-[var(--surface-1)] shadow-xs">
                  <Image
                    src="/saksham-maggu-badge-photo.jpg"
                    alt="Saksham Maggu - Software Engineer"
                    fill
                    className="object-cover object-top"
                    sizes="300px"
                  />
                </div>

                {/* Identity Info */}
                <div className="w-full text-left space-y-1">
                  <div className="flex items-center justify-between">
                    <h4 className="text-base font-semibold text-[var(--text-1)]">
                      {siteConfig.name}
                    </h4>
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)] animate-pulse" />
                  </div>
                  <p className="font-mono text-xs text-[var(--accent)] font-medium">
                    Software Engineer 1 · AI Solutions
                  </p>
                  <p className="font-mono text-[0.7rem] text-[var(--text-3)]">
                    Dell Technologies · Bengaluru
                  </p>
                </div>

                {/* Footer Details */}
                <div className="w-full pt-3 mt-3 border-t border-[var(--line-subtle)] flex items-center justify-between font-mono text-[0.68rem] text-[var(--text-3)]">
                  <span>SPEC: DISTRIBUTED HA</span>
                  <span className="text-[var(--copper)]">UPES &apos;26</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right: 7 Cols (Bio & Context) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="space-y-4 text-base text-[var(--text-2)] leading-relaxed max-w-[62ch]">
              <p>
                I am a Software Engineer based in Bengaluru, currently engineering AI
                solutions infrastructure and high-availability systems at <strong className="text-[var(--text-1)] font-medium">Dell Technologies</strong>.
                My work centers around server prerequisite automation, Redfish API blueprints, and scaling distributed clusters.
              </p>
              <p>
                Prior to this, I worked on the <strong className="text-[var(--text-1)] font-medium">Dell NativeEdge</strong> team,
                authoring algorithmic scaling that expanded East-West HA communication from 3-4 nodes to up to 64 nodes.
                I believe that real engineering depth comes from rigor at the boundaries — network virtual switches, strict UEFI firmware states, and clean Spec-Driven Development.
              </p>
              <p>
                I hold a Bachelor of Technology in Computer Science & Engineering with a specialization in Full Stack AI from UPES Dehradun, graduating with an 8.55/10 CGPA.
              </p>
            </div>

            {/* Sub-blocks: Education & Interests */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-6 border-t border-[var(--line-subtle)]">
              {/* Education Card */}
              <div className="rounded-[var(--radius-md)] border border-[var(--line-subtle)] bg-[var(--surface-1)] p-5">
                <div className="flex items-center gap-2 mb-2">
                  <GraduationCap className="w-4 h-4 text-[var(--accent)]" />
                  <span className="font-mono text-xs font-semibold text-[var(--text-1)]">
                    EDUCATION
                  </span>
                </div>
                <h5 className="text-sm font-semibold text-[var(--text-1)]">
                  UPES, Dehradun
                </h5>
                <p className="text-xs text-[var(--text-2)] mb-1">
                  B.Tech CSE (Full Stack AI)
                </p>
                <div className="flex items-center justify-between font-mono text-[0.72rem] text-[var(--text-3)]">
                  <span>2022 – 2026</span>
                  <span className="text-[var(--copper)] font-medium">8.55 / 10 CGPA</span>
                </div>
              </div>

              {/* Technical Interests */}
              <div className="rounded-[var(--radius-md)] border border-[var(--line-subtle)] bg-[var(--surface-1)] p-5">
                <div className="flex items-center gap-2 mb-3">
                  <Compass className="w-4 h-4 text-[var(--copper)]" />
                  <span className="font-mono text-xs font-semibold text-[var(--text-1)]">
                    AREAS OF FOCUS
                  </span>
                </div>
                <div className="flex flex-wrap gap-1.5">
                  {[
                    "Distributed Consensus",
                    "Linux Kernel & iptables",
                    "Edge Virtualization",
                    "Redfish SDD",
                    "LangChain & VectorDB",
                  ].map((interest) => (
                    <Chip key={interest} variant="skill">
                      {interest}
                    </Chip>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
