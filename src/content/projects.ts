import type { Project } from "@/lib/schemas";
import { ProjectSchema } from "@/lib/schemas";
import { z } from "zod";

const projects: Project[] = [
  {
    slug: "interview-ai",
    title: "Interview AI",
    summary:
      "AI-powered interview prep platform that dynamically generates technical questions based on user-defined roles and experience, with real-time AI feedback.",
    year: 2025,
    featured: true,
    order: 1,
    type: ["web"],
    links: {
      github: "TODO(link)",
    },
    metrics: [
      { label: "Session-based Q&A", value: "Dynamic", unit: "" },
    ],
    skills: [
      "reactjs",
      "nodejs",
      "expressjs",
      "tailwindcss",
      "mongodb",
    ],
    role: "Full-stack Developer",
    team: "Solo",
    timeline: "2025",
  },
  {
    slug: "corrviz",
    title: "CorrViz",
    summary:
      "AI-powered data correlation and relationship analytics tool. Upload CSVs, visualize scatter plots, pair plots, and heatmaps, with an AI chatbot for guidance.",
    year: 2024,
    featured: true,
    order: 2,
    type: ["web", "research"],
    links: {
      github: "TODO(link)",
      live: "TODO(link)",
    },
    metrics: [
      { label: "Active users", value: "10+", unit: "" },
    ],
    skills: [
      "nextjs",
      "reactjs",
      "typescript",
      "nodejs",
      "expressjs",
      "tailwindcss",
      "python",
      "mongodb",
      "langchain",
    ],
    role: "Full-stack Developer",
    team: "Solo",
    timeline: "2024",
  },
  {
    slug: "cpuvis",
    title: "CpuVis",
    summary:
      "Interactive visualizer for CPU process scheduling algorithms built in C++ with SDL2 and a modular GUI architecture.",
    year: 2024,
    featured: true,
    order: 3,
    type: ["systems"],
    links: {
      github: "TODO(link)",
    },
    metrics: [
      { label: "Built with", value: "C++", unit: "" },
    ],
    skills: ["c-cpp"],
    role: "Developer",
    team: "Solo",
    timeline: "2024",
  },
];

// Validate all projects
z.array(ProjectSchema).parse(projects);

export default projects;
