import type { Experience } from "@/lib/schemas";
import { ExperienceSchema } from "@/lib/schemas";

const dellSwe1: Experience = {
  slug: "dell-swe1",
  kind: "full-time",
  company: "Dell Technologies",
  role: "Software Engineer 1",
  location: "Bengaluru, Karnataka",
  start: "Aug 2026",
  end: "present",
  summary:
    "AI Solutions Infrastructure blueprint development and deployment for k8s Stack and OS Stack.",
  impact: [
    "Designed specs and implemented blueprints and Python scripts for Dell iDRAC10 (17G) server prerequisite checks via Redfish API",
    "Automated critical validations across 2 servers — Virtual Disk state/health, RAID Controller state/health, strict UEFI BootMode restriction checks",
  ],
  skills: ["python"],
};

ExperienceSchema.parse(dellSwe1);

export default dellSwe1;
