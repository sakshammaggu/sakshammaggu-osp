import type { Skill } from "@/lib/schemas";
import { SkillSchema } from "@/lib/schemas";
import { z } from "zod";

const skills: Skill[] = [
  // Languages
  { slug: "c-cpp", name: "C/C++", category: "language", level: "production" },
  { slug: "typescript", name: "TypeScript", category: "language", level: "production" },
  { slug: "python", name: "Python", category: "language", level: "daily" },
  { slug: "golang", name: "Golang", category: "language", level: "production" },

  // Web
  { slug: "reactjs", name: "ReactJS", category: "web", level: "production" },
  { slug: "nextjs", name: "NextJS", category: "web", level: "production" },
  { slug: "nodejs", name: "NodeJS", category: "web", level: "production" },
  { slug: "expressjs", name: "ExpressJS", category: "web", level: "working" },
  { slug: "html5", name: "HTML5", category: "web", level: "working" },
  { slug: "tailwindcss", name: "TailwindCSS", category: "web", level: "production" },

  // Data
  { slug: "mongodb", name: "MongoDB", category: "data", level: "working" },
  { slug: "mysql", name: "MySQL", category: "data", level: "working" },
  { slug: "langchain", name: "Langchain", category: "data", level: "working" },

  // Tools
  { slug: "docker", name: "Docker", category: "tool", level: "working" },
  { slug: "kubernetes", name: "Kubernetes", category: "tool", level: "working" },
  { slug: "git", name: "Git", category: "tool", level: "daily" },
  { slug: "robot-framework", name: "Robot Framework", category: "tool", level: "working" },

  // Systems
  { slug: "rest-api", name: "REST API", category: "systems", level: "production" },
  { slug: "microservices", name: "Microservices", category: "systems", level: "production" },
  { slug: "grpc", name: "gRPC", category: "systems", level: "working" },
];

// Validate all skills
z.array(SkillSchema).parse(skills);

export default skills;
