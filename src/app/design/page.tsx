"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Chip } from "@/components/ui/chip";
import { Card } from "@/components/ui/card";
import { Kbd } from "@/components/ui/kbd";
import { Divider } from "@/components/ui/divider";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Tooltip, TooltipTrigger, TooltipContent, TooltipProvider } from "@/components/ui/tooltip";
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from "@/components/ui/accordion";
import { ThemeToggle } from "@/components/layout/theme-toggle";
import { SectionHeader } from "@/components/ui/section-header";
import { ArrowRight, Terminal, Sparkles, Check, Copy } from "lucide-react";
import { useToast } from "@/components/ui/toast";

export default function DesignKitchenSink() {
  const { toast } = useToast();

  return (
    <TooltipProvider>
      <div className="section-padding pt-32 bg-[var(--bg-0)] min-h-screen">
        <div className="container-main space-y-16">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-[var(--line-subtle)] pb-8">
            <div>
              <span className="font-mono text-xs uppercase text-[var(--copper)] tracking-widest font-semibold block mb-1">
                INTERNAL DESIGN SYSTEM INSPECTOR
              </span>
              <h1 className="text-3xl font-bold text-[var(--text-1)]">
                Patina Instrument — Kitchen Sink
              </h1>
              <p className="font-mono text-xs text-[var(--text-3)] mt-1">
                Visual testbed for tokens, typography, surfaces, and interactive states.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <ThemeToggle />
            </div>
          </div>

          {/* 1. Color Palette Tokens */}
          <section className="space-y-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--text-3)]">
              01 · Color Tokens (Patina Palette)
            </h2>
            <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-6 gap-4 font-mono text-[0.7rem]">
              <div className="rounded-[var(--radius-md)] border border-[var(--line-subtle)] p-3 bg-[var(--bg-0)]">
                <div className="h-10 rounded border border-[var(--line-subtle)] bg-[var(--bg-0)] mb-2" />
                <span className="block font-semibold">--bg-0</span>
                <span className="text-[var(--text-3)]">Page Canvas</span>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--line-subtle)] p-3 bg-[var(--surface-1)]">
                <div className="h-10 rounded border border-[var(--line-subtle)] bg-[var(--surface-1)] mb-2" />
                <span className="block font-semibold">--surface-1</span>
                <span className="text-[var(--text-3)]">Card Surface</span>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--line-subtle)] p-3 bg-[var(--surface-2)]">
                <div className="h-10 rounded border border-[var(--line-subtle)] bg-[var(--surface-2)] mb-2" />
                <span className="block font-semibold">--surface-2</span>
                <span className="text-[var(--text-3)]">Raised Surface</span>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--line-subtle)] p-3 bg-[var(--surface-3)]">
                <div className="h-10 rounded border border-[var(--line-subtle)] bg-[var(--surface-3)] mb-2" />
                <span className="block font-semibold">--surface-3</span>
                <span className="text-[var(--text-3)]">Hover / Inset</span>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--line-subtle)] p-3 bg-[var(--surface-1)]">
                <div className="h-10 rounded bg-[var(--accent)] mb-2" />
                <span className="block font-semibold text-[var(--accent)]">--accent</span>
                <span className="text-[var(--text-3)]">Verdigris Accent</span>
              </div>
              <div className="rounded-[var(--radius-md)] border border-[var(--line-subtle)] p-3 bg-[var(--surface-1)]">
                <div className="h-10 rounded bg-[var(--copper)] mb-2" />
                <span className="block font-semibold text-[var(--copper)]">--copper</span>
                <span className="text-[var(--text-3)]">Rare Highlight</span>
              </div>
            </div>
          </section>

          {/* 2. Typography Scale */}
          <section className="space-y-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--text-3)]">
              02 · Typography Rhythm & Scales
            </h2>
            <Card className="space-y-6">
              <div>
                <span className="font-mono text-[0.68rem] text-[var(--text-3)] block mb-1">
                  DISPLAY + INSTRUMENT SERIF ITALIC
                </span>
                <div className="text-4xl md:text-5xl font-semibold text-[var(--text-1)]">
                  Architecting <span className="font-serif italic text-gradient">distributed</span> edge infrastructure.
                </div>
              </div>
              <Divider />
              <div>
                <span className="font-mono text-[0.68rem] text-[var(--text-3)] block mb-1">
                  H2 HEADING (32px / 2rem)
                </span>
                <h2 className="text-2xl font-semibold text-[var(--text-1)]">
                  Dynamic ipTable and NAT filtering across 64 nodes.
                </h2>
              </div>
              <Divider />
              <div>
                <span className="font-mono text-[0.68rem] text-[var(--text-3)] block mb-1">
                  BODY TEXT & MICRO METADATA
                </span>
                <p className="text-sm text-[var(--text-2)] leading-relaxed max-w-[68ch]">
                  The NativeEdge cluster scaling algorithm handles dynamic route arbitration and bidirectional
                  packet synchronization. Mono tabular numerals: <code className="font-mono">1,234,567 ops/sec (99.9%)</code>.
                </p>
              </div>
            </Card>
          </section>

          {/* 3. Button Primitives */}
          <section className="space-y-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--text-3)]">
              03 · Button Primitives (§5.3)
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button variant="primary">
                Primary Button <ArrowRight className="w-4 h-4 ml-1.5" />
              </Button>
              <Button variant="secondary">Secondary Button</Button>
              <Button variant="ghost">Ghost Button</Button>
              <Button variant="link">Link Button →</Button>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="icon">
                    <Terminal className="w-4 h-4" />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>Terminal Tooltip</TooltipContent>
              </Tooltip>
            </div>
          </section>

          {/* 4. Chips & Badges */}
          <section className="space-y-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--text-3)]">
              04 · Chips & Indicators (§5.4)
            </h2>
            <div className="flex flex-wrap items-center gap-3">
              <Chip variant="skill">Golang</Chip>
              <Chip variant="skill">Kubernetes</Chip>
              <Chip variant="readout">GO · 2026</Chip>
              <Chip variant="readout">REDFISH 17G</Chip>
              <Chip variant="status" pulsing>
                AVAILABLE FOR HIRE
              </Chip>
              <Chip variant="highlighted">Active Cross-Highlight</Chip>
            </div>
          </section>

          {/* 5. Radix Tabs & Accordion Primitives */}
          <section className="space-y-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--text-3)]">
              05 · Tabs & Interactive Accordion
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-start">
              <div>
                <Tabs defaultValue="overview">
                  <TabsList>
                    <TabsTrigger value="overview">Overview</TabsTrigger>
                    <TabsTrigger value="telemetry">Telemetry</TabsTrigger>
                    <TabsTrigger value="firmware">Firmware</TabsTrigger>
                  </TabsList>
                  <TabsContent value="overview">
                    <Card className="!p-4 text-xs font-mono text-[var(--text-2)]">
                      Overview Tab Content: Redfish schema blueprint validated.
                    </Card>
                  </TabsContent>
                  <TabsContent value="telemetry">
                    <Card className="!p-4 text-xs font-mono text-[var(--text-2)]">
                      Telemetry Tab Content: P99 latency: 1.2ms across 64 nodes.
                    </Card>
                  </TabsContent>
                  <TabsContent value="firmware">
                    <Card className="!p-4 text-xs font-mono text-[var(--text-2)]">
                      Firmware Tab Content: iDRAC10 strict UEFI mode verified.
                    </Card>
                  </TabsContent>
                </Tabs>
              </div>

              <div>
                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>How is state persistence maintained over WiFi-PSK?</AccordionTrigger>
                    <AccordionContent>
                      State persistence is maintained using custom connection handlers integrated with HostNetwork/NAT orchestration.
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What makes the Patina Instrument palette unique?</AccordionTrigger>
                    <AccordionContent>
                      It couples oxidized copper verdigris with warm bone paper and green-black ink, avoiding generic purple templates.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>
            </div>
          </section>

          {/* 6. Toast & Feedback */}
          <section className="space-y-6">
            <h2 className="font-mono text-xs uppercase tracking-wider text-[var(--text-3)]">
              06 · Feedback & Keyboard Chips
            </h2>
            <div className="flex flex-wrap items-center gap-4">
              <Button
                variant="secondary"
                size="sm"
                onClick={() => toast("Test notification dispatched ✓")}
              >
                Trigger Sample Toast
              </Button>
              <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-3)]">
                <span>Shortcut:</span>
                <Kbd>⌘</Kbd>
                <Kbd>K</Kbd>
              </div>
              <Skeleton className="w-32 h-8" />
            </div>
          </section>
        </div>
      </div>
    </TooltipProvider>
  );
}
