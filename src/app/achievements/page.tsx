"use client";

import { useState } from "react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { Award, GraduationCap, Server, ShieldCheck, Trophy, Sparkles } from "lucide-react";

interface RecordItem {
  year: string;
  date: string;
  title: string;
  issuer: string;
  category: "academic" | "award" | "certification" | "competition";
  description: string;
}

const records: RecordItem[] = [
  {
    year: "2026",
    date: "Aug 2026",
    title: "Software Engineer 1 Appointment",
    issuer: "Dell Technologies, Bengaluru",
    category: "award",
    description: "Joined full-time on AI Solutions Infrastructure, leading Dell iDRAC10 (17G) server prerequisite validations.",
  },
  {
    year: "2026",
    date: "May 2026",
    title: "Bachelor of Technology in CSE (Full Stack AI) — 8.55/10 CGPA",
    issuer: "UPES Dehradun",
    category: "academic",
    description: "Completed 4-year degree in Computer Science with top honors and focus on Full Stack Artificial Intelligence.",
  },
  {
    year: "2026",
    date: "Jan–Jun 2026",
    title: "Software Engineer Internship (Winter) — WiFi-PSK & Spec-Driven APIs",
    issuer: "Dell Technologies",
    category: "award",
    description: "Built end-to-end WiFi-PSK networking, HostNetwork/NAT state persistence, and automated regression suites.",
  },
  {
    year: "2025",
    date: "Jun–Jul 2025",
    title: "Software Engineer Internship (Summer) — 64-Node HA Cluster Engine",
    issuer: "Dell NativeEdge Team",
    category: "award",
    description: "Engineered scalable East-West HA communication algorithm expanding cluster capacity from 3-4 nodes to 8+ nodes up to 64 nodes.",
  },
  {
    year: "2024",
    date: "Jul–Sep 2024",
    title: "Frontend Engineering Internship — Verification Architecture",
    issuer: "Dehix Freelancer Platform",
    category: "certification",
    description: "Revamped web architecture with Next.js, elevating experience and verification pipelines for 30+ active users.",
  },
  {
    year: "2024",
    date: "2024",
    title: "CpuVis — CPU Process Scheduling Visualizer",
    issuer: "Open Source Engineering",
    category: "competition",
    description: "Engineered modular C++/SDL2 simulator for CPU scheduling algorithms and pipeline visualization.",
  },
];

export default function AchievementsPage() {
  const [filter, setFilter] = useState<string>("all");

  const filtered = records.filter((r) => {
    if (filter === "all") return true;
    return r.category === filter;
  });

  // Group by year
  const years = Array.from(new Set(filtered.map((r) => r.year))).sort((a, b) => Number(b) - Number(a));

  return (
    <div className="section-padding pt-32 bg-[var(--bg-0)] min-h-screen">
      <div className="container-main">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12">
          <SectionHeader
            number="LEDGER"
            label="RECORDS & RECOGNITION"
            heading="Academic honors, milestones, and deliverables."
            emphasisWord="milestones"
            description="Verified record of engineering appointments, academic accomplishments, and production milestones."
          />

          <div className="inline-flex gap-1.5 flex-wrap mb-12 self-start md:self-end">
            {[
              { id: "all", label: "All" },
              { id: "academic", label: "Academic" },
              { id: "award", label: "Appointments & Roles" },
              { id: "certification", label: "Platform" },
              { id: "competition", label: "Open Source" },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setFilter(tab.id)}
                className={`px-3 py-1.5 rounded-full text-xs font-mono transition-colors cursor-pointer ${
                  filter === tab.id
                    ? "bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-line)] font-medium"
                    : "text-[var(--text-3)] hover:text-[var(--text-1)]"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Grouped by Year */}
        <div className="space-y-12">
          {years.map((year) => {
            const yearItems = filtered.filter((r) => r.year === year);
            return (
              <div key={year} className="relative grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
                {/* Sticky Year Label on left: 2 cols */}
                <div className="md:col-span-2 sticky top-28">
                  <span className="font-mono text-3xl md:text-4xl font-bold text-[var(--copper)] tabular-nums">
                    {year}
                  </span>
                  <div className="h-0.5 w-12 bg-[var(--line-subtle)] mt-2" />
                </div>

                {/* Items: 10 cols */}
                <div className="md:col-span-10 space-y-4">
                  {yearItems.map((item, idx) => (
                    <Card key={idx} className="!p-6" interactive>
                      <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-2 mb-2 font-mono text-xs">
                        <span className="text-[var(--accent)] uppercase font-semibold">
                          {item.issuer}
                        </span>
                        <span className="text-[var(--text-3)]">{item.date}</span>
                      </div>
                      <h3 className="text-lg font-semibold text-[var(--text-1)] mb-2">
                        {item.title}
                      </h3>
                      <p className="text-xs md:text-sm text-[var(--text-2)] leading-relaxed">
                        {item.description}
                      </p>
                    </Card>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-16 text-center font-mono text-xs text-[var(--text-4)]">
          // TODO(achievements): Direct verifiable credentials can be attached here
        </div>
      </div>
    </div>
  );
}
