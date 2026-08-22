# Akanksha Sharma — Portfolio

A production-grade personal portfolio built with Next.js 14 (App Router), TypeScript,
Tailwind CSS, Framer Motion, GSAP (ScrollTrigger), and React Three Fiber.

**Live sections:** Hero · About · Skills · Featured Projects (with full case-study
routes) · Experience · Education · Achievements · Contact.

## Design language

- **Signature motif:** the site borrows its structural language from Flutter's
  `build()` — section eyebrows read like constructor calls
  (`MaterialApp( status: "open to internships" )`), skill cards look like a widget
  inspector panel, and each project opens into a device-frame case study instead of
  a static screenshot grid.
- **Palette:** near-black background, emerald primary, deep blue secondary, cyan
  accent — defined as CSS custom properties / Tailwind tokens in
  `tailwind.config.ts`, not hardcoded per component.
- **Type:** Space Grotesk (display), Inter (body), JetBrains Mono (labels/code),
  loaded via `next/font/google` (self-hosted at build time, zero layout shift).
- **Motion:** Framer Motion for micro-interactions and viewport reveals, GSAP +
  ScrollTrigger for orchestrated scroll animations (skill bar fills, the education
  timeline draw, project card stagger, and the case-study active-screenshot sync).
  Everything respects `prefers-reduced-motion`.
- **3D:** a single React Three Fiber scene (the hero phone) — kept to one place so
  it stays a signature rather than decoration. Falls back to a static SVG
  illustration automatically if WebGL is unavailable or reduced motion is on.

## Folder architecture

```
src/
  app/                      # App Router routes
    layout.tsx               # fonts, metadata, JSON-LD, global chrome
    page.tsx                 # composes homepage sections
    sitemap.ts / robots.ts   # generated SEO files
    projects/[slug]/page.tsx # dynamic case-study route (generateStaticParams)
  components/
    layout/                  # Navbar, Footer, ScrollProgress, CustomCursor, PageLoader
    sections/                 # One component per homepage section
    ui/                       # Reusable primitives (Button, Badge, CommandPalette...)
    three/                    # R3F scene + fallback wrapper
    case-study/                # Device frame + scroll-synced case study body
  data/                      # Typed content — projects, skills, education, site meta
  hooks/                     # useActiveSection, useReducedMotion
  lib/                       # cn() helper, gsap registration
public/                      # favicon/icon, OG image, resume.pdf goes here
```

Content lives in `src/data/*.ts`, not inline in JSX — update your projects, skills,
or education there and every page (nav highlighting, command palette, sitemap,
case-study routes) stays in sync automatically.

## Before you deploy

1. Replace `public/resume-placeholder.txt` with your real `resume.pdf` (the site
   links to `/resume.pdf` via `src/data/site.ts`).
2. Update `src/data/site.ts` with your real GitHub/LinkedIn URLs, email, and the
   final domain (`url`) — this feeds Open Graph, JSON-LD, and the sitemap.
3. Fill in `src/data/achievements.ts` as hackathons/certifications land — they're
   left as clearly labeled placeholders on purpose.
4. Swap the `DeviceFrame` placeholder screens in `case-study/DeviceFrame.tsx` /
   `src/data/projects.ts` for real app screenshots when you have them (drop images
   in `public/projects/<slug>/` and render them with `next/image`).
5. Wire the contact form (`components/sections/Contact.tsx`) to a real endpoint —
   it's UI-only right now. Formspree, Resend, or a Next.js API route all work.

## Local development

```bash
npm install
npm run dev
```

> Note: this environment builds fonts via `next/font/google`, which fetches from
> `fonts.googleapis.com` at build time. That requires outbound internet access
> (available on Vercel and most local machines by default).

## Build

```bash
npm run build
npm run start
```

## Deploying to Vercel

1. Push this repository to GitHub.
2. Go to [vercel.com/new](https://vercel.com/new) and import the repo.
3. Framework preset: **Next.js** (auto-detected) — no extra config needed.
4. Build command: `next build` (default). Output: `.next` (default).
5. Add your real domain in Project Settings → Domains, then update
   `site.url` in `src/data/site.ts` to match and redeploy so metadata/sitemap
   reflect the final URL.
6. (Optional) Enable Vercel Analytics / Speed Insights for real-world Web Vitals
   tracking alongside the Lighthouse checklist below.

## Performance checklist (target: Lighthouse 95+)

The project is built to these practices, but only a live Lighthouse run
(Chrome DevTools or `npx lighthouse <url>`) can confirm the score post-deploy:

- [ ] Run Lighthouse in Chrome DevTools (Incognito, mobile + desktop) after deploying
- [ ] Confirm fonts show `font-display: swap` (already configured)
- [ ] Confirm the R3F hero scene lazy-loads and doesn't block LCP (already
      dynamically imported with `ssr: false`)
- [ ] Replace placeholder screenshots with optimized `next/image` assets
      (`width`/`height` set, served as WebP/AVIF)
- [ ] Add a real `resume.pdf` (currently a text placeholder)
- [ ] Verify no console errors/warnings in production build

## Accessibility

- Semantic landmarks (`header`, `main`, `footer`), skip-able focus order.
- Custom cursor and floating particles auto-disable for `prefers-reduced-motion`
  and non-pointer (touch) devices.
- Visible focus rings (`:focus-visible`) tuned to the palette instead of removed.
- Command palette is fully keyboard-operable (`⌘K` / `Ctrl+K`, `Esc` to close).
