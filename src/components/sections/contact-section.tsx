"use client";

import { useState } from "react";
import { Mail, Copy, Check, ArrowUpRight, Send, ExternalLink, Sparkles } from "lucide-react";
import { SectionHeader } from "@/components/ui/section-header";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useToast } from "@/components/ui/toast";
import { GithubIcon, LinkedinIcon, LeetcodeIcon } from "@/components/ui/icons";
import siteConfig from "@/content/site";

const topics = [
  {
    id: "fulltime",
    label: "Full-Time Opportunities",
    placeholder: "We have an open Systems / Software Engineer role and would like to connect regarding...",
  },
  {
    id: "architecture",
    label: "Systems & Architecture",
    placeholder: "Reaching out regarding distributed systems design, bare-metal orchestration, or high-availability infrastructure...",
  },
  {
    id: "opensource",
    label: "Open-Source Collaboration",
    placeholder: "Interested in discussing open-source tooling, DMTF Redfish libraries, or automation packages...",
  },
  {
    id: "general",
    label: "General Inquiry",
    placeholder: "Hi Saksham, reaching out from your portfolio regarding...",
  },
];

export function ContactSection() {
  const { toast } = useToast();
  const [copied, setCopied] = useState(false);
  const [selectedTopic, setSelectedTopic] = useState(topics[0]);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: topics[0].placeholder,
  });

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(siteConfig.email);
    setCopied(true);
    toast("Email address copied to clipboard ✓");
    setTimeout(() => setCopied(false), 2000);
  };

  const handleTopicChange = (topic: typeof topics[number]) => {
    setSelectedTopic(topic);
    // If the message is empty or matches an existing placeholder, update it
    const isDefaultMessage =
      !formData.message || topics.some((t) => t.placeholder === formData.message);
    if (isDefaultMessage) {
      setFormData((prev) => ({ ...prev, message: topic.placeholder }));
    }
  };

  const buildEmailDraft = () => {
    const subject = `[Portfolio Inquiry] ${selectedTopic.label} - ${formData.name.trim() || "Engineering Inquiry"}`;
    const body = `Hi Saksham,\n\n${formData.message.trim() || selectedTopic.placeholder}\n\n---\nFrom: ${formData.name.trim() || "Portfolio Visitor"}\nReply Email: ${formData.email.trim() || "Not specified"}`;
    return { subject, body };
  };

  const handleSendViaClient = (e: React.FormEvent) => {
    e.preventDefault();
    const { subject, body } = buildEmailDraft();
    const mailtoUrl = `mailto:${siteConfig.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
    toast("Opening your email client ✓");
  };

  const handleOpenGmail = () => {
    const { subject, body } = buildEmailDraft();
    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(siteConfig.email)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.open(gmailUrl, "_blank", "noopener,noreferrer");
    toast("Opening Gmail Web in new tab ✓");
  };

  return (
    <section id="contact" className="section-padding bg-[var(--bg-0)] border-t border-[var(--line-subtle)]">
      <div className="container-main">
        {/* Section Header */}
        <SectionHeader
          number="08"
          label="GET IN TOUCH"
          heading="Let's build something precise."
          emphasisWord="precise"
          description="Direct lines of communication for engineering inquiries, systems architecture, or collaborative opportunities."
        />

        {/* 2-Column Split: Channels on Left, Direct Email Composer on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: 5 Cols (Channels & Availability) */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="!p-0 overflow-hidden divide-y divide-[var(--line-subtle)]">
              {/* Primary Email Card with Quick Copy */}
              <div className="group relative flex items-center justify-between p-5 hover:bg-[var(--surface-2)] transition-colors">
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3.5">
                  <div className="w-10 h-10 rounded-[var(--radius-xs)] bg-[var(--surface-3)] flex items-center justify-center text-[var(--accent)] border border-[var(--accent-line)]/40 shadow-xs">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[0.68rem] uppercase text-[var(--accent)] font-semibold block">
                      PRIMARY EMAIL
                    </span>
                    <a
                      href={`mailto:${siteConfig.email}`}
                      className="text-sm font-medium text-[var(--text-1)] hover:text-[var(--accent)] transition-colors font-mono"
                    >
                      {siteConfig.email}
                    </a>
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyEmail}
                  className="font-mono text-xs text-[var(--accent)] hover:bg-[var(--surface-3)] flex items-center gap-1.5 border border-[var(--accent-line)]/40"
                  aria-label="Copy email address"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-[var(--accent)]" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy
                    </>
                  )}
                </Button>
              </div>

              {/* GitHub */}
              <a
                href="https://github.com/sakshammaggu"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-5 hover:bg-[var(--surface-2)] transition-colors no-underline"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-[var(--radius-xs)] bg-[var(--surface-3)] flex items-center justify-center text-[var(--text-2)] border border-[var(--line-subtle)]">
                    <GithubIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[0.68rem] uppercase text-[var(--text-3)] block">
                      GITHUB
                    </span>
                    <span className="text-sm font-medium text-[var(--text-1)] font-mono">
                      @sakshammaggu
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* LinkedIn */}
              <a
                href="https://linkedin.com/in/sakshammaggu"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-5 hover:bg-[var(--surface-2)] transition-colors no-underline"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-[var(--radius-xs)] bg-[var(--surface-3)] flex items-center justify-center text-[var(--text-2)] border border-[var(--line-subtle)]">
                    <LinkedinIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[0.68rem] uppercase text-[var(--text-3)] block">
                      LINKEDIN
                    </span>
                    <span className="text-sm font-medium text-[var(--text-1)] font-mono">
                      /in/sakshammaggu
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>

              {/* LeetCode */}
              <a
                href="https://leetcode.com/sakshammaggu"
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex items-center justify-between p-5 hover:bg-[var(--surface-2)] transition-colors no-underline"
              >
                <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-[var(--accent)] opacity-0 group-hover:opacity-100 transition-opacity" />
                <div className="flex items-center gap-3.5">
                  <div className="w-9 h-9 rounded-[var(--radius-xs)] bg-[var(--surface-3)] flex items-center justify-center text-[var(--text-2)] border border-[var(--line-subtle)]">
                    <LeetcodeIcon className="w-4 h-4" />
                  </div>
                  <div>
                    <span className="font-mono text-[0.68rem] uppercase text-[var(--text-3)] block">
                      LEETCODE
                    </span>
                    <span className="text-sm font-medium text-[var(--text-1)] font-mono">
                      @sakshammaggu
                    </span>
                  </div>
                </div>
                <ArrowUpRight className="w-4 h-4 text-[var(--accent)] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
              </a>
            </Card>

            {/* Availability status line */}
            <div className="rounded-[var(--radius-md)] border border-[var(--accent-line)]/40 bg-[var(--surface-1)] p-4 flex items-center justify-between">
              <div className="flex items-center gap-2.5">
                <span className="w-2.5 h-2.5 rounded-full bg-[var(--accent)] animate-pulse shadow-[0_0_8px_var(--accent)]" />
                <span className="font-mono text-xs text-[var(--text-2)]">
                  Status: <strong className="text-[var(--accent)] font-semibold">Open to Opportunities</strong>
                </span>
              </div>
              <span className="font-mono text-[0.68rem] text-[var(--text-3)]">
                Bengaluru · Reply ≤ 24h
              </span>
            </div>
          </div>

          {/* Right Column: 7 Cols (Direct Mail Composer Hub) */}
          <div className="lg:col-span-7">
            <Card className="!p-6 md:!p-8">
              {/* Header inside Composer Card */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-5 mb-5 border-b border-[var(--line-subtle)] gap-3">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="w-2 h-2 rounded-full bg-[var(--accent)]" />
                    <span className="font-mono text-[0.7rem] uppercase tracking-wider text-[var(--accent)] font-semibold">
                      DIRECT INBOX DISPATCH
                    </span>
                  </div>
                  <h4 className="text-base font-semibold text-[var(--text-1)]">
                    Send message directly to{" "}
                    <span className="text-[var(--accent)] font-mono">{siteConfig.email}</span>
                  </h4>
                </div>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleCopyEmail}
                  className="font-mono text-xs text-[var(--accent)] border border-[var(--accent-line)]/40 hover:bg-[var(--surface-3)] shrink-0 self-start sm:self-center"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5" /> Copied
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" /> Copy Email
                    </>
                  )}
                </Button>
              </div>

              <form onSubmit={handleSendViaClient} className="space-y-5">
                {/* Topic Selector Chips */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-2.5 flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-[var(--accent)]" /> Select Inquiry Topic
                  </label>
                  <div className="flex flex-wrap gap-1.5">
                    {topics.map((t) => (
                      <button
                        key={t.id}
                        type="button"
                        suppressHydrationWarning
                        onClick={() => handleTopicChange(t)}
                        className={`px-3 py-1.5 rounded-full text-xs font-mono transition-all cursor-pointer ${
                          selectedTopic.id === t.id
                            ? "bg-[var(--surface-3)] text-[var(--accent)] border border-[var(--accent-line)] font-semibold shadow-xs"
                            : "text-[var(--text-3)] hover:text-[var(--text-1)] border border-[var(--line-subtle)] bg-[var(--surface-1)]"
                        }`}
                      >
                        {t.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Name & Email Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-2">
                      Your Name
                    </label>
                    <input
                      type="text"
                      suppressHydrationWarning
                      placeholder="e.g. Alex Chen"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      className="w-full rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-2.5 text-sm text-[var(--text-1)] placeholder:text-[var(--text-4)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] font-mono transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-2">
                      Your Email (for Reply)
                    </label>
                    <input
                      type="email"
                      suppressHydrationWarning
                      placeholder="alex@company.com"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-2.5 text-sm text-[var(--text-1)] placeholder:text-[var(--text-4)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] font-mono transition-colors"
                    />
                  </div>
                </div>

                {/* Message Body */}
                <div>
                  <label className="block font-mono text-xs uppercase tracking-[0.08em] text-[var(--text-3)] mb-2">
                    Message Draft
                  </label>
                  <textarea
                    required
                    rows={4}
                    suppressHydrationWarning
                    placeholder="Tell me about your systems, team, or inquiry..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full rounded-[var(--radius-md)] border border-[var(--line)] bg-[var(--surface-2)] px-4 py-2.5 text-sm text-[var(--text-1)] placeholder:text-[var(--text-4)] outline-none focus:border-[var(--accent)] focus:ring-1 focus:ring-[var(--accent)] font-mono transition-colors resize-none leading-relaxed"
                  />
                </div>

                {/* Dual Action Buttons */}
                <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
                  <Button type="submit" variant="primary" className="w-full sm:flex-1">
                    <span className="flex items-center justify-center gap-2 font-mono text-xs uppercase tracking-wider font-semibold">
                      Open Mail Client to Send <Send className="w-3.5 h-3.5" />
                    </span>
                  </Button>

                  <Button
                    type="button"
                    variant="secondary"
                    onClick={handleOpenGmail}
                    className="w-full sm:w-auto font-mono text-xs flex items-center justify-center gap-2 border border-[var(--accent-line)]/50 text-[var(--accent)] hover:bg-[var(--surface-3)]"
                  >
                    <span>Open in Gmail Web</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                </div>

                {/* Explanatory helper notice */}
                <p className="text-[0.72rem] font-mono text-[var(--text-3)] text-center pt-2">
                  ⚡ Pre-formats your inquiry and opens your email application directly addressed to{" "}
                  <strong className="text-[var(--accent)]">{siteConfig.email}</strong>.
                </p>
              </form>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
