"use client";

import Image from "next/image";
import { FileDown, Printer, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import siteConfig from "@/content/site";
import { getAllExperience, getAllSkills, getEducation } from "@/lib/content";

const GOOGLE_DRIVE_RESUME_URL =
  "https://drive.google.com/file/d/1Wnb_b-d0aWpwBzE_D03AwlAWkqLMhgtw/view?usp=sharing";

export default function ResumePage() {
  const experiences = getAllExperience();
  const skills = getAllSkills();
  const education = getEducation();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="section-padding pt-32 bg-[var(--bg-0)] min-h-screen">
      <div className="container-main max-w-4xl">
        {/* Sticky Action Bar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-[var(--line-subtle)] font-mono text-xs">
          <div>
            <span className="text-[var(--text-3)] block mb-1">CURRICULUM VITAE</span>
            <span className="text-[var(--copper)] font-medium">Last updated: November 2026</span>
          </div>

          <div className="flex flex-wrap items-center gap-2.5">
            {/* Quick in-browser Print */}
            <Button
              variant="ghost"
              size="sm"
              onClick={handlePrint}
              className="hidden md:inline-flex items-center gap-1.5 font-mono text-xs border border-[var(--line-subtle)] hover:bg-[var(--surface-3)]"
            >
              <Printer className="w-3.5 h-3.5" /> Browser Print
            </Button>

            {/* Print on Google Drive */}
            <a
              href={GOOGLE_DRIVE_RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
              title="Open Google Drive document to print"
            >
              <Button variant="secondary" size="sm" className="gap-1.5 font-mono text-xs text-[var(--accent)] border-[var(--accent-line)]/50 hover:bg-[var(--surface-3)]">
                <Printer className="w-3.5 h-3.5" /> Print (Drive) ↗
              </Button>
            </a>

            {/* Download PDF via Google Drive Shareable Link */}
            <a
              href={GOOGLE_DRIVE_RESUME_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="no-underline"
              title="View and download original PDF on Google Drive"
            >
              <Button variant="primary" size="sm" className="gap-1.5 font-mono text-xs font-semibold">
                <FileDown className="w-3.5 h-3.5" /> Download PDF ↗
              </Button>
            </a>
          </div>
        </div>

        {/* Drive Document Pill Banner */}
        <div className="mb-6 p-3 rounded-[var(--radius-md)] border border-[var(--accent-line)]/40 bg-[var(--surface-1)] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 font-mono text-xs">
          <div className="flex items-center gap-2 text-[var(--text-2)]">
            <span className="w-2 h-2 rounded-full bg-[var(--accent)] shadow-[0_0_6px_var(--accent)]" />
            <span>Official Canonical Document hosted on Google Drive</span>
          </div>
          <a
            href={GOOGLE_DRIVE_RESUME_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-[var(--accent)] hover:underline flex items-center gap-1 font-semibold"
          >
            Open in Google Drive <ExternalLink className="w-3 h-3" />
          </a>
        </div>

        {/* Printable Resume Sheet Card */}
        <div className="rounded-[var(--radius-lg)] border border-[var(--line-strong)] bg-[var(--surface-1)] p-8 md:p-12 shadow-xl print:border-none print:shadow-none print:p-0">
          {/* Header with Badge Photo */}
          <div className="border-b border-[var(--line-subtle)] pb-8 mb-8 flex flex-col-reverse sm:flex-row sm:items-start justify-between gap-6">
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-1)] mb-2">
                Saksham Maggu
              </h1>
              <p className="font-mono text-xs text-[var(--accent)] font-medium uppercase tracking-wider mb-4">
                Software Engineer 1 · AI Solutions & Distributed Infrastructure
              </p>

              <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-[var(--text-2)]">
                <span className="flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-[var(--text-3)]" /> Bengaluru, India
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Mail className="w-3.5 h-3.5 text-[var(--text-3)]" /> {siteConfig.email}
                </span>
                <span>·</span>
                <span className="flex items-center gap-1.5">
                  <Phone className="w-3.5 h-3.5 text-[var(--text-3)]" /> +91-7015369344
                </span>
              </div>

              <div className="flex items-center gap-4 mt-3 text-xs font-mono text-[var(--copper)]">
                <a href="https://github.com/sakshammaggu" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  GitHub ↗
                </a>
                <span>·</span>
                <a href="https://linkedin.com/in/sakshammaggu" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LinkedIn ↗
                </a>
                <span>·</span>
                <a href="https://leetcode.com/sakshammaggu" target="_blank" rel="noopener noreferrer" className="hover:underline">
                  LeetCode ↗
                </a>
              </div>
            </div>

            {/* Official Badge Photo */}
            <div className="relative w-24 h-24 sm:w-28 sm:h-28 rounded-[var(--radius-md)] overflow-hidden border-2 border-[var(--accent-line)] shadow-md shrink-0 bg-[var(--surface-2)]">
              <Image
                src="/saksham-maggu-badge-photo.jpg"
                alt="Saksham Maggu"
                fill
                className="object-cover object-top"
                sizes="120px"
                priority
              />
            </div>
          </div>

          {/* Education */}
          <section className="mb-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-3)] font-semibold mb-4 pb-1 border-b border-[var(--line-subtle)]">
              EDUCATION
            </h2>
            {education.map((edu, idx) => (
              <div key={idx} className="flex flex-col sm:flex-row sm:items-start justify-between gap-1 mb-2">
                <div>
                  <h3 className="font-semibold text-base text-[var(--text-1)]">
                    {edu.institution}
                  </h3>
                  <p className="text-xs text-[var(--text-2)]">
                    {edu.degree} in {edu.field}
                  </p>
                </div>
                <div className="font-mono text-xs text-left sm:text-right text-[var(--text-3)]">
                  <div>{edu.start} – {edu.end}</div>
                  {edu.notes && <div className="text-[var(--accent)]">{edu.notes}</div>}
                </div>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-3)] font-semibold mb-6 pb-1 border-b border-[var(--line-subtle)]">
              EXPERIENCE
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.slug} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-1">
                    <div>
                      <h3 className="font-semibold text-base text-[var(--text-1)]">
                        {exp.company}
                      </h3>
                      <p className="text-xs text-[var(--copper)] font-medium">
                        {exp.role}
                      </p>
                    </div>
                    <div className="font-mono text-xs text-left sm:text-right text-[var(--text-3)]">
                      <div>{exp.start} – {exp.end ?? "present"}</div>
                      <div>{exp.location}</div>
                    </div>
                  </div>

                  <p className="text-xs text-[var(--text-2)] leading-relaxed">
                    {exp.summary}
                  </p>

                  <ul className="list-disc list-inside space-y-1 text-xs text-[var(--text-2)] leading-relaxed pl-1">
                    {exp.impact.map((point, idx) => (
                      <li key={idx} className="marker:text-[var(--accent)]">
                        {point}
                      </li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1 pt-1">
                    {exp.skills.map((skill) => (
                      <span
                        key={skill}
                        className="font-mono text-[0.65rem] px-1.5 py-0.5 rounded bg-[var(--surface-2)] text-[var(--text-3)] border border-[var(--line-subtle)]"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Skills Summary */}
          <section>
            <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-3)] font-semibold mb-4 pb-1 border-b border-[var(--line-subtle)]">
              TECHNICAL SKILLS MATRIX
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div>
                <span className="font-mono text-[0.7rem] text-[var(--accent)] font-semibold block mb-1">
                  LANGUAGES
                </span>
                <p className="text-[var(--text-2)] font-mono">
                  {skills.filter(s => s.category === "language").map(s => s.name).join(" · ")}
                </p>
              </div>
              <div>
                <span className="font-mono text-[0.7rem] text-[var(--accent)] font-semibold block mb-1">
                  SYSTEMS & ARCHITECTURE
                </span>
                <p className="text-[var(--text-2)] font-mono">
                  {skills.filter(s => s.category === "systems").map(s => s.name).join(" · ")}
                </p>
              </div>
              <div>
                <span className="font-mono text-[0.7rem] text-[var(--accent)] font-semibold block mb-1">
                  DATA & AI
                </span>
                <p className="text-[var(--text-2)] font-mono">
                  {skills.filter(s => s.category === "data").map(s => s.name).join(" · ")}
                </p>
              </div>
              <div>
                <span className="font-mono text-[0.7rem] text-[var(--accent)] font-semibold block mb-1">
                  WEB & CLOUD TOOLS
                </span>
                <p className="text-[var(--text-2)] font-mono">
                  {skills.filter(s => s.category === "web" || s.category === "tool").map(s => s.name).join(" · ")}
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
