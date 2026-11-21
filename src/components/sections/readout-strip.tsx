"use client";

import { Card } from "@/components/ui/card";

interface Metric {
  value: string;
  unit?: string;
  label: string;
  sublabel?: string;
}

const metrics: Metric[] = [
  {
    value: "64",
    unit: "NODES",
    label: "MAX CLUSTER SCALE",
    sublabel: "Dell NativeEdge HA Engine",
  },
  {
    value: "3",
    unit: "ROLES",
    label: "SYSTEMS AT DELL",
    sublabel: "SWE 1 + Winter & Summer",
  },
  {
    value: "8.55",
    unit: "/10",
    label: "B.TECH ACADEMIC CGPA",
    sublabel: "Full Stack AI @ UPES",
  },
  {
    value: "30+",
    unit: "USERS",
    label: "USERS DEPLOYED TO",
    sublabel: "Dehix Platform Revamp",
  },
];

export function ReadoutStrip() {
  return (
    <section id="readout" className="py-12 border-y border-[var(--line-subtle)] bg-[var(--bg-1)]">
      <div className="container-main">
        <Card className="!p-0 overflow-hidden">
          <div className="grid grid-cols-2 md:grid-cols-4">
            {metrics.map((item, index) => {
              const isMobileRightCol = index % 2 === 1;
              const isMobileBottomRow = index >= 2;
              const isDesktopLastCol = index === metrics.length - 1;

              return (
                <div
                  key={index}
                  className={`p-6 md:p-8 flex flex-col justify-between hover:bg-[var(--surface-2)]/50 transition-colors ${
                    !isMobileRightCol ? "border-r border-[var(--line-subtle)]" : ""
                  } ${
                    !isMobileBottomRow ? "border-b border-[var(--line-subtle)]" : ""
                  } ${
                    !isDesktopLastCol
                      ? "md:border-r md:border-[var(--line-subtle)]"
                      : "md:border-r-0"
                  } md:border-b-0`}
                >
                  <div>
                    <span className="font-mono text-[0.65rem] text-[var(--text-3)] uppercase tracking-[0.08em] block mb-2">
                      {item.label}
                    </span>
                    <div className="flex items-baseline gap-1.5 mb-1">
                      <span className="font-mono text-3xl md:text-5xl font-semibold tracking-tight text-[var(--text-1)] tabular-nums">
                        {item.value}
                      </span>
                      {item.unit && (
                        <span className="font-mono text-xs text-[var(--copper)] font-medium">
                          {item.unit}
                        </span>
                      )}
                    </div>
                  </div>
                  {item.sublabel && (
                    <p className="font-mono text-[0.72rem] text-[var(--text-2)] mt-3">
                      {item.sublabel}
                    </p>
                  )}
                </div>
              );
            })}
          </div>
        </Card>
      </div>
    </section>
  );
}
