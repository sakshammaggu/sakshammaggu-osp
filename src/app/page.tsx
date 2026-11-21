import { HeroSection } from "@/components/sections/hero";
import { ReadoutStrip } from "@/components/sections/readout-strip";
import { SelectedWorkSection } from "@/components/sections/selected-work";
import { ExperienceSection } from "@/components/sections/experience-section";
import { SkillsSection } from "@/components/sections/skills-section";
import { WritingSection } from "@/components/sections/writing-section";
import { AchievementsSection } from "@/components/sections/achievements-section";
import { AboutSection } from "@/components/sections/about-section";
import { ContactSection } from "@/components/sections/contact-section";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* 00 Hero */}
      <HeroSection />

      {/* 01 Readout Strip */}
      <ReadoutStrip />

      {/* 02 Selected Work */}
      <SelectedWorkSection />

      {/* 03 Experience & Internships */}
      <ExperienceSection />

      {/* 04 Evidence-Based Skills */}
      <SkillsSection />

      {/* 05 Writing Teaser */}
      <WritingSection />

      {/* 06 Achievements Ledger */}
      <AchievementsSection />

      {/* 07 About & Education */}
      <AboutSection />

      {/* 08 Contact */}
      <ContactSection />
    </div>
  );
}
