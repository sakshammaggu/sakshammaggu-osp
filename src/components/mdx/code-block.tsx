"use client";

import React, { useState } from "react";
import { Check, Copy, Terminal, WrapText, Hash } from "lucide-react";
import { useToast } from "@/components/ui/toast";

interface CodeBlockProps {
  filename?: string;
  language?: string;
  code: string;
  highlightedLines?: number[];
  diff?: boolean;
  terminal?: boolean;
  tabs?: { filename: string; code: string; language?: string }[];
}

export function CodeBlock({
  filename = "main.go",
  language = "go",
  code,
  highlightedLines = [],
  diff = false,
  terminal = false,
  tabs,
}: CodeBlockProps) {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [wrap, setWrap] = useState(false);
  const [showLineNumbers, setShowLineNumbers] = useState(true);
  const [activeTab, setActiveTab] = useState(0);

  const currentCode = tabs ? tabs[activeTab]?.code ?? code : code;
  const currentFilename = tabs ? tabs[activeTab]?.filename ?? filename : filename;
  const currentLanguage = tabs ? tabs[activeTab]?.language ?? language : language;

  const lines = currentCode.trim().split("\n");

  const handleCopy = () => {
    // If terminal, strip leading "$ "
    const textToCopy = terminal
      ? lines.map((l) => l.replace(/^\$\s*/, "")).join("\n")
      : currentCode;

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    toast("Code copied to clipboard ✓");
    setTimeout(() => setCopied(false), 1600);
  };

  return (
    <div className="my-6 rounded-[var(--radius-md)] border border-[var(--line-strong)] bg-[var(--surface-1)] overflow-hidden shadow-md font-mono text-xs">
      {/* Header bar */}
      <div className="flex items-center justify-between border-b border-[var(--line-subtle)] bg-[var(--surface-3)] px-4 py-2 select-none">
        {/* Filename or Tabs */}
        <div className="flex items-center gap-2 overflow-x-auto">
          {tabs ? (
            <div className="flex items-center gap-1">
              {tabs.map((tab, idx) => (
                <button
                  key={idx}
                  type="button"
                  suppressHydrationWarning
                  onClick={() => setActiveTab(idx)}
                  className={`px-2.5 py-1 rounded text-xs transition-colors cursor-pointer ${
                    activeTab === idx
                      ? "bg-[var(--surface-1)] text-[var(--text-1)] font-medium border border-[var(--line)]"
                      : "text-[var(--text-3)] hover:text-[var(--text-2)]"
                  }`}
                >
                  {tab.filename}
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center gap-2 text-[var(--text-2)] font-medium">
              <Terminal className="w-3.5 h-3.5 text-[var(--accent)]" />
              <span>{currentFilename}</span>
            </div>
          )}
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2 text-[var(--text-3)]">
          <span className="uppercase text-[0.65rem] text-[var(--text-4)] mr-1">
            {currentLanguage}
          </span>

          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setWrap(!wrap)}
            className={`p-1 rounded hover:text-[var(--text-1)] transition-colors cursor-pointer ${
              wrap ? "text-[var(--accent)]" : ""
            }`}
            title="Toggle word wrap"
          >
            <WrapText className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            suppressHydrationWarning
            onClick={() => setShowLineNumbers(!showLineNumbers)}
            className={`p-1 rounded hover:text-[var(--text-1)] transition-colors cursor-pointer ${
              showLineNumbers ? "text-[var(--accent)]" : ""
            }`}
            title="Toggle line numbers"
          >
            <Hash className="w-3.5 h-3.5" />
          </button>

          <button
            type="button"
            suppressHydrationWarning
            onClick={handleCopy}
            className="flex items-center gap-1 rounded px-2 py-0.5 hover:text-[var(--text-1)] hover:bg-[var(--surface-2)] transition-colors cursor-pointer text-xs"
            title="Copy code snippet"
          >
            {copied ? (
              <>
                <Check className="w-3 h-3 text-[var(--accent)]" />
                <span className="text-[var(--accent)]">Copied</span>
              </>
            ) : (
              <>
                <Copy className="w-3 h-3" />
                <span>Copy</span>
              </>
            )}
          </button>
        </div>
      </div>

      {/* Code Body */}
      <div
        className={`p-4 overflow-x-auto text-[0.8rem] leading-[1.65] bg-[var(--code-bg)] ${
          wrap ? "whitespace-pre-wrap break-words" : "whitespace-pre"
        }`}
      >
        <table className="w-full border-collapse">
          <tbody>
            {lines.map((line, idx) => {
              const lineNum = idx + 1;
              const isHighlighted = highlightedLines.includes(lineNum);
              const isDiffAdd = diff && line.startsWith("+");
              const isDiffRemove = diff && line.startsWith("-");

              return (
                <tr
                  key={idx}
                  className={`${
                    isHighlighted
                      ? "bg-[rgba(92,196,174,0.12)] border-l-2 border-[var(--accent)]"
                      : isDiffAdd
                      ? "bg-[rgba(123,196,127,0.12)] text-[var(--success)]"
                      : isDiffRemove
                      ? "bg-[rgba(229,115,106,0.12)] text-[var(--danger)]"
                      : ""
                  }`}
                >
                  {showLineNumbers && (
                    <td className="pr-4 text-right select-none text-[var(--text-4)] text-[0.72rem] w-8">
                      {isDiffAdd ? "+" : isDiffRemove ? "-" : lineNum}
                    </td>
                  )}
                  <td className="text-[var(--text-1)]">
                    {terminal && line.startsWith("$") ? (
                      <span>
                        <span className="text-[var(--copper)] select-none mr-2 font-bold">$</span>
                        {line.substring(1)}
                      </span>
                    ) : (
                      line
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
