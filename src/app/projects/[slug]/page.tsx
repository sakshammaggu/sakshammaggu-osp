import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ExternalLink, Calendar, Users, Layers, CheckCircle2 } from "lucide-react";
import { getAllProjects } from "@/lib/content";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { GithubIcon } from "@/components/ui/icons";

export function generateStaticParams() {
  const projects = getAllProjects();
  return projects.map((p) => ({
    slug: p.slug,
  }));
}

export default async function ProjectDetailPage(props: PageProps<"/projects/[slug]">) {
  const { slug } = await props.params;
  const projects = getAllProjects();
  const project = projects.find((p) => p.slug === slug);

  if (!project) {
    notFound();
  }

  const currentIndex = projects.findIndex((p) => p.slug === slug);
  const prevProject = currentIndex > 0 ? projects[currentIndex - 1] : null;
  const nextProject = currentIndex < projects.length - 1 ? projects[currentIndex + 1] : null;

  return (
    <article className="section-padding pt-32 bg-[var(--bg-0)] min-h-screen">
      <div className="container-main">
        {/* Navigation back & prev/next */}
        <div className="flex items-center justify-between mb-8 pb-4 border-b border-[var(--line-subtle)] font-mono text-xs">
          <Link
            href="/projects"
            className="inline-flex items-center gap-1.5 text-[var(--text-2)] hover:text-[var(--accent)] transition-colors no-underline"
          >
            <ArrowLeft className="w-3.5 h-3.5" /> All Projects
          </Link>

          <div className="flex items-center gap-4 text-[var(--text-3)]">
            {prevProject && (
              <Link
                href={`/projects/${prevProject.slug}`}
                className="hover:text-[var(--text-1)] transition-colors no-underline"
              >
                ← Prev
              </Link>
            )}
            {nextProject && (
              <Link
                href={`/projects/${nextProject.slug}`}
                className="hover:text-[var(--text-1)] transition-colors no-underline"
              >
                Next →
              </Link>
            )}
          </div>
        </div>

        {/* Case Study Header */}
        <div className="mb-12 max-w-[800px]">
          <div className="flex items-center gap-3 mb-4 font-mono text-xs text-[var(--text-3)] uppercase tracking-[0.08em]">
            <span className="text-[var(--copper)] font-semibold">CASE STUDY</span>
            <span>·</span>
            <span>{project.year}</span>
            <span>·</span>
            <span>{project.type.join(" / ")}</span>
          </div>

          <h1 className="text-[clamp(2.5rem,5vw+1rem,4rem)] font-semibold tracking-[-0.03em] leading-[1.05] text-[var(--text-1)] mb-6">
            {project.title}
          </h1>

          <p className="text-base md:text-lg text-[var(--text-2)] leading-relaxed">
            {project.summary}
          </p>
        </div>

        {/* Hero Media Banner */}
        <div className="w-full aspect-[21/9] rounded-[var(--radius-xl)] border border-[var(--line-subtle)] bg-[var(--surface-2)] mb-16 relative overflow-hidden flex flex-col items-center justify-center p-8 text-center shadow-lg">
          <div className="dot-grid absolute inset-0 opacity-20" />
          <div className="relative z-10 space-y-2">
            <span className="font-mono text-xs text-[var(--accent)] uppercase tracking-wider block">
              SYSTEM ARCHITECTURE SPECIFICATION
            </span>
            <h2 className="text-2xl md:text-3xl font-semibold text-[var(--text-1)]">
              {project.title}
            </h2>
            <p className="font-mono text-xs text-[var(--text-3)] max-w-md mx-auto">
              Production case study and implementation blueprint
            </p>
          </div>
        </div>

        {/* Main 8 Cols / Sticky Facts 4 Cols */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-20">
          {/* Main Content: 8 cols */}
          <div className="lg:col-span-8 space-y-12">
            {/* 01 Problem Statement */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 font-mono text-xs text-[var(--copper)] uppercase tracking-wider font-semibold">
                <span>01</span>
                <span>/</span>
                <span>THE PROBLEM</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--text-1)]">
                Target Objective & Constraints
              </h2>
              <p className="text-sm md:text-base text-[var(--text-2)] leading-relaxed">
                Modern software engineering demands high precision, reliability, and real-time responsiveness.
                For {project.title}, the challenge was ensuring robust performance, clean separation of concerns,
                and seamless interaction while operating under dynamic user requirements.
              </p>
            </section>

            {/* 02 Architectural Approach */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent)] uppercase tracking-wider font-semibold">
                <span>02</span>
                <span>/</span>
                <span>APPROACH & ARCHITECTURE</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--text-1)]">
                System Design & Modular Architecture
              </h2>
              <p className="text-sm md:text-base text-[var(--text-2)] leading-relaxed">
                The solution was structured with modular decoupled layers: client presentation, API gateway,
                business logic, and underlying data engines. By isolating core algorithms from visualization components,
                the system guarantees maximum throughput with minimal latency.
              </p>

              {/* Architecture Blueprint Card */}
              <div className="rounded-[var(--radius-md)] border border-[var(--line-subtle)] bg-[var(--surface-1)] p-6 space-y-3 font-mono text-xs">
                <span className="text-[var(--text-3)] uppercase tracking-wider block">
                  LAYERED STACK FLOW
                </span>
                <div className="space-y-2 text-[var(--text-2)]">
                  <div className="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--line-subtle)] flex justify-between">
                    <span>1. Presentation Layer</span>
                    <span className="text-[var(--accent)]">Next.js / React</span>
                  </div>
                  <div className="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--line-subtle)] flex justify-between">
                    <span>2. Computation & Orchestration</span>
                    <span className="text-[var(--copper)]">FastAPI / Node.js Engine</span>
                  </div>
                  <div className="p-2.5 rounded bg-[var(--surface-2)] border border-[var(--line-subtle)] flex justify-between">
                    <span>3. Persistence & Vector Index</span>
                    <span className="text-[var(--info)]">MongoDB / ChromaDB</span>
                  </div>
                </div>
              </div>
            </section>

            {/* 03 Key Decisions Cards */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 font-mono text-xs text-[var(--text-3)] uppercase tracking-wider font-semibold">
                <span>03</span>
                <span>/</span>
                <span>KEY DECISIONS</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--text-1)]">
                Trade-offs and Choices
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="rounded-[var(--radius-md)] border border-[var(--line-subtle)] bg-[var(--surface-1)] p-5 space-y-2">
                  <span className="font-mono text-[0.68rem] text-[var(--accent)] font-semibold uppercase">
                    DECISION: Spec-Driven Interfaces
                  </span>
                  <p className="text-xs text-[var(--text-2)] leading-relaxed">
                    Designed OpenAPI and strict type schemas prior to implementation to prevent client-server drift.
                  </p>
                  <span className="font-mono text-[0.65rem] text-[var(--text-3)] block pt-2 border-t border-[var(--line-subtle)]">
                    Trade-off: Upfront schema design vs rapid prototyping.
                  </span>
                </div>

                <div className="rounded-[var(--radius-md)] border border-[var(--line-subtle)] bg-[var(--surface-1)] p-5 space-y-2">
                  <span className="font-mono text-[0.68rem] text-[var(--copper)] font-semibold uppercase">
                    DECISION: Vector Search Acceleration
                  </span>
                  <p className="text-xs text-[var(--text-2)] leading-relaxed">
                    Employed vector embeddings to match semantic intent across datasets in real-time.
                  </p>
                  <span className="font-mono text-[0.65rem] text-[var(--text-3)] block pt-2 border-t border-[var(--line-subtle)]">
                    Trade-off: Memory footprint vs query precision.
                  </span>
                </div>
              </div>
            </section>

            {/* 04 Results & Outcomes */}
            <section className="space-y-4">
              <div className="flex items-center gap-3 font-mono text-xs text-[var(--accent)] uppercase tracking-wider font-semibold">
                <span>04</span>
                <span>/</span>
                <span>MEASURED RESULTS</span>
              </div>
              <h2 className="text-2xl font-semibold text-[var(--text-1)]">
                Deployment Metrics & Validation
              </h2>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {project.metrics.map((m, i) => (
                  <div
                    key={i}
                    className="p-4 rounded-[var(--radius-sm)] border border-[var(--line-subtle)] bg-[var(--surface-1)]"
                  >
                    <span className="font-mono text-[0.65rem] text-[var(--text-3)] uppercase block mb-1">
                      {m.label}
                    </span>
                    <span className="font-mono text-xl font-bold text-[var(--text-1)]">
                      {m.value} {m.unit}
                    </span>
                  </div>
                ))}
              </div>
            </section>
          </div>

          {/* Sticky Facts Sidebar: 4 cols */}
          <div className="lg:col-span-4 sticky top-28 space-y-6">
            <Card className="!p-6 space-y-6">
              <h4 className="font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] pb-3 border-b border-[var(--line-subtle)]">
                Project Specification
              </h4>

              <div className="space-y-4 text-xs font-mono">
                <div>
                  <span className="text-[var(--text-3)] block mb-1">ROLE</span>
                  <span className="font-semibold text-[var(--text-1)]">{project.role}</span>
                </div>

                <div>
                  <span className="text-[var(--text-3)] block mb-1">TIMELINE</span>
                  <span className="font-semibold text-[var(--text-1)]">{project.timeline}</span>
                </div>

                <div>
                  <span className="text-[var(--text-3)] block mb-1">COLLABORATION</span>
                  <span className="font-semibold text-[var(--text-1)]">{project.team ?? "Solo"}</span>
                </div>

                <div>
                  <span className="text-[var(--text-3)] block mb-2">TECH STACK</span>
                  <div className="flex flex-wrap gap-1.5">
                    {project.skills.map((s) => (
                      <Chip key={s} variant="skill">
                        {s}
                      </Chip>
                    ))}
                  </div>
                </div>

                {/* External links */}
                <div className="pt-4 border-t border-[var(--line-subtle)] space-y-2">
                  {project.links.github && project.links.github !== "TODO(link)" && (
                    <a
                      href={project.links.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded bg-[var(--surface-3)] text-[var(--text-1)] hover:text-[var(--accent)] transition-colors no-underline"
                    >
                      <span className="flex items-center gap-2">
                        <GithubIcon className="w-3.5 h-3.5" /> Source Code
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {project.links.live && project.links.live !== "TODO(link)" && (
                    <a
                      href={project.links.live}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-2 rounded bg-[var(--surface-3)] text-[var(--text-1)] hover:text-[var(--accent)] transition-colors no-underline"
                    >
                      <span className="flex items-center gap-2">
                        <ExternalLink className="w-3.5 h-3.5" /> Live System
                      </span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </article>
  );
}
