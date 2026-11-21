import type { Education } from "@/lib/schemas";
import { EducationSchema } from "@/lib/schemas";
import { z } from "zod";

const education: Education[] = [
  {
    institution: "UPES Dehradun",
    degree: "B.Tech",
    field: "CSE (Full Stack AI)",
    start: "Aug 2022",
    end: "May 2026",
    notes: "CGPA: 8.55/10",
  },
];

z.array(EducationSchema).parse(education);

export default education;
