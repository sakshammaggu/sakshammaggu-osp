"use client";

import { FileDown, Printer, Mail, Phone, MapPin, ExternalLink } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import siteConfig from "@/content/site";
import { getAllExperience, getAllSkills, getEducation } from "@/lib/content";

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
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8 pb-6 border-b border-[var(--line-subtle)] font-mono text-xs">
          <div>
            <span className="text-[var(--text-3)] block mb-1">CURRICULUM VITAE</span>
            <span className="text-[var(--copper)] font-medium">Last updated: November 2026</span>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="secondary" size="sm" onClick={handlePrint} className="gap-1.5 font-mono">
              <Printer className="w-3.5 h-3.5" /> Print / PDF
            </Button>
            <a
              href="/Resume_Saksham-Maggu.pdf"
              download="Saksham_Maggu_Resume.pdf"
              className="no-underline"
            >
              <Button variant="primary" size="sm" className="gap-1.5 font-mono">
                <FileDown className="w-3.5 h-3.5" /> Download PDF
              </Button>
            </a>
          </div>
        </div>

        {/* Printable Resume Sheet Card */}
        <div className="rounded-[var(--radius-lg)] border border-[var(--line-strong)] bg-[var(--surface-1)] p-8 md:p-12 shadow-xl print:border-none print:shadow-none print:p-0">
          {/* Header */}
          <div className="border-b border-[var(--line-subtle)] pb-8 mb-8">
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
                  <div className="text-[var(--copper)] font-medium">{edu.notes}</div>
                </div>
              </div>
            ))}
          </section>

          {/* Experience */}
          <section className="mb-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-3)] font-semibold mb-4 pb-1 border-b border-[var(--line-subtle)]">
              WORK EXPERIENCE
            </h2>
            <div className="space-y-6">
              {experiences.map((exp) => (
                <div key={exp.slug} className="space-y-2">
                  <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                    <div>
                      <h3 className="font-semibold text-sm md:text-base text-[var(--text-1)]">
                        {exp.company} — <span className="font-medium text-[var(--accent)]">{exp.role}</span>
                      </h3>
                    </div>
                    <span className="font-mono text-xs text-[var(--text-3)]">
                      {exp.start} – {exp.end === "present" ? "Present" : exp.end} | {exp.location}
                    </span>
                  </div>

                  <p className="text-xs text-[var(--text-2)] italic">
                    {exp.summary}
                  </p>

                  <ul className="space-y-1 pl-4 text-xs text-[var(--text-2)] leading-relaxed list-disc">
                    {exp.impact.map((point, pi) => (
                      <li key={pi}>{point}</li>
                    ))}
                  </ul>

                  <div className="pt-1 flex flex-wrap gap-1">
                    {exp.skills.map((s) => (
                      <span key={s} className="font-mono text-[0.65rem] text-[var(--text-3)] bg-[var(--surface-3)] px-2 py-0.5 rounded">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Technical Skills */}
          <section className="mb-8">
            <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-3)] font-semibold mb-4 pb-1 border-b border-[var(--line-subtle)]">
              TECHNICAL PROFICIENCIES
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs font-mono">
              <div>
                <span className="text-[var(--text-3)] block mb-1">LANGUAGES</span>
                <span className="text-[var(--text-1)]">C/C++, TypeScript, Python, Golang</span>
              </div>
              <div>
                <span className="text-[var(--text-3)] block mb-1">FRAMEWORKS & ENGINES</span>
                <span className="text-[var(--text-1)]">NextJS, ReactJS, NodeJS, ExpressJS, FastAPI, Langchain</span>
              </div>
              <div>
                <span className="text-[var(--text-3)] block mb-1">DATA & INFRASTRUCTURE</span>
                <span className="text-[var(--text-1)]">Docker, Kubernetes, MongoDB, MySQL, ChromaDB (Vector)</span>
              </div>
              <div>
                <span className="text-[var(--text-3)] block mb-1">SYSTEMS & PROTOCOLS</span>
                <span className="text-[var(--text-1)]">Redfish API, gRPC, iptables, RESTful APIs, SDD, SDLC</span>
              </div>
            </div>
          </section>

          {/* Projects */}
          <section>
            <h2 className="font-mono text-xs uppercase tracking-[0.1em] text-[var(--text-3)] font-semibold mb-4 pb-1 border-b border-[var(--line-subtle)]">
              SELECTED PROJECTS
            </h2>
            <div className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <h3 className="font-semibold text-sm text-[var(--text-1)]">Interview AI</h3>
                  <span className="text-[var(--text-3)]">ReactJS, NodeJS, ExpressJS, MongoDB, OpenAI</span>
                </div>
                <p className="text-xs text-[var(--text-2)] leading-relaxed">
                  Dynamic technical interview question generator and automated AI feedback evaluator with JWT authentication.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <h3 className="font-semibold text-sm text-[var(--text-1)]">CorrViz</h3>
                  <span className="text-[var(--text-3)]">NextJS, Python, FastAPI, Langchain, Gemini, ChromaDB</span>
                </div>
                <p className="text-xs text-[var(--text-2)] leading-relaxed">
                  Interactive dataset correlation visualizer with RAG AI chatbot, pair plots, and 10+ registered active users.
                </p>
              </div>

              <div>
                <div className="flex items-center justify-between text-xs font-mono mb-1">
                  <h3 className="font-semibold text-sm text-[var(--text-1)]">CpuVis</h3>
                  <span className="text-[var(--text-3)]">C++, SDL2, CMake</span>
                </div>
                <p className="text-xs text-[var(--text-2)] leading-relaxed">
                  Process scheduling algorithm visualizer built with modular GUI architecture in C++ and CMake.
                </p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
