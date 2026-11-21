# Saksham Maggu — Personal Engineering Portfolio

> Built under the **Patina Instrument** design specification: *warm metal meets precision measurement*.
> Editorial minimalism, hairlines, mono readouts, restraint, and verdigris & copper accents.

---

## 🚀 Overview

- **Framework**: Next.js 16 (App Router) + TypeScript
- **Styling**: Tailwind CSS v4 + Patina CSS variables
- **Typography**: Geist (Sans), Geist Mono (Numerals & Micro), Instrument Serif (Italic)
- **Design Tokens**: `src/styles/tokens.css` (Patina Night dark theme + Patina Paper light theme)
- **Content System**: Strict typed schemas (Zod) in `src/content/` & `src/lib/schemas.ts`
- **Interactive Primitives**: Radix UI (Tabs, Dialog/Sheet, Tooltip, Accordion), cmdk (Command Palette)
- **Diagrams**: Interactive multi-tier architecture diagrams with step-through playback and telemetry inspection
- **Code Blocks**: Formatted syntax blocks with tabs, diff mode, word wrap, line numbers, and copy-to-clipboard

---

## 🛠️ Quick Start

```bash
# Install dependencies
npm install

# Start local development server
npm run dev
# -> http://localhost:3000

# Production build
npm run build

# Start production server
npm start
```

---

## 🧭 Routes & Architecture

| Route | Purpose |
|-------|---------|
| `/` | Single-page editorial overview containing all 9 sections (§6.0 – §6.9) |
| `/projects` | Filterable and searchable engineering project catalog |
| `/projects/[slug]` | Comprehensive case-study template with architecture blueprints |
| `/experience` | Interactive career timeline + Skills-by-Role matrix view |
| `/achievements` | Chronological ledger of appointments, academic honors, and milestones |
| `/writing` | Engineering library with directory tree file explorer |
| `/writing/[slug]` | Full technical essay with scroll-spy TOC, code snippets, and diagrams |
| `/about` | Long-form background, "How I Work" principles, and education history |
| `/contact` | Multi-channel communication hub with verified email copy and contact form |
| `/resume` | Print-friendly curriculum vitae with instant PDF download |
| `/design` | Internal design system inspector & token kitchen sink |
| `/_not-found` | Branded 404 page with flatlined signal trace |

---

## ✍️ How to Add Content

### 1. Add a Project
Open `src/content/projects.ts` and append a new project object:
```typescript
{
  slug: "new-system",
  title: "Distributed Engine",
  summary: "Low-latency consensus engine written in Go.",
  year: 2026,
  featured: true,
  type: ["systems"],
  links: { github: "https://github.com/...", live: "https://..." },
  metrics: [{ label: "LATENCY", value: "0.8", unit: "ms" }],
  skills: ["golang", "kubernetes"],
  role: "Lead Engineer",
  timeline: "2026"
}
```

### 2. Add a Technical Essay
Open `src/app/writing/[slug]/page.tsx` and add an entry to `articlesData`:
```typescript
"my-article-slug": {
  slug: "my-article-slug",
  series: "Distributed Systems",
  title: "Title of the Essay",
  subtitle: "Italicized editorial subtitle",
  date: "November 2026",
  readingTime: 10,
  tags: ["Golang", "Distributed HA"],
  content: {
    overview: "Opening abstract...",
    sections: [
      { id: "sec-1", title: "Heading", body: "Detailed explanation..." }
    ]
  }
}
```

### 3. Add / Customize Diagrams
Use the `<Diagram />` component inside any page or article:
```tsx
<Diagram
  title="Packet Routing Pipeline"
  caption="Fig 1. Multi-tier bridge routing"
  nodes={[
    { id: "svc-1", name: "Gateway", kind: "service", x: 40, y: 100 },
    { id: "db-1", name: "Cluster Store", kind: "datastore", x: 250, y: 100 }
  ]}
  edges={[
    { from: "svc-1", to: "db-1", label: "gRPC", animated: true }
  ]}
/>
```

---

## 🎨 Changing Theme Tokens

All color, gradient, elevation, and motion tokens are defined in `src/styles/tokens.css`.
- **Dark Theme ("Patina Night")**: Defined under `:root[data-theme="dark"]` using ink green-black surfaces (`#090C0B`, `#121917`), hairline borders, verdigris (`#5CC4AE`), and copper highlights (`#D9915F`).
- **Light Theme ("Patina Paper")**: Defined under `:root[data-theme="light"]` using warm bone paper (`#F5F2EB`, `#FBF9F4`) and deep verdigris (`#0F7A68`).

---

## 🚢 Deployment

### Vercel
Connect your GitHub repository to Vercel. Next.js App Router will automatically be detected:
- Build command: `npm run build`
- Output directory: `.next`

### Netlify / Cloudflare Pages
- Preset: Next.js
- Runtime: Node.js 20+
