import type { Achievement } from "@/lib/schemas";
import { z } from "zod";
import { AchievementSchema } from "@/lib/schemas";

// TODO(achievements) — Populate from resume / actual achievements
const achievements: Achievement[] = [];

z.array(AchievementSchema).parse(achievements);

export default achievements;
