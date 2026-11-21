import { z } from "zod";

// ---------- Skill ----------
export const SkillSchema = z.object({
  slug: z.string(),
  name: z.string(),
  category: z.enum(["language", "systems", "data", "web", "quant", "tool"]),
  level: z.enum(["daily", "production", "working", "learning"]),
  icon: z.string().optional(),
  since: z.number().optional(),
});
export type Skill = z.infer<typeof SkillSchema>;

// ---------- Social ----------
export const SocialSchema = z.object({
  platform: z.string(),
  handle: z.string(),
  url: z.string(),
  icon: z.string(),
  primary: z.boolean().optional(),
});
export type Social = z.infer<typeof SocialSchema>;

// ---------- Media ----------
export const MediaSchema = z.object({
  src: z.string(),
  alt: z.string(),
  width: z.number(),
  height: z.number(),
  srcDark: z.string().optional(),
  blurDataURL: z.string().optional(),
  caption: z.string().optional(),
});
export type Media = z.infer<typeof MediaSchema>;

// ---------- Project ----------
export const ProjectSchema = z.object({
  slug: z.string(),
  title: z.string(),
  summary: z.string(),
  year: z.number(),
  featured: z.boolean(),
  order: z.number().optional(),
  type: z.array(
    z.enum(["systems", "trading", "web", "oss", "research"])
  ),
  cover: MediaSchema.optional(),
  gallery: z.array(MediaSchema).optional(),
  links: z.object({
    github: z.string().optional(),
    live: z.string().optional(),
    docs: z.string().optional(),
    video: z.string().optional(),
  }),
  metrics: z.array(
    z.object({
      label: z.string(),
      value: z.string(),
      unit: z.string().optional(),
    })
  ),
  skills: z.array(z.string()),
  role: z.string(),
  team: z.string().optional(),
  timeline: z.string(),
  decisions: z
    .array(
      z.object({
        decision: z.string(),
        why: z.string(),
        tradeoff: z.string(),
      })
    )
    .optional(),
  relatedArticles: z.array(z.string()).optional(),
  relatedProjects: z.array(z.string()).optional(),
});
export type Project = z.infer<typeof ProjectSchema>;

// ---------- Experience ----------
export const ExperienceSchema = z.object({
  slug: z.string(),
  kind: z.enum(["full-time", "internship", "freelance", "research"]),
  company: z.string(),
  logo: MediaSchema.optional(),
  role: z.string(),
  location: z.string(),
  start: z.string(),
  end: z.union([z.string(), z.literal("present")]).optional(),
  summary: z.string(),
  impact: z.array(z.string()),
  responsibilities: z.array(z.string()).optional(),
  skills: z.array(z.string()),
  projects: z.array(z.string()).optional(),
  articles: z.array(z.string()).optional(),
});
export type Experience = z.infer<typeof ExperienceSchema>;

// ---------- Achievement ----------
export const AchievementSchema = z.object({
  slug: z.string(),
  title: z.string(),
  issuer: z.string(),
  date: z.string(),
  kind: z.enum([
    "award",
    "certification",
    "competition",
    "scholarship",
    "oss",
    "talk",
    "publication",
    "leadership",
    "academic",
  ]),
  highlight: z.boolean().optional(),
  description: z.string().optional(),
  link: z.string().optional(),
  icon: z.string().optional(),
});
export type Achievement = z.infer<typeof AchievementSchema>;

// ---------- Education ----------
export const EducationSchema = z.object({
  institution: z.string(),
  degree: z.string(),
  field: z.string(),
  start: z.string(),
  end: z.string(),
  notes: z.string().optional(),
  logo: MediaSchema.optional(),
});
export type Education = z.infer<typeof EducationSchema>;

// ---------- SiteConfig ----------
export const SiteConfigSchema = z.object({
  name: z.string(),
  tagline: z.string(),
  status: z.string(),
  email: z.string(),
  location: z.string(),
  socials: z.array(SocialSchema),
});
export type SiteConfig = z.infer<typeof SiteConfigSchema>;
