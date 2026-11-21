import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, Clock, Calendar, Bookmark, Share2 } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Chip } from "@/components/ui/chip";
import { CodeBlock } from "@/components/mdx/code-block";
import { Callout } from "@/components/mdx/callout";
import { Steps } from "@/components/mdx/steps";
import { Diagram } from "@/components/mdx/diagram";

interface ArticleData {
  slug: string;
  series: string;
  title: string;
  subtitle: string;
  date: string;
  readingTime: number;
  tags: string[];
  content: {
    overview: string;
    sections: {
      id: string;
      title: string;
      body: string;
    }[];
  };
}

const articlesData: Record<string, ArticleData> = {
  "low-latency-cluster-communication": {
    slug: "low-latency-cluster-communication",
    series: "Distributed Systems",
    title: "Scaling East-West HA Communication from 3 to 64 Nodes in Edge Clusters",
    subtitle: "Orchestrating multi-tier bridge networking and dynamic rule engines without packet loss.",
    date: "November 2026",
    readingTime: 12,
    tags: ["Distributed HA", "Golang", "Kubernetes", "Linux Networking"],
    content: {
      overview:
        "High-Availability edge architectures demand zero downtime when scaling nodes. When clusters expand from 3-4 nodes to 8+ nodes up to 64 nodes, static routing breaks down. This paper details the dynamic algorithm and iptables packet orchestration implemented for Dell NativeEdge HA clusters.",
      sections: [
        {
          id: "cluster-topology",
          title: "Cluster Topology & Host Network Constraints",
          body: "In edge environments, compute endpoints operate across 3 discrete network tiers: Primary, Secondary, and Tertiary. Each node maintains internal virtual bridge adapters that communicate horizontally (East-West) while isolating public external ingress.",
        },
        {
          id: "packet-orchestration",
          title: "Dynamic iptable and NAT Comparison Engine",
          body: "Rather than statically allocating forward rules, an automated comparison engine checks delta changes in node states, applying minimal rule rewrites to avoid dropping in-flight TCP sessions.",
        },
        {
          id: "benchmark-results",
          title: "Throughput and Latency Benchmarks",
          body: "Under peak cluster load testing across 64 simulated virtual endpoints, round-trip sync latency remained bounded within sub-millisecond envelopes with zero socket drops.",
        },
      ],
    },
  },
  "spec-driven-api-development": {
    slug: "spec-driven-api-development",
    series: "Software Craft",
    title: "Spec-Driven Development: Decoupling Gateway APIs with OpenAPI & Redfish",
    subtitle: "Eliminating 90% of firmware regression bugs by establishing strict machine-readable contracts.",
    date: "October 2026",
    readingTime: 8,
    tags: ["SDD", "REST API", "Microservices", "Redfish"],
    content: {
      overview:
        "When microservices interact with hardware management engines, loose schema definitions lead to catastrophic runtime faults. By adopting Spec-Driven Development (SDD), specifications act as the single source of truth from which client mocks, tests, and gateway validation rules are automatically generated.",
      sections: [
        {
          id: "why-spec-first",
          title: "The Case for Spec-First Architecture",
          body: "Developing against written specs prevents frontend and backend divergence. Contract tests run in CI ensure that internal microservices and external gateway APIs never break compatibility.",
        },
        {
          id: "redfish-decoupling",
          title: "Decoupling Hardware REST APIs",
          body: "By standardizing on Redfish schema models, hardware prerequisites can be verified synchronously without coupling application logic directly to vendor-specific firmware versions.",
        },
      ],
    },
  },
  "ai-solutions-infrastructure": {
    slug: "ai-solutions-infrastructure",
    series: "AI Infrastructure",
    title: "Bare-Metal Server Prerequisite Checks via Redfish API for K8s Stacks",
    subtitle: "Automating Dell iDRAC10 (17G) firmware, RAID health, and strict UEFI boot validations.",
    date: "September 2026",
    readingTime: 10,
    tags: ["Dell 17G", "Python", "K8s", "Redfish API"],
    content: {
      overview:
        "Deploying Kubernetes clusters across next-generation Dell 17G bare-metal nodes requires pre-flight hardware verification. A misconfigured BIOS bootmode or degraded virtual disk will invalidate an entire AI blueprint deployment.",
      sections: [
        {
          id: "firmware-automation",
          title: "Dell iDRAC10 Redfish Automation",
          body: "Using Python scripts calling the DMTF Redfish standard endpoints, prerequisite checkers query RAID controller state, disk health, and strict UEFI boot flags before OS deployment begins.",
        },
        {
          id: "pre-flight-checks",
          title: "Automated Pre-Flight Verification Pipelines",
          body: "Automating validation across multiple servers guarantees that only certified hardware enters the production Kubernetes worker pool, cutting manual deployment time by 80%.",
        },
      ],
    },
  },
};

export function generateStaticParams() {
  return Object.keys(articlesData).map((slug) => ({ slug }));
}

export default async function ArticlePage(props: PageProps<"/writing/[slug]">) {
  const { slug } = await props.params;
  const article = articlesData[slug];

  if (!article) {
    notFound();
  }

  return (
    <div className="section-padding pt-32 bg-[var(--bg-0)] min-h-screen">
      <div className="container-main">
        {/* Breadcrumb navigation */}
        <div className="flex items-center gap-2 mb-8 font-mono text-xs text-[var(--text-3)]">
          <Link href="/writing" className="hover:text-[var(--accent)] transition-colors no-underline">
            Writing
          </Link>
          <span>/</span>
          <span className="text-[var(--copper)]">{article.series}</span>
          <span>/</span>
          <span className="truncate text-[var(--text-2)]">{article.title}</span>
        </div>

        {/* 3-Column Layout: Left nav (2.5) | Center article (7) | Right TOC (2.5) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Quick Series Context (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4">
            <Card className="!p-4 text-xs font-mono">
              <span className="text-[var(--copper)] font-semibold uppercase block mb-1">
                SERIES: {article.series}
              </span>
              <p className="text-[var(--text-3)] text-[0.72rem] mb-4">
                Architecture and engineering notes written by Saksham Maggu.
              </p>
              <Link
                href="/writing"
                className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Back to library
              </Link>
            </Card>
          </div>

          {/* Center Column: Article Content (6 cols / 7 cols) */}
          <div className="lg:col-span-6 space-y-10">
            {/* Header info */}
            <div>
              <div className="flex items-center gap-3 mb-4 font-mono text-xs text-[var(--text-3)] uppercase">
                <span className="text-[var(--copper)] font-semibold">{article.series}</span>
                <span>·</span>
                <span>{article.date}</span>
                <span>·</span>
                <span className="flex items-center gap-1">
                  <Clock className="w-3.5 h-3.5" /> {article.readingTime} min read
                </span>
              </div>

              <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-[var(--text-1)] mb-4 leading-tight">
                {article.title}
              </h1>

              <p className="text-base text-[var(--text-2)] leading-relaxed mb-6 font-serif italic" style={{ fontSize: "1.15em" }}>
                {article.subtitle}
              </p>

              <div className="flex flex-wrap gap-1.5 pb-6 border-b border-[var(--line-subtle)]">
                {article.tags.map((tag) => (
                  <Chip key={tag} variant="skill">
                    {tag}
                  </Chip>
                ))}
              </div>
            </div>

            {/* Overview / Abstract */}
            <div className="text-base text-[var(--text-2)] leading-relaxed">
              <p>{article.content.overview}</p>
            </div>

            {/* Interactive Architecture Diagram tailored per article */}
            <div className="my-8">
              {article.slug === "ai-solutions-infrastructure" ? (
                <Diagram
                  title="Dell 17G Bare-Metal Redfish Automation Flow"
                  caption="Fig. 1 — Pre-flight hardware prerequisite validation and UEFI checks for K8s deployment."
                  nodes={[
                    {
                      id: "ci-trigger",
                      name: "CI Orchestrator",
                      kind: "external",
                      meta: "Jenkins / GitOps",
                      details: "Dispatches pre-flight hardware automation jobs before host provisioning.",
                      x: 20,
                      y: 95,
                    },
                    {
                      id: "redfish-client",
                      name: "Redfish Client",
                      kind: "service",
                      meta: "DMTF Standard",
                      details: "Python engine querying DMTF Redfish REST APIs with session token caching.",
                      x: 175,
                      y: 95,
                    },
                    {
                      id: "idrac10",
                      name: "Dell iDRAC10 (17G)",
                      kind: "service",
                      meta: "BMC Firmware",
                      details: "Out-of-band management controller managing server chassis & UEFI telemetry.",
                      x: 340,
                      y: 35,
                    },
                    {
                      id: "raid-health",
                      name: "RAID & Disks",
                      kind: "queue",
                      meta: "PERC Controller",
                      details: "Validates disk parity, write-cache integrity, and RAID volume readiness.",
                      x: 340,
                      y: 155,
                    },
                    {
                      id: "k8s-ready",
                      name: "K8s Provisioner",
                      kind: "datastore",
                      meta: "UEFI Verified",
                      details: "Bare-metal node verified for automated container runtime and kubelet bootstrap.",
                      x: 505,
                      y: 95,
                    },
                  ]}
                  steps={[
                    {
                      step: 1,
                      caption: "CI Orchestrator dispatches pre-flight hardware automation job to Redfish Client.",
                      activeNodes: ["ci-trigger", "redfish-client"],
                      activeEdges: ["client->gateway"],
                    },
                    {
                      step: 2,
                      caption: "Redfish Client establishes authenticated TLS session with Dell iDRAC10 (17G) BMC.",
                      activeNodes: ["redfish-client", "idrac10"],
                      activeEdges: ["gateway->orchestrator"],
                    },
                    {
                      step: 3,
                      caption: "iDRAC10 queries PERC controller: verifies RAID integrity and virtual disk states.",
                      activeNodes: ["idrac10", "raid-health"],
                      activeEdges: ["orchestrator->queue"],
                    },
                    {
                      step: 4,
                      caption: "Strict UEFI boot validated; node cleared for automated Kubernetes deployment.",
                      activeNodes: ["idrac10", "k8s-ready"],
                      activeEdges: ["orchestrator->storage"],
                    },
                  ]}
                />
              ) : article.slug === "spec-driven-api-development" ? (
                <Diagram
                  title="Spec-Driven Contract Architecture"
                  caption="Fig. 1 — OpenAPI contract decoupling between gateway and hardware microservices."
                  nodes={[
                    {
                      id: "spec-doc",
                      name: "OpenAPI Spec",
                      kind: "external",
                      meta: "YAML Contract",
                      details: "Single source of truth defining REST routes, schemas, and error shapes.",
                      x: 20,
                      y: 95,
                    },
                    {
                      id: "gateway-router",
                      name: "API Gateway",
                      kind: "service",
                      meta: "Route Validator",
                      details: "Validates incoming HTTP payloads synchronously against the compiled spec.",
                      x: 175,
                      y: 95,
                    },
                    {
                      id: "microservice",
                      name: "Core Service",
                      kind: "service",
                      meta: "Go / gRPC",
                      details: "Business logic engine decoupled from network perimeter protocols.",
                      x: 340,
                      y: 35,
                    },
                    {
                      id: "contract-test",
                      name: "Contract Tests",
                      kind: "queue",
                      meta: "Regression Suite",
                      details: "Continuous regression tests verifying firmware compatibility across versions.",
                      x: 340,
                      y: 155,
                    },
                    {
                      id: "firmware-api",
                      name: "Hardware Target",
                      kind: "datastore",
                      meta: "Redfish Endpoint",
                      details: "Physical server BMC receiving validated, contract-compliant commands.",
                      x: 505,
                      y: 95,
                    },
                  ]}
                  steps={[
                    {
                      step: 1,
                      caption: "OpenAPI contract is parsed and loaded into the decoupled API Gateway.",
                      activeNodes: ["spec-doc", "gateway-router"],
                      activeEdges: ["client->gateway"],
                    },
                    {
                      step: 2,
                      caption: "Gateway validates inbound client payloads against strict schema before forwarding.",
                      activeNodes: ["gateway-router", "microservice"],
                      activeEdges: ["gateway->orchestrator"],
                    },
                    {
                      step: 3,
                      caption: "Automated contract test suite executes parallel regression checks against edge cases.",
                      activeNodes: ["microservice", "contract-test"],
                      activeEdges: ["orchestrator->queue"],
                    },
                    {
                      step: 4,
                      caption: "Firmware receives standardized Redfish calls with 100% schema compliance.",
                      activeNodes: ["microservice", "firmware-api"],
                      activeEdges: ["orchestrator->storage"],
                    },
                  ]}
                />
              ) : (
                <Diagram
                  title="Dynamic Route Orchestration & HA Sync"
                  caption="Fig. 1 — Multi-tier node synchronization and request orchestration in 64-node clusters."
                />
              )}
            </div>

            {/* Callout component (exercising §8.3) */}
            <Callout variant="insight" title="CONCURRENCY & SAFETY">
              State transitions in distributed edge clusters must be idempotent.
              If an edge node loses power mid-reconfiguration, the subsequent boot check
              re-evaluates virtual disk health via Redfish without manual operator intervention.
            </Callout>

            {/* Sections */}
            {article.content.sections.map((sec, idx) => (
              <section key={sec.id} id={sec.id} className="space-y-4 pt-6 border-t border-[var(--line-subtle)]">
                <h2 className="text-2xl font-semibold text-[var(--text-1)] flex items-center gap-2">
                  <span className="text-[var(--accent)] font-mono text-sm">0{idx + 1}.</span>
                  {sec.title}
                </h2>
                <p className="text-sm md:text-base text-[var(--text-2)] leading-relaxed">
                  {sec.body}
                </p>
              </section>
            ))}

            {/* CodeBlock component (exercising §8.4) */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-3)] mb-2">
                Implementation Snippet (Go Rule Engine)
              </h3>
              <CodeBlock
                filename="orchestrator/rules.go"
                language="go"
                highlightedLines={[4, 5, 8]}
                code={`package orchestrator

func (c *ClusterEngine) SyncRoutes(nodeID string, networks []HostNetwork) error {
    // Dynamically calculate packet arbitration delta
    delta := c.CalculateRuleDelta(networks)
    if !delta.HasModifications() {
        return nil // No rewrite needed
    }
    
    // Apply atomic iptables filter rules without dropping TCP state
    return c.packetFilter.ApplyAtomic(delta)
}`}
              />
            </div>

            {/* Steps component (exercising §8.3) */}
            <div>
              <h3 className="font-mono text-xs uppercase tracking-wider text-[var(--text-3)] mb-4">
                Deployment Protocol
              </h3>
              <Steps
                items={[
                  {
                    title: "Node Health Probe",
                    description: "Verify Redfish iDRAC10 controller health and strict UEFI boot parameters.",
                  },
                  {
                    title: "Network Route Delta Calculation",
                    description: "Evaluate primary and secondary bridge interface tables against peer states.",
                  },
                  {
                    title: "Atomic State Commitment",
                    description: "Commit packet filter rules and signal East-West cluster readiness.",
                  },
                ]}
              />
            </div>

            {/* Prev / Next navigation */}
            <div className="pt-12 border-t border-[var(--line-subtle)] flex items-center justify-between font-mono text-xs">
              <Link
                href="/writing"
                className="inline-flex items-center gap-1.5 text-[var(--accent)] hover:underline"
              >
                <ArrowLeft className="w-3.5 h-3.5" /> Return to Library
              </Link>
            </div>
          </div>

          {/* Right Column: On-this-page TOC (3 cols) */}
          <div className="hidden lg:block lg:col-span-3 sticky top-28 space-y-4">
            <Card className="!p-4 text-xs font-mono">
              <span className="font-semibold text-[var(--text-3)] uppercase tracking-wider block mb-3">
                On This Page
              </span>
              <ul className="space-y-2 text-[var(--text-2)]">
                {article.content.sections.map((sec) => (
                  <li key={sec.id}>
                    <a
                      href={`#${sec.id}`}
                      className="hover:text-[var(--accent)] transition-colors block truncate"
                    >
                      {sec.title}
                    </a>
                  </li>
                ))}
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
