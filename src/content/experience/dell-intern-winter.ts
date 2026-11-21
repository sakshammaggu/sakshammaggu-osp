import type { Experience } from "@/lib/schemas";
import { ExperienceSchema } from "@/lib/schemas";

const dellInternWinter: Experience = {
  slug: "dell-intern-winter",
  kind: "internship",
  company: "Dell Technologies",
  role: "Software Engineer Intern — Winter",
  location: "Bengaluru, Karnataka",
  start: "Jan 2026",
  end: "Jun 2026",
  summary:
    "Implemented end-to-end networking features for Dell Edge solutions including WiFi-PSK, Cellular Device automation, and Spec Driven Development refactoring.",
  impact: [
    "Implemented end-to-end WiFi-PSK feature enabling seamless connection/disconnection and state persistence over HostNetwork/NAT",
    "Refactored and decoupled internal/gateway REST APIs using Spec Driven Development (SDD)",
    "Developed Cellular Device networking automation and e2e-validation of regression",
    "Automated comprehensive WiFi-PSK test suite — connectivity validation, health states, NAT creation, VM deployment",
    "Resolved QMI networking issue affecting non-multiplexed cellular devices",
  ],
  skills: ["golang", "python", "robot-framework", "rest-api"],
};

ExperienceSchema.parse(dellInternWinter);

export default dellInternWinter;
