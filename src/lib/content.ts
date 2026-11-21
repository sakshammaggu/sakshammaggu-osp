import type { Skill, Project, Experience, Achievement, Education } from "./schemas";
import siteConfig from "@/content/site";
import skills from "@/content/skills";
import projects from "@/content/projects";
import education from "@/content/education";
import achievements from "@/content/achievements";
import dellSwe1 from "@/content/experience/dell-swe1";
import dellInternWinter from "@/content/experience/dell-intern-winter";
import dellInternSummer from "@/content/experience/dell-intern-summer";
import dehixIntern from "@/content/experience/dehix-intern";

export function getSiteConfig() {
  return siteConfig;
}

export function getAllSkills(): Skill[] {
  return skills;
}

export function getSkillsByCategory(category: Skill["category"]): Skill[] {
  return skills.filter((s) => s.category === category);
}

export function getAllProjects(): Project[] {
  return projects;
}

export function getFeaturedProjects(): Project[] {
  return projects
    .filter((p) => p.featured)
    .sort((a, b) => (a.order ?? 99) - (b.order ?? 99));
}

export function getAllExperience(): Experience[] {
  return [dellSwe1, dellInternWinter, dellInternSummer, dehixIntern];
}

export function getAllAchievements(): Achievement[] {
  return achievements;
}

export function getEducation(): Education[] {
  return education;
}

/** Build a map: skill slug → { projects, experience } that reference it */
export function getSkillGraph(): Record<
  string,
  { projects: Project[]; experience: Experience[] }
> {
  const graph: Record<
    string,
    { projects: Project[]; experience: Experience[] }
  > = {};

  for (const skill of skills) {
    graph[skill.slug] = {
      projects: projects.filter((p) => p.skills.includes(skill.slug)),
      experience: getAllExperience().filter((e) =>
        e.skills.includes(skill.slug)
      ),
    };
  }

  return graph;
}
