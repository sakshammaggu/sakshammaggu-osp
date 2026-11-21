"use client";

import React, { useEffect, useState, useCallback } from "react";
import { Command } from "cmdk";
import { useRouter } from "next/navigation";
import { useTheme } from "next-themes";
import {
  Search,
  FileText,
  Briefcase,
  Wrench,
  ExternalLink,
  Copy,
  Sun,
  Moon,
  Laptop,
} from "lucide-react";
import siteConfig from "@/content/site";
import { getAllProjects, getAllSkills } from "@/lib/content";
import { useToast } from "@/components/ui/toast";

export function CommandPalette() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { setTheme } = useTheme();
  const { toast } = useToast();
  const projects = getAllProjects();
  const skills = getAllSkills();

  // Keyboard shortcut listener
  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.key === "k" && (e.metaKey || e.ctrlKey)) || (e.key === "/" && !["INPUT", "TEXTAREA"].includes((e.target as HTMLElement)?.tagName))) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, []);

  const runCommand = useCallback((command: () => void) => {
    setOpen(false);
    command();
  }, []);

  const copyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    toast("Email copied to clipboard");
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[var(--z-palette)] flex items-start justify-center pt-[15vh] px-4">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm transition-opacity"
        onClick={() => setOpen(false)}
      />

      {/* Palette Modal */}
      <div
        className="relative w-full max-w-[640px] overflow-hidden rounded-[var(--radius-lg)] border border-[var(--line-strong)] bg-[var(--surface-2)] shadow-2xl z-10"
        style={{
          borderImage: "var(--bezel) 1",
          boxShadow: "var(--shadow-lg)",
        }}
      >
        <Command
          className="w-full flex flex-col bg-transparent text-[var(--text-1)]"
          loop
        >
          {/* Search Input Bar */}
          <div className="flex items-center gap-3 border-b border-[var(--line-subtle)] px-4 py-3">
            <Search className="w-4 h-4 text-[var(--text-3)] shrink-0" />
            <Command.Input
              autoFocus
              placeholder="Type a command, jump to section, or search..."
              className="w-full bg-transparent text-sm text-[var(--text-1)] placeholder:text-[var(--text-3)] outline-none font-mono"
            />
            <kbd className="hidden sm:inline-flex rounded border border-[var(--line)] bg-[var(--surface-3)] px-1.5 py-0.5 text-[0.65rem] font-mono text-[var(--text-3)]">
              ESC
            </kbd>
          </div>

          {/* Results List */}
          <Command.List className="max-h-[360px] overflow-y-auto p-2 scrollbar-thin">
            <Command.Empty className="py-8 text-center text-xs font-mono text-[var(--text-3)]">
              No matching results found.
            </Command.Empty>

            {/* Navigation Group */}
            <Command.Group
              heading="Navigate"
              className="px-2 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.08em] text-[var(--text-3)]"
            >
              <Command.Item
                onSelect={() => runCommand(() => router.push("/projects"))}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text-1)] cursor-pointer aria-selected:bg-[var(--surface-3)] aria-selected:text-[var(--text-1)]"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-[var(--accent)]" />
                  <span>Personal Projects</span>
                </div>
                <span className="font-mono text-[0.68rem] text-[var(--text-3)]">
                  /projects
                </span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/open-source"))}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text-1)] cursor-pointer aria-selected:bg-[var(--surface-3)] aria-selected:text-[var(--text-1)]"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-[var(--copper)]" />
                  <span>Open Source</span>
                </div>
                <span className="font-mono text-[0.68rem] text-[var(--text-3)]">
                  /open-source
                </span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#experience"))}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text-1)] cursor-pointer aria-selected:bg-[var(--surface-3)] aria-selected:text-[var(--text-1)]"
              >
                <div className="flex items-center gap-2.5">
                  <Briefcase className="w-4 h-4 text-[var(--copper)]" />
                  <span>Experience & Internships</span>
                </div>
                <span className="font-mono text-[0.68rem] text-[var(--text-3)]">
                  #experience
                </span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#skills"))}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text-1)] cursor-pointer aria-selected:bg-[var(--surface-3)] aria-selected:text-[var(--text-1)]"
              >
                <div className="flex items-center gap-2.5">
                  <Wrench className="w-4 h-4 text-[var(--accent)]" />
                  <span>Skills Matrix</span>
                </div>
                <span className="font-mono text-[0.68rem] text-[var(--text-3)]">
                  #skills
                </span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/#writing"))}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text-1)] cursor-pointer aria-selected:bg-[var(--surface-3)] aria-selected:text-[var(--text-1)]"
              >
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-[var(--accent)]" />
                  <span>Engineering Writing</span>
                </div>
                <span className="font-mono text-[0.68rem] text-[var(--text-3)]">
                  #writing
                </span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => router.push("/resume"))}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text-1)] cursor-pointer aria-selected:bg-[var(--surface-3)] aria-selected:text-[var(--text-1)]"
              >
                <div className="flex items-center gap-2.5">
                  <ExternalLink className="w-4 h-4 text-[var(--copper)]" />
                  <span>Full Résumé</span>
                </div>
                <span className="font-mono text-[0.68rem] text-[var(--text-3)]">
                  /resume
                </span>
              </Command.Item>
            </Command.Group>

            {/* Projects Group */}
            <Command.Group
              heading="Projects"
              className="mt-2 px-2 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.08em] text-[var(--text-3)]"
            >
              {projects.map((proj) => (
                <Command.Item
                  key={proj.slug}
                  onSelect={() => runCommand(() => router.push(`/projects/${proj.slug}`))}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text-1)] cursor-pointer aria-selected:bg-[var(--surface-3)] aria-selected:text-[var(--text-1)]"
                >
                  <div className="flex items-center gap-2.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-[var(--accent)]" />
                    <span>{proj.title}</span>
                  </div>
                  <span className="font-mono text-[0.68rem] text-[var(--text-3)]">
                    {proj.year}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Skills Group */}
            <Command.Group
              heading="Skills"
              className="mt-2 px-2 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.08em] text-[var(--text-3)]"
            >
              {skills.slice(0, 8).map((sk) => (
                <Command.Item
                  key={sk.slug}
                  onSelect={() => runCommand(() => router.push("/#skills"))}
                  className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text-1)] cursor-pointer aria-selected:bg-[var(--surface-3)] aria-selected:text-[var(--text-1)]"
                >
                  <span>{sk.name}</span>
                  <span className="font-mono text-[0.68rem] uppercase text-[var(--text-3)]">
                    {sk.level}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>

            {/* Actions Group */}
            <Command.Group
              heading="Actions"
              className="mt-2 px-2 py-1.5 text-[0.68rem] font-mono uppercase tracking-[0.08em] text-[var(--text-3)]"
            >
              <Command.Item
                onSelect={() => runCommand(copyEmail)}
                className="flex items-center justify-between rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text-1)] cursor-pointer aria-selected:bg-[var(--surface-3)] aria-selected:text-[var(--text-1)]"
              >
                <div className="flex items-center gap-2.5">
                  <Copy className="w-4 h-4 text-[var(--accent)]" />
                  <span>Copy Email Address</span>
                </div>
                <span className="font-mono text-[0.68rem] text-[var(--text-3)]">
                  {siteConfig.email}
                </span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme("light"))}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text-1)] cursor-pointer aria-selected:bg-[var(--surface-3)] aria-selected:text-[var(--text-1)]"
              >
                <Sun className="w-4 h-4" />
                <span>Switch to Light Theme (Patina Paper)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme("dark"))}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text-1)] cursor-pointer aria-selected:bg-[var(--surface-3)] aria-selected:text-[var(--text-1)]"
              >
                <Moon className="w-4 h-4" />
                <span>Switch to Dark Theme (Patina Night)</span>
              </Command.Item>
              <Command.Item
                onSelect={() => runCommand(() => setTheme("system"))}
                className="flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs font-medium text-[var(--text-2)] hover:bg-[var(--surface-3)] hover:text-[var(--text-1)] cursor-pointer aria-selected:bg-[var(--surface-3)] aria-selected:text-[var(--text-1)]"
              >
                <Laptop className="w-4 h-4" />
                <span>Use System Theme</span>
              </Command.Item>
            </Command.Group>
          </Command.List>

          {/* Footer help */}
          <div className="flex items-center justify-between border-t border-[var(--line-subtle)] bg-[var(--surface-1)] px-4 py-2 text-[0.7rem] font-mono text-[var(--text-3)]">
            <div className="flex items-center gap-3">
              <span>↑↓ Navigate</span>
              <span>↵ Select</span>
              <span>ESC Close</span>
            </div>
            <span>⌘K</span>
          </div>
        </Command>
      </div>
    </div>
  );
}
