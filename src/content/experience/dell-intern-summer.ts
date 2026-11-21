import type { Experience } from "@/lib/schemas";
import { ExperienceSchema } from "@/lib/schemas";

const dellInternSummer: Experience = {
  slug: "dell-intern-summer",
  kind: "internship",
  company: "Dell Technologies",
  role: "Software Engineer Intern — Summer",
  location: "Bengaluru, Karnataka",
  start: "Jun 2025",
  end: "Jul 2025",
  summary:
    "Part of the Dell NativeEdge team. Contributed to the scalability of NativeEdge HA clusters for East-West Communication.",
  impact: [
    "Engineered algorithm scaling nodes from existing 3HA cluster to 8+ HA configurations (up to 64 nodes)",
    "Implemented dynamic ipTable, NAT and ipRules filtering/comparison logic based on host networks, ports, and bridge interfaces",
    "Built filtering logic handling all complex combinations for 3 Host Networks — Primary, Secondary, Tertiary",
    "Onboarded 4 virtual Edge Compute Endpoints (ECE) VMs using Jenkins pipelining",
  ],
  skills: [
    "golang",
    "microservices",
    "grpc",
    "kubernetes",
  ],
};

ExperienceSchema.parse(dellInternSummer);

export default dellInternSummer;
