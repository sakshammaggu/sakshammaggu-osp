import Link from "next/link";
import { ArrowLeft, Home, FileText, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[var(--bg-0)] px-6 relative overflow-hidden text-center">
      {/* Background aura */}
      <div className="pointer-events-none absolute inset-0 hero-aura" />
      <div className="pointer-events-none absolute inset-0 dot-grid [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_60%,transparent_100%)]" />

      <div className="relative z-10 max-w-md mx-auto space-y-6">
        {/* Large Mono 404 */}
        <div className="font-mono text-8xl md:text-9xl font-bold tracking-tight text-[var(--copper)] tabular-nums">
          404
        </div>

        {/* Witty calm copy */}
        <div className="space-y-2">
          <h1 className="text-xl md:text-2xl font-semibold text-[var(--text-1)]">
            This address has flatlined.
          </h1>
          <p className="font-mono text-xs text-[var(--text-3)] max-w-xs mx-auto">
            The requested coordinate does not exist in this register. The signal trace has dropped to ground.
          </p>
        </div>

        {/* Flatline SVG */}
        <div className="w-64 h-8 mx-auto my-4 overflow-hidden">
          <svg className="w-full h-full" viewBox="0 0 240 32" fill="none">
            <path
              d="M0 16 L100 16 L110 4 L120 28 L130 16 L240 16"
              stroke="var(--line-strong)"
              strokeWidth="1.5"
            />
            <path
              d="M130 16 L240 16"
              stroke="var(--accent)"
              strokeWidth="2"
              strokeDasharray="4 4"
            />
          </svg>
        </div>

        {/* Quick Return Actions */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-4">
          <Link href="/" className="no-underline">
            <Button variant="primary" size="sm" className="gap-2 font-mono">
              <Home className="w-3.5 h-3.5" /> Return to Base
            </Button>
          </Link>
          <Link href="/projects" className="no-underline">
            <Button variant="secondary" size="sm" className="gap-2 font-mono">
              <Briefcase className="w-3.5 h-3.5" /> Projects Index
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
