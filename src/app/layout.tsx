import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import { ToastProvider } from "@/components/ui/toast";
import { ScrollProgress } from "@/components/layout/scroll-progress";
import { SkipLink } from "@/components/layout/skip-link";
import { Nav } from "@/components/layout/nav";
import { SectionRuler } from "@/components/layout/section-ruler";
import { CommandPalette } from "@/components/layout/command-palette";
import { Footer } from "@/components/layout/footer";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: "400",
  style: "italic",
});

export const metadata: Metadata = {
  title: "Saksham Maggu — Software Engineer",
  description:
    "Software Engineer at Dell Technologies. B.Tech CSE (Full Stack AI) from UPES Dehradun. Builds systems that hold under load.",
  keywords: [
    "Saksham Maggu",
    "Software Engineer",
    "Dell Technologies",
    "Systems Engineer",
    "Distributed Systems",
    "High Availability",
    "Kubernetes",
    "Golang",
    "Python",
  ],
  authors: [{ name: "Saksham Maggu" }],
  openGraph: {
    title: "Saksham Maggu — Software Engineer",
    description: "Builds systems that hold under load. Dell Technologies AI Solutions & Edge.",
    type: "website",
  },
};

// Inline script to prevent flash of wrong theme
const themeScript = `
(function() {
  try {
    var theme = localStorage.getItem('theme');
    if (theme === 'dark' || theme === 'light') {
      document.documentElement.setAttribute('data-theme', theme);
    } else if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.setAttribute('data-theme', 'light');
    }
  } catch (e) {}
})();
`;

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} antialiased`}
      suppressHydrationWarning
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <ThemeProvider>
          <ToastProvider>
            <SkipLink />
            <ScrollProgress />
            <Nav />
            <SectionRuler />
            <CommandPalette />
            <main id="main-content" className="flex-1">
              {children}
            </main>
            <Footer />
          </ToastProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
