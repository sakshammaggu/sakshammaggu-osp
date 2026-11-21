import type { MetadataRoute } from "next";
import { getAllProjects } from "@/lib/content";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://sakshammaggu.com";
  const projects = getAllProjects();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/projects",
    "/experience",
    "/skills",
    "/writing",
    "/achievements",
    "/about",
    "/contact",
    "/resume",
    "/design",
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: route === "" ? 1.0 : 0.8,
  }));

  const projectRoutes: MetadataRoute.Sitemap = projects.map((p) => ({
    url: `${baseUrl}/projects/${p.slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  const writingRoutes: MetadataRoute.Sitemap = [
    "low-latency-cluster-communication",
    "spec-driven-api-development",
    "ai-solutions-infrastructure",
  ].map((slug) => ({
    url: `${baseUrl}/writing/${slug}`,
    lastModified: new Date().toISOString(),
    changeFrequency: "monthly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...projectRoutes, ...writingRoutes];
}
