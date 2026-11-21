"use client";

import React, { useState } from "react";
import {
  Play,
  Pause,
  RotateCcw,
  ZoomIn,
  ZoomOut,
  Info,
  ChevronRight,
  ChevronLeft,
} from "lucide-react";

interface Node {
  id: string;
  name: string;
  kind: "service" | "datastore" | "queue" | "external";
  meta?: string;
  details?: string;
  x: number;
  y: number;
}

interface Edge {
  id: string;
  from: string;
  to: string;
  label?: string;
  kind: "accent" | "copper" | "info";
  path: string;
}

interface Step {
  step: number;
  caption: string;
  activeNodes: string[];
  activeEdges: string[];
}

interface DiagramProps {
  title?: string;
  caption?: string;
  nodes?: Node[];
  steps?: Step[];
}

const defaultNodes: Node[] = [
  {
    id: "client",
    name: "Edge Client",
    kind: "external",
    meta: "REST / HTTPS",
    details: "Dispatches payload requests from remote edge devices.",
    x: 20,
    y: 95,
  },
  {
    id: "gateway",
    name: "API Gateway",
    kind: "service",
    meta: "Spec-Driven SDD",
    details: "Decoupled gateway routing with strict OpenAPI contracts and rate limiting.",
    x: 175,
    y: 95,
  },
  {
    id: "orchestrator",
    name: "HA Cluster Engine",
    kind: "service",
    meta: "Golang / 64-Node",
    details: "Dynamic iptable rules, route comparison, and packet synchronization.",
    x: 340,
    y: 35,
  },
  {
    id: "queue",
    name: "Event Bus",
    kind: "queue",
    meta: "East-West HA",
    details: "Bi-directional message stream maintaining state synchronization across nodes.",
    x: 340,
    y: 155,
  },
  {
    id: "storage",
    name: "State Store",
    kind: "datastore",
    meta: "Cluster Config",
    details: "Persistent store recording node health and virtual disk telemetry.",
    x: 505,
    y: 95,
  },
];

const defaultEdges: Edge[] = [
  {
    id: "client->gateway",
    from: "client",
    to: "gateway",
    label: "Request (JSON)",
    kind: "accent",
    path: "M 145 129 L 175 129",
  },
  {
    id: "gateway->orchestrator",
    from: "gateway",
    to: "orchestrator",
    label: "gRPC",
    kind: "accent",
    path: "M 300 129 C 320 129, 320 69, 340 69",
  },
  {
    id: "orchestrator->queue",
    from: "orchestrator",
    to: "queue",
    label: "Heartbeat",
    kind: "copper",
    path: "M 402 103 L 402 155",
  },
  {
    id: "orchestrator->storage",
    from: "orchestrator",
    to: "storage",
    label: "Sync State",
    kind: "info",
    path: "M 465 69 C 485 69, 485 129, 505 129",
  },
];

const defaultSteps: Step[] = [
  {
    step: 1,
    caption: "Edge client initiates encrypted request to decoupled API Gateway.",
    activeNodes: ["client", "gateway"],
    activeEdges: ["client->gateway"],
  },
  {
    step: 2,
    caption: "Gateway validates schema against SDD contract and forwards via gRPC to HA Engine.",
    activeNodes: ["gateway", "orchestrator"],
    activeEdges: ["gateway->orchestrator"],
  },
  {
    step: 3,
    caption: "HA Cluster Engine updates iptable packet paths and publishes event to East-West queue.",
    activeNodes: ["orchestrator", "queue"],
    activeEdges: ["orchestrator->queue"],
  },
  {
    step: 4,
    caption: "State changes are committed to the distributed store; acknowledgement returned.",
    activeNodes: ["orchestrator", "storage"],
    activeEdges: ["orchestrator->storage"],
  },
];

export function Diagram({
  title = "Distributed Architecture: Edge Node Flow",
  caption = "Fig. 1 — Multi-tier node synchronization and request orchestration",
  nodes = defaultNodes,
  steps = defaultSteps,
}: DiagramProps) {
  const [zoom, setZoom] = useState(1);
  const [activeNode, setActiveNode] = useState<Node | null>(null);
  const [currentStepIdx, setCurrentStepIdx] = useState<number | null>(null);

  const activeStep = currentStepIdx !== null ? steps[currentStepIdx] : null;

  const handleNextStep = () => {
    if (currentStepIdx === null) setCurrentStepIdx(0);
    else if (currentStepIdx < steps.length - 1) setCurrentStepIdx(currentStepIdx + 1);
    else setCurrentStepIdx(null); // loop back
  };

  const handlePrevStep = () => {
    if (currentStepIdx !== null && currentStepIdx > 0) {
      setCurrentStepIdx(currentStepIdx - 1);
    }
  };

  const getNodeKindStyles = (kind: Node["kind"]) => {
    switch (kind) {
      case "service":
        return {
          card: "border border-[var(--line-strong)] bg-[var(--surface-2)] shadow-md",
          accentBar: "bg-[var(--accent)]",
          badgeColor: "text-[var(--accent)]",
        };
      case "datastore":
        return {
          card: "border border-[var(--line-strong)] bg-[var(--surface-2)] shadow-md",
          accentBar: "bg-[var(--info)]",
          badgeColor: "text-[var(--info)]",
        };
      case "queue":
        return {
          card: "border border-[var(--line-strong)] bg-[var(--surface-2)] shadow-md",
          accentBar: "bg-[var(--copper)]",
          badgeColor: "text-[var(--copper)]",
        };
      case "external":
        return {
          card: "border border-dashed border-[var(--line-strong)] bg-[var(--surface-1)] shadow-md",
          accentBar: "bg-[var(--text-3)]",
          badgeColor: "text-[var(--text-3)]",
        };
    }
  };

  return (
    <div className="my-8 rounded-[var(--radius-lg)] border border-[var(--line-strong)] bg-[var(--bg-1)] overflow-hidden shadow-lg select-none">
      {/* Top Controls Toolbar */}
      <div className="flex flex-wrap items-center justify-between border-b border-[var(--line-subtle)] bg-[var(--surface-3)] px-4 py-2.5 font-mono text-xs gap-3">
        <div className="flex items-center gap-2">
          <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] shadow-sm" />
          <span className="font-semibold text-[var(--text-1)]">{title}</span>
        </div>

        <div className="flex items-center gap-2 text-[var(--text-3)]">
          {/* Legend */}
          <div className="hidden sm:flex items-center gap-3 text-[0.68rem] text-[var(--text-3)] mr-2">
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" /> Service
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--copper)]" /> Queue
            </span>
            <span className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-[var(--info)]" /> Data
            </span>
          </div>

          {/* Stepper control */}
          <button
            type="button"
            suppressHydrationWarning
            onClick={handleNextStep}
            className={`flex items-center gap-1.5 px-3 py-1 rounded text-xs transition-colors cursor-pointer ${
              currentStepIdx !== null
                ? "bg-[var(--accent-subtle)] text-[var(--accent)] border border-[var(--accent-line)] font-medium"
                : "border border-[var(--line-strong)] bg-[var(--surface-1)] text-[var(--text-1)] hover:bg-[var(--surface-2)]"
            }`}
          >
            <Play className="w-3 h-3 fill-current" />
            <span>
              {currentStepIdx !== null
                ? `Step ${currentStepIdx + 1}/${steps.length}`
                : "Play Stepper"}
            </span>
          </button>

          {/* Zoom Controls */}
          <div className="flex items-center border border-[var(--line-strong)] rounded overflow-hidden">
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setZoom((z) => Math.max(0.75, z - 0.1))}
              className="p-1.5 hover:bg-[var(--surface-2)] hover:text-[var(--text-1)] transition-colors cursor-pointer"
              title="Zoom out"
            >
              <ZoomOut className="w-3 h-3" />
            </button>
            <span className="px-1 text-[0.65rem] tabular-nums font-mono text-[var(--text-3)]">
              {Math.round(zoom * 100)}%
            </span>
            <button
              type="button"
              suppressHydrationWarning
              onClick={() => setZoom((z) => Math.min(1.4, z + 0.1))}
              className="p-1.5 hover:bg-[var(--surface-2)] hover:text-[var(--text-1)] transition-colors cursor-pointer"
              title="Zoom in"
            >
              <ZoomIn className="w-3 h-3" />
            </button>
          </div>

          <button
            type="button"
            suppressHydrationWarning
            onClick={() => {
              setZoom(1);
              setCurrentStepIdx(null);
              setActiveNode(null);
            }}
            className="p-1.5 rounded border border-[var(--line-strong)] hover:bg-[var(--surface-2)] hover:text-[var(--text-1)] transition-colors cursor-pointer"
            title="Reset Diagram"
          >
            <RotateCcw className="w-3 h-3" />
          </button>
        </div>
      </div>

      {/* Interactive Canvas */}
      <div className="relative min-h-[300px] overflow-x-auto overflow-y-hidden bg-[var(--bg-0)] flex items-center justify-start md:justify-center p-6 scrollbar-thin">
        {/* Background dot grid pattern on isolated layer */}
        <div
          className="pointer-events-none absolute inset-0 dot-grid opacity-30"
          aria-hidden="true"
        />

        {/* Node/Edge Workspace */}
        <div
          className="relative min-w-[650px] w-[650px] h-[260px] shrink-0 transition-transform duration-200"
          style={{ transform: `scale(${zoom})`, transformOrigin: "center center" }}
        >
          {/* SVG connecting paths & markers */}
          <svg className="absolute inset-0 w-full h-full pointer-events-none overflow-visible">
            <defs>
              <marker
                id="arrow-accent"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--accent)" />
              </marker>
              <marker
                id="arrow-copper"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--copper)" />
              </marker>
              <marker
                id="arrow-info"
                viewBox="0 0 10 10"
                refX="7"
                refY="5"
                markerWidth="6"
                markerHeight="6"
                orient="auto-start-reverse"
              >
                <path d="M 0 1 L 8 5 L 0 9 z" fill="var(--info)" />
              </marker>
            </defs>

            {/* Connecting Edges */}
            {defaultEdges.map((edge) => {
              const isEdgeActive =
                activeStep && activeStep.activeEdges.includes(edge.id);
              const colorVar =
                edge.kind === "accent"
                  ? "var(--accent)"
                  : edge.kind === "copper"
                  ? "var(--copper)"
                  : "var(--info)";
              const markerId =
                edge.kind === "accent"
                  ? "url(#arrow-accent)"
                  : edge.kind === "copper"
                  ? "url(#arrow-copper)"
                  : "url(#arrow-info)";

              return (
                <path
                  key={edge.id}
                  d={edge.path}
                  stroke={colorVar}
                  strokeWidth={isEdgeActive ? "2.5" : "1.8"}
                  strokeDasharray={isEdgeActive ? "none" : "5 4"}
                  strokeOpacity={isEdgeActive ? "1" : "0.75"}
                  fill="none"
                  markerEnd={markerId}
                  className={isEdgeActive ? "animate-pulse" : ""}
                />
              );
            })}
          </svg>

          {/* Render Nodes */}
          {nodes.map((node) => {
            const isStepActive =
              activeStep && activeStep.activeNodes.includes(node.id);
            const isSelected = activeNode?.id === node.id;
            const styleConfig = getNodeKindStyles(node.kind);

            return (
              <div
                key={node.id}
                onClick={() => setActiveNode(node)}
                className={`absolute w-[125px] rounded-[var(--radius-sm)] overflow-hidden text-left transition-all cursor-pointer ${
                  styleConfig.card
                } ${
                  isStepActive || isSelected
                    ? "ring-2 ring-[var(--accent)] scale-105 shadow-xl bg-[var(--surface-3)]"
                    : "hover:scale-[1.03] hover:border-[var(--accent-line)]"
                }`}
                style={{
                  left: `${node.x}px`,
                  top: `${node.y}px`,
                }}
              >
                {/* Top accent bar */}
                <div className={`h-[3px] w-full ${styleConfig.accentBar}`} />

                <div className="p-2.5">
                  <div className="flex items-center justify-between font-mono text-[0.62rem] uppercase tracking-wider mb-1">
                    <span className={`font-semibold ${styleConfig.badgeColor}`}>
                      {node.kind}
                    </span>
                    {isSelected && (
                      <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)] animate-pulse" />
                    )}
                  </div>
                  <h5 className="font-semibold text-xs text-[var(--text-1)] mb-0.5 truncate">
                    {node.name}
                  </h5>
                  {node.meta && (
                    <p className="font-mono text-[0.65rem] text-[var(--text-2)] truncate">
                      {node.meta}
                    </p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Bottom Step Caption / Node Detail Bar */}
      <div className="border-t border-[var(--line-subtle)] bg-[var(--surface-2)] p-4 font-mono text-xs flex flex-col sm:flex-row sm:items-center justify-between gap-3">
        {currentStepIdx !== null && activeStep ? (
          <div className="flex items-center gap-3 text-[var(--accent)] flex-1">
            <span className="font-bold px-2 py-0.5 rounded bg-[var(--accent-subtle)] border border-[var(--accent-line)] text-xs">
              STEP {activeStep.step}/{steps.length}
            </span>
            <span className="text-[var(--text-1)] font-medium">
              {activeStep.caption}
            </span>
          </div>
        ) : activeNode ? (
          <div className="flex items-center gap-2.5 text-[var(--text-2)] flex-1">
            <Info className="w-4 h-4 text-[var(--accent)] shrink-0" />
            <span>
              <strong className="text-[var(--text-1)] font-semibold">
                {activeNode.name}:
              </strong>{" "}
              {activeNode.details}
            </span>
          </div>
        ) : (
          <div className="text-[var(--text-2)] text-[0.75rem] flex items-center gap-2">
            <Info className="w-3.5 h-3.5 text-[var(--accent)] shrink-0" />
            <span>
              {caption} (Click any node to inspect telemetry, or click <strong>Play Stepper</strong>).
            </span>
          </div>
        )}

        {currentStepIdx !== null && (
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              suppressHydrationWarning
              onClick={handlePrevStep}
              disabled={currentStepIdx === 0}
              className="px-2 py-1 rounded border border-[var(--line-strong)] text-[var(--text-1)] disabled:opacity-30 cursor-pointer hover:bg-[var(--surface-3)] transition-colors"
            >
              <ChevronLeft className="w-3.5 h-3.5 inline mr-0.5" /> Prev
            </button>
            <button
              type="button"
              suppressHydrationWarning
              onClick={handleNextStep}
              className="px-2 py-1 rounded border border-[var(--accent-line)] bg-[var(--accent-subtle)] text-[var(--accent)] font-medium hover:bg-[var(--accent)] hover:text-[var(--on-accent)] transition-colors cursor-pointer"
            >
              {currentStepIdx === steps.length - 1 ? "Finish" : "Next"}{" "}
              <ChevronRight className="w-3.5 h-3.5 inline ml-0.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
