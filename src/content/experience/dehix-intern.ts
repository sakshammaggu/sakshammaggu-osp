import type { Experience } from "@/lib/schemas";
import { ExperienceSchema } from "@/lib/schemas";

const dehixIntern: Experience = {
  slug: "dehix-intern",
  kind: "internship",
  company: "Dehix",
  role: "Frontend Developer Intern",
  location: "Remote",
  start: "Jul 2024",
  end: "Sep 2024",
  summary:
    "Revamped the Dehix website with cutting-edge responsiveness, accessibility, and performance.",
  impact: [
    "Designed Freelancer, Business, and Oracle verification interfaces serving 30+ active users",
    "Integrated client-side Freelancer REST APIs enabling real-time data flow and interactions",
    "Conducted thorough cross-browser testing and debugging for smooth functionality",
  ],
  skills: [
    "typescript",
    "nextjs",
    "reactjs",
    "mongodb",
    "rest-api",
    "microservices",
  ],
};

ExperienceSchema.parse(dehixIntern);

export default dehixIntern;
