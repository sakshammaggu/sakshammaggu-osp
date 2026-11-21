"use client";

import { useRef, useState, useCallback } from "react";
import Link from "next/link";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  href?: string;
  interactive?: boolean;
}

export function Card({
  children,
  className = "",
  href,
  interactive = false,
}: CardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [spotlight, setSpotlight] = useState({ x: 0, y: 0, opacity: 0 });
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (!interactive || !cardRef.current) return;
      const rect = cardRef.current.getBoundingClientRect();
      setSpotlight({
        x: e.clientX - rect.left,
        y: e.clientY - rect.top,
        opacity: 1,
      });
      setIsHovered(true);
    },
    [interactive]
  );

  const handleMouseLeave = useCallback(() => {
    setSpotlight((s) => ({ ...s, opacity: 0 }));
    setIsHovered(false);
  }, []);

  const content = (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative overflow-hidden rounded-[var(--radius-lg)] p-6 md:p-8 transition-all ${
        interactive ? "hover:-translate-y-0.5 cursor-pointer" : ""
      } ${className}`}
      style={{
        backgroundColor: "var(--surface-1)",
        border: `1px solid ${isHovered && interactive ? "var(--accent-line)" : "var(--line-subtle)"}`,
        borderRadius: "var(--radius-lg)",
        boxShadow: isHovered && interactive ? "var(--shadow-md)" : "var(--shadow-sm)",
        transitionDuration: "var(--dur-base)",
        transitionTimingFunction: "var(--ease-out)",
      }}
    >
      {interactive && (
        <div
          className="pointer-events-none absolute inset-0 transition-opacity"
          style={{
            background: `radial-gradient(400px circle at ${spotlight.x}px ${spotlight.y}px, var(--accent-subtle), transparent 60%)`,
            opacity: spotlight.opacity,
            transitionDuration: "var(--dur-base)",
          }}
        />
      )}
      <div className="relative z-10">{children}</div>
    </div>
  );

  if (href) {
    return (
      <Link href={href} className="block no-underline">
        {content}
      </Link>
    );
  }

  return content;
}
