import type { SiteConfig } from "@/lib/schemas";
import { SiteConfigSchema } from "@/lib/schemas";

const siteConfig: SiteConfig = {
  name: "Saksham Maggu",
  tagline: "builds systems that hold under load",
  status: "OPEN TO OPPORTUNITIES",
  email: "sakshammaggu80@gmail.com",
  location: "Bengaluru",
  socials: [
    {
      platform: "GitHub",
      handle: "sakshammaggu",
      url: "TODO(link)",
      icon: "github",
      primary: true,
    },
    {
      platform: "LinkedIn",
      handle: "sakshammaggu",
      url: "TODO(link)",
      icon: "linkedin",
      primary: true,
    },
    {
      platform: "LeetCode",
      handle: "sakshammaggu",
      url: "TODO(link)",
      icon: "code",
    },
  ],
};

// Validate at import time
SiteConfigSchema.parse(siteConfig);

export default siteConfig;
