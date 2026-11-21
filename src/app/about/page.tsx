"use client";

import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { GraduationCap, Code2, Server, Compass, CheckCircle2, ShieldAlert } from "lucide-react";
import siteConfig from "@/content/site";

const principles = [
  {
    num: "01",
    title: "Spec-Driven Development First",
    description: "Write specs before touching implementation code. Precise contract design between services and firmware eliminates integration bugs before they exist.",
  },
  {
    num: "02",
    title: "Systems Must Hold Under Load",
    description: "A system isn't finished when it works on the happy path. It is finished when it degrades gracefully under saturation, network partition, and node failure.",
  },
  {
    num: "03",
    title: "Rigorous Measurement Over Intuition",
    description: "Profile CPU cycles, memory allocations, and network packet paths with real instrumentation rather than guessing.",
  },
  {
    num: "04",
    title: "Calm, Restrained Engineering",
    description: "Prefer simple, composable, readable code with zero magic dependencies over clever abstractions that require endless context to debug.",
  },
];

export default function AboutPage() {
  return (
    <div className="section-padding pt-32 bg-[var(--bg-0)] min-h-screen">
      <div className="container-main space-y-20">
        {/* Header */}
        <SectionHeader
          number="BIO"
          label="ABOUT THE ENGINEER"
          heading="Engineering principles, story, and craft."
          emphasisWord="principles"
          description="A detailed view of my engineering journey, operating thesis, and technical foundation."
        />

        {/* Narrative & Photo Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Main Story: 8 cols */}
          <div className="lg:col-span-8 space-y-6 text-base text-[var(--text-2)] leading-relaxed">
            <h2 className="text-2xl font-semibold text-[var(--text-1)] mb-4">
              Building at the Hardware–Software Boundary
            </h2>
            <p>
              I am a Software Engineer at <strong className="text-[var(--text-1)]">Dell Technologies</strong> in Bengaluru.
              My work spans distributed high-availability clusters, edge networking orchestration, and bare-metal server firmware checks.
              I find the most rewarding engineering problems at the intersection of low-level constraints and high-scale software systems.
            </p>
            <p>
              During my work on Dell NativeEdge, I engineered algorithmic scaling logic in Golang to scale cluster nodes from 3-4 HA members
              to up to 64 nodes. This required deep immersion in Linux kernel networking — dynamic ipTables, NAT translation,
              bridge interfaces, and multi-network routing across primary, secondary, and tertiary host networks.
            </p>
            <p>
              Currently, I focus on AI Solutions Infrastructure blueprints for next-generation Dell iDRAC10 (17G) servers and Kubernetes stacks.
              Using the DMTF Redfish API, I automate critical pre-requisite validations: virtual disk health, RAID controller operational readiness,
              and strict UEFI boot mode enforcements.
            </p>
            <p>
              Outside of work, I explore process scheduling visualization, AI-driven data relationship analytics with LangChain and vector databases,
              and competitive problem solving on LeetCode.
            </p>
          </div>

          {/* Quick Info Box: 4 cols */}
          <div className="lg:col-span-4 space-y-6">
            <Card className="!p-6 space-y-4">
              <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] pb-2 border-b border-[var(--line-subtle)]">
                Fast Facts
              </h4>
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="text-[var(--text-3)] block mb-0.5">LOCATION</span>
                  <span className="text-[var(--text-1)] font-medium">Bengaluru, Karnataka, India</span>
                </div>
                <div>
                  <span className="text-[var(--text-3)] block mb-0.5">ORIGIN</span>
                  <span className="text-[var(--text-1)] font-medium">Rohtak, Haryana, India</span>
                </div>
                <div>
                  <span className="text-[var(--text-3)] block mb-0.5">CURRENT ROLE</span>
                  <span className="text-[var(--text-1)] font-medium">Software Engineer 1 @ Dell</span>
                </div>
                <div>
                  <span className="text-[var(--text-3)] block mb-0.5">ACADEMIC ALUMNI</span>
                  <span className="text-[var(--text-1)] font-medium">UPES Dehradun (B.Tech Full Stack AI)</span>
                </div>
              </div>
            </Card>
          </div>
        </div>

        {/* "How I Work" Principles (4 Cards) */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-6">
            Engineering Principles & Operating Thesis
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {principles.map((p) => (
              <Card key={p.num} className="!p-6 space-y-3" interactive>
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs font-semibold text-[var(--copper)]">
                    {p.num}
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                </div>
                <h4 className="text-lg font-semibold text-[var(--text-1)]">
                  {p.title}
                </h4>
                <p className="text-xs md:text-sm text-[var(--text-2)] leading-relaxed">
                  {p.description}
                </p>
              </Card>
            ))}
          </div>
        </div>

        {/* Education Timeline Block */}
        <div>
          <h3 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-6">
            Education & Formal Foundation
          </h3>
          <Card className="!p-8">
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-4">
              <div>
                <h4 className="text-xl font-semibold text-[var(--text-1)] mb-1">
                  UPES, Dehradun
                </h4>
                <p className="font-mono text-xs text-[var(--accent)]">
                  Bachelor of Technology in Computer Science & Engineering (Full Stack AI)
                </p>
              </div>
              <div className="font-mono text-xs text-[var(--text-3)] text-left md:text-right">
                <div>Aug 2022 – May 2026</div>
                <div className="text-[var(--copper)] font-semibold mt-0.5">CGPA: 8.55 / 10</div>
              </div>
            </div>

            <p className="text-xs md:text-sm text-[var(--text-2)] leading-relaxed mb-6">
              Rigorous coursework in Data Structures & Algorithms, Database Management Systems, Operating Systems,
              Object-Oriented Programming, and Software Development Life Cycle (SDLC).
            </p>

            <div className="pt-4 border-t border-[var(--line-subtle)] flex flex-wrap gap-2">
              {["DSA", "DBMS", "Operating Systems", "Computer Networks", "SDLC", "Full Stack AI", "OOP"].map((course) => (
                <Chip key={course} variant="readout">
                  {course}
                </Chip>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
